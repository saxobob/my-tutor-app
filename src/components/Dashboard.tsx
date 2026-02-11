'use client';

import React, { useState } from 'react';

// Simple inline icon components
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

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.414 1.414L9 11.414V6z" clipRule="evenodd" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V9.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 8H12z" clipRule="evenodd" />
  </svg>
);

interface ActionItem {
  id: string;
  type: 'invoice' | 'inventory' | 'attendance' | 'enrollment';
  title: string;
  description: string;
  priority: 'high' | 'medium';
  actionLabel: string;
}

interface TodayClass {
  id: string;
  name: string;
  time: string;
  location: string;
  enrolled: number;
  capacity: number;
  instructor: string;
  attendanceMarked: boolean;
}

interface WeeklyClass {
  id: string;
  dayOfWeek: string;
  time: string;
  name: string;
  enrolled: number;
  capacity: number;
  instructor: string;
  location: string;
  attendanceMarked: boolean;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userRole = 'admin'; // demo: 'tutor' | 'admin' | 'owner'

  // Mock data
  const actionItems: ActionItem[] = [
    {
      id: '1',
      type: 'attendance',
      title: 'Missing Attendance',
      description: 'Lunchtime French - 3 sessions not marked this week',
      priority: 'high',
      actionLabel: 'Mark Now',
    },
    {
      id: '2',
      type: 'enrollment',
      title: 'Low Enrollment',
      description: 'Spanish Group - only 3/12 enrolled',
      priority: 'high',
      actionLabel: 'Promote',
    },
    {
      id: '3',
      type: 'invoice',
      title: 'Overdue Invoice',
      description: 'Dance Class - £240 due 5 days ago',
      priority: 'high',
      actionLabel: 'Contact Parent',
    },
  ];

  const todayClasses: TodayClass[] = [
    {
      id: '1',
      name: 'Lunchtime French',
      time: '12:30 - 13:20',
      location: 'Room 204',
      enrolled: 14,
      capacity: 15,
      instructor: 'Sarah Johnson',
      attendanceMarked: false,
    },
    {
      id: '2',
      name: 'Dance Group Level 1',
      time: '15:00 - 16:00',
      location: 'Studio A',
      enrolled: 12,
      capacity: 16,
      instructor: 'Emma Clarke',
      attendanceMarked: true,
    },
    {
      id: '3',
      name: 'Music Ensemble',
      time: '16:30 - 17:30',
      location: 'Music Room',
      enrolled: 8,
      capacity: 12,
      instructor: 'James Wilson',
      attendanceMarked: false,
    },
  ];

  const weeklyClasses: WeeklyClass[] = [
    {
      id: '1',
      dayOfWeek: 'Monday',
      time: '12:30',
      name: 'Lunchtime French',
      enrolled: 14,
      capacity: 15,
      instructor: 'Sarah Johnson',
      location: 'Room 204',
      attendanceMarked: true,
    },
    {
      id: '2',
      dayOfWeek: 'Tuesday',
      time: '15:00',
      name: 'Dance Group Level 1',
      enrolled: 12,
      capacity: 16,
      instructor: 'Emma Clarke',
      location: 'Studio A',
      attendanceMarked: false,
    },
    {
      id: '3',
      dayOfWeek: 'Wednesday',
      time: '12:30',
      name: 'Lunchtime Spanish',
      enrolled: 3,
      capacity: 12,
      instructor: 'Maria Rodriguez',
      location: 'Room 205',
      attendanceMarked: true,
    },
    {
      id: '4',
      dayOfWeek: 'Thursday',
      time: '16:30',
      name: 'Music Ensemble',
      enrolled: 8,
      capacity: 12,
      instructor: 'James Wilson',
      location: 'Music Room',
      attendanceMarked: false,
    },
  ];

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
                item.name === 'Dashboard'
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Quick Actions */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { label: 'Create New Class', icon: '📋', color: 'blue' },
                  { label: 'Mark Attendance', icon: '✅', color: 'green' },
                  { label: 'Create Invoice', icon: '💳', color: 'purple' },
                  { label: 'Log Expense', icon: '💰', color: 'orange' },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all hover:shadow-md ${
                      action.color === 'blue'
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        : action.color === 'green'
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : action.color === 'purple'
                            ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent Items Section */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertIcon />
                <h2 className="text-lg font-bold text-gray-900">Urgent Items</h2>
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                  {actionItems.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {actionItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-xs">{item.title}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.priority === 'high' ? '🔴' : '🟡'} {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    <button className="w-full bg-red-50 text-red-700 hover:bg-red-100 font-medium py-1 rounded-md transition-colors text-xs">
                      {item.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Classes */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Today's Classes</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {todayClasses.map((cls) => {
                  const enrollmentPercent = (cls.enrolled / cls.capacity) * 100;
                  const enrollmentColor = enrollmentPercent >= 70 ? 'green' : enrollmentPercent >= 30 ? 'yellow' : 'red';
                  return (
                    <div key={cls.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-xs">{cls.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{cls.time}</p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                            cls.attendanceMarked
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {cls.attendanceMarked ? '✓' : '⏱'} {cls.attendanceMarked ? 'Marked' : 'Pending'}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Enrollment</span>
                          <span className="text-xs font-medium text-gray-900">
                            {cls.enrolled}/{cls.capacity}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              enrollmentColor === 'green'
                                ? 'bg-green-500'
                                : enrollmentColor === 'yellow'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(enrollmentPercent, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        📍 {cls.location} • 👨‍🏫 {cls.instructor}
                      </p>
                      <button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium py-1 rounded-md transition-colors text-xs">
                        Mark Attendance
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enrollment & Capacity Metrics */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Enrollment & Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  {
                    label: 'Active Classes',
                    value: '24',
                    change: '+2',
                    positive: true,
                  },
                  {
                    label: 'Total Students',
                    value: '312',
                    change: '+18',
                    positive: true,
                  },
                  {
                    label: 'Classes at Capacity',
                    value: '8',
                    change: '+1',
                    positive: false,
                  },
                  {
                    label: 'Waiting List',
                    value: '23',
                    change: '+5',
                    positive: false,
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <p className="text-gray-600 text-xs font-medium mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1 text-xs">
                      {stat.change && (
                        <>
                          <ArrowUpIcon />
                          <span className={stat.positive ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                            {stat.change} vs last week
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week's Classes */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">This Week's Classes</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1">
                  View Calendar →
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Day & Time</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Class</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Enrollment</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Instructor</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {weeklyClasses.map((cls) => (
                        <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <ClockIcon />
                              <div>
                                <div>{cls.dayOfWeek}</div>
                                <div className="text-xs text-gray-500">{cls.time}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">{cls.name}</td>
                          <td className="px-4 py-2 text-xs text-gray-700">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                (cls.enrolled / cls.capacity) * 100 >= 70
                                  ? 'bg-green-100 text-green-800'
                                  : (cls.enrolled / cls.capacity) * 100 >= 30
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {cls.enrolled}/{cls.capacity}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">{cls.instructor}</td>
                          <td className="px-4 py-2 text-xs text-gray-600">{cls.location}</td>
                          <td className="px-4 py-2 text-xs">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                cls.attendanceMarked
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {cls.attendanceMarked ? '✓ Marked' : '⏱ Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center text-xs text-blue-800">
              <p>
                💡 Tip: Use the quick actions above to enter data faster, or navigate to detailed views for more
                options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
