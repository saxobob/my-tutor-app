# Schedule UI Design

## Overview
The Schedule page provides a comprehensive view of class schedules for tutors and managers. It's the primary interface for viewing when and where classes are scheduled, with flexible viewing options (week grid and agenda list) and role-based filtering to show either a single tutor's schedule or all tutors' schedules stacked vertically.

## Design Principles

### 1. **Role-Based Context**
- **Individual Tutors**: See only their own classes in their personal schedule
- **Managers**: See all tutors' schedules stacked vertically for comprehensive business overview
- **Rationale**: Users get relevant information without unnecessary noise, but managers retain full visibility

### 2. **Flexible View Options**
- **Week View**: Spatial grid showing time slots across the week (Mon-Sun columns, hourly rows)
- **Agenda View**: Chronological list of upcoming classes (default view)
- **Rationale**: Different users prefer different layouts; week view for planning, agenda for quick scanning upcoming classes

### 3. **Expandable Tutor Sections**
- Each tutor gets a collapsible section with tutor name as header
- Classes grouped by tutor for clarity when viewing multiple tutors
- Can collapse unneeded tutors to reduce visual clutter
- **Rationale**: Managers can focus on specific tutors while retaining full picture visibility

### 4. **Quick Actions in Context**
- Classes are clickable to view full details
- Quick edit button on each class for immediate modifications
- Consistent with Classes and Dashboard action patterns
- **Rationale**: Users can take action without leaving the schedule view

### 5. **Space Efficiency**
- Compact card and row heights to maximize information visibility
- Consistent spacing with Dashboard and Classes pages
- Responsive grid for different screen sizes
- **Rationale**: Mobile users and those with many classes can navigate efficiently

### 6. **Information Hierarchy**
- Time (prominent)
- Class name (bold, primary identifier)
- Location and instructor (supporting details)
- Enrollment status (visual progress bar)
- **Rationale**: Users quickly understand when and where, with context about capacity

## Section Breakdown

### View Toggle (Top Control)
**Purpose**: Switch between Agenda and Week views
- **Location**: Top right, next to page title or in header bar
- **Buttons**: "Agenda View" and "Week View" with active state styling
- **Default**: Agenda View (based on user preference)
- **Layout**: Pill/tab-style buttons, side-by-side
- **Used by**: All users to switch viewing perspective

### Filter/Search (Control Row)
**Purpose**: Refine displayed schedules
- **For Individual Tutors**:
  - Date range picker (This Week, Next Week, Custom Range)
  - Search by class name
- **For Managers**:
  - Tutor selector (multi-select to show specific tutors)
  - Date range picker
  - Search by class name or tutor name
- **Layout**: Horizontal controls below view toggle
- **Used by**: All users to focus on relevant classes

### Tutor Section Header (Repeating)
**Purpose**: Organize classes by tutor when viewing multiple tutors
- **Header Layout**:
  - Tutor name (bold, large)
  - Tutor contact info (small gray text, optional)
  - Expand/collapse toggle button (chevron icon)
  - Total classes count for this week
- **Background**: Subtle gray or light color to distinguish section
- **Padding**: Consistent with other section headers
- **Used by**: Managers viewing all tutors; individual tutors see this as page title instead

## Agenda View (Default)

### Layout
- Chronological list of upcoming classes
- One class per row in card or list format
- Grouped by date (Today, Tomorrow, This Week, Next Week, etc.)
- Collapsible date sections for space efficiency

### Class Row/Card Elements
**Information Shown** (left to right):
1. **Time** (prominent, bold)
   - Format: "2:30 PM - 3:45 PM" or "14:30-15:45"
   - Larger font for scannability
2. **Class Details** (left-aligned)
   - Class name (bold, text-sm)
   - Location (small gray text)
   - Instructor name (small gray text)
3. **Enrollment Status** (right-aligned)
   - Progress bar (same color scheme as Dashboard/Classes)
   - Enrollment text "15/20" (small)
   - Color-coded: Red (<30%), Yellow (30-70%), Green (70%+)
4. **Actions** (far right)
   - View button (eye icon)
   - Edit button (pencil icon)
   - Compact icon buttons, not full-width buttons

### Visual Design
- Subtle border and minimal shadow
- Hover state: Increased shadow and cursor pointer
- Date section headers: Light background (bg-gray-50), bold text-sm
- Responsive: Full-width cards on mobile, compact on desktop
- Alternate row backgrounds optional (light gray stripes for readability)

### Example Structure
```
Today
  2:30 PM - 3:45 PM | French Beginners | Room 101 | **15/20** [View] [Edit]
  4:00 PM - 5:30 PM | English Intermediate | Studio A | **8/12** [View] [Edit]

Tomorrow
  10:00 AM - 11:00 AM | Spanish 101 | Room 201 | **20/20** [View] [Edit]

This Week
  Wed 2:00 PM - 3:30 PM | Math Advanced | Lab | **6/8** [View] [Edit]
```

## Week View (Grid Layout)

