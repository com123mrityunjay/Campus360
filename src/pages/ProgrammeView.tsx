import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import type { ProgrammeStats } from '../types';
import { GraduationCap, TrendingUp, Award, BarChart3, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgrammeView = () => {
  const { programme } = useParams<{ programme: string }>();
  const [stats, setStats] = useState<ProgrammeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getProgrammeStats(programme || '');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch programme stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (programme) {
      fetchStats();
    }
  }, [programme]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Programme statistics not found</p>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const chartData = [
    { name: 'Students', value: stats.totalStudents },
    { name: 'Achievements', value: stats.totalAchievements },
    { name: 'Points', value: stats.totalPoints / 100 }, // Scaled for visualization
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{programme} Programme Statistics</h1>
          <p className="text-gray-600 mt-1">Comprehensive view of programme performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-primary-600">{stats.totalStudents}</p>
            </div>
            <GraduationCap className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average CGPA</p>
              <p className="text-3xl font-bold text-green-600">{stats.averageCGPA.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Achievements</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalAchievements}</p>
            </div>
            <Award className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-3xl font-bold text-orange-600">{stats.totalPoints}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Programme Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Achievements per Student</p>
            <p className="text-2xl font-bold text-blue-600">
              {(stats.totalAchievements / stats.totalStudents).toFixed(1)}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Points per Student</p>
            <p className="text-2xl font-bold text-green-600">
              {(stats.totalPoints / stats.totalStudents).toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeView;

