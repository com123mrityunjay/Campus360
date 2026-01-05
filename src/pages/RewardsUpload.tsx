import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import type { Reward } from '../types';
import { Upload, CheckCircle, Plus, X } from 'lucide-react';

const RewardsUpload = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: '',
      points: 0,
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addReward = () => {
    setRewards([
      ...rewards,
      {
        id: Date.now().toString(),
        title: '',
        points: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      },
    ]);
  };

  const removeReward = (id: string) => {
    setRewards(rewards.filter((r) => r.id !== id));
  };

  const updateReward = (id: string, field: keyof Reward, value: any) => {
    setRewards(
      rewards.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validRewards = rewards.filter(
      (r) => r.title && r.category && r.points > 0
    );

    if (validRewards.length === 0) {
      alert('Please add at least one valid reward');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await adminAPI.uploadRewards(validRewards);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Failed to upload rewards:', error);
      alert('Failed to upload rewards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rewards Uploaded Successfully!</h2>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Rewards</h1>
        <p className="text-gray-600 mt-1">Upload rewards and points for students</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {rewards.map((reward, index) => (
              <div key={reward.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Reward #{index + 1}</h3>
                  {rewards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReward(reward.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      value={reward.title}
                      onChange={(e) => updateReward(reward.id, 'title', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      className="input-field"
                      value={reward.category}
                      onChange={(e) => updateReward(reward.id, 'category', e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="academics">Academics</option>
                      <option value="sports">Sports</option>
                      <option value="clubs">Clubs</option>
                      <option value="cultural">Cultural</option>
                      <option value="research">Research</option>
                      <option value="institutional">Institutional Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="input-field"
                      value={reward.points}
                      onChange={(e) => updateReward(reward.id, 'points', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      className="input-field"
                      value={reward.date}
                      onChange={(e) => updateReward(reward.id, 'date', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    value={reward.description}
                    onChange={(e) => updateReward(reward.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addReward}
            className="btn-secondary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Reward
          </button>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              {loading ? 'Uploading...' : 'Upload Rewards'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RewardsUpload;

