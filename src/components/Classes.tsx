'use client';

import React, { useState } from 'react';

interface Class {
  id: string;
  name: string;
  instructor: string;
  daysOfWeek: string[];
  time: string;
  location: string;
  enrolled: number;
  capacity: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'inactive' | 'pending';
}

export default function Classes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupBy, setGroupBy] = useState<'all' | 'upcoming' | 'venue'>('all');
  const [showCurrentOnly, setShowCurrentOnly] = useState(true);
  const userRole = 'admin';

  // Mock data
  const classes: Class[] = [
    {
      id: '1',
      name: 'Lunchtime French',
      instructor: 'Sarah Johnson',
      daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
      time: '12:30 - 13:20',
      location: 'Room 204',
      enrolled: 14,
      capacity: 15,
      level: 'Intermediate',
      status: 'active',
    },
    {
      id: '2',
      name: 'Dance Group Level 1',
      instructor: 'Emma Clarke',
      daysOfWeek: ['Tuesday', 'Thursday'],
      time: '15:00 - 16:00',
      location: 'Studio A',
      enrolled: 12,
      capacity: 16,
      level: 'Beginner',
      status: 'active',
    },
    {
      id: '3',
      name: 'Music Ensemble',
      instructor: 'James Wilson',
      daysOfWeek: ['Wednesday'],
      time: '16:30 - 17:30',
      location: 'Music Room',
      enrolled: 8,
      capacity: 12,
      level: 'Intermediate',
      status: 'active',
    },
    {
      id: '4',
      name: 'Spanish Group',
      instructor: 'Maria Rodriguez',
      daysOfWeek: ['Monday', 'Thursday'],
      time: '14:00 - 15:00',
      location: 'Room 205',
      enrolled: 3,
      capacity: 12,
      level: 'Beginner',
      status: 'active',
    },
    {
      id: '5',
      name: 'Advanced Photography',
      instructor: 'David Chen',
      daysOfWeek: ['Saturday'],
      time: '10:00 - 12:00',
      location: 'Studio B',
      enrolled: 6,
      capacity: 8,
      level: 'Advanced',
      status: 'active',
    },
    {
      id: '6',
      name: 'Piano Basics',
      instructor: 'Sophie Laurent',
      daysOfWeek: ['Tuesday', 'Thursday'],
      time: '17:00 - 17:45',
      location: 'Music Room',
      enrolled: 0,
      capacity: 10,
      level: 'Beginner',
      status: 'inactive',
    },
  ];

  // Helper: Get next occurrence of a class
  const getNextOccurrence = (daysOfWeek: string[]): Date => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let minDate = new Date('2099-01-01');

    for (const dayName of daysOfWeek) {
      const dayIndex = dayNames.indexOf(dayName);
      const currentDay = today.getDay();
      let daysUntil = (dayIndex - currentDay + 7) % 7;
      if (daysUntil === 0) daysUntil = 0; // Today

      const nextDate = new Date(today);
      nextDate.setDate(nextDate.getDate() + daysUntil);

      if (nextDate < minDate) {
        minDate = nextDate;
      }
    }

    return minDate;
  };

  // Check if class is upcoming (today or tomorrow)
  const isUpcoming = (cls: Class): boolean => {
    const nextDate = getNextOccurrence(cls.daysOfWeek);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return nextDate <= tomorrow;
  };

  // Format days display
  const formatDays = (daysOfWeek: string[]): string => {
    if (daysOfWeek.length <= 2) {
      return daysOfWeek.join(', ');
    }
    return daysOfWeek.slice(0, 2).join(', ') + ', Multiple';
  };

  // Filter classes
  let filteredClasses = classes.filter((cls) => {
    if (showCurrentOnly && cls.status !== 'active') return false;
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    if (groupBy === 'upcoming') {
      return matchesSearch && isUpcoming(cls);
    }
    return matchesSearch;
  });

  // Group by venue if needed
  const getGroupedData = (): Record<string, Class[]> => {
    if (groupBy === 'venue') {
      const grouped: Record<string, Class[]> = {};
      filteredClasses.forEach((cls) => {
        if (!grouped[cls.location]) {
          grouped[cls.location] = [];
        }
        grouped[cls.location].push(cls);
      });
      return grouped;
    }
    return { All: filteredClasses };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedData = getGroupedData();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          {sidebarOpen ? (
            <div className="font-bold text-lg">TutorHub</div>
          ) : (
            <div className="font-bold text-xl">T</div>
          )}
        </div>

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
                item.name === 'Classes'
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
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
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">John Director</span>
                <span className="text-xs text-gray-500">{userRole.toUpperCase()}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Search & Filter */}
            <div className="mb-6">
              <div className="flex gap-3 items-center flex-wrap">
                <div className="flex-1 relative min-w-64">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by class name or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Classes</option>
                  <option value="upcoming">Upcoming (Today/Tomorrow)</option>
                  <option value="venue">Group by Venue</option>
                </select>
                <label className="flex items-center gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={showCurrentOnly}
                    onChange={(e) => setShowCurrentOnly(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Current Only</span>
                </label>
              </div>
            </div>

            {/* Classes Table */}
            <div className="space-y-6">
              {Object.entries(groupedData).map(([group, classesInGroup]) => (
                <div key={group}>
                  {groupBy === 'venue' && (
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">{group}</h2>
                  )}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {classesInGroup.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500 text-sm">No classes found.</p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Instructor</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Days & Time</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Venue</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Places</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {classesInGroup.map((cls) => (
                            <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{cls.name}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">{cls.instructor}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                <div>{formatDays(cls.daysOfWeek)}</div>
                                <div className="text-xs text-gray-500">{cls.time}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">{cls.location}</td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {cls.enrolled}/{cls.capacity}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(cls.level)}`}>
                                  {cls.level}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    cls.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {cls.status === 'active' ? '🟢' : '⚫'} {cls.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</button>
                                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">Edit</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
