import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import type { StudentProfile, Group } from '../types';
import { Users, ArrowLeft, User } from 'lucide-react';

const GroupView = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groups = await adminAPI.getGroups();
        const foundGroup = groups.find((g) => g.id === groupId);
        if (foundGroup) {
          setGroup(foundGroup);
          const studentProfiles = await adminAPI.getGroupStats(groupId || '');
          setProfiles(studentProfiles);
        }
      } catch (error) {
        console.error('Failed to fetch group data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!group) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Group not found</p>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const totalPoints = profiles.reduce((sum, p) => sum + p.totalPoints, 0);
  const totalAchievements = profiles.reduce(
    (sum, p) => sum + p.sports.length + p.clubs.length + p.cultural.length + p.research.length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
          <p className="text-gray-600 mt-1">{group.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-primary-600">{profiles.length}</p>
            </div>
            <Users className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Achievements</p>
              <p className="text-3xl font-bold text-green-600">{totalAchievements}</p>
            </div>
            <User className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-3xl font-bold text-purple-600">{totalPoints}</p>
            </div>
            <Users className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Students in Group</h2>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <Link
              key={profile.studentId}
              to={`/student/${profile.studentId}`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-gray-600">
                    {profile.programme} • Batch {profile.batch} • {profile.studentId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">{profile.totalPoints} pts</p>
                  <p className="text-sm text-gray-600">
                    {profile.sports.length +
                      profile.clubs.length +
                      profile.cultural.length +
                      profile.research.length}{' '}
                    achievements
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {profiles.length === 0 && (
            <p className="text-center text-gray-500 py-8">No students in this group</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupView;

