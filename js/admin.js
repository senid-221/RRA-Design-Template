var API_BASE = '';
var currentUser = null;

function adminFetch(url, options) {
  options = options || {};
  var headers = Object.assign({}, options.headers || {});
  var token = sessionStorage.getItem('adminToken');
  if (token) headers.Authorization = 'Bearer ' + token;
  options.headers = headers;
  return fetch(url, options).then(function(response) {
    if (response.status === 401) {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
      currentUser = null;
      document.getElementById('loginScreen').style.display = 'flex';
      document.getElementById('dashboardScreen').style.display = 'none';
    }
    return response;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var saved = sessionStorage.getItem('adminUser');
  if (saved && sessionStorage.getItem('adminToken')) {
    try {
      currentUser = JSON.parse(saved);
      showDashboard();
    } catch (error) {
      sessionStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminToken');
    }
  }

  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  document.getElementById('passwordForm').addEventListener('submit', handleChangePassword);

  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      switchSection(this.dataset.section);
    });
  });

  document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
});

function handleLogin(e) {
  e.preventDefault();
  var username = document.getElementById('loginUsername').value;
  var password = document.getElementById('loginPassword').value;
  var errorEl = document.getElementById('loginError');

  errorEl.classList.remove('show');

  fetch(API_BASE + '/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      currentUser = data.user;
      sessionStorage.setItem('adminUser', JSON.stringify(currentUser));
      sessionStorage.setItem('adminToken', data.token);
      showDashboard();
    } else {
      errorEl.textContent = data.error || 'Login failed';
      errorEl.classList.add('show');
    }
  })
  .catch(function() {
    errorEl.textContent = 'Connection error. Please try again.';
    errorEl.classList.add('show');
  });
}

function handleLogout() {
  adminFetch(API_BASE + '/api/admin/logout', { method: 'POST' }).catch(function() {});
  currentUser = null;
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminUser');
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboardScreen').style.display = 'none';
  document.getElementById('loginForm').reset();
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'flex';
  document.getElementById('currentUser').textContent = currentUser.username;
  loadStats();
}

function switchSection(section) {
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.querySelector('[data-section="' + section + '"]').classList.add('active');

  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(section + 'Section').classList.add('active');

  var titles = { dashboard: 'Dashboard', videos: 'Video Management', products: 'Web Previews', projects: 'Projects', content: 'Site Content', settings: 'Settings' };
  document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';

  if (section === 'dashboard') loadStats();
  if (section === 'videos') loadVideos();
  if (section === 'products') loadProducts();
  if (section === 'projects') loadProjects();
  if (section === 'content') loadContent();
}

function loadStats() {
  adminFetch(API_BASE + '/api/admin/stats')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      document.getElementById('statVideos').textContent = data.videos.total;
      document.getElementById('statProducts').textContent = data.products.total;
      document.getElementById('statProjects').textContent = data.projects.total;
      document.getElementById('statContacts').textContent = data.contacts.total;
    })
    .catch(function(err) { console.error('Stats error:', err); });
}

// ===== VIDEOS =====
function loadVideos() {
  adminFetch(API_BASE + '/api/admin/videos')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var container = document.getElementById('videosList');
      if (!data.videos.length) {
        container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg><p>No videos yet. Click "Add Video" to get started.</p></div>';
        return;
      }
      container.innerHTML = data.videos.map(function(v) {
        return '<div class="item-card">' +
          '<div class="item-card__image">' + (v.thumbnail_url ? '<img src="' + escapeHtml(v.thumbnail_url) + '" alt="">' : '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>') + '</div>' +
          '<div class="item-card__body">' +
            '<div class="item-card__title">' + escapeHtml(v.title) + '</div>' +
            '<div class="item-card__desc">' + escapeHtml(v.description || '') + '</div>' +
            '<div class="item-card__meta">' +
              (v.category ? '<span class="item-card__tag">' + escapeHtml(v.category) + '</span>' : '') +
              '<span class="item-card__tag ' + (v.is_active ? 'active' : 'inactive') + '">' + (v.is_active ? 'Active' : 'Inactive') + '</span>' +
            '</div>' +
            '<div class="item-card__actions">' +
              '<button class="btn btn-sm btn-outline" onclick="editVideo(' + v.id + ')">Edit</button>' +
              '<button class="btn btn-sm btn-danger" onclick="deleteVideo(' + v.id + ')">Delete</button>' +
            '</div>' +
          '</div></div>';
      }).join('');
    });
}

