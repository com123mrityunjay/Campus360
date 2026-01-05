# Campus360 - IIIT-B Student Portal

A comprehensive campus application that provides a 360-degree view of students across all dimensions including Academics, Sports, Clubs, Cultural activities, Research, and Institutional Service.

## Features

### Student Features
- **360° Profile View**: View your complete profile across all dimensions
- **Dashboard**: Quick overview of achievements, points, and statistics
- **Achievement Upload**: Self-upload achievements in various categories
- **Rewards Dashboard**: Track your points and rewards

### Administration Features
- **Student Profile View**: View individual student 360° profiles
- **Batch View**: Analytics and statistics by batch
- **Programme View**: Analytics and statistics by programme
- **Gender View**: Analytics and statistics by gender
- **Group View**: View custom user-defined groups
- **Data Upload**: Upload general purpose data (CSV/Excel)
- **Rewards Upload**: Upload rewards and points for students

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: Axios with dummy backend endpoints

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Demo Credentials

### Student Login
- Email: `student@iiitb.ac.in`
- Password: (any password works)

### Admin Login
- Email: `admin@iiitb.ac.in`
- Password: (any password works)

## Project Structure

```
Campus360/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (Auth)
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## API Integration

The application uses dummy API endpoints defined in `src/services/api.ts`. All API calls are mocked with sample data. To integrate with a real backend:

1. Update `API_BASE_URL` in `src/services/api.ts`
2. Replace dummy implementations with actual API calls
3. Ensure your backend follows the same data structure as defined in `src/types/index.ts`

## Key Features Implementation

### Authentication
- Role-based access control (Student, Admin, Registrar, Dean, HOD)
- Session management with localStorage
- Protected routes based on user roles

### Student Dashboard
- Overview cards showing key metrics
- Quick access to all profile dimensions
- Recent rewards display

### Student Profile
- Tabbed interface for different dimensions
- Detailed view of all achievements
- Academic records with CGPA tracking

### Administration Views
- Search functionality for student profiles
- Statistical views with charts
- Data upload capabilities
- Rewards management

## Customization

### Styling
The application uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles and utility classes

### Adding New Dimensions
1. Add type definitions in `src/types/index.ts`
2. Update API service in `src/services/api.ts`
3. Add UI components in relevant pages
4. Update navigation if needed

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Real backend integration
- File upload for certificates
- Advanced filtering and search
- Export functionality (PDF, Excel)
- Notifications system
- Mobile responsive improvements
- Dark mode support

## License

This project is created for IIIT-B Campus360 application.

