# 🏪 VYRO — Shop Management System

**Version 4.4.0** · Powered by **O-FR Pro Software**

A lightweight, cloud-based shop management solution built for small & medium businesses in Bangladesh.

[🇧🇩 বাংলায় পড়ুন](#-বাংলা-সংস্করণ) · [📖 Full Documentation](DOCUMENTATION.md) · [👤 User Guide](USER-GUIDE.md)

---

## ✨ Features at a Glance

### 📦 Inventory Management
- Product CRUD with SKU, barcode, unit (UOM) support
- Real-time stock tracking
- Low-stock alerts
- Stock journal (every movement logged)
- Barcode scanner integration

### 🧾 Sales & Invoicing
- Quick POS-style sale entry
- Product search (first-word matching)
- Cart with multi-unit support
- Discount, VAT, amount-in-words (English + Bangla)
- 6 invoice color themes, 5 font options
- Print, PDF, image, WhatsApp sharing
- Sale edit & delete with stock reversal

### 👥 Customer & Party Management
- Full customer CRUD
- Due tracking per customer
- Payment receipts
- Due voucher attachments (images)
- WhatsApp reminders

### 🚚 Supplier Management
- Supplier CRUD
- Purchase entry (with supplier linking)
- Supplier ledger
- Payment tracking
- Due management

### 💸 Expense Tracking
- Add/delete expenses
- Category-wise reports
- Monthly/yearly breakdown

### 📋 Quotation System
- Multi-item quotations
- Auto-numbering (QTN-YYYYMM-XXXX)
- Convert quotation → invoice (auto stock deduction)
- Draft auto-save with resume option
- Print/PDF/WhatsApp share

### 🔄 Sale Returns
- Return selected items from any invoice
- Auto stock restoration
- Customer due adjustment
- Return invoice printing
- Return goods report

### 🚚 Delivery Challan
- Auto-generated after each sale
- Print/PDF/WhatsApp
- Delivery tracking (person, vehicle, location)
- Challan register with status filter

### 📊 Reports & Analytics
- Dashboard with 8 KPI cards
- Sales/Purchase/Profit charts (7-day, 30-day, yearly)
- Historical record search (date/month/year/range)
- CSV export
- Stock movement chart

### 💾 Backup & Data Safety
- JSON backup (full restore)
- Excel/CSV export (multi-sheet)
- Invoice PDF batch export
- Auto-backup (every 7 days or 50 changes)
- Google Drive auto-upload integration
- Local auto-backup history (last 10 snapshots)

### ☁️ Cloud Features
- Cloud authentication (Cloudflare Workers + D1)
- Multi-device sync
- Shop profile (name, logo, address, phone)
- User management (Admin/Manager/Cashier/Staff roles)
- Per-shop data isolation

### 🎛️ System Control
- 30+ feature toggles (ON/OFF per feature)
- Hide System (hide any UI element)
- UOM Master (custom unit list)
- Language switch (বাংলা ⇄ English)
- Dark mode
- Invoice customization (color, font, prefix, signature)

### 🔐 Security & Activation
- Device fingerprint activation
- Expiry-based activation codes (7/30/90/365 days)
- Password change
- Session management
- Shop-based user isolation

---

## 🚀 Quick Start

### For Users
1. Visit **https://vyro-app-cyz.pages.dev**
2. Login with your credentials
3. Start adding products, customers, and making sales

📖 **Full user guide:** [USER-GUIDE.md](USER-GUIDE.md)

### For Developers
```bash
# Clone the repository
git clone https://github.com/omarfaruquee1995-lgtm/vyro-app.git
cd vyro-app

# Open in browser (no build step)
start index.html

---

## 📁 Project Structure
vyro-app/
├── index.html # Main app (single-file)
├── manifest.json # PWA manifest
├── sw.js # Service worker
├── vyro-logo.png # App icon
├── DOCUMENTATION.md # Full technical docs
├── USER-GUIDE.md # End-user guide (বাংলা)
├── README.md # This file
└── docs/
└── help.html # In-app help page

---

## 🌐 Live URLs

| Service | URL |
|---|---|
| **Live App** | https://vyro-app-cyz.pages.dev |
| **API** | https://vyro-api.omarfaruquee1995.workers.dev |
| **GitHub** | https://github.com/omarfaruquee1995-lgtm/vyro-app |
| **Database** | Cloudflare D1 — `vyro-db` |

---

## 📄 License

Proprietary — © 2026 **O-FR Pro Software** · All rights reserved.

**Owner:** MD: OMAR FARUQUE

---

## 🤝 Support

For support, bug reports, or feature requests:
- 👤 **Owner:** MD: OMAR FARUQUE
- 📧 **Email:** omarfaruquee1995@gmail.com
- 📱 **Phone:** 01314012879

---

## 🇧🇩 বাংলা সংস্করণ

### 🏪 VYRO — দোকান ম্যানেজমেন্ট সিস্টেম

**সংস্করণ ৪.৪.০** · **O-FR Pro Software** দ্বারা পরিচালিত

বাংলাদেশের ছোট ও মাঝারি ব্যবসার জন্য তৈরি একটি সহজ, ক্লাউড-ভিত্তিক দোকান ম্যানেজমেন্ট সলিউশন।

### 📞 সহায়তা

- 👤 **Owner:** MD: OMAR FARUQUE
- 📧 **Email:** omarfaruquee1995@gmail.com
- 📱 **Phone:** 01314012879

---

**Powered by O-FR Pro Software** · Made with ❤️ in Bangladesh