function openVideoModal(video) {
  var isEdit = !!video;
  var html = '<div class="modal__header"><h3>' + (isEdit ? 'Edit Video' : 'Add Video') + '</h3><button class="modal__close" onclick="closeModal()">&times;</button></div>' +
    '<div class="modal__body">' +
      '<form id="videoForm">' +
        '<div class="form-group"><label>Title *</label><input type="text" id="videoTitle" value="' + escapeHtml(video ? video.title : '') + '" required></div>' +
        '<div class="form-group"><label>Video URL *</label><input type="url" id="videoUrl" value="' + escapeHtml(video ? video.video_url : '') + '" placeholder="https://youtube.com/embed/..." required></div>' +
        '<div class="form-group"><label>Description</label><textarea id="videoDesc">' + escapeHtml(video ? video.description || '' : '') + '</textarea></div>' +
        '<div class="form-group"><label>Thumbnail URL</label><input type="url" id="videoThumb" value="' + escapeHtml(video ? video.thumbnail_url || '' : '') + '"></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Category</label><input type="text" id="videoCategory" value="' + escapeHtml(video ? video.category || '' : '') + '"></div>' +
          '<div class="form-group"><label>Duration</label><input type="text" id="videoDuration" value="' + escapeHtml(video ? video.duration || '' : '') + '" placeholder="e.g. 5:30"></div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Display Order</label><input type="number" id="videoOrder" value="' + (video ? video.display_order : 0) + '"></div>' +
          '<div class="form-group"><label>&nbsp;</label><div class="form-check"><input type="checkbox" id="videoActive" ' + (!video || video.is_active ? 'checked' : '') + '><label for="videoActive">Active</label></div></div>' +
        '</div>' +
      '</form>' +
    '</div>' +
    '<div class="modal__footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveVideo(' + (isEdit ? video.id : 'null') + ')">' + (isEdit ? 'Update' : 'Save') + '</button></div>';

  showModal(html);
}

function editVideo(id) {
  adminFetch(API_BASE + '/api/admin/videos')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var video = data.videos.find(function(v) { return v.id === id; });
      if (video) openVideoModal(video);
    });
}

function saveVideo(id) {
  var payload = {
    title: document.getElementById('videoTitle').value,
    video_url: document.getElementById('videoUrl').value,
    description: document.getElementById('videoDesc').value,
    thumbnail_url: document.getElementById('videoThumb').value,
    category: document.getElementById('videoCategory').value,
    duration: document.getElementById('videoDuration').value,
    display_order: parseInt(document.getElementById('videoOrder').value) || 0,
    is_active: document.getElementById('videoActive').checked
  };

  var url = id ? API_BASE + '/api/admin/videos/' + id : API_BASE + '/api/admin/videos';
  var method = id ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      closeModal();
      loadVideos();
    } else {
      alert(data.error || 'Failed to save video');
    }
  });
}

function deleteVideo(id) {
  if (!confirm('Are you sure you want to delete this video?')) return;
  adminFetch(API_BASE + '/api/admin/videos/' + id, { method: 'DELETE' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) loadVideos();
    });
}

// ===== PRODUCTS =====
function loadProducts() {
  adminFetch(API_BASE + '/api/admin/products')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var container = document.getElementById('productsList');
      if (!data.products.length) {
        container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>No products yet. Click "Add Product" to get started.</p></div>';
        return;
      }
      container.innerHTML = data.products.map(function(p) {
        return '<div class="item-card">' +
          '<div class="item-card__image">' + (p.image_url ? '<img src="' + escapeHtml(p.image_url) + '" alt="">' : '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>') + '</div>' +
          '<div class="item-card__body">' +
            '<div class="item-card__title">' + escapeHtml(p.title) + '</div>' +
            '<div class="item-card__desc">' + escapeHtml(p.description || '') + '</div>' +
            '<div class="item-card__meta">' +
              (p.price ? '<span class="item-card__tag">' + escapeHtml(p.currency || 'RWF') + ' ' + parseFloat(p.price).toLocaleString() + '</span>' : '') +
              (p.category ? '<span class="item-card__tag">' + escapeHtml(p.category) + '</span>' : '') +
              (p.is_featured ? '<span class="item-card__tag active">Featured</span>' : '') +
              '<span class="item-card__tag ' + (p.is_active ? 'active' : 'inactive') + '">' + (p.is_active ? 'Active' : 'Inactive') + '</span>' +
            '</div>' +
            '<div class="item-card__actions">' +
              '<button class="btn btn-sm btn-outline" onclick="editProduct(' + p.id + ')">Edit</button>' +
              '<button class="btn btn-sm btn-danger" onclick="deleteProduct(' + p.id + ')">Delete</button>' +
            '</div>' +
          '</div></div>';
      }).join('');
    });
}

