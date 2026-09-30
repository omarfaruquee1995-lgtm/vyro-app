# 📖 VYRO — Complete Documentation

**Version:** 4.4.0  
**Last Updated:** September 2026  
**Author:** Omar Faruque  
**Company:** O-FR Pro Software

---

## 📑 Table of Contents

1. [Introduction](#1-introduction)
2. [System Requirements](#2-system-requirements)
3. [Installation & Setup](#3-installation--setup)
4. [Architecture Overview](#4-architecture-overview)
5. [Feature Reference](#5-feature-reference)
6. [User Roles & Permissions](#6-user-roles--permissions)
7. [API Reference](#7-api-reference)
8. [Database Schema](#8-database-schema)
9. [Cloud Sync System](#9-cloud-sync-system)
10. [Backup & Restore](#10-backup--restore)
11. [System Control Panel](#11-system-control-panel)
12. [Troubleshooting](#12-troubleshooting)
13. [FAQ](#13-faq)
14. [Changelog](#14-changelog)
15. [License & Support](#15-license--support)

---

## 1. Introduction

### 1.1 What is VYRO?

VYRO is a **cloud-based shop management system** designed specifically for small and medium-sized businesses in Bangladesh. It provides a complete solution for managing inventory, sales, customers, suppliers, expenses, and reporting — all from a single, lightweight web application.

### 1.2 Key Highlights

- **Single-file architecture** — entire app is one HTML file
- **Offline-first** — works without internet, syncs when online
- **Multi-device support** — same data on phone, tablet, and desktop
- **Cloud backup** — automatic and manual backup to cloud
- **Bengali + English** — full dual-language support
- **No installation required** — runs in any modern browser

### 1.3 Target Users

- Retail shops (grocery, stationery, pharmacy)
- Wholesale distributors
- Service businesses
- Small manufacturers
- Any business needing simple, reliable shop management

---

## 2. System Requirements

### 2.1 Client Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| Browser | Chrome 90+, Edge 90+, Safari 14+ | Latest Chrome |
| Internet | 2G (for sync) | 4G/WiFi |
| Storage | 50 MB browser storage | 200 MB |
| Screen | 320px width | 768px+ |

### 2.2 Optional Hardware

- **Barcode scanner** (USB or Bluetooth)
- **Thermal printer** (58mm/80mm) — for receipts
- **A4 printer** — for invoices

### 2.3 Backend Requirements

- Cloudflare account (free tier sufficient)
- Cloudflare Workers (API hosting)
- Cloudflare D1 (database)
- Cloudflare Pages (frontend hosting)

---

## 3. Installation & Setup

### 3.1 For End Users (No Setup Required)

Simply visit: **https://vyro-app-cyz.pages.dev**

1. Open the URL in any modern browser
2. Enter activation code (first time only)
3. Login with your credentials
4. Start using immediately

### 3.2 For Administrators (New Shop Setup)

#### Step 1: Activation

1. Visit the app URL
2. Copy the **Device ID** shown on activation screen
3. Send Device ID to admin
4. Receive activation code
5. Enter code and click **Activate Now**

#### Step 2: Login

- **Username:** Your assigned username
- **Password:** Your assigned password
- **Shop:** Select your shop from dropdown

#### Step 3: Initial Configuration

1. Go to **Settings ⚙️**
2. Configure:
   - Shop Profile (name, address, phone, logo)
   - Invoice Settings (prefix, color, font, signature)
   - Language (বাংলা / English)
   - System Control (enable/disable features)

### 3.3 For Developers (Local Development)

```bash
# Clone repository
git clone https://github.com/omarfaruquee1995-lgtm/vyro-app.git
cd vyro-app

# No build step — just open
start index.html

# Or serve via simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 4. Architecture Overview

### 4.1 High-Level Architecture

```
┌─────────────────┐
│   Web Browser   │
│   (index.html)  │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Cloudflare      │
│ Pages (CDN)     │
└────────┬────────┘
         │ API calls
         ▼
┌─────────────────┐
│ Cloudflare      │
│ Workers (API)   │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│ Cloudflare D1   │
│ (SQLite DB)     │
└─────────────────┘
```

### 4.2 Frontend

- **Technology:** Pure HTML + vanilla JavaScript
- **Single file:** `index.html` (~10,000 lines)
- **State:** LocalStorage (per-shop, per-device)
- **Charts:** Chart.js 4.4
- **PDF:** jsPDF 2.5 + html2canvas 1.4
- **Barcode:** ZXing 0.20

### 4.3 Backend (Cloudflare Workers)

- **Runtime:** V8 JavaScript (edge)
- **Database binding:** `env2.DB` (D1)
- **Auth:** JWT-like tokens
- **Endpoints:** `/api/*`

### 4.4 Database (Cloudflare D1)

- **Engine:** SQLite
- **Database name:** `vyro-db`
- **Tables:** 13 (see [Database Schema](#8-database-schema))
- **Multi-tenancy:** Row-level `shop_id` filtering

### 4.5 Data Flow

**Read (Load):**
```
User login → API /api/data → D1 SELECT → JSON → LocalStorage → UI render
```

**Write (Save):**
```
User action → LocalStorage update → API /api/save → D1 INSERT/UPDATE → Confirm
```

**Sync (Multi-device):**
```
Device A save → Cloud update → Device B refresh → Cloud fetch → LocalStorage update
```

---

## 5. Feature Reference

### 5.1 Dashboard

**Purpose:** Central hub showing business KPIs at a glance.

**Components:**
- 8 KPI cards (Today's Sales, Profit, Due, Stock Value, etc.)
- Quick Actions grid (12 buttons)
- Sales Overview chart (7-day, 30-day, yearly)
- Smart Alerts (low stock, overdue customers, supplier dues)
- Recent Due Customers table
- Stock Status summary

**Access:** Home button in bottom nav

---

### 5.2 Inventory Management

**Purpose:** Manage product catalog and stock levels.

**Operations:**
| Operation | Access | Cloud Sync |
|---|---|---|
| Add product | ➕ New Product | ✅ |
| Edit product | ✏️ on list | ✅ |
| Delete product | 🗑️ on list | ✅ |
| View history | 📜 on list | — |
| Purchase entry | 📥 on list | ✅ |
| Search | Live filter box | — |
| Barcode scan | 📷 button | — |

**Product fields:**
- Name (required)
- SKU code
- Barcode
- Buy price
- Sell price
- Stock quantity
- Unit (UOM — customizable)
- Low stock alert threshold

**Stock Journal:** Every stock movement logged (purchase, sale, adjustment, return).

---

### 5.3 Sales & Invoicing

**Purpose:** Complete POS-style sales entry and invoice management.

**Sale Workflow:**
1. Search product (first-word matching)
2. Add to cart (or select from dropdown)
3. Select customer (or Cash/Walk-in)
4. Adjust quantities and units
5. Click **Complete Sale**
6. Enter discount, VAT, paid amount
7. Confirm → Invoice generated automatically

**Invoice Features:**
- 6 color themes (blue, green, red, purple, orange, black)
- 5 font options (Arial, Times, Courier, Georgia, Verdana)
- Custom prefix (default: INV)
- Amount in words (English/Bangla)
- Signature section (Prepared by, Authorized)
- Print / Save PDF / Save Image
- WhatsApp share

**Sale Operations:**
| Operation | Cloud Sync |
|---|---|
| Create sale | ✅ |
| Edit invoice | ✅ |
| Delete sale (stock restored) | ✅ |

---

### 5.4 Customer Management

**Purpose:** Track customers, dues, and payment history.

**Operations:**
| Operation | Cloud Sync |
|---|---|
| Add customer | ✅ |
| Edit customer | ✅ |
| Delete customer | ✅ |
| View ledger | — |
| Receive payment | — |
| Attach due voucher | Local only |
| WhatsApp due reminder | — |

**Customer fields:**
- Name (required)
- Phone
- Address
- Attention (contact person)
- Due (auto-calculated)
- Paid (auto-calculated)

---

### 5.5 Supplier Management

**Purpose:** Track suppliers, purchases, and supplier dues.

**Operations:**
- Add / Edit / Delete supplier (cloud sync ✅)
- View supplier ledger
- Record supplier payment
- Purchase entry linked to supplier

---

### 5.6 Expense Tracking

**Purpose:** Record and categorize business expenses.

**Operations:**
- Add expense (description, amount, date) — cloud sync ✅
- Delete expense — cloud sync ✅
- Filter by period (today, month, year)
- Export CSV

---

### 5.7 Purchase Management

**Purpose:** Record purchases from suppliers.

**Operations:**
- Add purchase (product, supplier, qty, price) — cloud sync ✅
- Auto-update stock
- Auto-update supplier due
- Stock journal entry
- Purchase report

---

### 5.8 Quotation System

**Purpose:** Create professional quotations, convert to invoices.

**Features:**
- Auto-numbering: `QTN-YYYYMM-XXXX`
- Multi-item quotations
- Draft auto-save with resume prompt
- Convert to invoice (auto stock deduction)
- Print / PDF / WhatsApp share
- Saved drafts list

**Quotation Statuses:**
- Draft
- Sent
- Accepted
- Rejected
- Expired

---

### 5.9 Sale Returns

**Purpose:** Process customer returns with stock restoration.

**Workflow:**
1. Open invoice OR use Sale Return picker
2. Select items to return
3. Choose refund method (cash, adjust due, credit, exchange)
4. Confirm → Stock restored, due adjusted
5. Return invoice generated

**Return Reports:**
- Filter by date range
- Search by customer
- Export CSV

---

### 5.10 Delivery Challan

**Purpose:** Auto-generate delivery challans for each sale.

**Features:**
- Auto-created when sale finalized
- Challan number: `DC-YYYYMM-XXXX`
- Delivery details (person, vehicle, location, cost)
- Status tracking (Pending / Delivered / Cancelled)
- Print / PDF / WhatsApp
- Challan register with filters

---

### 5.11 Reports

**Reports available:**
- Sales report (today/month/year)
- Purchase report
- Expense report
- Profit summary
- Stock movement chart
- Return goods report
- Challan register
- Historical record search

**Historical Search:**
- By date
- By month
- By year
- By date range
- All records

---

### 5.12 Settings

**Sections:**
1. **Shop Profile** — name, logo, address, phone
2. **Appearance** — invoice color, font
3. **Invoice Settings** — prefix, signature, amount in words
4. **Sales Settings** — generate invoice, edit invoice, history search
5. **Security** — change password
6. **Data** — backup & restore
7. **System Control** — 30+ feature toggles
8. **Hide System** — hide UI elements
9. **UOM Master** — custom unit list
10. **Auto Backup** — Google Drive settings

---

## 6. User Roles & Permissions

### 6.1 Roles

| Role | Description |
|---|---|
| **Admin** | Full access to everything |
| **Manager** | All except user/shop management |
| **Cashier** | Sales, basic customer ops |
| **Staff** | View-only + limited operations |

### 6.2 Permission Matrix

| Feature | Admin | Manager | Cashier | Staff |
|---|---|---|---|---|
| Make sale | ✅ | ✅ | ✅ | ✅ |
| Edit sale | ✅ | ✅ | ✅ | ❌ |
| Delete sale | ✅ | ✅ | ❌ | ❌ |
| Manage products | ✅ | ✅ | ❌ | ❌ |
| Manage customers | ✅ | ✅ | ✅ | ❌ |
| Manage suppliers | ✅ | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | Limited | ❌ |
| Settings access | ✅ | Limited | ❌ | ❌ |
| User management | ✅ | ❌ | ❌ | ❌ |
| Shop management | ✅ | ❌ | ❌ | ❌ |

---

## 7. API Reference

### 7.1 Base URL

```
https://vyro-api.omarfaruquee1995.workers.dev
```

### 7.2 Authentication

All endpoints (except `/api/login` and `/api/register`) require:

```
Authorization: Bearer <token>
```

### 7.3 Endpoints

#### `POST /api/login`

**Request:**
```json
{
  "username": "admin",
  "password": "Faruque@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": 1, "name": "Admin", "role": "admin" },
  "shop": { "id": 3, "name": "Omar Enterprise" }
}
```

---

#### `GET /api/data`

**Response:** All shop data in one JSON.

```json
{
  "products": [...],
  "sales": [...],
  "customers": [...],
  "suppliers": [...],
  "purchases": [...],
  "expenses": [...],
  "payments": [...],
  "supplierPayments": [...],
  "stockJournal": [...],
  "returns": [...],
  "challans": [...],
  "quotations": [...]
}
```

---

#### `POST /api/save`

**Purpose:** Save or delete any entity.

**Create/Update:**
```json
{
  "products": [{ "id": 123, "name": "Rice", "stock": 50 }],
  "sales": [{ "id": 456, "total": 1000 }]
}
```

**Delete:**
```json
{
  "deleteProducts": [123],
  "deleteSales": [456],
  "deleteCustomers": [789],
  "deleteSuppliers": [101],
  "deleteExpenses": [202]
}
```

**Response:**
```json
{
  "success": true,
  "saved": 2,
  "deleted": 5,
  "errors": []
}
```

---

#### `GET /api/subscription`

**Response:**
```json
{
  "plan": "trial",
  "is_active": true,
  "expires_at": "2026-10-15T00:00:00Z",
  "days_left": 14
}
```

---

#### `POST /api/register`

**Purpose:** Create new shop account (14-day trial).

```json
{
  "shop_name": "My Shop",
  "owner_name": "John Doe",
  "phone": "01712345678",
  "username": "admin",
  "password": "secret123"
}
```

---

#### `POST /api/logout`

Invalidates current session token.

---

## 8. Database Schema

### 8.1 Tables Overview

| Table | Purpose |
|---|---|
| `shops` | Shop/tenant records |
| `users` | User accounts |
| `products` | Product catalog |
| `sales` | Sales transactions |
| `sale_items` | Line items per sale |
| `customers` | Customer records |
| `suppliers` | Supplier records |
| `purchases` | Purchase transactions |
| `expenses` | Business expenses |
| `payments` | Customer payments |
| `supplier_payments` | Supplier payments |
| `stock_journal` | Stock movement log |
| `subscriptions` | Subscription status |

### 8.2 Common Columns

Every table has:
- `id` (INTEGER PRIMARY KEY)
- `shop_id` (INTEGER, foreign key)
- `created_at` (DATETIME)

### 8.3 Example: `products` Table

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sku TEXT,
  barcode TEXT,
  buy_price REAL DEFAULT 0,
  sell_price REAL DEFAULT 0,
  stock REAL DEFAULT 0,
  unit TEXT DEFAULT 'pcs',
  low_alert REAL DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 8.4 Example: `sales` Table

```sql
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop_id INTEGER NOT NULL,
  customer_id INTEGER,
  customer_name TEXT,
  customer_address TEXT,
  customer_attention TEXT,
  items_json TEXT,
  subtotal REAL,
  discount REAL,
  vat_pct REAL,
  vat_amount REAL,
  total REAL,
  paid REAL,
  due REAL,
  profit REAL,
  date TEXT,
  time TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 9. Cloud Sync System

### 9.1 How Sync Works

VYRO uses a **local-first** sync architecture:

1. **All operations happen locally first** (LocalStorage)
2. **Immediately after**, data pushed to cloud (fire-and-forget)
3. **On login or refresh**, data pulled from cloud
4. **Conflicts:** Cloud wins (last-write-wins)

### 9.2 Sync Flow Diagram

```
User action (e.g., delete sale)
         │
         ▼
Update LocalStorage
         │
         ▼
Update UI (immediate)
         │
         ▼
POST /api/save (async)
         │
         ▼
Cloudflare Worker → D1
         │
         ▼
Console: ✅ Synced
```

### 9.3 What Syncs to Cloud

| Entity | Create | Edit | Delete |
|---|---|---|---|
| Products | ✅ | ✅ | ✅ |
| Sales | ✅ | ✅ | ✅ |
| Customers | ✅ | ✅ | ✅ |
| Suppliers | ✅ | ✅ | ✅ |
| Expenses | ✅ | — | ✅ |
| Purchases | ✅ | — | ✅ |
| Payments | ✅ | — | ✅ |
| Supplier Payments | ✅ | — | ✅ |
| Stock Journal | ✅ | — | — |
| Returns | Local | — | Local |
| Challans | Local | Local | Local |
| Quotations | Local | Local | Local |

### 9.4 Multi-Device Setup

**Requirement:** Same shop, same login credentials.

**On Device A:**
1. Login
2. Add/edit/delete data
3. Changes auto-sync to cloud

**On Device B:**
1. Open app (must be logged in as same shop)
2. Pull-to-refresh or reload page
3. Data fetches from cloud
4. UI updates with latest data

**Note:** VYRO uses **manual refresh** (not real-time WebSocket). Data appears on other devices after refresh.

---

## 10. Backup & Restore

### 10.1 Backup Methods

#### Method 1: JSON Backup (Full Restore)

**How:**
1. Settings ⚙️ → Backup & Restore
2. Click **📥 Download Backup**
3. JSON file downloads

**Use case:** Complete restore, migration, archives.

---

#### Method 2: Excel / CSV Backup

**Options:**
- Summary only (single sheet)
- Full Excel (multi-sheet: Products, Sales, Customers, etc.)
- Sales CSV
- Products CSV

**Use case:** Data analysis, accounting software import.

---

#### Method 3: Invoice PDF Batch

**How:**
1. Settings → Backup & Restore
2. Click **🧾 Invoice PDF**
3. Choose count (e.g., last 10, 50)
4. Batch PDF downloads

**Use case:** Send invoices to accountant, archive.

---

#### Method 4: Google Drive Auto Upload

**Setup:**
1. Create Google Apps Script (see guide in-app)
2. Deploy as Web App
3. Copy URL to VYRO settings

**Then:**
- Click **☁️ Upload to Google Drive** anytime
- Or auto-triggered every 24 hours
- Files stored in "VYRO Backups" folder

---

#### Method 5: Local Auto Backup

**Automatic:**
- Triggers every 7 days OR every 50 changes
- Stores last 10 snapshots in LocalStorage
- Access via: Settings → Auto Backup → History

---

### 10.2 Restore Procedure

1. Settings ⚙️ → Backup & Restore
2. Click **📤 Restore from Backup**
3. Select JSON file
4. Confirm (current data will be replaced)
5. Page reloads with restored data

⚠️ **Warning:** Restore replaces ALL current data. Take a backup first!

---

## 11. System Control Panel

### 11.1 Feature Toggles (30+)

Access: Settings ⚙️ → **🎛️ System Control Center**

Available toggles:
- Backup & Restore
- Google Drive Backup
- Auto Backup Reminder
- UOM System
- UOM Master Edit
- Product Add / Edit / Delete
- Sell / POS
- Quotation
- Stock Management
- Stock Journal
- Purchase Entry
- Supplier
- Customer
- Expense
- Profit
- Reports
- Invoice Generate
- Invoice Edit
- Auto Delivery Challan
- Challan Print
- Sale Return
- Return Goods Report
- Historical Record
- Language Switch
- Search Bar
- WhatsApp Share
- Barcode Scanner
- Dark Mode

**Use case:** Customize the app for different users — disable features not needed.

---

### 11.2 Hide System

Access: Settings ⚙️ → **👁️ Hide System**

Hide any UI element:
- Dashboard menu
- Stock menu
- Party menu
- Sales menu
- Reports menu
- Quotation button
- Backup button
- Settings button
- Notifications

**Note:** Hiding does NOT delete data — just hides from UI.

---

### 11.3 UOM Master

Access: Settings ⚙️ → **📏 UOM Master**

Default UOMs:
`pcs, pkt, rft, sft, set, coil, kg, grm, lbs, box, dzn, gross, bundle, inch, cm, mtr`

Add custom units, remove unwanted ones. Applied everywhere (products, quotations, sales, purchases).

---

## 12. Troubleshooting

### 12.1 Login Issues

**Problem:** "Wrong username or password"

**Solutions:**
- Verify username/password case-sensitivity
- Check if Caps Lock is on
- Try cloud login vs local login
- Contact admin to reset password

---

**Problem:** Activation screen keeps appearing

**Solutions:**
- Clear browser cache
- Check if LocalStorage is enabled
- Re-enter activation code
- Device ID may have changed (reports to admin)

---

### 12.2 Sync Issues

**Problem:** Changes not showing on other device

**Solutions:**
1. Pull-to-refresh or Ctrl+Shift+R on other device
2. Check internet connection
3. Verify logged in as same shop
4. Check browser console for sync errors
5. Logout and login again

---

**Problem:** "Sale delete sync failed" in console

**Solutions:**
- Verify API is up: `https://vyro-api.omarfaruquee1995.workers.dev`
- Check if token expired (login again)
- Check console for exact error message
- Report error to developer

---

### 12.3 Data Issues

**Problem:** Data disappeared

**Solutions:**
- Restore from backup (Settings → Backup)
- Check LocalStorage quota (may be full)
- Don't clear browser data without backup

---

**Problem:** Storage full error

**Solutions:**
- Export backup immediately
- Delete old attachments (due vouchers)
- Clear old auto-backup history
- Delete unused products/customers

---

### 12.4 Print/PDF Issues

**Problem:** PDF not generating

**Solutions:**
- Wait 2-3 seconds for libraries to load
- Check internet (jsPDF, html2canvas load from CDN)
- Use Chrome browser (best compatibility)
- Try print option instead

---

**Problem:** Invoice printing cut off

**Solutions:**
- Set printer to A4 paper
- Adjust margins (10mm recommended)
- Use "Fit to page" option

---

### 12.5 Performance Issues

**Problem:** App slow with many records

**Solutions:**
- Close unused browser tabs
- Clear old auto-backup history
- Export old sales to backup, then delete
- Use Chrome/Edge (best performance)

---

## 13. FAQ

**Q: Can I use VYRO offline?**  
A: Yes! All operations work offline. Data syncs to cloud when internet is available.

**Q: How many devices can I use?**  
A: Unlimited devices with same login credentials. All sync to same shop.

**Q: Is my data safe?**  
A: Data is stored locally + cloud (Cloudflare D1, encrypted in transit). Regular backups recommended.

**Q: Can I export my data?**  
A: Yes! Multiple formats — JSON, Excel, CSV, PDF.

**Q: What happens if I forget my password?**  
A: Contact your admin. If you're the admin, use the password reset function in Settings → Security.

**Q: Can I have multiple shops?**  
A: Yes. Each shop has separate data. Switch via user menu.

**Q: Does VYRO work on mobile?**  
A: Yes! Optimized for all screen sizes. Install as PWA for best experience.

**Q: Is there a subscription fee?**  
A: VYRO offers a 14-day free trial. Contact for pricing after trial.

**Q: Can I print thermal receipts?**  
A: Yes, with compatible thermal printers. Set as default printer.

**Q: Can I customize the invoice?**  
A: Yes — colors, fonts, prefix, signature, amount-in-words language.

**Q: Does it support barcode scanning?**  
A: Yes — use device camera or USB/Bluetooth scanner.

**Q: How do I add a new user?**  
A: Admin only. Settings → User Management → Add User.

**Q: Is there a mobile app?**  
A: VYRO is a PWA — install via browser menu ("Add to Home Screen").

---

## 14. Changelog

### v4.4.0 (September 2026)

**New Features:**
- ✅ Sale Delete Cloud Sync
- ✅ Sale Return Module (with stock restoration)
- ✅ Auto Delivery Challan (with register)
- ✅ Stock Journal Detail View
- ✅ System Control Center (30+ toggles)
- ✅ Hide System
- ✅ UOM Master (custom units)
- ✅ Full Bengali/English translation
- ✅ Google Drive auto-backup
- ✅ Multi-sheet Excel export
- ✅ Invoice PDF batch export

**Improvements:**
- Enhanced product search (first-word matching)
- Improved inventory search (no focus loss)
- Better quotation stock picker
- Historical record search fixes

---

### v4.3.0 (Earlier)

**Features:**
- Multi-device cloud sync
- Cloud authentication
- Customer/Supplier/Product/Expense/Purchase CRUD sync

---

### v4.2.0

**Initial release:**
- Basic shop management
- Local storage only
- Single device

---

## 15. License & Support

### 15.1 License

**Proprietary Software**  
© 2026 **O-FR Pro Software** · All rights reserved.

**Owner:** Omar Faruque  
**Contact:** omarfaruquee1995@gmail.com  
**Phone:** 01911332244

**Restrictions:**
- Cannot resell without permission
- Cannot reverse-engineer for commercial use
- Cannot remove branding without license

---

### 15.2 Support Channels

| Channel | Details |
|---|---|
| 📧 Email | omarfaruquee1995@gmail.com |
| 📱 Phone | 01911332244 |
| 💬 WhatsApp | 01911332244 |
| 🌐 Live App | https://vyro-app-cyz.pages.dev |
| 📚 GitHub | https://github.com/omarfaruquee1995-lgtm/vyro-app |

### 15.3 Reporting Bugs

When reporting bugs, please include:
1. What you were doing
2. What you expected
3. What actually happened
4. Screenshot (if possible)
5. Browser console log (F12 → Console)

---

## Appendix A: Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + F` | Search in page |
| `F12` | Open developer console |
| `Ctrl + Shift + R` | Hard refresh |
| `Ctrl + P` | Print invoice |

---

## Appendix B: Browser Support

| Browser | Version | Support |
|---|---|---|
| Chrome | 90+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Opera | 76+ | ✅ Full |

---

## Appendix C: Glossary

| Term | Meaning |
|---|---|
| **UOM** | Unit of Measure (pcs, kg, box) |
| **SKU** | Stock Keeping Unit (product code) |
| **POS** | Point of Sale |
| **PWA** | Progressive Web App |
| **D1** | Cloudflare's SQLite database |
| **Worker** | Cloudflare's edge function |
| **JSON** | Data format for backup |
| **CSV** | Comma-separated values (Excel) |
| **VAT** | Value Added Tax |
| **Challan** | Delivery note / packing slip |

---

**End of Documentation**

*For updates, visit the GitHub repository.*  
*Last reviewed: September 2026*