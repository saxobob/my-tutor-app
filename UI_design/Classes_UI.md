# Classes UI Design

## Overview
The Classes page is the primary interface for managing all classes in the tutoring business. It provides a comprehensive view of class inventory, enrollment status, and quick access to class management tasks.

## Design Principles

### 1. **Inventory Management Focus**
- Purpose is to see ALL classes at a glance, not just today's or this week's
- Filtering and search are first-class features to navigate the class inventory
- Space efficiency maintained to show multiple classes without excessive scrolling
- **Rationale**: Managers and owners need to understand their full class portfolio

### 2. **Progressive Information**
- **Actions**: Create, import, archive classes
- **Overview Stats**: Total classes, enrollment, active/inactive ratio, full classes
- **Search & Filter**: Find specific classes quickly
- **Class Grid**: Detailed cards for each class
- **Rationale**: Users can quickly get a macro view before drilling into individual classes

### 3. **Status-at-a-Glance**
- Enrollment progress bars (same color scheme as Dashboard)
- Class status badges (Active/Inactive)
- Level indicators (Beginner/Intermediate/Advanced with distinct colors)
- Enrollment percentage relative to capacity
- **Rationale**: Managers can quickly identify problem areas (low enrollment, inactive classes, etc.)

### 4. **Action-Oriented Cards**
- Each class card has "View" and "Edit" buttons for quick access
- Card design emphasizes the key data (name, instructor, enrollment)
- Hover state shows increased shadow for interactivity feedback
- **Rationale**: Makes it clear that cards are interactive

### 5. **Flexible Filtering**
- Search works across multiple fields (class name, instructor name)
- Status filter (All, Active, Inactive) for quick segmentation
- Search results count shown below filter controls
- **Rationale**: Users with many classes need to find what they're looking for quickly

## Section Breakdown

### Actions (Section 1)
**Purpose**: Quick access to class management tasks
- **Create New Class**: Initiate new class creation
- **Bulk Import**: Import classes from CSV/spreadsheet
- **Archive Classes**: Manage inactive classes
- **Layout**: 3 columns, equal-sized buttons with icons
- **Used by**: Managers and owners who manage the class catalog

### Overview Stats (Section 2)
**Purpose**: Provide macro view of class portfolio health
- **Total Classes**: Overall count
- **Total Enrollment**: Overall enrollment vs capacity percentage
- **Active Classes**: Count of active classes (inactive in detail text)
- **Full Classes**: Count of nearly-full classes (low enrollment count in detail)
- **Layout**: 4 columns (or fewer on mobile), stat cards with secondary info
- **Used by**: Owners for business oversight, managers for monitoring

### Search & Filter (Section 3)
**Purpose**: Navigate the class inventory
- **Search Input**: Real-time search across class name and instructor
- **Status Filter**: Dropdown to filter by active/inactive/all
- **Results Count**: Shows how many classes match criteria
- **Layout**: Horizontal controls, full width
- **Used by**: All users to find specific classes

### Class Grid (Section 4)
**Purpose**: Display filterable class list with key information
- **Class Name**: Primary identifier
- **Schedule**: Days of week and time
- **Status Badge**: Visual indicator of active/inactive
- **Enrollment Bar**: Progress bar showing capacity utilization (color-coded)
- **Instructor**: Person teaching the class
- **Location**: Room/studio where class meets
- **Level**: Beginner/Intermediate/Advanced with color coding
- **Action Buttons**: View and Edit buttons for interactivity
- **Layout**: 3 columns on desktop, responsive to fewer columns on mobile
- **Used by**: All users to browse and manage classes

## Class Card Design

### Key Information Hierarchy
1. **Class Name** (large, bold) - What is this class?
2. **Schedule** (small gray) - When does it meet?
3. **Status Badge** (top right) - Is it active?
4. **Enrollment Progress** (visual bar) - How full is it?
5. **Instructor** (small gray) - Who teaches it?
6. **Location** (small gray) - Where is it?
7. **Level** (small badge) - Difficulty level
8. **Action Buttons** (bottom) - What can I do with it?

### Visual Design
- White background with subtle border and shadow
- Compact spacing (p-4, mb-3, etc.) maintains space efficiency
- Icons and text combined for scannability
- Responsive design: 3 cols on desktop, 2 on tablet, 1 on mobile

## Filtering & Search Strategy

### Search Logic
- **Case-insensitive**: "FRENCH" matches "Lunchtime French"
- **Multi-field**: Searches class name AND instructor name
- **Real-time**: Updates results as user types
- **Fallback**: Shows "No classes found" message if no results

### Filter Options
- **Status**: All, Active, Inactive
- **Extensible**: Future filters could include:
  - Instructor name
  - Day of week
  - Capacity utilization
  - Level
  - Location

## Color & Typography

### Level Colors
- **Beginner**: Blue (bg-blue-100, text-blue-800)
- **Intermediate**: Purple (bg-purple-100, text-purple-800)
- **Advanced**: Orange (bg-orange-100, text-orange-800)

### Status Colors
- **Active**: Green (🟢)
- **Inactive**: Gray (⚫)

### Enrollment Colors (reused from Dashboard)
- **Green** (70%+): Healthy enrollment
- **Yellow** (30-70%): Moderate enrollment, room to grow
- **Red** (<30%): Low enrollment, needs attention

### Typography
- Section headers: text-lg font-bold
- Class name: text-sm font-semibold
- Labels: text-xs gray-600
- Details: text-xs

## Responsive Behavior

### Desktop (lg breakpoint)
- Class Grid: 3 columns
- Stats: 4 columns
- Actions: 3 columns

### Tablet (md breakpoint)
- Class Grid: 2 columns
- Stats: 4 columns (can wrap)
- Actions: 3 columns

### Mobile (< md breakpoint)
- Class Grid: 1 column
- Stats: 1 column
- Actions: 1 column
- Search input full width
- Filter dropdown adjacent to search

## Differences from Dashboard

### Similarities
- Shared sidebar, top bar, color scheme
- Same icons and visual style
- Same typography hierarchy
- Same spacing and rhythm

### Differences
| Feature | Dashboard | Classes |
|---------|-----------|---------|
| **Purpose** | Daily operations hub | Inventory management |
| **Time Focus** | Today + this week | All classes |
| **Primary View** | Card view with time-based sections | Grid view with filtering |
| **Data Density** | Lower (3 cards per section) | Higher (many classes in grid) |
| **Actions** | Mark Attendance, Create Invoice | Create, Import, Archive, Edit |
| **Filtering** | None (pre-filtered by time) | Search + status filter |
| **Metrics** | Enrollment + Financial | Enrollment + Portfolio health |

## Future Enhancements

1. **Sorting**: Sort by enrollment %, name, day, etc.
2. **Bulk Actions**: Select multiple classes to archive/activate
3. **Class Templates**: Reuse common class configurations
4. **Capacity Planning**: Visual indicators for near-full classes
5. **Instructor View**: Filter/sort by instructor workload
6. **Calendar Integration**: Show class schedule in calendar view
7. **Enrollment Trends**: Mini chart showing enrollment trends over time
8. **Class Templates**: Pre-made class configurations to speed creation

## Accessibility Considerations

- Search input has clear label via placeholder text
- Filter dropdown has semantic HTML structure
- Status and level badges use color + text (not color alone)
- Action buttons are adequately sized for touch/click
- Grid layout responds to screen size
- Results count provides feedback to screen readers
