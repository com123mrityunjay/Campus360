export type UserRole = 'student' | 'admin' | 'registrar' | 'dean' | 'hod';

export const PROGRAMMES = ['MTech', 'iMTech', 'BTech'] as const;
export type Programme = typeof PROGRAMMES[number];

export const GENDERS = ['Male', 'Female'] as const;
export type Gender = typeof GENDERS[number];

export const GRADES = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'] as const;
export type Grade = typeof GRADES[number];

export const GRADE_TO_CGPA: Record<Grade, number> = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.4,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.4,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0,
};

export const getCGPAFromGrade = (grade: Grade): number => {
  return GRADE_TO_CGPA[grade];
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  programme?: string;
  batch?: string;
  gender?: string;
}

export interface AcademicRecord {
  id: string;
  semester: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: Grade;
  cgpa: number;
}

export interface SportsAchievement {
  id: string;
  type: 'internal' | 'external';
  event: string;
  position: string;
  date: string;
  description: string;
  certificate?: string;
}

export interface ClubActivity {
  id: string;
  clubName: string;
  role: string;
  type: 'internal' | 'external';
  achievement?: string;
  date: string;
  description: string;
}

export interface CulturalActivity {
  id: string;
  category: 'music' | 'theater' | 'dance' | 'art' | 'other';
  event: string;
  role: string;
  date: string;
  description: string;
  achievement?: string;
}

export interface ResearchWork {
  id: string;
  title: string;
  type: 'paper' | 'conference' | 'patent' | 'other';
  venue?: string;
  date: string;
  authors: string[];
  description: string;
  link?: string;
}

export interface InstitutionalService {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  category: string;
  date: string;
  description: string;
}

export interface StudentProfile {
  studentId: string;
  name: string;
  email: string;
  programme: string;
  batch: string;
  gender: string;
  academics: AcademicRecord[];
  sports: SportsAchievement[];
  clubs: ClubActivity[];
  cultural: CulturalActivity[];
  research: ResearchWork[];
  institutionalService: InstitutionalService[];
  rewards: Reward[];
  totalPoints: number;
}

export interface BatchStats {
  programme: string;
  year: string;
  batch: string; // Combined format: "programme year" (e.g., "MTech 2022")
  totalStudents: number;
  averageCGPA: number;
  totalAchievements: number;
  totalPoints: number;
}

export interface ProgrammeStats {
  programme: string;
  totalStudents: number;
  averageCGPA: number;
  totalAchievements: number;
  totalPoints: number;
}

export interface GenderStats {
  gender: string;
  totalStudents: number;
  averageCGPA: number;
  totalAchievements: number;
  totalPoints: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  createdBy: string;
  createdAt: string;
}

