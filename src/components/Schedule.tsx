'use client';

import React, { useState } from 'react';

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Types
interface ScheduleClass {
  id: string;
  name: string;
  time: string;
  endTime: string;
  location: string;
  enrolled: number;
  capacity: number;
  instructor: string;
  dayOfWeek: string;
  date: string;
}

interface TutorGroup {
  tutorId: string;
  tutorName: string;
  contact?: string;
  weeklyClassCount: number;
  classes: ScheduleClass[];
}

// Helper to get enrollment percentage
function getEnrollmentPercentage(enrolled: number, capacity: number): number {
  return Math.round((enrolled / capacity) * 100);
}

// Helper to get enrollment color
function getEnrollmentBarColor(enrolled: number, capacity: number): string {
  const percentage = getEnrollmentPercentage(enrolled, capacity);
  if (percentage >= 70) return 'bg-green-500';
  if (percentage >= 30) return 'bg-yellow-500';
  return 'bg-red-500';
}

// Enrollment Progress Bar Component
function EnrollmentBar({ enrolled, capacity }: { enrolled: number; capacity: number }) {
  const percentage = getEnrollmentPercentage(enrolled, capacity);
  const bgColor = getEnrollmentBarColor(enrolled, capacity);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${bgColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">{enrolled}/{capacity}</span>
    </div>
  );
}