### Layout
**Grid Structure:**
- **Columns**: Monday through Sunday (7 columns)
- **Rows**: Time slots (hourly, e.g., 8 AM, 9 AM, 10 AM... 6 PM)
- **Header**: Day names with dates (Mon 2/11, Tue 2/12, etc.)
- **Time Axis**: Left sidebar showing hours (8 AM - 6 PM, can scroll for extended hours)

### Class Cells
**What's Shown in Each Time Slot:**
- Class name (bold, text-sm)
- Time span (visual block height based on duration)
- Enrollment bar (compact, bottom of cell)
- Location (text-xs gray, bottom)
- Clickable to view details
- Edit icon (pencil) in top-right corner of cell

**Visual Design:**
- Each class is a colored block in its time slot
- Colors can be:
  - Tutor-specific colors (if showing multiple tutors on one grid)
  - Enrollment status colors (red/yellow/green - consistent with other pages)
  - Default: Light blue (#blue-50) background with #blue-600 text
- Hover state: Darker shade, cursor pointer
- Class blocks that span multiple hours fill vertical space proportionally

### Responsiveness
- **Desktop (lg+)**: Full 7-day week visible
- **Tablet (md)**: 5-day week (Mon-Fri) or horizontal scroll for full week
- **Mobile**: Single day or 2-day view with horizontal scroll
- Time labels rotate vertically on narrow screens if needed

### Example Visual
```
         | Mon 2/11 | Tue 2/12 | Wed 2/13 | Thu 2/14 | Fri 2/15 | Sat 2/16 | Sun 2/17
---------|----------|----------|----------|----------|----------|----------|----------
8:00 AM  |          |          |          |          |          |          |
9:00 AM  |          |          |          |          |          |          |
10:00 AM |          |          |          |          |          |          |
2:00 PM  |[French ] |          |[Math    ]|[English ]|          |          |
2:30 PM  |[Beginr. ]|          |[Advanced]|[Intermdt]|          |          |
3:00 PM  |[Rm 101  ]|          |[Lab     ]|[Studio A]|          |          |
3:30 PM  |**15/20**|          |**6/8**  |**8/12**  |          |          |
```

## Multi-Tutor Display

### Manager View with Expandable Sections
**Structure (Repeating Sections):**
1. **Tutor Section Header**
   - Tutor name (bold, text-lg)
   - Chevron icon (expandable toggle)
   - Total weekly classes count (badge)
   - Example: "Sarah Chen ▼ (12 classes this week)"

2. **Tutor Content** (expands/collapses)
   - **In Agenda View**: Classes for this tutor in chronological order
   - **In Week View**: Smaller week grid just for this tutor (or row in shared grid)
   - Entire section collapses to header only when collapsed

3. **Visual Separation**
   - Light background (bg-gray-50) for tutor section header
   - Subtle border between tutor sections
   - Padding/margin consistent with other sections in app

### Collapse/Expand Behavior
- Clicking tutor header toggles expand state
- State persists for session (consider localStorage for persistence)
- Collapse useful for focusing on specific tutors when many exist
- Visual cue: Chevron icon rotates, text is bold

### Example Multi-Tutor Agenda
```
TUTORS: Sarah Chen ▼ (12 classes) | Mike Johnson ▼ (8 classes)

─────────────────────────────────
Sarah Chen ▼ (12 classes)
─────────────────────────────────

  Today
    2:30 PM - 3:45 PM | French Beginners | Room 101 | 15/20 [View] [Edit]
    4:00 PM - 5:30 PM | English Intermediate | Studio A | 8/12 [View] [Edit]

  Tomorrow
    10:00 AM - 11:00 AM | Spanish 101 | Room 201 | 20/20 [View] [Edit]

─────────────────────────────────
Mike Johnson ▼ (8 classes)
─────────────────────────────────

  Today
    1:00 PM - 2:00 PM | Piano Advanced | Music Studio | 4/6 [View] [Edit]

  Tomorrow
    3:00 PM - 4:30 PM | Violin Beginner | Music Room | 7/10 [View] [Edit]
```

## Color & Typography

### Time Colors
- **Time text**: Bold, text-base (larger than other details)
- **Time background**: Optional light background for emphasis

### Enrollment Colors (reused from Dashboard/Classes)
- **Green** (70%+): bg-green-100, text-green-800
- **Yellow** (30-70%): bg-yellow-100, text-yellow-800
- **Red** (<30%): bg-red-100, text-red-800

### Tutor Section Colors
- **Header**: bg-gray-50, text-gray-900 (bold, text-lg)
- **Border**: subtle border-gray-200
- **Accent**: text-blue-600 for clickable sections

### Typography
- **Tutor header**: text-lg font-bold
- **Time**: text-base font-bold
- **Class name**: text-sm font-semibold
- **Details** (location, instructor): text-xs gray-600
- **Enrollment**: text-xs
- **Date headers** (in Agenda): text-sm font-semibold, bg-gray-50

### Class Block Colors (Week View)
- **Default**: bg-blue-50, text-blue-900, border border-blue-200
- **On hover**: bg-blue-100, shadow-md
- **Active/selected**: darker shade with highlight border

## Responsive Behavior

### Desktop (lg breakpoint and above)
- Agenda View: Full-width rows with all details visible
- Week View: 7-day week visible, standard time grid
- Tutor sections: Full width with clear separation
- Time slots: 1 hour per row

### Tablet (md breakpoint)
- Agenda View: Slightly compressed, responsive text sizing
- Week View: 5-day week (Mon-Fri) or horizontal scroll
- Tutor sections: Full width, may need to collapse some
- Time slots: 1 hour per row

### Mobile (< md breakpoint)
- Agenda View: Single column, stacked vertically
- Week View: 1-2 day view with horizontal scroll
- Tutor sections: Fully collapsible, only one open at a time (optional UX choice)
- Time labels: Smaller font or abbreviated (AM/PM only)
- Action buttons: Icon-only on tight screens, stacked vertically if needed

## Interactions & Actions

### Clickable Elements
- **Class Name**: Click to open class detail modal/page
- **Row/Card**: Click anywhere to view details (except on action buttons)
- **Tutor Section Header**: Click to expand/collapse

### Action Buttons
- **View Button** (eye icon): Opens class detail page/modal
- **Edit Button** (pencil icon): Opens class edit form
- **Positioning**: Top-right of card (Agenda) or top-right of cell (Week View)
- **Hover**: Icons become more prominent

### Keyboard Navigation (Nice-to-have)
- Tab through classes
- Enter to open detail
- Escape to close detail modal
- Arrow keys to navigate between days (Week View)

## Filtering & Search Strategy

### For Individual Tutors
- **Date Range Filter**: "This Week", "Next Week", "Custom Range"
- **Search**: Real-time search across class names
- **Sort**: By time (default), by location, by enrollment

### For Managers
- **Tutor Filter**: Select multiple tutors to display
- **Date Range Filter**: "This Week", "Next Week", "Custom Range"
- **Search**: Across class names and tutor names
- **Sort**: By tutor, by time, by enrollment

### Search Logic
- Case-insensitive
- Real-time updates
- Shows "No classes found" if no matches
- Persists selected filters during session

## Differences from Other Pages

| Feature | Dashboard | Classes | Schedule |
|---------|-----------|---------|----------|
| **Purpose** | Daily operations hub | Inventory management | Schedule planning & viewing |
| **Primary View** | Cards + table | Grid with filtering | Agenda (default) + Week grid |
| **Data Density** | Medium | High (many cards) | Medium (time-aware) |
| **Time Focus** | Today + this week | All (no time focus) | Full week + future |
| **User Context** | All users | Managers/owners | All users |
| **Key Actions** | Mark attendance, create | Create, edit, archive | View details, quick edit |
| **Tutor Visibility** | Today's classes | Not tutor-focused | Tutor-focused and stacked |

## Future Enhancements

1. **Time Zone Support**: Handle different time zones if tutors are distributed
2. **Calendar Sync**: Export to iCal/Google Calendar
3. **Drag-and-Drop Rescheduling**: Drag classes to different time slots (Week View)
4. **Color Coding by Tutor**: Multi-tutor view with tutor-specific colors
5. **Recurring Classes**: Visual indicators for weekly/recurring classes
6. **Conflict Detection**: Alerts if tutor has overlapping classes
7. **Student View**: Show student's personal schedule
8. **Attendance Marking**: Mark attendance directly from schedule
9. **Notes/Comments**: Add quick notes to classes from schedule
10. **Print Schedules**: Export/print weekly schedules per tutor
11. **Ical Export**: Integrate with calendar applications
12. **Filters by Location**: Filter classes by room/location
13. **Automatic Scrolling**: Week view auto-scrolls to current time

## Accessibility Considerations

- Color alone not used to communicate status (icons and text used)
- High contrast for time and class names
- Button sizes adequate for touch (44px minimum)
- Keyboard navigation support (tab, enter, escape)
- Semantic HTML for screen readers
- Date and time formats clearly labeled
- Sufficient spacing between interactive elements
- Aria labels for icon-only buttons

## Implementation Notes

### Tutor Section Component
- Reusable component that displays agenda OR week grid for a single tutor
- Takes props: `tutorId`, `classes`, `isExpanded`, `onToggleExpand`
- Handles both agenda and week view rendering based on parent state

### Multiple Tutors Logic
- Manager view queries all tutors with their classes
- Individual tutor view queries only current user's classes
- Filter control at page level determines what data is fetched
- Tutor section headers repeat for each tutor in manager view

### State Management
- Active view (Agenda vs Week) - page level
- Date range - page level
- Expanded tutors - page level (consider localStorage)
- Search/filters - page level

### Performance Considerations
- Lazy load class details when clicking
- Consider virtual scrolling for long agenda lists (50+ classes)
- Pagination or lazy loading for very large manager views
- Week grid may need debouncing for responsive resize events
