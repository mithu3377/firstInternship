import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'manager';
  regNo?: string;
  companyName?: string;
  technology?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with actual API call
    const mockUsers = [
      {
        id: '1',
        name: 'Qadis Parvez',
        email: 'qadis@student.com',
        password: 'password',
        role: 'student' as const,
        regNo: '2021-Arid-4566',
        technology: 'Flutter'
      },
      {
        id: '2',
        name: 'M.Nauman',
        email: 'nauman@admin.com',
        password: 'password',
        role: 'admin' as const
      },
      {
        id: '3',
        name: 'Manager Name',
        email: 'manager@company.com',
        password: 'password',
        role: 'manager' as const,
        companyName: 'Company Name',
        technology: 'Area of Dev'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

