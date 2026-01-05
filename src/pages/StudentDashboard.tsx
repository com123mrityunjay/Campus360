import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  Award,
  TrendingUp,
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
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

  const stats = [
    {
      label: 'Academic Records',
      value: profile.academics.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Sports Achievements',
      value: profile.sports.length,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Club Activities',
      value: profile.clubs.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Cultural Activities',
      value: profile.cultural.length,
      icon: Music,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      label: 'Research Works',
      value: profile.research.length,
      icon: Microscope,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      label: 'Institutional Service',
      value: profile.institutionalService.length,
      icon: Building2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  const averageCGPA =
    profile.academics.length > 0
      ? profile.academics.reduce((sum, a) => sum + a.cgpa, 0) / profile.academics.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.name}!</h1>
          <p className="text-gray-600 mt-1">Your 360° Campus Profile</p>
        </div>
        <Link to="/profile" className="btn-primary">
          View Full Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-3xl font-bold text-primary-600">{profile.totalPoints}</p>
            </div>
            <Award className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average CGPA</p>
              <p className="text-3xl font-bold text-green-600">{averageCGPA.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Achievements</p>
              <p className="text-3xl font-bold text-purple-600">
                {profile.sports.length +
                  profile.clubs.length +
                  profile.cultural.length +
                  profile.research.length}
              </p>
            </div>
            <Trophy className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Rewards</h2>
        <div className="space-y-3">
          {profile.rewards.slice(0, 3).map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{reward.title}</p>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-600">+{reward.points} pts</p>
                <p className="text-xs text-gray-500">{reward.date}</p>
              </div>
            </div>
          ))}
          {profile.rewards.length === 0 && (
            <p className="text-gray-500 text-center py-4">No rewards yet</p>
          )}
        </div>
        <Link to="/rewards" className="block text-center mt-4 text-primary-600 hover:underline">
          View All Rewards
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;

