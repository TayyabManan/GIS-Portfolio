# GIS Portfolio Website

A modern, responsive portfolio website built with Next.js 15 and TypeScript, showcasing Geographic Information Systems (GIS) projects and expertise.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Dark/Light Mode**: System-aware theme switching with persistent preferences and multiple theme options
- **PWA Support**: Progressive Web App capabilities for offline access
- **CMS Integration**: Sanity CMS for dynamic content management
- **Performance Optimized**: Mobile-specific optimizations, Vercel Analytics and Speed Insights
- **SEO Ready**: Built-in SEO optimization with next-seo
- **Contact Form**: Push notifications via Pushover API integration
- **Interactive Maps**: Mapbox GL integration for GIS project demonstrations
- **AI Resume Assistant**: Interactive chatbot for resume exploration

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.3.5** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Headless UI & Radix UI** - Accessible component libraries
- **Heroicons & Lucide** - Icon libraries

### Data & Content
- **Sanity CMS** - Headless CMS
- **React Hook Form + Zod** - Form handling and validation
- **Pushover API** - Push notification service for contact form

### Performance & Analytics
- **Vercel Analytics** - Site analytics
- **Next PWA** - Progressive Web App support
- **Web Vitals** - Performance monitoring

## 📁 Project Structure

```
gis-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── projects/          # Projects listing and details
│   ├── components/            # Reusable components
│   │   ├── layout/           # Header, Footer
│   │   ├── sections/         # Page sections
│   │   └── ui/               # UI components
│   ├── lib/                  # Utilities and data
│   └── data/                 # Static data files
├── public/                   # Static assets
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/gis-portfolio.git
cd gis-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id

# Pushover API (for contact form notifications)
PUSHOVER_APP_TOKEN=your_pushover_app_token
PUSHOVER_USER_KEY=your_pushover_user_key
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm run start
```

## 📄 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Project Data
Add or modify projects in `src/lib/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Project description',
    category: 'Urban Planning',
    technologies: ['Next.js', 'TypeScript'],
    featured: true,
    // ... other fields
  }
];
```

### Content Management
The site is configured to work with Sanity CMS. Set up your Sanity studio to manage:
- Projects
- Blog posts (if enabled)
- Dynamic content

## 🔧 Key Features Implementation

### Theme System
Multiple theme options available:
- Light/Dark mode with system preference detection
- Custom theme variants (Ocean, Forest, Sunset, etc.)
- Persistent theme selection via localStorage
- Smooth transitions between themes

### Contact Form
Located at `/contact`, the form includes:
- Client-side validation with React Hook Form + Zod
- Push notifications via Pushover API
- Honeypot field for spam protection
- Real-time form validation feedback

### Projects Filtering
The projects page includes category-based filtering:
- All Projects
- Urban Planning
- Environmental
- Business Intelligence
- Transportation

### Resume Chatbot
Interactive AI assistant on the resume page:
- Explore resume content through natural conversation
- Quick access buttons for common questions
- Responsive chat interface
- Context-aware responses about experience and skills

### Performance Optimization
- Image optimization with Next.js Image component
- Lazy loading for components
- PWA support for offline functionality
- Turbopack for faster development builds
- Mobile-specific performance enhancements:
  - Reduced animations on mobile devices
  - Optimized CSS transitions
  - Fewer animated elements in Hero section


## 🚀 Deployment

The site is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Configure environment variables in Vercel dashboard:
   - `PUSHOVER_APP_TOKEN`
   - `PUSHOVER_USER_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Deploy

### Environment Variables
Required for production:
- `PUSHOVER_APP_TOKEN` - Your Pushover application token
- `PUSHOVER_USER_KEY` - Your Pushover user key


## 📋 Recent Updates

### Version 2.0 (Latest)
- **Pushover Integration**: Contact form now sends push notifications
- **Theme System**: Added multiple theme options with smooth transitions
- **Resume Chatbot**: Interactive AI assistant for resume exploration
- **Mobile Performance**: Optimized animations and transitions for mobile devices
- **Bug Fixes**: Fixed SVG animation errors and improved overall stability

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


Built with ❤️ using Next.js and TypeScript
