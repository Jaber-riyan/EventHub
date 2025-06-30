# EventHub - Event Management Web Application

A comprehensive event management platform built with modern web technologies, featuring a professional design and intuitive user experience.

## 🌟 Features

### 🔐 Authentication System
- **User Registration**: Complete signup with name, email, password, and profile photo
- **Secure Login**: Email/password authentication with form validation
- **Profile Management**: User profile dropdown with logout functionality
- **Protected Routes**: Automatic redirection for unauthenticated users

### 🏠 Homepage
- **Professional Hero Section**: Large banner with featured event display
- **Event Announcement Bar**: Latest event notifications at the top
- **Feature Highlights**: Platform benefits and capabilities showcase
- **Trending Events**: Popular upcoming events display
- **Responsive Design**: Optimized for all device sizes

### 📅 Event Management
- **Browse Events**: View all available events with detailed information
- **Search & Filter**: Find events by title and date ranges
  - Today's events
  - Current week/Last week
  - Current month/Last month
- **Join Events**: One-click event participation with attendee tracking
- **Event Details**: Complete information including date, time, location, description

### ➕ Event Creation
- **Add New Events**: Comprehensive form for event creation
- **Event Information**:
  - Event title and description
  - Organizer name (auto-filled)
  - Date and time selection
  - Location details
  - Initial attendee count ( default 0 )
- **Form Validation**: Client-side validation with error handling
- **Success Feedback**: Toast notifications for user actions

### 👤 Personal Event Management
- **My Events**: View and manage your created events
- **Update Events**: Edit event details through modal interface
- **Delete Events**: Remove events with confirmation dialog
- **Event Statistics**: Track attendee counts and engagement

### 🎨 User Interface
- **Modern Design**: Professional layout inspired by industry standards
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Mobile Responsive**: Seamless experience across all devices

## 🛠 Technology Stack

### Frontend
- **React.js 19**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Animation library for smooth transitions

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **React Hook Form**: Form handling and validation
- **Date Picker**: Advanced date/time selection

### State Management
- **React Context**: Authentication state management
- **Local Storage**: Persistent user sessions
- **Custom Hooks**: Reusable logic for toasts and forms

## 📁 Project Structure

\`\`\`
event-management-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── events/                  # Events pages
│   ├── add-event/              # Event creation
│   ├── my-events/              # Personal events
│   ├── login/                  # Authentication
│   ├── register/               # User registration
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── navbar.tsx              # Navigation component
│   └── ui/                     # shadcn/ui components
├── contexts/                   # React contexts
│   └── auth-context.tsx        # Authentication context
├── hooks/                      # Custom hooks
│   └── use-toast.ts           # Toast notifications
├── lib/                        # Utility functions
│   └── utils.ts               # Helper functions
└── public/                     # Static assets
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Jaber-riyan/EventHub.git
   cd EventHub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Demo Credentials
For testing purposes, you can use any email/password combination as the authentication is currently mocked.

**Suggested Demo Login:**
- Email: riyan@gmail.com
- Password: riyan123

## 🎯 Key Pages

### Homepage (`/`)

### Events (`/events`) - Protected Route

### Add Event (`/add-event`) - Protected Route

### My Events (`/my-events`) - Protected Route

### Authentication (`/login`, `/register`)

## 🔧 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/index.css` for global styles
- Component styles use Tailwind utility classes

### Components
- All UI components are in `components/ui/`
- Custom components in `components/`
- Easy to extend and modify

### Authentication
- Currently uses mock authentication
- Ready for backend integration
- Context-based state management

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔮 Future Enhancements

### Backend Integration
- [ ] MongoDB database connection
- [ ] Express.js API endpoints
- [ ] Real authentication system
- [ ] File upload for event images

### Advanced Features
- [ ] Email notifications
- [ ] Event categories and tags
- [ ] User profiles and ratings
- [ ] Event analytics dashboard
- [ ] Social sharing integration
- [ ] Calendar integration
- [ ] Payment processing
- [ ] Event reviews and comments

### Performance Optimizations
- [ ] Image optimization
- [ ] Caching strategies
- [ ] SEO improvements
- [ ] Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ using modern web technologies

## 🙏 Acknowledgments

- [React.js](https://https://react.dev/) - React
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Primitive components
- [Lucide](https://lucide.dev/) - Icon library

---

**EventHub** - Making event management simple and beautiful ✨
