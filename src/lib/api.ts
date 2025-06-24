// API base URL - automatically detects environment
const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: Same domain (Railway serves both frontend and backend)
  : 'http://localhost:3004/api';  // Development: localhost backend

// User type definition
export interface User {
  _id: string;
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  accountType: string;
  accountManager: string;
  supportLevel: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  nextBillingDate: string;
  isEmailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// Backend response structure
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: string[];
}

// Auth responses
interface AuthResponse {
  user: User;
  token: string;
}

// Signup data
export interface SignupData {
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  password: string;
  confirmPassword: string;
}

// Login data
export interface LoginData {
  email: string;
  password: string;
}

// Error handling
export class ApiError extends Error {
  status: number;
  errors?: string[];
  
  constructor(message: string, status: number, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

// Helper function for making API requests
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make the request
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
    });
    
    // Parse response data
    const responseData: ApiResponse<T> = await response.json();
    
    // Handle error responses
    if (!response.ok) {
      throw new ApiError(
        responseData.message || 'Something went wrong', 
        response.status,
        responseData.errors
      );
    }
    
    // Return the data from the response wrapper
    return responseData.data || responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error. Please check your connection.', 500);
    }
    
    throw new ApiError(error.message || 'Network error', 500);
  }
}

// Auth Service
export const AuthService = {
  // Signup
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isLoggedIn', 'true');
    
    return response;
  },
  
  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isLoggedIn', 'true');
    
    return response;
  },
  
  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiRequest<{ user: User }>('/auth/me');
    
    // Update stored user data
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response.user;
  },
  
  // Logout
  async logout(): Promise<void> {
    try {
      // Call logout endpoint (optional)
      await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return !!(token && isLoggedIn);
  },
  
  // Get stored user data
  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear corrupted data
      localStorage.removeItem('user');
      return null;
    }
  },
  
  // Refresh token (if needed in the future)
  async refreshToken(): Promise<string | null> {
    try {
      const response = await apiRequest<{ token: string }>('/auth/refresh', {
        method: 'POST',
      });
      
      localStorage.setItem('token', response.token);
      return response.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  }
};

export default {
  auth: AuthService,
}; 