import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../services/api';
import { Upload, CheckCircle } from 'lucide-react';

const AchievementUpload = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'sports' | 'clubs' | 'cultural' | 'research' | 'institutional'>(
    'sports'
  );
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await studentAPI.uploadAchievement({ type, achievement: formData });
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('Failed to upload achievement:', error);
      alert('Failed to upload achievement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'sports':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name *
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.event || ''}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                required
                className="input-field"
                value={formData.type || 'internal'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., 1st Place, 2nd Place"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );

      case 'clubs':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Club Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.clubName || ''}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., President, Member"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                required
                className="input-field"
                value={formData.type || 'internal'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Achievement</label>
              <input
                type="text"
                className="input-field"
                value={formData.achievement || ''}
                onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
              />
            </div>
          </>
        );

      case 'cultural':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.event || ''}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                required
                className="input-field"
                value={formData.category || 'music'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="music">Music</option>
                <option value="theater">Theater</option>
                <option value="dance">Dance</option>
                <option value="art">Art</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., Lead Singer, Actor"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );

      case 'research':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                required
                className="input-field"
                value={formData.type || 'paper'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="paper">Paper</option>
                <option value="conference">Conference</option>
                <option value="patent">Patent</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input
                type="text"
                className="input-field"
                value={formData.venue || ''}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Authors *</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Comma-separated names"
                value={formData.authors || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authors: e.target.value.split(',').map((a: string) => a.trim()),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="url"
                className="input-field"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );

      case 'institutional':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization *</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., SAC, Student Council"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievement Uploaded!</h2>
        <p className="text-gray-600">Redirecting to your profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Achievement</h1>
        <p className="text-gray-600 mt-1">Add your achievements to your profile</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievement Type *
            </label>
            <select
              required
              className="input-field"
              value={type}
              onChange={(e) => {
                setType(e.target.value as any);
                setFormData({});
              }}
            >
              <option value="sports">Sports</option>
              <option value="clubs">Clubs</option>
              <option value="cultural">Cultural</option>
              <option value="research">Research</option>
              <option value="institutional">Institutional Service</option>
            </select>
          </div>

          {renderFormFields()}

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              {loading ? 'Uploading...' : 'Upload Achievement'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
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

export default AchievementUpload;

