# GIS Portfolio Website

A modern, responsive portfolio website built with Next.js 15 and TypeScript, showcasing Geographic Information Systems (GIS) projects and expertise.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Dark Mode**: System-aware theme switching with persistent preferences
- **PWA Support**: Progressive Web App capabilities for offline access
- **CMS Integration**: Sanity CMS for dynamic content management
- **Performance Optimized**: Vercel Analytics and Speed Insights integration
- **SEO Ready**: Built-in SEO optimization with next-seo
- **Contact Form**: Integrated contact functionality with form validation
- **Interactive Maps**: Mapbox GL integration for GIS project demonstrations

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
- **Nodemailer** - Email functionality

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

### Dark Mode
The theme is managed through a Context Provider (`ThemeProvider`). Toggle is available in the header.

### Contact Form
Located at `/contact`, the form includes:
- Client-side validation with Zod
- Email sending via Nodemailer
- Honeypot field for spam protection

### Projects Filtering
The projects page includes category-based filtering:
- All Projects
- Urban Planning
- Environmental
- Business Intelligence
- Transportation

### Performance Optimization
- Image optimization with Next.js Image component
- Lazy loading for components
- PWA support for offline functionality
- Turbopack for faster development builds

## 📱 Progressive Web App

The site includes PWA configuration for:
- Offline support
- App installation
- Push notifications (if configured)

## 🚀 Deployment

The site is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Configure environment variables
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [@your-github-username]

---

Built with ❤️ using Next.js and TypeScript