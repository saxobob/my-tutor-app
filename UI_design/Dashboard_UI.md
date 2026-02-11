# Dashboard UI Design

## Overview
The Dashboard is the primary entry point for tutoring business managers. It serves as a command center for daily operations, providing quick access to critical information and common actions.

## Design Principles

### 1. **Progressive Disclosure by Priority**
- **Quick Actions (Top)**: Most frequently used operations (Create Class, Mark Attendance, Create Invoice, Log Expense) are immediately visible and accessible
- **Urgent Items**: High-priority alerts that require immediate attention (missed attendance, low enrollment, overdue invoices)
- **Today's Classes**: Contextual information for the current day
- **Metrics**: Strategic overview (enrollment, capacity, waiting lists)
- **Weekly View**: Planning and overview for the week
- **Rationale**: Users get the most actionable information first without scrolling

### 2. **Space Efficiency**
- Compact card heights and padding to maximize information density
- Reduced margins between sections (mb-5 instead of mb-8)
- Smaller text sizes and icon sizes to maintain visual hierarchy without wasting space
- Grid layouts (1 col mobile, 3-4 cols desktop) to adapt to screen size
- **Rationale**: Mobile users and users on smaller screens can see more critical information without excessive scrolling

### 3. **Color-Coded Status System**
- **Red**: Urgent/Critical (urgent items, low enrollment <30%)
- **Yellow**: Warning/Pending (pending attendance, medium enrollment 30-70%)
- **Green**: Good/Healthy (marked attendance, strong enrollment >70%)
- **Blue**: Primary actions and information
- **Rationale**: Users can scan and understand status at a glance without reading text

### 4. **Multiple Contexts for Different Workflows**
- **Today's Classes**: For daily operations and attendance tracking
- **This Week's Classes**: For planning and seeing the full weekly schedule
- **Metrics Cards**: For business health and enrollment monitoring
- **Rationale**: Different users (tutors vs. managers vs. owners) need different contexts to operate effectively

### 5. **Action-Oriented Design**
- Quick Action buttons are prominent and easy to click
- "Mark Attendance" buttons are visible on today's classes for immediate interaction
- Action labels are clear and descriptive (not just icons)
- **Rationale**: Dashboard should enable quick completion of common tasks, not just display information

### 6. **Visual Hierarchy**
- Large, bold section headers (text-lg font-bold)
- Cards use subtle shadows and borders for definition without clutter
- Progress bars for enrollment create visual representation of capacity
- Badge status indicators (Marked/Pending, High/Medium priority)
- **Rationale**: Users can quickly navigate and understand the structure

## Section Breakdown

### Quick Actions (Section 1)
**Purpose**: Reduce clicks to complete common tasks
- 4 primary actions displayed as equal-sized buttons
- Icons + labels for clarity
- Color-coded by action type
- Compact height to not waste space
- **Used by**: All user types (tutors, managers, owners)

### Urgent Items (Section 2)
**Purpose**: Alert users to critical issues requiring immediate action
- Limited to 3 items (forces prioritization in the backend)
- Red accent border for visual weight
- Priority badge (high/medium)
- Actionable button (Mark Now, Promote, Contact Parent)
- **Used by**: Managers and owners who need to triage
- **Why Second**: Users need to see their daily schedule first, but urgent items close behind

### Today's Classes (Section 3)
**Purpose**: Support daily operations and attendance workflow
- Only classes scheduled for today
- Enrollment progress bar with color coding
- Attendance status badge (✓ Marked or ⏱ Pending)
- Location and instructor for context
- Direct "Mark Attendance" button for quick access
- **Used by**: Tutors and managers running classes

### Enrollment & Capacity Metrics (Section 4)
**Purpose**: Provide strategic overview of business health
- 4 key metrics: Active Classes, Total Students, Classes at Capacity, Waiting List
- Large value display for scannability
- Trend indicators (vs last week)
- **Used by**: Owners and managers for business decisions
- **Why Here**: Less urgent than daily operations, but important for planning

### This Week's Classes (Section 5)
**Purpose**: Planning and overview of the full week
- Complete weekly schedule in table format
- Color-coded enrollment status
- All critical details (day, time, class name, enrollment, instructor, location, status)
- Sortable/filterable content ready for interactivity
- **Used by**: All users for planning and checking schedules
- **Why Last**: Provides context but doesn't require immediate action

## Color & Typography

### Colors
- **Blue (#blue-600)**: Links, primary actions, selected states
- **Red (#red-500/#red-100)**: Danger, urgent, low capacity
- **Yellow (#yellow-500/#yellow-100)**: Warning, pending, medium capacity
- **Green (#green-500/#green-100)**: Success, complete, high capacity
- **Gray (#gray-900, #gray-600, #gray-500)**: Text hierarchy
- **White**: Card backgrounds, clean slate

### Typography
- Section headers: text-lg font-bold (reduced from xl for space)
- Card titles: text-xs font-semibold
- Body text: text-xs for compactness
- Labels: text-xs gray-600
- Values: text-2xl font-bold for metrics (easier to scan)

## Responsive Behavior

### Desktop (md breakpoint and above)
- Quick Actions: 4 columns
- Urgent Items: 3 columns
- Today's Classes: 3 columns
- Metrics: 4 columns
- Weekly table: Full width

### Mobile (< md breakpoint)
- All sections: 1 column
- Table columns may reflow or require horizontal scroll
- Quick actions still accessible above the fold
- Touch-friendly button sizes maintained

## Information Density Choices

### What's Shown
- Class name, time, location, instructor
- Enrollment count and capacity
- Attendance status
- Priority flags and badges

### What's Hidden (Available on Detail Pages)
- Student names and attendance details
- Financial breakdowns
- Historical data
- Configuration details

**Rationale**: Dashboard shows enough to understand context and take action, but directs users to detail pages for deep dives

## Future Considerations

1. **Customization**: Allow managers to drag/reorder sections or hide less-relevant content
2. **Filtering**: "Show only my classes" or "Show only classes with <50% enrollment"
3. **Time-based Views**: "Classes in next 2 hours" vs "All today's classes"
4. **Notifications**: Toast alerts for new urgent items
5. **Analytics**: Simple charts for trend visualization
6. **Keyboard Navigation**: Quick access keys for power users

## Accessibility Notes

- Color alone is not used to communicate status (icons and text used alongside)
- Contrast ratios maintained for readability
- Button sizes adequate for touch and click
- Icons are decorative (important info conveyed in text)
- Table structure is semantic for screen readers
