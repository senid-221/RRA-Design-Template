const tradeProducts = [
  { name: "Laptops and computers", hs: "8471.30", duty: "0%", vat: "18%", origin: "Various" },
  { name: "Mobile phones", hs: "8517.12", duty: "25%", vat: "18%", origin: "Various" },
  { name: "Textiles and clothing", hs: "6110.20", duty: "25%", vat: "18%", origin: "Various" },
  { name: "Vehicles (passenger)", hs: "8703.23", duty: "25%", vat: "18%", origin: "Various" },
  { name: "Rice", hs: "1006.30", duty: "35%", vat: "18%", origin: "Various" },
  { name: "Cement", hs: "2523.29", duty: "25%", vat: "18%", origin: "Various" },
  { name: "Pharmaceuticals", hs: "3004.90", duty: "0%", vat: "18%", origin: "Various" },
  { name: "Solar panels", hs: "8541.40", duty: "0%", vat: "18%", origin: "Various" },
  { name: "Agricultural machinery", hs: "8432.80", duty: "0%", vat: "18%", origin: "Various" },
  { name: "Books and educational materials", hs: "4901.99", duty: "0%", vat: "0%", origin: "Various" }
];

const tradeSections = [
  {
    id: "procedures",
    icon: "list-checks",
    title: "Trade Procedures",
    shortDesc: "Step-by-step import/export processes",
    description: "Complete guide to trade procedures including documentation requirements, customs clearance steps, and regulatory compliance for importing and exporting goods.",
    content: `
      <div class="procedure-list">
        <div class="procedure-item">
          <div class="procedure-item__number">01</div>
          <div class="procedure-item__content">
            <h3>Pre-Arrival Documentation</h3>
            <p>Prepare all required documents before goods arrive: commercial invoice, packing list, bill of lading, certificate of origin, and any product-specific permits.</p>
          </div>
        </div>
        <div class="procedure-item">
          <div class="procedure-item__number">02</div>
          <div class="procedure-item__content">
            <h3>Declaration Submission</h3>
            <p>Submit import or export declaration through Rwanda e-Single Window (ReSW) portal. Ensure all information matches your supporting documents.</p>
          </div>
        </div>
        <div class="procedure-item">
          <div class="procedure-item__number">03</div>
          <div class="procedure-item__content">
            <h3>Duty Assessment & Payment</h3>
            <p>Customs assesses applicable duties and taxes. Pay through integrated payment systems (bank transfer, mobile money, or at customs offices).</p>
          </div>
        </div>
        <div class="procedure-item">
          <div class="procedure-item__number">04</div>
          <div class="procedure-item__content">
            <h3>Customs Examination</h3>
            <p>Goods may be selected for physical examination based on risk assessment. Green channel goods proceed directly; red channel requires inspection.</p>
          </div>
        </div>
        <div class="procedure-item">
          <div class="procedure-item__number">05</div>
          <div class="procedure-item__content">
            <h3>Clearance & Release</h3>
            <p>Once duties are paid and examination complete (if required), goods are cleared and released for delivery or export.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "forms",
    icon: "file-text",
    title: "Trade Forms",
    shortDesc: "Downloadable forms and templates",
    description: "Access all required forms for import, export, and transit operations. Download, complete, and submit through the e-Single Window portal.",
    content: `
      <div class="forms-grid">
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Import Declaration Form</h3>
          <p>Required for all imports into Rwanda</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Export Declaration Form</h3>
          <p>Required for all exports from Rwanda</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Transit Declaration Form</h3>
          <p>For goods transiting through Rwanda</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Certificate of Origin Application</h3>
          <p>Apply for preferential trade certificates</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Valuation Declaration Form</h3>
          <p>Declare customs value of goods</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
        <div class="form-card">
          <div class="form-card__icon"><i class="lucide" data-lucide="file-down"></i></div>
          <h3>Traveler Declaration Form</h3>
          <p>For personal effects and duty-free items</p>
          <a href="#" class="btn btn--outline btn--sm">Download PDF</a>
        </div>
      </div>
    `
  },
  {
    id: "laws",
    icon: "scale",
    title: "Trade Laws & Regulations",
    shortDesc: "Legal framework for trade",
    description: "Access the legal framework governing trade in Rwanda, including customs laws, EAC regulations, and international trade agreements.",
    content: `
      <div class="laws-list">
        <div class="law-item">
          <div class="law-item__icon"><i class="lucide" data-lucide="book-open"></i></div>
          <div class="law-item__content">
            <h3>Customs and Excise Law</h3>
            <p>Law No. 37/2012 governing customs procedures, duties, and excise taxes in Rwanda.</p>
            <a href="#" class="law-item__link">View Document</a>
          </div>
        </div>
        <div class="law-item">
          <div class="law-item__icon"><i class="lucide" data-lucide="book-open"></i></div>
          <div class="law-item__content">
            <h3>EAC Customs Union Protocol</h3>
            <p>Regional agreement establishing common external tariff and customs procedures for EAC partner states.</p>
            <a href="#" class="law-item__link">View Document</a>
          </div>
        </div>
        <div class="law-item">
          <div class="law-item__icon"><i class="lucide" data-lucide="book-open"></i></div>
          <div class="law-item__content">
            <h3>Rules of Origin Regulations</h3>
            <p>Regulations determining origin of goods for preferential trade under EAC, COMESA, and SADC.</p>
            <a href="#" class="law-item__link">View Document</a>
          </div>
        </div>
        <div class="law-item">
          <div class="law-item__icon"><i class="lucide" data-lucide="book-open"></i></div>
          <div class="law-item__content">
            <h3>Trade Facilitation Agreement</h3>
            <p>WTO agreement on simplifying and modernizing customs procedures.</p>
            <a href="#" class="law-item__link">View Document</a>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "safety",
    icon: "alert-triangle",
    title: "Safety Alerts",
    shortDesc: "Product safety and recall notices",
    description: "Stay informed about product safety alerts, recalls, and restrictions on goods entering or leaving Rwanda.",
    content: `
      <div class="alerts-list">
        <div class="alert-item alert-item--high">
          <div class="alert-item__badge">High Priority</div>
          <div class="alert-item__content">
            <h3>Counterfeit Electronics Alert</h3>
            <p>Increased detection of counterfeit electronic devices. Verify authenticity before import.</p>
            <span class="alert-item__date">October 10, 2026</span>
          </div>
        </div>
        <div class="alert-item alert-item--medium">
          <div class="alert-item__badge">Medium Priority</div>
          <div class="alert-item__content">
            <h3>Food Safety Standards Update</h3>
            <p>New phytosanitary requirements for imported fruits and vegetables effective November 1, 2026.</p>
            <span class="alert-item__date">October 5, 2026</span>
          </div>
        </div>
        <div class="alert-item alert-item--low">
          <div class="alert-item__badge">Low Priority</div>
          <div class="alert-item__content">
            <h3>Textile Labeling Requirements</h3>
            <p>Reminder: All imported textiles must include care labels in English or Kinyarwanda.</p>
            <span class="alert-item__date">September 28, 2026</span>
          </div>
        </div>
      </div>
    `
  }
];
