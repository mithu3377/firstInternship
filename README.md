# Student Internship Portal

A comprehensive React Native application for managing student internships with multiple user roles and features.

## Features

### 🎓 Student Features
- **Login System**: Secure authentication with role-based access
- **Dashboard**: Personal dashboard showing internship status and history
- **Internship Requests**: Browse and request available internships
- **Progress Tracking**: View internship progress and certificates

### 👨‍💼 Admin Features
- **Company Management**: Add and manage companies offering internships
- **Student Assignment**: Assign students to specific companies
- **Certificate Management**: Manage student certificates
- **Hired Interns Tracking**: View all hired interns

### 🏢 Manager Features
- **Internship Generation**: Create new internship opportunities
- **Progress Monitoring**: Track intern progress with visual indicators
- **Student Details**: Update student status and upload certificates
- **Team Management**: Manage company internship programs

## User Roles & Login Credentials

### Student
- **Email**: `qadis@student.com`
- **Password**: `password`
- **Features**: Dashboard, internship requests, progress tracking

### Admin
- **Email**: `nauman@admin.com`
- **Password**: `password`
- **Features**: Company management, student assignment, certificates

### Manager
- **Email**: `manager@company.com`
- **Password**: `password`
- **Features**: Internship generation, progress monitoring, student management

## Screens Overview

### Student Screens
1. **Login Screen**: Clean login interface with graduation cap icon
2. **Student Dashboard**: Welcome banner, internship status, and action buttons
3. **Internship Request**: Searchable list of available internships with request functionality

### Admin Screens
1. **Admin Dashboard**: Welcome banner with admin action buttons
2. **Add Company**: Form to enroll new companies
3. **Assign Student**: List of students with assignment functionality
4. **Certificates**: Student certificate management
5. **Hired Interns**: View all hired interns

### Manager Screens
1. **Manager Dashboard**: Company information and management actions
2. **Generate Internship**: Create new internship opportunities
3. **Check Progress**: Monitor intern progress with visual indicators
4. **Student Details**: Update student status and manage certificates

## Technical Stack

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation and routing
- **Context API**: State management for authentication
- **React Native Vector Icons**: Icon library (deprecated, using emojis)

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Navigation Dependencies**
   ```bash
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler
   ```

3. **Run the Application**
   ```bash
   # Start Metro bundler
   npm start
   
   # Run on Android
npm run android

   # Run on iOS
   npm run ios
   ```

## Project Structure

```
src/
├── components/
│   └── InternshipPortal.jsx    # Original component (legacy)
├── context/
│   └── AuthContext.tsx         # Authentication context
├── navigation/
│   └── AppNavigator.tsx        # Main navigation setup
└── screens/
    ├── LoginScreen.tsx          # Login interface
    ├── StudentDashboard.tsx     # Student main screen
    ├── AdminDashboard.tsx       # Admin main screen
    ├── ManagerDashboard.tsx     # Manager main screen
    ├── InternshipRequestScreen.tsx
    ├── AddCompanyScreen.tsx
    ├── AssignStudentScreen.tsx
    ├── GenerateInternshipScreen.tsx
    ├── CheckProgressScreen.tsx
    ├── StudentDetailsScreen.tsx
    ├── CertificatesScreen.tsx
    └── HiredInternsScreen.tsx
```

## Key Features Implemented

### ✅ Authentication System
- Role-based login (Student, Admin, Manager)
- Secure context-based state management
- Automatic navigation based on user role

### ✅ Navigation System
- Stack navigation for screen transitions
- Role-based screen access
- Back navigation support

### ✅ UI/UX Design
- Modern, clean interface matching provided designs
- Consistent color scheme (#667EEA primary blue)
- Responsive layouts with proper spacing
- Shadow effects and rounded corners

### ✅ Data Management
- Mock data for companies, students, and internships
- Search functionality across multiple screens
- Form validation and user feedback

### ✅ Visual Elements
- Emoji-based icons for better compatibility
- Progress indicators for internship tracking
- Status badges and visual feedback
- Gradient backgrounds and modern styling

## Future Enhancements

- [ ] Real backend integration
- [ ] Push notifications
- [ ] File upload for certificates
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.