import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { studentAPI } from '../services/api';
import type { StudentProfile } from '../types';
import {
  BookOpen,
  Trophy,
  Users,
  Music,
  Microscope,
  Building2,
  Calendar,
  Award,
} from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [activeTab, setActiveTab] = useState('academics');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentAPI.getProfile(user?.studentId);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.studentId) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center py-12">No profile data available</div>;
  }

  const tabs = [
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'clubs', label: 'Clubs', icon: Users },
    { id: 'cultural', label: 'Cultural', icon: Music },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'service', label: 'Institutional Service', icon: Building2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'academics':
        return (
          <div className="space-y-4">
            {profile.academics.map((record) => (
              <div key={record.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{record.courseName}</h3>
                    <p className="text-sm text-gray-600">{record.courseCode}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">Semester: {record.semester}</span>
                      <span className="text-sm text-gray-600">Credits: {record.credits}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{record.grade}</p>
                    <p className="text-sm text-gray-600">CGPA: {record.cgpa}</p>
                  </div>
                </div>
              </div>
            ))}
            {profile.academics.length === 0 && (
              <p className="text-center text-gray-500 py-8">No academic records</p>
            )}
          </div>
        );

      case 'sports':
        return (
          <div className="space-y-4">
            {profile.sports.map((sport) => (
              <div key={sport.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{sport.event}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          sport.type === 'internal'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {sport.type === 'internal' ? 'Internal' : 'External'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{sport.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {sport.position}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {sport.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {profile.sports.length === 0 && (
              <p className="text-center text-gray-500 py-8">No sports achievements</p>
            )}
          </div>
        );

      case 'clubs':
        return (
          <div className="space-y-4">
            {profile.clubs.map((club) => (
              <div key={club.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{club.clubName}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          club.type === 'internal'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {club.type === 'internal' ? 'Internal' : 'External'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Role: {club.role}</p>
                    <p className="text-sm text-gray-600">{club.description}</p>
                    {club.achievement && (
                      <p className="text-sm text-primary-600 mt-1">
                        Achievement: {club.achievement}
                      </p>
                    )}
                    <span className="text-sm text-gray-600 flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {club.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {profile.clubs.length === 0 && (
              <p className="text-center text-gray-500 py-8">No club activities</p>
            )}
          </div>
        );

      case 'cultural':
        return (
          <div className="space-y-4">
            {profile.cultural.map((activity) => (
              <div key={activity.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{activity.event}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-pink-100 text-pink-800">
                        {activity.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Role: {activity.role}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    {activity.achievement && (
                      <p className="text-sm text-primary-600 mt-1">
                        Achievement: {activity.achievement}
                      </p>
                    )}
                    <span className="text-sm text-gray-600 flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {activity.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {profile.cultural.length === 0 && (
              <p className="text-center text-gray-500 py-8">No cultural activities</p>
            )}
          </div>
        );

      case 'research':
        return (
          <div className="space-y-4">
            {profile.research.map((work) => (
              <div key={work.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{work.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">Type: {work.type}</p>
                    {work.venue && (
                      <p className="text-sm text-gray-600">Venue: {work.venue}</p>
                    )}
                    <p className="text-sm text-gray-600">{work.description}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Authors: {work.authors.join(', ')}
                    </p>
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline mt-1 block"
                      >
                        View Publication
                      </a>
                    )}
                    <span className="text-sm text-gray-600 flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {work.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {profile.research.length === 0 && (
              <p className="text-center text-gray-500 py-8">No research works</p>
            )}
          </div>
        );

      case 'service':
        return (
          <div className="space-y-4">
            {profile.institutionalService.map((service) => (
              <div key={service.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{service.organization}</h3>
                    <p className="text-sm text-gray-600 mt-1">Role: {service.role}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">
                        Start: {service.startDate}
                      </span>
                      {service.endDate && (
                        <span className="text-sm text-gray-600">End: {service.endDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {profile.institutionalService.length === 0 && (
              <p className="text-center text-gray-500 py-8">No institutional service records</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600 mt-1">
              {profile.programme} • Batch {profile.batch} • {profile.gender}
            </p>
            <p className="text-gray-600">Student ID: {profile.studentId}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-primary-600" />
              <span className="text-2xl font-bold text-primary-600">{profile.totalPoints}</span>
            </div>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentProfile;

