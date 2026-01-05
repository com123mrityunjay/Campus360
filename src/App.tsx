import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentProfile from './pages/StudentProfile';
import AdminStudentView from './pages/AdminStudentView';
import BatchView from './pages/BatchView';
import ProgrammeView from './pages/ProgrammeView';
import GenderView from './pages/GenderView';
import GroupView from './pages/GroupView';
import DataUpload from './pages/DataUpload';
import RewardsUpload from './pages/RewardsUpload';
import AchievementUpload from './pages/AchievementUpload';
import RewardsDashboard from './pages/RewardsDashboard';
import Layout from './components/Layout';

const PrivateRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {user?.role === 'student' ? (
          <>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="achievements/upload" element={<AchievementUpload />} />
            <Route path="rewards" element={<RewardsDashboard />} />
          </>
        ) : (
          <>
            <Route index element={<AdminDashboard />} />
            <Route path="student/:studentId" element={<AdminStudentView />} />
            <Route path="batch/:programme/:year" element={<BatchView />} />
            <Route path="programme/:programme" element={<ProgrammeView />} />
            <Route path="gender/:gender" element={<GenderView />} />
            <Route path="group/:groupId" element={<GroupView />} />
            <Route path="upload" element={<DataUpload />} />
            <Route path="rewards/upload" element={<RewardsUpload />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

