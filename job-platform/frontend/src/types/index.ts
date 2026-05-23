// User roles
export type UserRole = 'candidate' | 'employer';

// Candidate status
export type CandidateStatus = 'actively_looking' | 'not_looking';

// Education levels
export type EducationLevel = 
  | 'secondary' 
  | 'secondary_special' 
  | 'incomplete_higher' 
  | 'higher' 
  | 'bachelor' 
  | 'master' 
  | 'phd' 
  | 'doctor';

// Driver license categories
export type LicenseCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'BE' | 'CE' | 'DE' | 'TM' | 'TB';

// City interface
export interface City {
  id: string;
  name: string;
  country: string;
  isPopular: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// User interface
export interface User {
  id: string;
  email?: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Candidate profile
export interface CandidateProfile {
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  status: CandidateStatus;
  cityId?: string;
  contactsHidden: boolean;
  contacts?: CandidateContacts;
  education?: Education[];
  driverInfo?: DriverInfo;
  workExperiences?: WorkExperience[];
}

// Candidate contacts
export interface CandidateContacts {
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  viber?: string;
  email?: string;
}

// Education
export interface Education {
  id?: string;
  candidateId: string;
  level: EducationLevel;
  institutionName: string;
  faculty?: string;
  specialization?: string;
  graduationCode?: string;
}

// Driver info
export interface DriverInfo {
  candidateId: string;
  hasOwnCar: boolean;
  licenseCategories: LicenseCategory[];
}

// Work experience
export interface WorkExperience {
  id?: string;
  candidateId: string;
  companyName: string;
  position: string;
  startMonth: number;
  startYear: number;
  endMonth?: number;
  endYear?: number;
  isCurrentJob: boolean;
  responsibilities: string;
}

// Employer profile
export interface EmployerProfile {
  userId: string;
  companyName: string;
  balance: number;
  defaultCardToken?: string;
}

// Transaction
export interface Transaction {
  id: string;
  employerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paymentMethodToken?: string;
  createdAt: string;
}

// Auth types
export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
