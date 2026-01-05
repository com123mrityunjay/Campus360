import axios from 'axios';
import type {
  User,
  StudentProfile,
  Reward,
  BatchStats,
  ProgrammeStats,
  GenderStats,
  Group,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: async (email: string, _password: string): Promise<{ user: User; token: string }> => {
    // Dummy implementation
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Mrityunjay Jha',
        email: 'student@iiitb.ac.in',
        role: 'student',
        studentId: 'STU001',
        programme: 'MTech',
        batch: 'MTech 2022',
        gender: 'Male',
      },
      {
        id: '2',
        name: 'Admin User',
        email: 'admin@iiitb.ac.in',
        role: 'admin',
      },
    ];

    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    
    return { user, token: 'mock-token-' + user.id };
  },

  getCurrentUser: async (): Promise<User> => {
    // Dummy implementation
    return {
      id: '1',
      name: 'Mrityunjay Jha',
      email: 'student@iiitb.ac.in',
      role: 'student',
      studentId: 'STU001',
      programme: 'MTech',
      batch: 'MTech 2022',
      gender: 'Male',
    };
  },
};

// Helper functions for localStorage
const getStoredAchievements = (studentId: string) => {
  const key = `achievements_${studentId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : { sports: [], clubs: [], cultural: [], research: [], institutional: [] };
};

const saveAchievement = (studentId: string, type: string, achievement: any) => {
  const key = `achievements_${studentId}`;
  const stored = getStoredAchievements(studentId);
  const newAchievement = {
    id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...achievement,
  };
  stored[type] = [...(stored[type] || []), newAchievement];
  localStorage.setItem(key, JSON.stringify(stored));
  return newAchievement;
};

const getStoredRewards = (studentId: string) => {
  const key = `rewards_${studentId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const saveRewards = (rewards: Reward[]) => {
  // Store rewards globally - in a real app, these would be assigned to specific students
  const key = 'uploaded_rewards';
  const existing = localStorage.getItem(key);
  const existingRewards = existing ? JSON.parse(existing) : [];
  const newRewards = rewards.map(r => ({
    ...r,
    id: r.id || `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }));
  const allRewards = [...existingRewards, ...newRewards];
  localStorage.setItem(key, JSON.stringify(allRewards));
  
  // For demo purposes, also add to the current student's profile
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const studentId = user.studentId || 'STU001';
    const studentRewards = getStoredRewards(studentId);
    localStorage.setItem(`rewards_${studentId}`, JSON.stringify([...studentRewards, ...newRewards]));
  }
};

// Student API
export const studentAPI = {
  getProfile: async (studentId?: string): Promise<StudentProfile> => {
    const sid = studentId || 'STU001';
    const storedAchievements = getStoredAchievements(sid);
    const storedRewards = getStoredRewards(sid);
    
    // Dummy data
    const profile: StudentProfile = {
      studentId: studentId || 'STU001',
      name: 'Mrityunjay Jha',
      email: 'student@iiitb.ac.in',
      programme: 'MTech',
      batch: 'MTech 2022',
      gender: 'Male',
      academics: [
        {
          id: '1',
          semester: 'Fall 2022',
          courseCode: 'CS501',
          courseName: 'Advanced Algorithms',
          credits: 3,
          grade: 'A',
          cgpa: 4.0,
        },
        {
          id: '2',
          semester: 'Fall 2022',
          courseCode: 'CS502',
          courseName: 'Machine Learning',
          credits: 3,
          grade: 'A-',
          cgpa: 3.7,
        },
      ],
      sports: [
        {
          id: '1',
          type: 'internal',
          event: 'Inter-Batch Cricket Tournament',
          position: '1st Place',
          date: '2023-03-15',
          description: 'Led the team to victory',
        },
        {
          id: '2',
          type: 'external',
          event: 'State Level Badminton Championship',
          position: '2nd Place',
          date: '2023-05-20',
          description: 'Represented IIIT-B',
        },
        ...(storedAchievements.sports || []),
      ],
      clubs: [
        {
          id: '1',
          clubName: 'Coding Club',
          role: 'President',
          type: 'internal',
          date: '2023-01-01',
          description: 'Leading coding competitions and workshops',
          achievement: 'Organized Hackathon 2023',
        },
        ...(storedAchievements.clubs || []),
      ],
      cultural: [
        {
          id: '1',
          category: 'music',
          event: 'Annual Cultural Fest',
          role: 'Lead Singer',
          date: '2023-04-10',
          description: 'Performed in the main event',
        },
        ...(storedAchievements.cultural || []),
      ],
      research: [
        {
          id: '1',
          title: 'Deep Learning for Image Recognition',
          type: 'paper',
          venue: 'IEEE Conference',
          date: '2023-06-01',
          authors: ['Mrityunjay Jha', 'Prof. Smith'],
          description: 'Published research paper',
          link: 'https://example.com/paper',
        },
        ...(storedAchievements.research || []),
      ],
      institutionalService: [
        {
          id: '1',
          organization: 'Student Affairs Council',
          role: 'Member',
          startDate: '2023-01-01',
          description: 'Active member of SAC',
        },
        ...(storedAchievements.institutional || []),
      ],
      rewards: [
        {
          id: '1',
          title: 'Excellence in Academics',
          points: 100,
          category: 'academics',
          date: '2023-06-01',
          description: 'Top performer in semester',
        },
        {
          id: '2',
          title: 'Sports Achievement',
          points: 50,
          category: 'sports',
          date: '2023-03-15',
          description: 'Cricket tournament winner',
        },
        ...storedRewards,
      ],
      totalPoints: 150 + storedRewards.reduce((sum: number, r: Reward) => sum + (r.points || 0), 0),
    };
    return profile;
  },

  uploadAchievement: async (data: {
    type: 'sports' | 'clubs' | 'cultural' | 'research' | 'institutional';
    achievement: any;
  }): Promise<void> => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      throw new Error('User not logged in');
    }
    const user = JSON.parse(storedUser);
    const studentId = user.studentId || 'STU001';
    
    // Save achievement to localStorage
    saveAchievement(studentId, data.type, data.achievement);
    return Promise.resolve();
  },
};

// Admin API
export const adminAPI = {
  getStudentProfile: async (studentId: string): Promise<StudentProfile> => {
    return studentAPI.getProfile(studentId);
  },

  getBatchStats: async (programme: string, year: string): Promise<BatchStats> => {
    // Dummy data
    const batch = `${programme} ${year}`;
    return {
      programme,
      year,
      batch,
      totalStudents: 120,
      averageCGPA: 3.65,
      totalAchievements: 450,
      totalPoints: 12000,
    };
  },

  getProgrammeStats: async (programme: string): Promise<ProgrammeStats> => {
    // Dummy data
    return {
      programme,
      totalStudents: 300,
      averageCGPA: 3.7,
      totalAchievements: 1200,
      totalPoints: 35000,
    };
  },

  getGenderStats: async (gender: string): Promise<GenderStats> => {
    // Dummy data
    return {
      gender,
      totalStudents: 150,
      averageCGPA: 3.68,
      totalAchievements: 600,
      totalPoints: 18000,
    };
  },

  getGroupStats: async (_groupId: string): Promise<StudentProfile[]> => {
    // Dummy data - return multiple student profiles
    const profiles: StudentProfile[] = [];
    for (let i = 1; i <= 5; i++) {
      const profile = await studentAPI.getProfile(`STU00${i}`);
      profiles.push(profile);
    }
    return profiles;
  },

  uploadData: async (data: {
    type: string;
    records: any[];
  }): Promise<void> => {
    // Store uploaded data in localStorage
    // For now, we'll store it but it won't automatically merge with student profiles
    // In a real implementation, this would be processed and assigned to specific students
    const key = `uploaded_data_${data.type}`;
    const existing = localStorage.getItem(key);
    const existingRecords = existing ? JSON.parse(existing) : [];
    const newRecords = [...existingRecords, ...data.records];
    localStorage.setItem(key, JSON.stringify(newRecords));
    console.log('Uploaded data stored:', data.type, data.records.length, 'records');
    return Promise.resolve();
  },

  uploadRewards: async (rewards: Reward[]): Promise<void> => {
    // Save rewards to localStorage
    saveRewards(rewards);
    return Promise.resolve();
  },

  createGroup: async (group: Omit<Group, 'id' | 'createdAt'>): Promise<Group> => {
    // Dummy implementation
    return {
      id: 'group-' + Date.now(),
      ...group,
      createdAt: new Date().toISOString(),
    };
  },

  getGroups: async (): Promise<Group[]> => {
    // Dummy data
    return [
      {
        id: '1',
        name: 'MTech 2022 Batch',
        description: 'All MTech students from 2022 batch',
        studentIds: ['STU001', 'STU002', 'STU003'],
        createdBy: 'admin',
        createdAt: '2023-01-01',
      },
    ];
  },
};

export default api;

