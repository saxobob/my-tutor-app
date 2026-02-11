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

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Types
interface StudentClass {
  id: string;
  name: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  yearGroup: string;
  parentName: string;
  phone: string;
  allergies: string;
  hasSevereAllergy: boolean;
  hasBook: boolean | null;
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'na';
  enrolledClasses: StudentClass[];
  status: 'active' | 'inactive';
  tutorId?: string; // Which tutor's student
}

// Helper to get payment badge color
function getPaymentColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'text-green-600';
    case 'partial':
      return 'text-yellow-600';
    case 'unpaid':
      return 'text-red-600';
    default:
      return 'text-gray-400';
  }
}

function getPaymentSymbol(status: string): string {
  switch (status) {
    case 'paid':
      return '✅';
    case 'partial':
      return '⚠️';
    case 'unpaid':
      return '❌';
    default:
      return '—';
  }
}

export default function Students() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const userRole = 'admin'; // Demo: 'tutor' | 'admin'

  // Mock data with more students
  const mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'Emma',
      lastName: 'Johnson',
      yearGroup: 'Y5',
      parentName: 'Jane Johnson',
      phone: '07123 456789',
      allergies: 'Peanut allergy',
      hasSevereAllergy: true,
      hasBook: false,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
        { id: '2', name: 'Piano Basics' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '2',
      firstName: 'Liam',
      lastName: 'Smith',
      yearGroup: 'Y7',
      parentName: 'David Smith',
      phone: '07456 789123',
      allergies: 'Asthma',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'partial',
      enrolledClasses: [
        { id: '3', name: 'Math Advanced' },
        { id: '4', name: 'Piano Advanced' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '3',
      firstName: 'Sophia',
      lastName: 'Brown',
      yearGroup: 'Y4',
      parentName: 'Emily Brown',
      phone: '07789 012345',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '4',
      firstName: 'Oliver',
      lastName: 'Davis',
      yearGroup: 'Y6',
      parentName: 'Michael Davis',
      phone: '07345 678901',
      allergies: 'Nut-free lunch required',
      hasSevereAllergy: false,
      hasBook: null,
      paymentStatus: 'na',
      enrolledClasses: [],
      status: 'inactive',
      tutorId: '2',
    },
    {
      id: '5',
      firstName: 'Ava',
      lastName: 'Wilson',
      yearGroup: 'Y5',
      parentName: 'Sarah Wilson',
      phone: '07567 890123',
      allergies: 'Lactose intolerant',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'unpaid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '6',
      firstName: 'Noah',
      lastName: 'Garcia',
      yearGroup: 'Y8',
      parentName: 'Carlos Garcia',
      phone: '07890 123456',
      allergies: 'Multiple allergies: Shellfish, Tree nuts',
      hasSevereAllergy: true,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '7', name: 'Music Theory' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '7',
      firstName: 'Isabella',
      lastName: 'Martinez',
      yearGroup: 'Y5',
      parentName: 'Rosa Martinez',
      phone: '07234 567890',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '8',
      firstName: 'Ethan',
      lastName: 'Thompson',
      yearGroup: 'Y6',
      parentName: 'Robert Thompson',
      phone: '07345 678901',
      allergies: 'Dairy allergy',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '9',
      firstName: 'Mia',
      lastName: 'Chen',
      yearGroup: 'Y4',
      parentName: 'Wei Chen',
      phone: '07456 789012',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
        { id: '2', name: 'Piano Basics' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '10',
      firstName: 'Lucas',
      lastName: 'White',
      yearGroup: 'Y7',
      parentName: 'James White',
      phone: '07567 890123',
      allergies: 'Egg allergy',
      hasSevereAllergy: true,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '11',
      firstName: 'Charlotte',
      lastName: 'Lee',
      yearGroup: 'Y5',
      parentName: 'Margaret Lee',
      phone: '07678 901234',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'partial',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '12',
      firstName: 'James',
      lastName: 'Robinson',
      yearGroup: 'Y6',
      parentName: 'Andrew Robinson',
      phone: '07789 012345',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'unpaid',
      enrolledClasses: [
        { id: '1', name: 'French Beginners' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '13',
      firstName: 'Amelia',
      lastName: 'Taylor',
      yearGroup: 'Y4',
      parentName: 'Victoria Taylor',
      phone: '07890 123456',
      allergies: 'Gluten sensitivity',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '2', name: 'Piano Basics' },
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '14',
      firstName: 'Benjamin',
      lastName: 'Anderson',
      yearGroup: 'Y7',
      parentName: 'Christopher Anderson',
      phone: '07901 234567',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '3', name: 'Math Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '15',
      firstName: 'Harper',
      lastName: 'Jackson',
      yearGroup: 'Y8',
      parentName: 'Sandra Jackson',
      phone: '07912 345678',
      allergies: 'Penicillin allergy',
      hasSevereAllergy: true,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '3', name: 'Math Advanced' },
        { id: '4', name: 'Piano Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '16',
      firstName: 'Alexander',
      lastName: 'Harris',
      yearGroup: 'Y5',
      parentName: 'Paul Harris',
      phone: '07923 456789',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '4', name: 'Piano Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '17',
      firstName: 'Evelyn',
      lastName: 'Martin',
      yearGroup: 'Y6',
      parentName: 'Lisa Martin',
      phone: '07934 567890',
      allergies: 'Sesame allergy',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'partial',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '18',
      firstName: 'Mason',
      lastName: 'Clark',
      yearGroup: 'Y4',
      parentName: 'Kevin Clark',
      phone: '07945 678901',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '19',
      firstName: 'Abigail',
      lastName: 'Rodriguez',
      yearGroup: 'Y7',
      parentName: 'Manuel Rodriguez',
      phone: '07956 789012',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'unpaid',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '20',
      firstName: 'Henry',
      lastName: 'Lewis',
      yearGroup: 'Y5',
      parentName: 'Stephen Lewis',
      phone: '07967 890123',
      allergies: 'Latex allergy',
      hasSevereAllergy: true,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '21',
      firstName: 'Grace',
      lastName: 'Walker',
      yearGroup: 'Y6',
      parentName: 'Amanda Walker',
      phone: '07978 901234',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '6', name: 'English Intermediate' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '22',
      firstName: 'Jacob',
      lastName: 'Hall',
      yearGroup: 'Y8',
      parentName: 'Richard Hall',
      phone: '07989 012345',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '7', name: 'Music Theory' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '23',
      firstName: 'Lily',
      lastName: 'Allen',
      yearGroup: 'Y4',
      parentName: 'Jennifer Allen',
      phone: '07890 123456',
      allergies: 'Milk allergy',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '7', name: 'Music Theory' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '24',
      firstName: 'Michael',
      lastName: 'King',
      yearGroup: 'Y7',
      parentName: 'John King',
      phone: '07891 234567',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'na',
      enrolledClasses: [],
      status: 'inactive',
      tutorId: '2',
    },
    {
      id: '25',
      firstName: 'Scarlett',
      lastName: 'Scott',
      yearGroup: 'Y5',
      parentName: 'Michelle Scott',
      phone: '07892 345678',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '2', name: 'Piano Basics' },
        { id: '3', name: 'Math Advanced' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '26',
      firstName: 'Victoria',
      lastName: 'Green',
      yearGroup: 'Y6',
      parentName: 'Elizabeth Green',
      phone: '07893 456789',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '2', name: 'Piano Basics' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '27',
      firstName: 'Samuel',
      lastName: 'Adams',
      yearGroup: 'Y7',
      parentName: 'Thomas Adams',
      phone: '07894 567890',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'partial',
      enrolledClasses: [
        { id: '2', name: 'Piano Basics' },
      ],
      status: 'active',
      tutorId: '1',
    },
    {
      id: '28',
      firstName: 'Eleanor',
      lastName: 'Nelson',
      yearGroup: 'Y4',
      parentName: 'Catherine Nelson',
      phone: '07895 678901',
      allergies: 'Soy allergy',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '3', name: 'Math Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '29',
      firstName: 'William',
      lastName: 'Carter',
      yearGroup: 'Y8',
      parentName: 'Mark Carter',
      phone: '07896 789012',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '3', name: 'Math Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '30',
      firstName: 'Chloe',
      lastName: 'Mitchell',
      yearGroup: 'Y5',
      parentName: 'Rachel Mitchell',
      phone: '07897 890123',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'unpaid',
      enrolledClasses: [
        { id: '4', name: 'Piano Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '31',
      firstName: 'Daniel',
      lastName: 'Perez',
      yearGroup: 'Y6',
      parentName: 'Juan Perez',
      phone: '07898 901234',
      allergies: 'Fish allergy',
      hasSevereAllergy: true,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '4', name: 'Piano Advanced' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '32',
      firstName: 'Sophie',
      lastName: 'Roberts',
      yearGroup: 'Y7',
      parentName: 'Karen Roberts',
      phone: '07899 012345',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '33',
      firstName: 'Nathan',
      lastName: 'Phillips',
      yearGroup: 'Y4',
      parentName: 'George Phillips',
      phone: '07900 123456',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '5', name: 'Spanish 101' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '34',
      firstName: 'Zoe',
      lastName: 'Campbell',
      yearGroup: 'Y8',
      parentName: 'Nancy Campbell',
      phone: '07901 234567',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: false,
      paymentStatus: 'partial',
      enrolledClasses: [
        { id: '7', name: 'Music Theory' },
      ],
      status: 'active',
      tutorId: '2',
    },
    {
      id: '35',
      firstName: 'Ryan',
      lastName: 'Parker',
      yearGroup: 'Y5',
      parentName: 'Patricia Parker',
      phone: '07902 345678',
      allergies: 'None',
      hasSevereAllergy: false,
      hasBook: true,
      paymentStatus: 'paid',
      enrolledClasses: [
        { id: '7', name: 'Music Theory' },
      ],
      status: 'active',
      tutorId: '2',
    },
  ];

  // Filter students based on role
  const visibleStudents = userRole === 'tutor'
    ? mockStudents.filter(s => s.tutorId === '1')
    : mockStudents;

  // Get all unique classes for filter dropdown
  const allClasses = Array.from(
    new Set(visibleStudents.flatMap(s => s.enrolledClasses.map(c => c.name)))
  ).sort();

  // Apply filters
  let filteredStudents = visibleStudents.filter(student => {
    // Search filter
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    // Class filter
    const matchesClass = !filterClass ||
                         student.enrolledClasses.some(c => c.name === filterClass);

    // Status filter
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const [localStudents, setLocalStudents] = useState(filteredStudents);

  // Remove student from class
  const removeFromClass = (studentId: string, className: string) => {
    setLocalStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            enrolledClasses: student.enrolledClasses.filter(c => c.name !== className),
            status: student.enrolledClasses.length <= 1 ? 'inactive' : 'active',
          };
        }
        return student;
      })
    );
  };

  // Update filtered students when filters change
  React.useEffect(() => {
    let filtered = visibleStudents.filter(student => {
      const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = !filterClass ||
                           student.enrolledClasses.some(c => c.name === filterClass);
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
    setLocalStudents(filtered);
  }, [searchTerm, filterClass, filterStatus, visibleStudents]);

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
                item.name === 'Students'
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
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <button className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition">
              Create New
            </button>
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
          <div className="p-4 max-w-7xl mx-auto">

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Search by Name</label>
                  <div className="relative">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                      >
                        <XIcon />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter by Class */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Class</label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">All Classes</option>
                    {allClasses.map(cls => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Students</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>

                {/* Results */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Results</label>
                  <div className="flex items-center h-10 px-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-600 font-medium">
                      {localStudents.length} {localStudents.length === 1 ? 'student' : 'students'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-1 text-left font-semibold text-gray-700 text-xs">Name</th>
                      <th className="px-4 py-1 text-center font-semibold text-gray-700 text-xs">Year</th>
                      <th className="px-6 py-1 text-left font-semibold text-gray-700 text-xs">Allergies / Medical</th>
                      <th className="px-4 py-1 text-center font-semibold text-gray-700 text-xs">Book?</th>
                      <th className="px-4 py-1 text-center font-semibold text-gray-700 text-xs">Paid?</th>
                      <th className="px-6 py-1 text-left font-semibold text-gray-700 min-w-64 text-xs">Classes</th>
                      <th className="px-4 py-1 text-center font-semibold text-gray-700 text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localStudents.length > 0 ? (
                      localStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          {/* Name */}
                          <td className="px-6 py-1">
                            <div className="font-semibold text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </td>

                          {/* Year Group */}
                          <td className="px-4 py-1 text-center text-gray-600">
                            {student.yearGroup}
                          </td>

                          {/* Allergies / Medical */}
                          <td className="px-6 py-1">
                            <div className={`text-xs ${student.hasSevereAllergy ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                              {student.allergies === 'None' ? (
                                <span className="text-gray-400">None</span>
                              ) : (
                                student.allergies
                              )}
                            </div>
                          </td>

                          {/* Has Book */}
                          <td className="px-4 py-1 text-center text-lg">
                            {student.hasBook === true && '✅'}
                            {student.hasBook === false && '❌'}
                            {student.hasBook === null && '—'}
                          </td>

                          {/* Payment Status */}
                          <td className={`px-4 py-2 text-center text-lg font-semibold ${getPaymentColor(student.paymentStatus)}`}>
                            {getPaymentSymbol(student.paymentStatus)}
                          </td>

                          {/* Classes */}
                          <td className="px-6 py-1">
                            {student.enrolledClasses.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {student.enrolledClasses.map((cls) => (
                                  <span
                                    key={cls.id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200"
                                  >
                                    {cls.name}
                                    <button
                                      onClick={() => removeFromClass(student.id, cls.name)}
                                      className="text-blue-600 hover:text-red-600 transition"
                                      title={`Remove from ${cls.name}`}
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">No classes</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 text-center">
                            <button
                              className="text-gray-600 hover:text-red-600 transition p-1"
                              title="Delete student"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="text-gray-500 text-sm">
                            No students found matching your filters.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            {localStudents.length > 0 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-sm text-gray-600 font-medium">Total Students</div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">{localStudents.length}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-sm text-gray-600 font-medium">Active</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    {localStudents.filter(s => s.status === 'active').length}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-sm text-gray-600 font-medium">With Allergies</div>
                  <div className="text-2xl font-bold text-orange-600 mt-2">
                    {localStudents.filter(s => s.allergies !== 'None').length}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-sm text-gray-600 font-medium">Missing Books</div>
                  <div className="text-2xl font-bold text-red-600 mt-2">
                    {localStudents.filter(s => s.hasBook === false).length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
