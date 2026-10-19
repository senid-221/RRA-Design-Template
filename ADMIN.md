# IT Admin Dashboard

## Access
- URL: `/admin.html`
- Configure `ADMIN_INITIAL_USERNAME`, `ADMIN_INITIAL_PASSWORD` (at least 12 characters), and `ADMIN_INITIAL_EMAIL` before initializing a new database.
- Existing deployments must replace any previously seeded `admin` / `admin123` credential; that known default password is rejected by the login endpoint.
- Dashboard API routes require an eight-hour bearer-token session.

## Features

### 1. Dashboard Overview
- Stats for videos, products, projects, and contacts
- Quick access to all management sections

### 2. Video Management
- Add, edit, delete videos
- Fields: title, description, video URL, thumbnail, category, duration
- Control display order and active status
- Supports YouTube embed URLs and other video platforms

### 3. Web Previews (Shop Products)
- Manage products/templates for the shop page
- Fields: title, description, price, currency, images, preview/demo URLs
- Features list and technologies tags
- Featured flag for highlighting products
- Category and display order control

### 4. Projects Management
- Showcase projects and portfolios
- Fields: title, description, image, project URL, category, tags
- Control display order and active status

### 5. Site Content Editor
- Edit text content across all pages
- Key-value based content management
- Supports text, HTML, and JSON content types
- Filter by page (home, shop, learning, about, faq)
- Organize by sections

### 6. Settings
- Change admin password
- Secure password hashing with bcrypt

## Database Tables

- `admin_users` - Admin authentication
- `videos` - Video content
- `shop_products` - Web previews and products
- `projects` - Project showcases
- `site_content` - Editable site content
- `contacts` - Contact form submissions
- `newsletter_subscriptions` - Newsletter signups

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/change-password` - Change password

### Videos
- `GET /api/admin/videos` - List all videos
- `POST /api/admin/videos` - Create video
- `PUT /api/admin/videos/:id` - Update video
- `DELETE /api/admin/videos/:id` - Delete video

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Projects
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Content
- `GET /api/admin/content` - List all content (optional ?page= filter)
- `POST /api/admin/content` - Create/update content
- `PUT /api/admin/content/:id` - Update content
- `DELETE /api/admin/content/:id` - Delete content

### Public API (for frontend)
- `GET /api/videos` - Get active videos (optional ?category= filter)
- `GET /api/products` - Get active products (optional ?category=&featured= filters)
- `GET /api/projects` - Get active projects (optional ?category= filter)
- `GET /api/admin/stats` - Dashboard statistics

## Security

- Passwords hashed with bcrypt (10 rounds)
- Session storage for login state
- No sensitive data in localStorage
- Database connection secured with SSL in production

## Deployment

The admin dashboard works automatically when deployed to Render with:
- PostgreSQL database configured (DATABASE_URL)
- All environment variables set
- Database tables auto-created on first run

## Usage Examples

### Adding a Video
1. Navigate to "Videos" section
2. Click "+ Add Video"
3. Fill in title, video URL (YouTube embed), description
4. Optionally add thumbnail, category, duration
5. Set display order and active status
6. Click "Save"

### Adding a Product
1. Navigate to "Web Previews" section
2. Click "+ Add Product"
3. Fill in title, description, price
4. Add image URL, preview URL, demo URL
5. Add features (one per line) and technologies
6. Mark as featured if needed
7. Click "Save"

### Editing Site Content
1. Navigate to "Site Content" section
2. Filter by page if needed
3. Click "+ Add Content" or "Edit" on existing content
4. Use content key format: `page.section.element` (e.g., `home.hero.title`)
5. Set content type (text, HTML, or JSON)
6. Click "Save"

## Frontend Integration

To display managed content on your pages, use the public API:

```javascript
// Fetch videos
fetch('/api/videos')
  .then(r => r.json())
  .then(data => {
    // data.videos array
  });

// Fetch products
fetch('/api/products?featured=true')
  .then(r => r.json())
  .then(data => {
    // data.products array
  });

// Fetch projects
fetch('/api/projects')
  .then(r => r.json())
  .then(data => {
    // data.projects array
  });
```
