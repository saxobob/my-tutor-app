# Students UI Design

## Overview
The Students page is the primary interface for managing student records and enrollments. It provides a comprehensive view of all students (or a tutor's students), their contact details, medical/allergy information, and class enrollments. Users can quickly manage student information and enroll students in classes from this view.

## Design Principles

### 1. **Role-Based Context**
- **Managers**: See all students in the business
- **Tutors**: See only students enrolled in their classes
- **Rationale**: Users get relevant information without unnecessary clutter, while managers retain full visibility

### 2. **Minimal but Complete Information**
- Display essential student info at a glance: name, age/year group, allergies, payment/book status
- Inline class enrollments showing all classes student is enrolled in
- Avoid excessive detail in list view (details available on dedicated page)
- **Rationale**: Table stays scannable while providing context about student status

### 3. **Actionable Design**
- Students page focuses on viewing and managing enrollments
- Dedicated page for creating new students (separate from list)
- Quick removal of students from classes (unenroll action)
- **Rationale**: Different workflows separated, but accessible from one place

### 4. **Smart Filtering & Search**
- Search by student name (real-time)
- Filter by class (show students in a specific class)
- Filter by status (active/inactive)
- Combines to help find specific students or manage class rosters
- **Rationale**: Useful for both student lookup and class roster management

### 5. **Information Hierarchy**
- **Primary**: Student name (left-aligned for easy scanning)
- **Secondary**: Year group, contact summary, medical alerts (quick visual scan)
- **Tertiary**: Classes, payment/book status (supporting details)
- **Actions**: Remove from class (on hover or visible for important actions)
- **Rationale**: Users see most important info first without scrolling

## Section Breakdown

### Filter & Search Controls (Section 1)
**Purpose**: Navigate and filter student list
- **Search Input**: Real-time search across student names
- **Filter by Class**: Dropdown to select a specific class (shows only students in that class)
- **Filter by Status**: Toggle between Active/All/Inactive students
- **Results Count**: Shows how many students match criteria
- **Clear Filters**: Button to reset all filters
- **Layout**: Horizontal controls, full width below page title
- **Used by**: All users to find specific students or manage class rosters

### New Student Button/Link
**Purpose**: Quick access to create a new student
- **Location**: Top right of filters area, or as a dedicated action button
- **Label**: "Create New Student" or "Add Student"
- **Behavior**: Navigates to dedicated New Student page/section
- **Styling**: Blue primary action button
- **Used by**: Managers and tutors adding new students

### Student Table (Section 2)
**Purpose**: Display filterable student list with enrollment and status info
- **Layout**: Full-width table, responsive with horizontal scroll on mobile
- **Header**: Sticky header that stays visible when scrolling
- **Rows**: One row per student
- **Pagination**: Show 25-50 students per page (optional, can use infinite scroll)

## Table Column Breakdown

### 1. **Student Name** (Required)
- **Width**: ~15-20% of table
- **Content**: Full name (First + Last)
- **Styling**: Bold, left-aligned, larger font
- **Behavior**: Clickable to view/edit full student details
- **Rationale**: Primary identifier, should be prominent and scannable

### 2. **Year Group / Age** (Required)
- **Width**: ~10%
- **Content**: "Year 5" or "12 years old" (display format per your preference)
- **Styling**: Medium gray text, center-aligned
- **Rationale**: Quick reference for class grouping and age context

### 3. **Allergies / Medical** (Required)
- **Width**: ~15%
- **Content**:
  - Text summary: "Peanut allergy" or "Asthma"
  - If multiple: "Peanut allergy, Asthma, Nut-free lunch"
  - If none: "None"
  - Color badge if critical: Red badge for severe allergies
- **Styling**:
  - Normal text gray-600
  - Red/orange text for allergies: "text-red-600 font-semibold"
  - "None" in gray-400 (de-emphasized)
- **Behavior**: Tooltip on hover to see full details if truncated
- **Rationale**: Critical safety information should be immediately visible

### 4. **Phone** (Optional, conditionally shown)
- **Width**: ~12%
- **Content**: Primary contact phone number
- **Styling**: Gray-600, smaller text
- **Behavior**: Clickable to call (if on mobile) or copy to clipboard
- **Rationale**: Quick access to parent/student contact

### 5. **Has Book?** (Required)
- **Width**: ~8%
- **Content**:
  - ✅ (Yes/Has)
  - ❌ (No/Missing)
  - Gray dash (Unknown/N/A)
- **Styling**: Icon-only, center-aligned
- **Color**: Green for ✅, Red for ❌, Gray for unknown
- **Rationale**: Quick visual indicator of student readiness for class

### 6. **Paid?** (Required)
- **Width**: ~8%
- **Content**:
  - ✅ (Paid up to date)
  - ⚠️ (Overdue/Partial)
  - ❌ (Unpaid)
  - Gray dash (N/A)
- **Styling**: Icon-only, center-aligned
- **Color**: Green (✅), Orange (⚠️), Red (❌), Gray (unknown)
- **Behavior**: Hover shows payment status detail ("Paid until Feb 28")
- **Rationale**: Payment status at a glance, important for business operations

### 7. **Classes** (Required)
- **Width**: ~25-30% (flexible)
- **Content**: All enrolled classes shown inline
- **Format**: Pills/badges, comma-separated, or small list
  - Example: "French Beginners, Piano Advanced, Spanish 101"
- **Styling**:
  - Light blue background (bg-blue-50)
  - Blue text (text-blue-600)
  - Border-radius, padding for badge appearance
  - Scrollable if many classes
- **Behavior**:
  - Click class pill to navigate to class details
  - Hover shows class info (time, instructor, location)
- **If no classes**: "No classes" in gray-400
- **Rationale**: Shows student's enrollment at a glance, context-rich

### 8. **Actions** (Required)
- **Width**: ~8% (icon-only or text)
- **Content**:
  - Remove from class (dropdown/menu)
  - View/Edit student (if clickable row not used)
- **Styling**: Icon buttons or text buttons, visible or on hover
- **Behavior**:
  - Hover reveals action buttons
  - "Remove from class" shows dropdown of enrolled classes to select which to remove
- **Used by**: Managers and tutors removing students from classes

## Student Row Example

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Name          │ Yr | Allergies/Medical        │ Tel    │ Book? │ Paid? │ Classes         │ Actions
├─────────────────────────────────────────────────────────────────────────────┤
│ Emma Johnson  │ Y5 │ Peanut allergy (severe)  │ 07123  │   ❌   │   ✅   │ French Beginner │ ⋯
│ Liam Smith    │ Y7 │ Asthma                   │ 07456  │   ✅   │   ⚠️   │ Math A, Piano   │ ⋯
│ Sophia Brown  │ Y4 │ None                     │ 07789  │   ✅   │   ✅   │ Spanish 101     │ ⋯
│ Oliver Davis  │ Y6 │ Nut-free lunch required  │        │   —    │   —    │ No classes      │ ⋯
└─────────────────────────────────────────────────────────────────────────────┘
```

## Create New Student Section

### Location
- **Option 1**: Dedicated route `/students/new`
- **Option 2**: Modal accessible from students list
- **Option 3**: Collapsible section above student list

### Form Fields (Capture)
1. **Name** (Required)
   - Text input, full name or split first/last
2. **Year Group / Age** (Required)
   - Dropdown or input (e.g., "Year 5" or birth date)
3. **Parent/Guardian Name** (Required)
   - Text input
4. **Parent Phone** (Required)
   - Phone input
5. **Parent Email** (Required)
   - Email input
6. **Student Phone** (Optional)
   - Phone input for older students
7. **Address** (Optional)
   - Text area or multi-line
8. **Allergies / Medical Info** (Optional)
   - Text area for details
   - Checkboxes for common allergies (optional)
   - **Include**: "Severe" toggle for critical allergies
9. **Has Book?** (Optional)
   - Checkbox or toggle
10. **Paid/Payment Info** (Optional)
    - Optional here, managed separately in Invoices page
11. **Enroll in Classes** (Optional on create)
    - Multi-select dropdown or checkboxes
    - Can enroll after creation as well

### Form Layout
- Simple vertical layout (one column on mobile, two columns on desktop)
- Clear section headers (Contact Info, Medical Info, Enrollment)
- Cancel and Save buttons at bottom

### Behavior
- **After Save**:
  - Option A: Return to students list, show confirmation toast
  - Option B: Go to student detail page to add more info/enroll in classes

## Filtering & Search Strategy

### Search Logic
- **Case-insensitive**: "emma" matches "Emma Johnson"
- **Partial match**: "john" matches "Emma Johnson"
- **Real-time**: Updates results as user types
- **Scope**: Searches student names only

### Filter Options
- **By Class**: Dropdown showing all classes, select one to see students enrolled in that class
- **By Status**:
  - All (default)
  - Active (students enrolled in at least one current/upcoming class)
  - Inactive (students with no current/upcoming class enrollments)
- **By Year Group** (Nice to have future enhancement)
- **By Medical Flag** (Nice to have: show only students with allergies)

### Filter Logic
- **AND logic**: Search name AND filter class AND filter status
- **Clear filters**: Button to reset all filters in one click
- **Persistent**: Filters persist during session (optional: save in localStorage)

## Enrollment Management

### Adding a Student to a Class
**From Student List:**
1. Find student in table
2. Click on class area or "+ Add Class" button
3. Modal opens showing available classes
4. Select class(es) to enroll in
5. Click confirm, student added

**From Class List:**
- Separate workflow (not detailed in this doc, but mentioned for flexibility)

### Removing a Student from a Class
**From Student List:**
1. Hover student row or click actions menu
2. "Remove from Class" option appears
3. Shows dropdown of enrolled classes
4. Select class to remove from
5. Confirm, student unenrolled
6. Table updates (row may disappear if filter is by that class)

## Color & Typography

### Status Colors (Allergies & Medical)
- **Severe allergy**: Red (text-red-600, bg-red-50)
- **Non-severe allergy**: Orange (text-orange-600)
- **No allergy**: Gray (text-gray-400)

### Payment Status Colors
- **Paid**: Green (bg-green-100, text-green-800)
- **Overdue**: Orange/Yellow (bg-yellow-100, text-yellow-800)
- **Unpaid**: Red (bg-red-100, text-red-800)

### Book Status Colors
- **Has**: Green (✅ green-600)
- **Missing**: Red (❌ red-600)
- **Unknown**: Gray (— gray-400)

### Typography
- **Page title**: text-2xl font-bold
- **Table headers**: text-xs font-semibold, uppercase, gray-700
- **Student name**: text-sm font-semibold
- **Details**: text-xs gray-600
- **Status badges**: text-xs font-medium

## Responsive Behavior

### Desktop (lg breakpoint and above)
- Full table with all columns visible
- Sticky header, sortable columns (optional)
- 25-50 students per page
- Smooth horizontal scrolling if needed

### Tablet (md breakpoint)
- Table may reflow some columns
- Might hide less critical columns (e.g., phone)
- Or switch to card view
- 15-25 students per page

### Mobile (< md breakpoint)
- **Option A**: Simplified card view instead of table
- **Option B**: Scrollable table with essential columns (Name, Year, Classes)
- Hide non-critical columns (Phone, Book status)
- Stack actions below or in dropdown
- Filter controls collapse to icon buttons

## Differences from Other Pages

| Feature | Dashboard | Classes | Schedule | Students |
|---------|-----------|---------|----------|----------|
| **Purpose** | Daily ops hub | Inventory mgmt | Schedule view | Student mgmt |
| **Primary View** | Cards + table | Grid with filter | Agenda + week grid | Table |
| **Primary Action** | Mark attendance | Create/Edit | View schedule | View/Enroll |
| **Search** | None | Name + instructor | By date | Name, by class |
| **Filtering** | None | Status | Date range | Class, status |
| **Data Focus** | Time-based | Class details | Time slots | Student info |

## Student Detail / Edit Page

### Purpose
Show full student profile and manage details/enrollments
- View all student info
- Edit student details
- Manage class enrollments
- (Optional) Manage parent contact info
- (Optional) View payment history

### Layout (Suggested)
- **Header**: Student name, year group, photo (if available)
- **Sections**:
  1. Contact Information (name, phone, address)
  2. Parent/Guardian Info
  3. Medical & Allergies (with severity indicators)
  4. Class Enrollments (list with options to remove)
  5. Payment History (if applicable)
  6. Notes / Additional Info

### Actions
- Edit button (or inline editing)
- Delete student
- Manage enrollments (add/remove classes)

## Future Enhancements

1. **Student Photos**: Display avatar/photo in table or detail view
2. **Attendance Tracking**: View student attendance in classes
3. **Progress Tracking**: Notes on student progress, level progression
4. **Document Upload**: Store consent forms, emergency info, etc.
5. **Parent Portal**: Separate view for parents to see their child's schedule and progress
6. **Bulk Operations**: Select multiple students, enroll in same class
7. **Export**: Export student list to CSV
8. **Student Profiles**: More detailed profiles with assessments and feedback
9. **Auto-inactive**: Mark students as inactive if no classes upcoming
10. **Medical Alerts**: Dashboard alerts for students with critical allergies in upcoming classes

## Accessibility Considerations

- Color alone not used to communicate status (icons + text)
- High contrast for all status indicators
- Table header has proper semantic structure
- Keyboard navigation: Tab through rows, Enter to expand details
- Adequate button/touch target sizes (44px minimum)
- Clear labels for filter controls
- Status icons have aria-labels
- Action buttons clearly labeled

## Implementation Notes

### Table Component
- Reusable table component if used elsewhere
- Sortable columns (optional but useful)
- Sticky header for long lists
- Pagination or infinite scroll

### Student Data Structure
```typescript
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  yearGroup: string; // "Year 5" or age
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  studentPhone?: string;
  address?: string;
  allergies?: string;
  hasSeverAllergy: boolean;
  hasBook: boolean; // or null for unknown
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'na';
  enrolledClasses: Class[]; // or just IDs
  status: 'active' | 'inactive';
  notes?: string;
}
```

### Performance Considerations
- Virtual scrolling for large student lists (100+ students)
- Lazy load student detail pages
- Debounce search input for real-time filtering
- Consider pagination for performance