// Agenda View Component
function AgendaView({ tutors, userRole }: { tutors: TutorGroup[]; userRole: string }) {
  const [expandedTutors, setExpandedTutors] = useState<Set<string>>(new Set(tutors.map(t => t.tutorId)));

  const toggleTutor = (tutorId: string) => {
    const newExpanded = new Set(expandedTutors);
    if (newExpanded.has(tutorId)) {
      newExpanded.delete(tutorId);
    } else {
      newExpanded.add(tutorId);
    }
    setExpandedTutors(newExpanded);
  };

  // Group classes by date
  const groupClassesByDate = (classes: ScheduleClass[]) => {
    const grouped: { [key: string]: ScheduleClass[] } = {};
    classes.forEach(cls => {
      const dateKey = cls.date;
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(cls);
    });
    return grouped;
  };

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      {tutors.map(tutor => (
        <div key={tutor.tutorId} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Tutor Header - Only show for managers */}
          {userRole === 'admin' && (
            <button
              onClick={() => toggleTutor(tutor.tutorId)}
              className="w-full bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`transform transition-transform ${expandedTutors.has(tutor.tutorId) ? 'rotate-90' : ''}`}>
                  <ChevronRightIcon />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-gray-900">{tutor.tutorName}</h3>
                  {tutor.contact && <p className="text-xs text-gray-500">{tutor.contact}</p>}
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 ml-4 flex-shrink-0">
                {tutor.weeklyClassCount}
              </span>
            </button>
          )}

          {/* Tutor Content */}
          {(userRole === 'tutor' || expandedTutors.has(tutor.tutorId)) && (
            <div className="divide-y divide-gray-200">
              {Object.entries(groupClassesByDate(tutor.classes))
                .sort()
                .map(([dateKey, dateClasses]) => (
                  <div key={dateKey}>
                    {/* Date Header */}
                    <div className="bg-gray-50 px-6 py-2">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {dateKey === todayStr
                          ? 'Today'
                          : new Date(dateKey).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                      </h4>
                    </div>

                    {/* Classes for this date */}
                    <div className="divide-y divide-gray-100">
                      {dateClasses
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(cls => (
                          <div
                            key={cls.id}
                            className="px-6 py-3 hover:bg-blue-50 transition cursor-pointer group"
                          >
                            <div className="flex items-start gap-4">
                              {/* Time */}
                              <div className="flex-shrink-0 min-w-24">
                                <div className="text-sm font-bold text-gray-900">
                                  {cls.time}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {cls.endTime}
                                </div>
                              </div>

                              {/* Class Details */}
                              <div className="flex-1 min-w-0">
                                <h5 className="text-sm font-semibold text-gray-900">{cls.name}</h5>
                                <div className="mt-1 space-y-1">
                                  <div className="text-xs text-gray-600">
                                    <span className="font-medium">Location:</span> {cls.location}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    <span className="font-medium">Instructor:</span> {cls.instructor}
                                  </div>
                                </div>
                              </div>

                              {/* Enrollment */}
                              <div className="flex-shrink-0 w-40">
                                <EnrollmentBar enrolled={cls.enrolled} capacity={cls.capacity} />
                              </div>

                              {/* Actions */}
                              <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button
                                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                                  title="View details"
                                >
                                  View
                                </button>
                                <button
                                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition"
                                  title="Edit class"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Week View Component
function WeekView({ tutors }: { tutors: TutorGroup[] }) {
  const allClasses = tutors.flatMap(t => t.classes);

  // Get this week's dates
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

  // Map classes to their day and hour
  const classGrid: { [day: number]: { [hour: number]: ScheduleClass[] } } = {};
  weekDates.forEach((_, dayIdx) => {
    classGrid[dayIdx] = {};
    hours.forEach(hour => {
      classGrid[dayIdx][hour] = [];
    });
  });

  allClasses.forEach(cls => {
    const classDate = new Date(cls.date);
    const hour = parseInt(cls.time.split(':')[0]);

    // Find which day in our week
    for (let i = 0; i < weekDates.length; i++) {
      const weekDate = new Date(weekDates[i]);
      if (
        weekDate.getDate() === classDate.getDate() &&
        weekDate.getMonth() === classDate.getMonth() &&
        weekDate.getFullYear() === classDate.getFullYear()
      ) {
        if (classGrid[i][hour]) {
          classGrid[i][hour].push(cls);
        }
        break;
      }
    }
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 w-20">Time</th>
              {weekDates.map((date, idx) => (
                <th key={idx} className="px-4 py-3 text-center font-semibold text-gray-700 border-l border-gray-200 min-w-48">
                  <div className="font-semibold text-gray-900">{dayNames[date.getDay()]}</div>
                  <div className="text-gray-500 text-xs mt-1">{date.getMonth() + 1}/{date.getDate()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour} className="border-b border-gray-200">
                <td className="px-4 py-2 text-gray-700 font-semibold sticky left-0 bg-gray-50 border-r border-gray-200 h-24">
                  {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? 'AM' : 'PM'}
                </td>
                {weekDates.map((_, dayIdx) => (
                  <td key={`${dayIdx}-${hour}`} className="px-3 py-2 border-l border-gray-200 bg-white h-24 align-top">
                    <div className="space-y-1">
                      {classGrid[dayIdx][hour].map(cls => (
                        <div
                          key={cls.id}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-2 cursor-pointer hover:bg-blue-100 hover:shadow-md transition group"
                        >
                          <div className="font-semibold text-blue-900 text-xs line-clamp-2">{cls.name}</div>
                          <div className="text-xs text-gray-600 mt-1 truncate">{cls.location}</div>
                          <div className="mt-2">
                            <EnrollmentBar enrolled={cls.enrolled} capacity={cls.capacity} />
                          </div>
                          <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition">
                            <button className="flex-1 px-2 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-200 rounded hover:bg-blue-50">
                              View
                            </button>
                            <button className="flex-1 px-2 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-200 rounded hover:bg-blue-50">
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Schedule Component
export default function Schedule() {
  const [view, setView] = useState<'agenda' | 'week'>('agenda');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userRole = 'admin'; // Demo: 'tutor' | 'admin'

  // Mock data - sample tutors with classes
  const mockTutors: TutorGroup[] = [
    {
      tutorId: '1',
      tutorName: 'Sarah Chen',
      contact: 'sarah@example.com',
      weeklyClassCount: 5,
      classes: [
        {
          id: '1',
          name: 'French Beginners',
          time: '14:30',
          endTime: '15:45',
          location: 'Room 101',
          enrolled: 15,
          capacity: 20,
          instructor: 'Sarah Chen',
          dayOfWeek: 'Monday',
          date: '2025-02-10',
        },
        {
          id: '2',
          name: 'English Intermediate',
          time: '16:00',
          endTime: '17:30',
          location: 'Studio A',
          enrolled: 8,
          capacity: 12,
          instructor: 'Sarah Chen',
          dayOfWeek: 'Monday',
          date: '2025-02-10',
        },
        {
          id: '3',
          name: 'Spanish 101',
          time: '10:00',
          endTime: '11:00',
          location: 'Room 201',
          enrolled: 20,
          capacity: 20,
          instructor: 'Sarah Chen',
          dayOfWeek: 'Tuesday',
          date: '2025-02-11',
        },
        {
          id: '4',
          name: 'Math Advanced',
          time: '14:00',
          endTime: '15:30',
          location: 'Lab',
          enrolled: 6,
          capacity: 8,
          instructor: 'Sarah Chen',
          dayOfWeek: 'Wednesday',
          date: '2025-02-12',
        },
        {
          id: '5',
          name: 'Italian Conversation',
          time: '18:00',
          endTime: '19:30',
          location: 'Room 305',
          enrolled: 12,
          capacity: 15,
          instructor: 'Sarah Chen',
          dayOfWeek: 'Friday',
          date: '2025-02-14',
        },
      ],
    },
    {
      tutorId: '2',
      tutorName: 'Mike Johnson',
      contact: 'mike@example.com',
      weeklyClassCount: 4,
      classes: [
        {
          id: '6',
          name: 'Piano Advanced',
          time: '13:00',
          endTime: '14:00',
          location: 'Music Studio',
          enrolled: 4,
          capacity: 6,
          instructor: 'Mike Johnson',
          dayOfWeek: 'Monday',
          date: '2025-02-10',
        },
        {
          id: '7',
          name: 'Violin Beginner',
          time: '15:00',
          endTime: '16:30',
          location: 'Music Room',
          enrolled: 7,
          capacity: 10,
          instructor: 'Mike Johnson',
          dayOfWeek: 'Tuesday',
          date: '2025-02-11',
        },
        {
          id: '8',
          name: 'Guitar Basics',
          time: '17:00',
          endTime: '18:00',
          location: 'Studio B',
          enrolled: 3,
          capacity: 8,
          instructor: 'Mike Johnson',
          dayOfWeek: 'Thursday',
          date: '2025-02-13',
        },
        {
          id: '9',
          name: 'Music Theory',
          time: '09:00',
          endTime: '10:30',
          location: 'Room 102',
          enrolled: 11,
          capacity: 15,
          instructor: 'Mike Johnson',
          dayOfWeek: 'Saturday',
          date: '2025-02-15',
        },
      ],
    },
  ];

  // Filter tutors based on role
  const visibleTutors = userRole === 'tutor' ? mockTutors.filter(t => t.tutorId === '1') : mockTutors;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          {sidebarOpen ? (
            <div className="font-bold text-lg">TutorHub</div>
          ) : (
            <div className="font-bold text-xl">T</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-3 space-y-2">
          {[
            { name: 'Dashboard', icon: '📊' },
            { name: 'Classes', icon: '👥' },
            { name: 'Schedule', icon: '📅' },
            { name: 'Students', icon: '📚' },
            { name: 'Invoices', icon: '💳' },
            { name: 'Expenses', icon: '💰' },
            { name: 'Materials', icon: '📖' },
            { name: 'Reports', icon: '📈' },
            { name: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.name === 'Schedule'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MenuIcon />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">John Director</span>
                <span className="text-xs text-gray-500">{userRole.toUpperCase()}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* View Toggle */}
            <div className="mb-6">
              <div className="flex gap-2 bg-white rounded-lg border border-gray-200 p-1 inline-flex">
                <button
                  onClick={() => setView('agenda')}
                  className={`px-4 py-2 rounded font-medium transition text-sm ${
                    view === 'agenda'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Agenda View
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded font-medium transition text-sm ${
                    view === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Week View
                </button>
              </div>
            </div>

            {/* View Content */}
            {view === 'agenda' ? (
              <AgendaView tutors={visibleTutors} userRole={userRole} />
            ) : (
              <WeekView tutors={visibleTutors} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
