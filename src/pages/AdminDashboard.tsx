import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  UserCheck,
  Upload,
  Award,
  BarChart3,
  Search,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROGRAMMES, GENDERS } from '../types';

const AdminDashboard = () => {
  const [searchStudentId, setSearchStudentId] = useState('');
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchStudentId) {
      navigate(`/student/${searchStudentId}`);
    }
  };

  const quickActions = [
    {
      title: 'View Student Profile',
      description: 'Search and view individual student 360° profile',
      icon: UserCheck,
      color: 'bg-blue-500',
      link: null,
      action: 'search',
    },
    {
      title: 'Upload Data',
      description: 'Upload general purpose data and records',
      icon: Upload,
      color: 'bg-orange-500',
      link: '/upload',
    },
    {
      title: 'Upload Rewards',
      description: 'Upload rewards and points for students',
      icon: Award,
      color: 'bg-indigo-500',
      link: '/rewards/upload',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and view student data across all dimensions</p>
      </div>

      <div className="card">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Student by ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                id="search"
                type="text"
                className="input-field pl-10"
                placeholder="Enter Student ID (e.g., STU001)"
                value={searchStudentId}
                onChange={(e) => setSearchStudentId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.title} className="card hover:shadow-lg transition-shadow">
              {action.link ? (
                <Link to={action.link} className="block">
                  <div className={`${action.color} p-4 rounded-lg mb-4 inline-block`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </Link>
              ) : action.action === 'search' ? (
                <div
                  onClick={() => searchInputRef.current?.focus()}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      searchInputRef.current?.focus();
                    }
                  }}
                >
                  <div className={`${action.color} p-4 rounded-lg mb-4 inline-block`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              ) : (
                <div>
                  <div className={`${action.color} p-4 rounded-lg mb-4 inline-block`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Programme Views</h2>
        <p className="text-gray-600 mb-4">View statistics and analytics by programme</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROGRAMMES.map((programme) => (
            <Link
              key={programme}
              to={`/programme/${programme}`}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
            >
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{programme}</h3>
                  <p className="text-sm text-gray-600">View Statistics</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Gender Views</h2>
        <p className="text-gray-600 mb-4">View statistics and analytics by gender</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GENDERS.map((gender) => (
            <Link
              key={gender}
              to={`/gender/${gender}`}
              className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-200"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-pink-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{gender}</h3>
                  <p className="text-sm text-gray-600">View Statistics</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Batch Views</h2>
        <p className="text-gray-600 mb-4">View statistics and analytics by programme and year</p>
        <div className="space-y-6">
          {PROGRAMMES.map((programme) => {
            // Generate years from 2020 to current year + 1
            const currentYear = new Date().getFullYear();
            const years = Array.from({ length: currentYear - 2019 + 1 }, (_, i) => (2020 + i).toString());
            
            return (
              <div key={programme} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{programme}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {years.map((year) => (
                    <Link
                      key={`${programme}-${year}`}
                      to={`/batch/${programme}/${year}`}
                      className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-center"
                    >
                      <p className="text-sm font-medium text-gray-900">{year}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">1,200+</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">3.68</p>
            <p className="text-sm text-gray-600">Average CGPA</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">5,000+</p>
            <p className="text-sm text-gray-600">Total Achievements</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">150K+</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