function openProductModal(product) {
  var isEdit = !!product;
  var html = '<div class="modal__header"><h3>' + (isEdit ? 'Edit Product' : 'Add Product') + '</h3><button class="modal__close" onclick="closeModal()">&times;</button></div>' +
    '<div class="modal__body">' +
      '<form id="productForm">' +
        '<div class="form-group"><label>Title *</label><input type="text" id="productTitle" value="' + escapeHtml(product ? product.title : '') + '" required></div>' +
        '<div class="form-group"><label>Description</label><textarea id="productDesc">' + escapeHtml(product ? product.description || '' : '') + '</textarea></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Price</label><input type="number" id="productPrice" value="' + (product ? product.price || '' : '') + '" step="0.01"></div>' +
          '<div class="form-group"><label>Currency</label><select id="productCurrency"><option value="RWF" ' + (!product || product.currency === 'RWF' ? 'selected' : '') + '>RWF</option><option value="USD" ' + (product && product.currency === 'USD' ? 'selected' : '') + '>USD</option></select></div>' +
        '</div>' +
        '<div class="form-group"><label>Image URL</label><input type="url" id="productImage" value="' + escapeHtml(product ? product.image_url || '' : '') + '"></div>' +
        '<div class="form-group"><label>Preview URL</label><input type="url" id="productPreview" value="' + escapeHtml(product ? product.preview_url || '' : '') + '"></div>' +
        '<div class="form-group"><label>Demo URL</label><input type="url" id="productDemo" value="' + escapeHtml(product ? product.demo_url || '' : '') + '"></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Category</label><input type="text" id="productCategory" value="' + escapeHtml(product ? product.category || '' : '') + '"></div>' +
          '<div class="form-group"><label>Display Order</label><input type="number" id="productOrder" value="' + (product ? product.display_order : 0) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label>Features (one per line)</label><textarea id="productFeatures">' + escapeHtml(product ? product.features || '' : '') + '</textarea></div>' +
        '<div class="form-group"><label>Technologies (comma separated)</label><input type="text" id="productTech" value="' + escapeHtml(product ? product.technologies || '' : '') + '"></div>' +
        '<div class="form-row">' +
          '<div class="form-check"><input type="checkbox" id="productFeatured" ' + (product && product.is_featured ? 'checked' : '') + '><label for="productFeatured">Featured</label></div>' +
          '<div class="form-check"><input type="checkbox" id="productActive" ' + (!product || product.is_active ? 'checked' : '') + '><label for="productActive">Active</label></div>' +
        '</div>' +
      '</form>' +
    '</div>' +
    '<div class="modal__footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProduct(' + (isEdit ? product.id : 'null') + ')">' + (isEdit ? 'Update' : 'Save') + '</button></div>';

  showModal(html);
}

function editProduct(id) {
  adminFetch(API_BASE + '/api/admin/products')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var product = data.products.find(function(p) { return p.id === id; });
      if (product) openProductModal(product);
    });
}

function saveProduct(id) {
  var payload = {
    title: document.getElementById('productTitle').value,
    description: document.getElementById('productDesc').value,
    price: document.getElementById('productPrice').value || null,
    currency: document.getElementById('productCurrency').value,
    image_url: document.getElementById('productImage').value,
    preview_url: document.getElementById('productPreview').value,
    demo_url: document.getElementById('productDemo').value,
    category: document.getElementById('productCategory').value,
    features: document.getElementById('productFeatures').value,
    technologies: document.getElementById('productTech').value,
    display_order: parseInt(document.getElementById('productOrder').value) || 0,
    is_featured: document.getElementById('productFeatured').checked,
    is_active: document.getElementById('productActive').checked
  };

  var url = id ? API_BASE + '/api/admin/products/' + id : API_BASE + '/api/admin/products';
  var method = id ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      closeModal();
      loadProducts();
    } else {
      alert(data.error || 'Failed to save product');
    }
  });
}

function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  adminFetch(API_BASE + '/api/admin/products/' + id, { method: 'DELETE' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) loadProducts();
    });
}

