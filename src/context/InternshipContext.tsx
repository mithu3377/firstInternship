import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Company {
  id: string;
  name: string;
  area: string;
  maxInternships: number;
  currentInternships: number;
  managerId: string;
  managerName: string;
  managerEmail: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  regNo: string;
  technology: string;
  hasShownInterest: boolean;
  assignedCompanyId?: string;
  assignedCompanyName?: string;
  internshipStatus: 'not_assigned' | 'assigned' | 'in_progress' | 'completed';
  certificateStatus: 'not_available' | 'in_progress' | 'issued';
  startDate?: string;
  endDate?: string;
}

export interface InternshipAssignment {
  id: string;
  studentId: string;
  companyId: string;
  studentName: string;
  companyName: string;
  assignedDate: string;
  startDate?: string;
  endDate?: string;
  status: 'assigned' | 'in_progress' | 'completed';
  progress?: number; // 0-100
  certificateIssued: boolean;
}

interface InternshipContextType {
  companies: Company[];
  students: Student[];
  assignments: InternshipAssignment[];
  
  // Company management
  addCompany: (company: Omit<Company, 'id' | 'currentInternships'>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  
  // Student management
  addStudent: (student: Omit<Student, 'id' | 'hasShownInterest' | 'internshipStatus' | 'certificateStatus'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  showInterestInInternship: (studentId: string) => void;
  
  // Assignment management
  assignStudentToCompany: (studentId: string, companyId: string) => boolean;
  updateInternshipProgress: (assignmentId: string, progress: number) => void;
  completeInternship: (assignmentId: string) => void;
  issueCertificate: (assignmentId: string) => void;
  
  // Getters
  getAvailableCompanies: () => Company[];
  getStudentsWithInterest: () => Student[];
  getStudentAssignments: (studentId: string) => InternshipAssignment[];
  getCompanyAssignments: (companyId: string) => InternshipAssignment[];
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const useInternship = () => {
  const context = useContext(InternshipContext);
  if (context === undefined) {
    throw new Error('useInternship must be used within an InternshipProvider');
  }
  return context;
};

interface InternshipProviderProps {
  children: ReactNode;
}

export const InternshipProvider: React.FC<InternshipProviderProps> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      area: 'Frontend Development',
      maxInternships: 3,
      currentInternships: 0,
      managerId: '3',
      managerName: 'Manager Name',
      managerEmail: 'manager@company.com',
      isActive: true,
    }
  ]);

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Qadis Parvez',
      email: 'qadis@student.com',
      regNo: '2021-Arid-4566',
      technology: 'Flutter',
      hasShownInterest: false,
      internshipStatus: 'not_assigned',
      certificateStatus: 'not_available',
    }
  ]);

  const [assignments, setAssignments] = useState<InternshipAssignment[]>([]);

  const addCompany = (companyData: Omit<Company, 'id' | 'currentInternships'>) => {
    const newCompany: Company = {
      ...companyData,
      id: Date.now().toString(),
      currentInternships: 0,
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => prev.map(company => 
      company.id === id ? { ...company, ...updates } : company
    ));
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'hasShownInterest' | 'internshipStatus' | 'certificateStatus'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      hasShownInterest: false,
      internshipStatus: 'not_assigned',
      certificateStatus: 'not_available',
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
  };

  const showInterestInInternship = (studentId: string) => {
    updateStudent(studentId, { hasShownInterest: true });
  };

  const assignStudentToCompany = (studentId: string, companyId: string): boolean => {
    const company = companies.find(c => c.id === companyId);
    const student = students.find(s => s.id === studentId);
    
    if (!company || !student) return false;
    
    // Check if company has available slots
    if (company.currentInternships >= company.maxInternships) {
      return false;
    }
    
    // Check if student has already shown interest
    if (!student.hasShownInterest) {
      return false;
    }
    
    // Create assignment
    const assignment: InternshipAssignment = {
      id: Date.now().toString(),
      studentId,
      companyId,
      studentName: student.name,
      companyName: company.name,
      assignedDate: new Date().toISOString(),
      status: 'assigned',
      certificateIssued: false,
    };
    
    setAssignments(prev => [...prev, assignment]);
    
    // Update company current internships count
    updateCompany(companyId, { currentInternships: company.currentInternships + 1 });
    
    // Update student status
    updateStudent(studentId, {
      assignedCompanyId: companyId,
      assignedCompanyName: company.name,
      internshipStatus: 'assigned',
    });
    
    return true;
  };

  const updateInternshipProgress = (assignmentId: string, progress: number) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, progress, status: 'in_progress' }
        : assignment
    ));
    
    // Update student status
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      updateStudent(assignment.studentId, { internshipStatus: 'in_progress' });
    }
  };

  const completeInternship = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'completed', endDate: new Date().toISOString() }
        : assignment
    ));
    
    // Update student status
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      updateStudent(assignment.studentId, { 
        internshipStatus: 'completed',
        endDate: new Date().toISOString(),
      });
      
      // Free up company slot
      const company = companies.find(c => c.id === assignment.companyId);
      if (company) {
        updateCompany(assignment.companyId, { 
          currentInternships: company.currentInternships - 1 
        });
      }
    }
  };

  const issueCertificate = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, certificateIssued: true }
        : assignment
    ));
    
    // Update student certificate status
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      updateStudent(assignment.studentId, { certificateStatus: 'issued' });
    }
  };

  const getAvailableCompanies = () => {
    return companies.filter(company => 
      company.isActive && company.currentInternships < company.maxInternships
    );
  };

  const getStudentsWithInterest = () => {
    return students.filter(student => 
      student.hasShownInterest && student.internshipStatus === 'not_assigned'
    );
  };

  const getStudentAssignments = (studentId: string) => {
    return assignments.filter(assignment => assignment.studentId === studentId);
  };

  const getCompanyAssignments = (companyId: string) => {
    return assignments.filter(assignment => assignment.companyId === companyId);
  };

  const value = {
    companies,
    students,
    assignments,
    addCompany,
    updateCompany,
    addStudent,
    updateStudent,
    showInterestInInternship,
    assignStudentToCompany,
    updateInternshipProgress,
    completeInternship,
    issueCertificate,
    getAvailableCompanies,
    getStudentsWithInterest,
    getStudentAssignments,
    getCompanyAssignments,
  };

  return (
    <InternshipContext.Provider value={value}>
      {children}
    </InternshipContext.Provider>
  );
};
