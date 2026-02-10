# Tutor App UI Design Document

**Created:** 2026-02-10
**Version:** 1.0
**Project:** my-tutor-app

---

## Executive Summary

A multi-tenant tutoring platform for companies with 10+ tutors. The UI prioritizes quick expense entry, class scheduling, and action-item-based dashboards. Pre-paid classes with per-pupil-per-class-type discounts for siblings. Includes inventory tracking for resalable materials (books, etc.).

---

## Business Model Summary

| Aspect | Model |
|--------|-------|
| **Target Users** | Larger tutoring companies (10+ tutors) |
| **Income Model** | Pre-paid classes (upfront payment from parents) |
| **Pricing** | Varies by class type (not one flat rate) |
| **Discounts** | Per-pupil per class type (e.g., sibling discounts) |
| **Expenses** | Quick entry (2-3 clicks) for pupil/site/site-visit tracking |
| **Materials** | Inventory tracking + resale to students (markup) |
| **Data Access** | Role-based: Tutors see own data, Admins see all |

---

## Navigation Architecture

### Primary Navigation
- **Style:** Left sidebar (full-featured app)
- **Audience:** Accessible to OWNER, ADMIN, TUTOR roles
- **Responsive:** Collapsible on mobile/tablet

### Sidebar Menu Structure

#### Dashboard
- **Dashboard** → Action Items & Overview
  - Action Items (unpaid invoices, low inventory, etc.)
  - Monthly financial summary widget
  - Upcoming classes (weekly view)

#### Classes & Scheduling
- **Schedule** → Calendar view of all assigned classes
- **Class Templates** → Manage recurring class definitions (subject, level, location, pricing)
- **Class Sessions** → Individual class instances (date, time, venue)
- **Enrolments** → Student roster per class

#### Students & Contacts
- **Students** → All enrolled students
- **Contacts** → Parents/guardians (parent-of relationships)
- **Groups** → Class lists (cohorts)

#### Financials
- **Invoices** → Generate & track student payments
- **Income Summary** → Revenue by class type, term, student
- **Expenses** → Log and categorize business costs
- **Materials/Products** → Inventory & resale pricing
- **Reports** → Tutor payment summaries (ADMIN only)

#### Settings
- **Account Settings** → Profile, password
- **Accreditations** → Manage staff credentials (ADMIN/OWNER)
- **Pricing Tables** → Define class type pricing (ADMIN/OWNER)
- **Discount Rules** → Sibling/group discount rates (ADMIN/OWNER)

---

## Key Pages & Layouts

### 1. Dashboard / Home
**Primary Purpose:** Action-item focused
**Key Elements:**
- [ ] **Urgent Items Section** (top priority)
  - Unpaid invoices (with quick-pay buttons)
  - Low inventory alerts (< X units)
  - Any missing class scheduling info
- [ ] **This Week's Schedule** (sidebar or card)
  - Classes assigned to current user
  - Shows time, student name, location
- [ ] **Financial Summary Widget**
  - Income this month (vs. target/last month)
  - Total expenses this month
  - Net profit/loss
- [ ] **Role-specific visibility:**
  - Tutor: sees only own classes, own invoice status
  - Admin: sees all tutors' summary, global alerts

---

### 2. Schedule / Calendar
**Primary Purpose:** View & manage class timetable
**Key Elements:**
- [ ] **Calendar View** (week/month toggleable)
  - Color-coded by class type or location
  - Click to edit class details
  - Shows: Time, Student Count, Location, Tutor Name (if Admin)
- [ ] **Quick Actions:**
  - "Add Class Session" button
  - "Mark Complete" / "Mark Cancelled"
- [ ] **Filters:**
  - By class type, location, tutor (Admin)

---

### 3. Class Templates
**Primary Purpose:** Define recurring classes
**Key Elements:**
- [ ] **Table/List View:**
  - Class name, Subject, Level, Location, Day(s) of week, Time
  - Price per session, Capacity
  - Edit/Delete buttons
- [ ] **Create New Template Form:**
  - Subject (dropdown)
  - Level/Year Group (dropdown)
  - Location/Venue (dropdown or text)
  - Day(s) of week (checkboxes: Mon-Sun)
  - Start time, Duration
  - Price per session
  - Capacity (max students)
  - Tutor assignment (dropdown)
  - Term assignment (which terms this runs)