// ===== PROJECTS =====
function loadProjects() {
  adminFetch(API_BASE + '/api/admin/projects')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var container = document.getElementById('projectsList');
      if (!data.projects.length) {
        container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg><p>No projects yet. Click "Add Project" to get started.</p></div>';
        return;
      }
      container.innerHTML = data.projects.map(function(p) {
        return '<div class="item-card">' +
          '<div class="item-card__image">' + (p.image_url ? '<img src="' + escapeHtml(p.image_url) + '" alt="">' : '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>') + '</div>' +
          '<div class="item-card__body">' +
            '<div class="item-card__title">' + escapeHtml(p.title) + '</div>' +
            '<div class="item-card__desc">' + escapeHtml(p.description || '') + '</div>' +
            '<div class="item-card__meta">' +
              (p.category ? '<span class="item-card__tag">' + escapeHtml(p.category) + '</span>' : '') +
              '<span class="item-card__tag ' + (p.is_active ? 'active' : 'inactive') + '">' + (p.is_active ? 'Active' : 'Inactive') + '</span>' +
            '</div>' +
            '<div class="item-card__actions">' +
              '<button class="btn btn-sm btn-outline" onclick="editProject(' + p.id + ')">Edit</button>' +
              '<button class="btn btn-sm btn-danger" onclick="deleteProject(' + p.id + ')">Delete</button>' +
            '</div>' +
          '</div></div>';
      }).join('');
    });
}

function openProjectModal(project) {
  var isEdit = !!project;
  var html = '<div class="modal__header"><h3>' + (isEdit ? 'Edit Project' : 'Add Project') + '</h3><button class="modal__close" onclick="closeModal()">&times;</button></div>' +
    '<div class="modal__body">' +
      '<form id="projectForm">' +
        '<div class="form-group"><label>Title *</label><input type="text" id="projectTitle" value="' + escapeHtml(project ? project.title : '') + '" required></div>' +
        '<div class="form-group"><label>Description</label><textarea id="projectDesc">' + escapeHtml(project ? project.description || '' : '') + '</textarea></div>' +
        '<div class="form-group"><label>Image URL</label><input type="url" id="projectImage" value="' + escapeHtml(project ? project.image_url || '' : '') + '"></div>' +
        '<div class="form-group"><label>Project URL</label><input type="url" id="projectUrl" value="' + escapeHtml(project ? project.project_url || '' : '') + '"></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Category</label><input type="text" id="projectCategory" value="' + escapeHtml(project ? project.category || '' : '') + '"></div>' +
          '<div class="form-group"><label>Display Order</label><input type="number" id="projectOrder" value="' + (project ? project.display_order : 0) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label>Tags (comma separated)</label><input type="text" id="projectTags" value="' + escapeHtml(project ? project.tags || '' : '') + '"></div>' +
        '<div class="form-check"><input type="checkbox" id="projectActive" ' + (!project || project.is_active ? 'checked' : '') + '><label for="projectActive">Active</label></div>' +
      '</form>' +
    '</div>' +
    '<div class="modal__footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject(' + (isEdit ? project.id : 'null') + ')">' + (isEdit ? 'Update' : 'Save') + '</button></div>';

  showModal(html);
}

function editProject(id) {
  adminFetch(API_BASE + '/api/admin/projects')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var project = data.projects.find(function(p) { return p.id === id; });
      if (project) openProjectModal(project);
    });
}

function saveProject(id) {
  var payload = {
    title: document.getElementById('projectTitle').value,
    description: document.getElementById('projectDesc').value,
    image_url: document.getElementById('projectImage').value,
    project_url: document.getElementById('projectUrl').value,
    category: document.getElementById('projectCategory').value,
    tags: document.getElementById('projectTags').value,
    display_order: parseInt(document.getElementById('projectOrder').value) || 0,
    is_active: document.getElementById('projectActive').checked
  };

  var url = id ? API_BASE + '/api/admin/projects/' + id : API_BASE + '/api/admin/projects';
  var method = id ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      closeModal();
      loadProjects();
    } else {
      alert(data.error || 'Failed to save project');
    }
  });
}

function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  adminFetch(API_BASE + '/api/admin/projects/' + id, { method: 'DELETE' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) loadProjects();
    });
}

// ===== CONTENT =====
function loadContent() {
  var page = document.getElementById('contentPageFilter').value;
  var url = API_BASE + '/api/admin/content' + (page ? '?page=' + page : '');

  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var container = document.getElementById('contentList');
      if (!data.content.length) {
        container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg><p>No content entries yet. Click "Add Content" to create one.</p></div>';
        return;
      }
      container.innerHTML = data.content.map(function(c) {
        return '<div class="content-item">' +
          '<div class="content-item__info">' +
            '<div class="content-item__key">' + escapeHtml(c.content_key) + '</div>' +
            '<div class="content-item__preview">' + escapeHtml((c.content_value || '').substring(0, 100)) + '</div>' +
          '</div>' +
          '<div class="content-item__meta">' +
            (c.page ? '<span class="item-card__tag">' + escapeHtml(c.page) + '</span>' : '') +
            (c.section ? '<span class="item-card__tag">' + escapeHtml(c.section) + '</span>' : '') +
            '<span class="item-card__tag">' + escapeHtml(c.content_type) + '</span>' +
            '<button class="btn btn-sm btn-outline" onclick="editContent(' + c.id + ')">Edit</button>' +
            '<button class="btn btn-sm btn-danger" onclick="deleteContent(' + c.id + ')">Delete</button>' +
          '</div>' +
        '</div>';
      }).join('');
    });
}

