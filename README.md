# Patient Data Management System

A modern, responsive web application for managing patient records with a clean and intuitive user interface. Built with React and Vite, this application provides comprehensive patient data management capabilities including search, sorting, pagination, and CRUD operations.

## ✨ Features

### Core Functionality
- **Patient Management**: Create, read, update patient records
- **Search**: Search patients by name or ID number
- **Sorting**: Multiple sorting options:
  - Sort by ID
  - Sort by Name (A-Z / Z-A)
  - Sort by Date Created (Old-New / New-Old)
- **Pagination**: Display 12 patients per page with intuitive navigation
- **Responsive Design**: Fully responsive layout that works on all devices

### User Experience
- **Image Handling**: Automatic fallback to initials when avatar images fail to load
- **Notifications**: Success and error notifications for user actions
- **Modal Forms**: Clean modal interface for adding/editing patients
- **Expandable Cards**: View detailed patient information on demand
- **Loading States**: Smooth loading indicators during data fetch

## 🚀 Technologies Used

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Poppins Font** - Modern typography from Google Fonts
- **CSS3** - Custom styling with modern design patterns

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/EmiMoralesM/patient-management-light-it.git
   cd patient-data-management-lightit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

The application fetches patient data from:
```
https://63bedcf7f5cfc0949b634fc8.mockapi.io/users
```

**Note**: This is a mock API. Patient data is stored locally in the application state after fetching. Any additions or edits are stored in the browser session only and will not persist after page refresh.

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with gradient accents
- **Smooth Animations**: Transitions and hover effects for better UX
- **Color Scheme**: Professional blue and teal gradient theme
- **Typography**: Poppins font family for modern, readable text
- **Responsive Grid**: Adaptive grid layout that adjusts to screen size

## 🔒 Data Validation

- **Name Field**: Required, cannot be empty
- **Website URL**: Must start with `http://` or `https://` if provided
- **Avatar URL**: Automatically falls back to initials if image fails to load

## 🐛 Error Handling

- **Broken Images**: Automatic fallback to patient initials
- **API Errors**: User-friendly error notifications
- **Form Validation**: Real-time validation with error messages
- **Empty States**: Helpful messages when no patients are found


### Best Practices
- Component-based architecture
- Separation of concerns
- Reusable components
- Clean, maintainable code

---

**Built with ❤️ **
