export interface SkillMetadata {
  yearsOfExperience: number
  proficiencyLevel: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar'
  usageFrequency: 'Daily' | 'Weekly' | 'Project-based' | 'Occasional'
  projectCount?: number
}

export interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    github: string
    linkedin: string
    summary: string
  }

  skills: {
    category: string
    items: string[]
    metadata?: Record<string, SkillMetadata>
  }[]

  experience: {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string[]
    technologies: string[]
  }[]

  projects: {
    name: string
    description: string
    technologies: string[]
    url?: string
    urlText?: string
    github?: string
    githubText?: string
    highlights: string[]
  }[]

  education: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    gpa?: string
    achievements?: string[]
  }[]

  certifications: {
    name: string
    issuer: string
    date: string
    credentialUrl?: string
  }[]

  achievements: {
    title: string
    description: string
    date: string
  }[]
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Tayyab Manan",
    title: "GIS Analyst & Full Stack Developer",
    email: "haris.a.mannan@gmail.com",
    phone: "+92-324-9941206",
    location: "Islamabad, Pakistan",
    website: "https://tayyabmanan.vercel.app/",
    github: "https://github.com/TayyabManan",
    linkedin: "https://www.linkedin.com/in/muhammad-tayyab-3962a2373",
    summary: "Full Stack Developer with 4 years experience building GIS-powered web applications. Combining expertise in React/Python development with spatial analysis to deliver data-driven solutions. Currently pursuing MS in AI Engineering while working on ML/AI integration projects."
  },

  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "R"],
      metadata: {
        "Python": { yearsOfExperience: 4, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 15 },
        "JavaScript": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 12 },
        "TypeScript": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 8 },
        "SQL": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 10 },
        "R": { yearsOfExperience: 1, proficiencyLevel: "Proficient", usageFrequency: "Project-based", projectCount: 3 }
      }
    },
    {
      category: "GIS & Remote Sensing",
      items: ["QGIS", "ArcGIS", "Google Earth Engine", "PostGIS", "GDAL"],
      metadata: {
        "QGIS": { yearsOfExperience: 4, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 20 },
        "ArcGIS": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 15 },
        "Google Earth Engine": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 5 },
        "PostGIS": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Project-based", projectCount: 8 },
        "GDAL": { yearsOfExperience: 2, proficiencyLevel: "Proficient", usageFrequency: "Project-based", projectCount: 6 }
      }
    },
    {
      category: "Web Development",
      items: ["React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS", "Flask"],
      metadata: {
        "React": { yearsOfExperience: 3, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 12 },
        "Next.js": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 8 },
        "Node.js": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 10 },
        "HTML/CSS": { yearsOfExperience: 3, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 15 },
        "Tailwind CSS": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 10 },
        "Flask": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 6 }
      }
    },
    {
      category: "Data Analysis & ML",
      items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "TensorFlow"],
      metadata: {
        "Pandas": { yearsOfExperience: 3, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 15 },
        "NumPy": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 15 },
        "Scikit-learn": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 8 },
        "Matplotlib": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 12 },
        "TensorFlow": { yearsOfExperience: 1, proficiencyLevel: "Proficient", usageFrequency: "Project-based", projectCount: 4 }
      }
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "SQLite", "Firebase"],
      metadata: {
        "PostgreSQL": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 10 },
        "SQLite": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Project-based", projectCount: 8 },
        "Firebase": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 6 }
      }
    },
    {
      category: "Cloud & Tools",
      items: ["Google Cloud", "Vercel", "Docker", "CI/CD", "Git version control", "Jupyter", "Agile methodology"],
      metadata: {
        "Google Cloud": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 8 },
        "Vercel": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 10 },
        "Docker": { yearsOfExperience: 1, proficiencyLevel: "Proficient", usageFrequency: "Project-based", projectCount: 5 },
        "CI/CD": { yearsOfExperience: 2, proficiencyLevel: "Proficient", usageFrequency: "Weekly", projectCount: 8 },
        "Git version control": { yearsOfExperience: 4, proficiencyLevel: "Expert", usageFrequency: "Daily", projectCount: 20 },
        "Jupyter": { yearsOfExperience: 3, proficiencyLevel: "Advanced", usageFrequency: "Weekly", projectCount: 15 },
        "Agile methodology": { yearsOfExperience: 2, proficiencyLevel: "Advanced", usageFrequency: "Daily", projectCount: 10 }
      }
    }
  ],

  experience: [
    {
      title: "Junior AI Developer",
      company: "COINTEGRATION",
      location: "Islamabad, Pakistan",
      startDate: "2023-01",
      endDate: "Present",
      current: true,
      description: [
        "Built 5+ production ML models reducing processing time by 40%",
        "Developed multi-agent systems using LangChain and AutoGen serving 100+ daily users",
        "Implemented automated workflows with Model Context Protocol, saving 15 hours/week",
        "Collaborated in Agile methodology with cross-functional teams for iterative development"
      ],
      technologies: ["LangChain", "OpenAISdk", "AutoGen", "Model Context Protocol", "CrewAI"]
    },
    {
      title: "GIS Analyst & Full Stack Developer",
      company: "Freelance",
      location: "Islamabad, Pakistan",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      description: [
        "Delivered 15+ GIS web applications with responsive design for clients across 3 industries",
        "Built React dashboards and REST APIs processing 10K+ daily map requests",
        "Reduced client data processing time by 60% through ML automation",
        "Utilized Git version control for collaborative development and code management"
      ],
      technologies: ["Python", "React", "QGIS", "ArcGIS", "PostgreSQL", "PostGIS", "JavaScript", "Next.js"]
    }
  ],

  projects: [
    {
      name: "Machine Learning Model for Wheat Yield Prediction",
      description: "Machine Learning model to predict wheat yield in Sahiwal Division",
      technologies: ["Python", "Matplotlib", "NumPy", "Google Earth Engine", "Artificial Intelligence"],
      url: "https://drive.google.com/drive/folders/1mccSUwvL9DRoHLEP0CiiKqybhka_rf2k?usp=sharing",
      urlText: "View Project",
      github: "https://github.com/TayyabManan",
      githubText: "GitHub",
      highlights: [
        "Developed a Machine Learning Model by training on previously available data",
        "Predicted wheat yield in the Sahiwal Division with an error of 0.137 tonnes/hectare",
        "Final year project demonstrating practical application of ML in agriculture"
      ]
    },
    {
      name: "TeacherRank",
      description: "Comprehensive teacher rating and review platform for educational institutions",
      technologies: ["React", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS", "Vite"],
      url: "https://teacherrank.vercel.app",
      urlText: "Live Demo",
      highlights: [
        "Built full-stack web application with REST APIs for real-time data synchronization",
        "Implemented responsive design delivering seamless experience across all devices",
        "Achieved 60% bundle size reduction through code splitting and lazy loading optimizations"
      ]
    },
    {
      name: "WaterTrace Pakistan",
      description: "Groundwater monitoring system analyzing 22 years of satellite data (2002-2024)",
      technologies: ["React", "Flask", "Google Earth Engine", "Machine Learning", "GRACE/GLDAS"],
      url: "https://watertrace.vercel.app",
      urlText: "Live Demo",
      github: "https://github.com/TayyabManan/WaterTrace",
      githubText: "GitHub",
      highlights: [
        "Built Flask REST APIs for processing GRACE satellite data across 145 districts",
        "Implemented predictive models for water resource management using machine learning",
        "Created interactive dashboard with real-time data visualization and trend analysis"
      ]
    },
    {
      name: "EV Suitability Analysis",
      description: "Spatial analysis for Electric Vehicle infrastructure planning in Lahore",
      technologies: ["Python", "QGIS", "ArcGIS", "OpenStreetMap", "Demographic Data"],
      url: "https://ev-analysis.netlify.app/",
      urlText: "Live Demo",
      github: "https://github.com/TayyabManan/ev-suitability-analysis",
      githubText: "GitHub",
      highlights: [
        "Analyzed 5 tehsils of Lahore for optimal EV charging station placement",
        "Integrated demographic, economic, and infrastructure data for site selection",
        "Developed weighted scoring algorithm achieving 90%+ coverage target"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Geography/GIS",
      institution: "University of the Punjab",
      location: "Lahore, Pakistan",
      startDate: "2021",
      endDate: "2025",
      gpa: "3.0/4.0",
      achievements: [
        "Outstanding performance in GIS and Remote Sensing"
      ]
    },
    {
      degree: "Masters in Artificial Intelligence Engineering",
      institution: "COMSATS",
      location: "Islamabad, Pakistan",
      startDate: "2025",
      endDate: "Present (Expected 2027)",
      gpa: "",
      achievements: [
        "Distinguished academic record in AI Engineering and Deep Learning",
        "Excellence in AI Engineering with focus on Computer Vision"
      ]
    }
  ],

  certifications: [
    {
      name: "Going Places with Spatial Analysis",
      issuer: "ESRI",
      date: "2024-09-01",
      credentialUrl: ""
    },
    {
      name: "Cartography",
      issuer: "ESRI",
      date: "2024-03-01",
      credentialUrl: ""
    },
    {
      name: "Spatial Data Science",
      issuer: "ESRI",
      date: "2023-11-01",
      credentialUrl: ""
    },
    {
      name: "Shade Equity",
      issuer: "ESRI",
      date: "2023-06-01",
      credentialUrl: ""
    }
  ],
  
  achievements: [

    {
      title: "Open Source Contributor",
      description: "Active contributor to GIS and web development open source projects",
      date: "2022-Present"
    }
  ]
}

// Function to get formatted date
export function formatDate(dateString: string): string {
  if (dateString === "Present") return "Present"
  
  const date = new Date(dateString)
  
  // Check if date is invalid (for iOS Safari compatibility)
  if (isNaN(date.getTime())) {
    // If the date string is already in a readable format, return it as is
    // This handles cases like "September 2024" on iOS
    return dateString
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
}

// Function to calculate experience duration
export function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = endDate === "Present" ? new Date() : new Date(endDate)
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                 (end.getMonth() - start.getMonth())
  
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`
  }
  
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
}