function openContentModal(content) {
  var isEdit = !!content;
  var html = '<div class="modal__header"><h3>' + (isEdit ? 'Edit Content' : 'Add Content') + '</h3><button class="modal__close" onclick="closeModal()">&times;</button></div>' +
    '<div class="modal__body">' +
      '<form id="contentForm">' +
        '<div class="form-group"><label>Content Key *</label><input type="text" id="contentKey" value="' + escapeHtml(content ? content.content_key : '') + '" placeholder="e.g. home.hero.title" required></div>' +
        '<div class="form-group"><label>Content Value</label><textarea id="contentValue" style="min-height:150px;">' + escapeHtml(content ? content.content_value || '' : '') + '</textarea></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>Type</label><select id="contentType"><option value="text" ' + (!content || content.content_type === 'text' ? 'selected' : '') + '>Text</option><option value="html" ' + (content && content.content_type === 'html' ? 'selected' : '') + '>HTML</option><option value="json" ' + (content && content.content_type === 'json' ? 'selected' : '') + '>JSON</option></select></div>' +
          '<div class="form-group"><label>Page</label><select id="contentPage"><option value="">—</option><option value="home" ' + (content && content.page === 'home' ? 'selected' : '') + '>Home</option><option value="shop" ' + (content && content.page === 'shop' ? 'selected' : '') + '>Shop</option><option value="learning" ' + (content && content.page === 'learning' ? 'selected' : '') + '>Learning</option><option value="about" ' + (content && content.page === 'about' ? 'selected' : '') + '>About</option><option value="faq" ' + (content && content.page === 'faq' ? 'selected' : '') + '>FAQ</option></select></div>' +
        '</div>' +
        '<div class="form-group"><label>Section</label><input type="text" id="contentSection" value="' + escapeHtml(content ? content.section || '' : '') + '"></div>' +
      '</form>' +
    '</div>' +
    '<div class="modal__footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveContent(' + (isEdit ? content.id : 'null') + ')">' + (isEdit ? 'Update' : 'Save') + '</button></div>';

  showModal(html);
}

function editContent(id) {
  adminFetch(API_BASE + '/api/admin/content')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var content = data.content.find(function(c) { return c.id === id; });
      if (content) openContentModal(content);
    });
}

function saveContent(id) {
  var payload = {
    content_key: document.getElementById('contentKey').value,
    content_value: document.getElementById('contentValue').value,
    content_type: document.getElementById('contentType').value,
    page: document.getElementById('contentPage').value,
    section: document.getElementById('contentSection').value
  };

  var url = id ? API_BASE + '/api/admin/content/' + id : API_BASE + '/api/admin/content';
  var method = id ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      closeModal();
      loadContent();
    } else {
      alert(data.error || 'Failed to save content');
    }
  });
}

function deleteContent(id) {
  if (!confirm('Are you sure you want to delete this content?')) return;
  adminFetch(API_BASE + '/api/admin/content/' + id, { method: 'DELETE' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) loadContent();
    });
}

// ===== PASSWORD =====
function handleChangePassword(e) {
  e.preventDefault();
  var msgEl = document.getElementById('passwordMessage');
  var current = document.getElementById('currentPassword').value;
  var newPass = document.getElementById('newPassword').value;
  var confirm = document.getElementById('confirmPassword').value;

  if (newPass !== confirm) {
    msgEl.textContent = 'New passwords do not match';
    msgEl.className = 'form-message show error';
    return;
  }

  adminFetch(API_BASE + '/api/admin/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentUser.username, currentPassword: current, newPassword: newPass })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      msgEl.textContent = 'Password updated successfully!';
      msgEl.className = 'form-message show success';
      document.getElementById('passwordForm').reset();
    } else {
      msgEl.textContent = data.error || 'Failed to update password';
      msgEl.className = 'form-message show error';
    }
  });
}

// ===== MODAL HELPERS =====
function showModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function escapeHtml(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