---

### 4. Enrolments / Class Rosters
**Primary Purpose:** Manage student enrollment in classes
**Key Elements:**
- [ ] **Per-Class View:**
  - List of enrolled students
  - Start date, Status (Active/Completed/Dropped)
  - Sibling discount status (if applicable)
  - Total cost, Paid/Unpaid status
- [ ] **Quick Actions:**
  - "Add Student to Class"
  - "Mark Attended" (attendance tracking)
  - "Remove Student" (with reason)
- [ ] **Discount Column:**
  - Shows applied discount % and amount
  - Button to adjust/override

---

### 5. Invoices
**Primary Purpose:** Track student/family payment status
**Key Elements:**
- [ ] **Invoice List:**
  - Parent name, Student(s), Total amount, Due date
  - Status: Pending, Paid, Overdue
  - Sorting/filtering by status, date, amount
- [ ] **Create Invoice Form:**
  - Select student(s) / class(es)
  - System auto-calculates: base price × sessions - discounts
  - Discount pre-populated (if sibling rule applies)
  - Manual adjustment field (for overrides)
  - Due date (default: end of term)
  - Notes/special charges field
  - "Send to Parent" button (email integration)
- [ ] **Invoice Detail View:**
  - Line items (Class A: 4 sessions × £15 = £60)
  - Discount breakdown
  - Total
  - Payment status + date paid
  - Option to mark paid, send reminder

---

### 6. Expenses
**Primary Purpose:** Quick expense entry & tracking
**Key Elements:**
- [ ] **Quick Entry Form** (prioritized—2-3 clicks):
  - Category dropdown: Pupil-level, Site Visit (fuel), Site (room hire), Pupil (materials)
  - Amount (£)
  - Date (default: today)
  - Description (optional)
  - Related to: Student, Class, Location (context-dependent)
  - Submit button → Confirmation toast
- [ ] **Expense List:**
  - Filterable by Category, Date, Related-to (student/site/tutor)
  - Summary totals by category
  - Edit/delete options
- [ ] **Reporting:**
  - "Expenses by Pupil" summary
  - "Expenses by Site" (annual/term view for room hire)
  - "Expenses by Type" (pie chart)

---

### 7. Materials / Products
**Primary Purpose:** Inventory & resale
**Key Elements:**
- [ ] **Inventory List:**
  - Product name, Category (Book, Workbook, etc.)
  - Cost (wholesale), Resale price, Markup %
  - Qty in stock, Qty sold (lifetime)
  - Low stock alert (if < 5 units)
- [ ] **Add/Edit Product:**
  - Product name, Description
  - Category (dropdown)
  - Cost price, Resale price (auto-calc markup %)
  - Supplier info (optional)
  - Reorder level
- [ ] **Log Sale:**
  - Quick button to sell unit(s) to student
  - Auto-creates line item for next invoice
  - Decrements inventory

---

### 8. Income Summary / Reports
**Primary Purpose:** Financial overview
**Key Elements:**
- [ ] **Summary Cards:**
  - Total Income (YTD, this term, this month)
  - Income by class type (table or chart)
  - Income by tutor (if Admin)
  - Comparison to prior period
- [ ] **Detailed Report:**
  - Filterable by date range, class type, tutor
  - Line-by-line invoice breakdown
  - Export to CSV/PDF

---

### 9. Settings
**Primary Purpose:** Configuration & administration

#### General Settings (All users)
- Profile, password change, notification preferences

#### Pricing Tables (ADMIN/OWNER only)
- Define price per session by class type
- Edit existing prices, set future prices (by term)

#### Discount Rules (ADMIN/OWNER only)
- Sibling discount rule (e.g., 2nd child: 10%, 3rd+: 15%)
- Group discounts (e.g., 3-month term package: 5% off)
- Manual discount override permissions

#### Venues/Locations (ADMIN/OWNER only)
- Add/edit teaching locations
- Include: Address, Room details, Capacity
- Cost per term (for expense allocation)

