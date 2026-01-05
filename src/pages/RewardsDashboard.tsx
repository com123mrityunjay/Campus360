import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { studentAPI } from '../services/api';
import type { Reward } from '../types';
import { Award, Calendar, TrendingUp } from 'lucide-react';

const RewardsDashboard = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const profile = await studentAPI.getProfile(user?.studentId);
        setRewards(profile.rewards);
        setTotalPoints(profile.totalPoints);
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.studentId) {
      fetchRewards();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const rewardsByCategory = rewards.reduce((acc, reward) => {
    if (!acc[reward.category]) {
      acc[reward.category] = 0;
    }
    acc[reward.category] += reward.points;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rewards & Points</h1>
        <p className="text-gray-600 mt-1">Track your achievements and rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-3xl font-bold text-primary-600">{totalPoints}</p>
            </div>
            <Award className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Rewards</p>
              <p className="text-3xl font-bold text-green-600">{rewards.length}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-purple-600">
                {Object.keys(rewardsByCategory).length}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Points by Category</h2>
        <div className="space-y-3">
          {Object.entries(rewardsByCategory).map(([category, points]) => (
            <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium capitalize">{category}</span>
              <span className="text-primary-600 font-bold">{points} pts</span>
            </div>
          ))}
          {Object.keys(rewardsByCategory).length === 0 && (
            <p className="text-gray-500 text-center py-4">No rewards yet</p>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">All Rewards</h2>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-lg">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full capitalize">
                        {reward.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {reward.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-primary-600">+{reward.points}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
          {rewards.length === 0 && (
            <p className="text-gray-500 text-center py-8">No rewards yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsDashboard;