#### Tutor Accreditations (ADMIN/OWNER only)
- View/edit tutor credentials
- Expiry dates, renewal reminders

---

## Data Access & Visibility (Role-Based)

### OWNER
- Full system access
- All tutors' data visible
- Can configure pricing, discounts, venues, permissions

### ADMIN
- All tutor data visible (for reporting/oversight)
- Own dashboard (action items)
- Can manage students, invoices, expenses
- Cannot modify system pricing/discounts without OWNER approval (TBD)

### TUTOR
- Sees only own classes, own students, own invoices, own expenses
- Can enter expenses
- Can track own income
- Cannot see other tutors' data

---

## UI Components & Patterns

### Global Elements
- [ ] **Top Bar**
  - Logo/App name (left)
  - User menu (dropdown: Settings, Logout) (right)
  - Notification badge (optional)
- [ ] **Left Sidebar**
  - Collapsible on mobile (<768px)
  - Active page highlighted
  - Icons + labels (or icons only when collapsed)

### Form Patterns
- [ ] **Standard Forms**
  - Clear labels, required field indicators (*)
  - Inline error messages
  - Submit button (enabled/disabled appropriately)
  - Cancel/Back option
- [ ] **Multi-step Forms** (if needed)
  - Progress indicator
  - Back/Next buttons
  - Summary before final submit

### List/Table Patterns
- [ ] **Data Tables**
  - Sortable columns (header click)
  - Filterable (search + dropdowns)
  - Row actions (Edit, Delete, View)
  - Pagination (if >20 items)
  - Bulk actions (if needed)

### Modal Patterns
- [ ] **Confirmation Dialogs**
  - Clear action (e.g., "Delete Invoice?")
  - Destructive actions shown in red
- [ ] **Quick Action Modals**
  - Minimal form (2-5 fields)
  - Close button on success

### Alert Patterns
- [ ] **Toast Notifications**
  - Success (green): "Invoice sent!", "Expense recorded!"
  - Error (red): "Failed to save"
  - Info (blue): "No invoices to send"
  - Auto-dismiss after 3 seconds

---

## Mobile Responsiveness

| Breakpoint | Layout |
|------------|--------|
| **Mobile** (<768px) | Sidebar collapses to hamburger menu; full-width content |
| **Tablet** (768px–1024px) | Sidebar visible but narrower; 2-column layouts |
| **Desktop** (>1024px) | Full sidebar + main content |

**Mobile Priorities:**
- Quick expense entry form must be touch-friendly
- Calendar must have good tap targets
- Avoid hover-only interactions

---

## Design Tokens (to be refined in Tailwind)

### Colors
- **Primary:** TBD (suggest Tailwind blue)
- **Success:** Green (payment received, saved)
- **Warning:** Amber (overdue, low stock)
- **Error:** Red (failed action, required field)
- **Neutral:** Gray (disabled, secondary text)

### Typography
- **Font Family:** Geist Sans (already integrated)
- **Headings:** Bold, larger font sizes (h1: 2rem, h2: 1.5rem, etc.)
- **Body:** Regular weight, 1rem, 1.5 line-height

### Spacing
- **Gutters:** 1rem (16px) standard
- **Cards:** 1.5rem (24px) padding
- **Sections:** 2rem (32px) gap between major sections

---

## Next Steps

1. **Finalize Design System** (colors, spacing, component library)
2. **Create Component Library** (buttons, forms, tables, modals)
3. **Build Authentication UI** (login/registration pages)
4. **Develop Core Pages** (in priority order):
   - Dashboard
   - Schedule/Calendar
   - Class Templates
   - Enrolments
   - Expenses (quick entry form first)
   - Invoices
   - Materials/Products
5. **Integrate with API Routes** (once backend is ready)
6. **Add Navigation & Layout** (sidebar + top bar)

---

## Open Questions / Future Refinements

- [ ] Should "Expense" quick entry be a floating action button or modal from sidebar?
- [ ] Do we need bulk attendance marking, or per-class only?
- [ ] Should materials be purchased/sold through a separate checkout flow, or just logged on invoices?
- [ ] Should tutors be able to request invoices, or can only Admins/Owners create them?
- [ ] Email notification preferences & templates (send invoice, payment reminder, etc.)?

