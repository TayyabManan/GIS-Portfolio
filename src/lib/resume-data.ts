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
  
  education: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    gpa?: string
    achievements?: string[]
  }[]
  
  skills: {
    category: string
    items: string[]
  }[]
  
  projects: {
    name: string
    description: string
    technologies: string[]
    url?: string
    github?: string
    highlights: string[]
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
    title: "GIS Analyst & Spatial Developer",
    email: "haris.a.mannan@gmail.com",
    phone: "+92-324-9941206",
    location: "Islamabad, Pakistan",
    website: "https://tayyabmanan.vercel.app/",
    github: "https://github.com/TayyabManan",
    linkedin: "https://www.linkedin.com/in/muhammad-tayyab-3962a2373",
    summary: "Experienced GIS Analyst and Spatial Developer with expertise in geospatial analysis, web development, and data visualization. Skilled in Python, React, QGIS, and various GIS technologies with a focus on solving real-world problems through spatial analysis and machine learning."
  },
  
  experience: [
    {
      title: "Cointegration.ai",
      company: "Cointegration.ai",
      location: "Islamabad, Pakistan",
      startDate: "2023-01",
      endDate: "Present",
      current: true,
      description: [
        "Designed and implemented machine learning models leveraging Python.",
        "Used platforms like Lang-Graph, AutoGen, and OpenAIAgentSDK.",
        "Implemented python libraries like numpy, scipy, matplotlib etc."
      ],
      technologies: ["LangChain", "OpenAISdk", "AutoGen", "Model Context Protocol", "CrewAI"]
    },
    {
      title: "GIS Analyst & Spatial Developer",
      company: "Freelance",
      location: "Islamabad, Pakistan",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      description: [
        "Developed comprehensive GIS applications for spatial analysis and data visualization",
        "Created interactive web mapping applications using React and modern web technologies",
        "Implemented machine learning algorithms for predictive modeling in geospatial contexts",
        "Collaborated with clients to deliver high-quality geospatial solutions and dashboards"
      ],
      technologies: ["Python", "React", "QGIS", "ArcGIS", "PostgreSQL", "PostGIS", "JavaScript", "Next.js"]
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
    }
  ],
  
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "R"]
    },
    {
      category: "GIS & Remote Sensing",
      items: ["QGIS", "ArcGIS", "Google Earth Engine", "PostGIS", "GDAL"]
    },
    {
      category: "Web Development",
      items: ["React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS", "Flask"]
    },
    {
      category: "Data Analysis & ML",
      items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "TensorFlow"]
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "SQLite", "Firebase"]
    },
    {
      category: "Cloud & Tools",
      items: ["Google Cloud", "Vercel", "Git",  "Jupyter"]
    }
  ],
  
  projects: [
    {
      name: "Machine Learning Model for Wheat Yield Prediction",
      description: "Machine Learning model to predict wheat yield in Sahiwal Division",
      technologies: ["Python", "Matplotlib", "NumPy", "Google Earth Engine", "Artificial Intelligence"],
      url: "https://drive.google.com/drive/folders/1mccSUwvL9DRoHLEP0CiiKqybhka_rf2k?usp=sharing",
      github: "https://github.com/TayyabManan",
      highlights: [
        "Developed a Machine Learning Model by training on previously available data",
        "Predicted wheat yield in the Sahiwal Division with an error of 0.137 tonnes/hectare",
        "Final year project demonstrating practical application of ML in agriculture"
      ]
    },
    {
      name: "WaterTrace Pakistan",
      description: "Groundwater monitoring system analyzing 22 years of satellite data (2002-2024)",
      technologies: ["React", "Flask", "Google Earth Engine", "Machine Learning", "GRACE/GLDAS"],
      url: "https://watertrace.vercel.app",
      github: "https://github.com/TayyabManan/WaterTrace",
      highlights: [
        "Processed GRACE satellite data for groundwater trend analysis across 145 districts",
        "Implemented predictive models for water resource management using machine learning",
        "Created interactive dashboard with real-time data visualization and trend analysis"
      ]
    },
    {
      name: "EV Suitability Analysis",
      description: "Spatial analysis for Electric Vehicle infrastructure planning in Lahore",
      technologies: ["Python", "QGIS", "ArcGIS", "OpenStreetMap", "Demographic Data"],
      url: "https://ev-analysis.netlify.app/",
      github: "https://github.com/TayyabManan/ev-suitability-analysis",
      highlights: [
        "Analyzed 5 tehsils of Lahore for optimal EV charging station placement",
        "Integrated demographic, economic, and infrastructure data for site selection",
        "Developed weighted scoring algorithm achieving 90%+ coverage target"
      ]
    },
    {
      name: "NDVI Time Series Smoothing",
      description: "Vegetation health monitoring and assessment using NDVI smoothing techniques",
      technologies: ["R", "RStudio", "Remote Sensing", "Time Series Analysis"],
      url: "",
      highlights: [
        "Utilized RStudio to perform NDVI smoothing for Sheikhupura district",
        "Monitored and assessed vegetation health and dynamics over time",
        "Applied advanced time series analysis techniques for environmental monitoring"
      ]
    },
    {
      name: "Digitization of West-African Countries",
      description: "Digital mapping project for West African countries",
      technologies: ["GIS", "ArcGIS", "QGIS", "Digital Mapping"],
      url: "https://drive.google.com/drive/folders/1H6issi4A8G4akwhV0mUrJUu69gO1lQVu?usp=sharing",
      highlights: [
        "Utilized ArcMap tools to digitize accurate maps of West African countries",
        "Created comprehensive digital maps for geographic analysis",
        "Ensured high accuracy in boundary delineation and feature extraction"
      ]
    },
    {
      name: "Object-Based Image Analysis for Punjab Region",
      description: "Satellite imagery interpretation using object-based classification",
      technologies: ["eCognition", "OBIA", "Remote Sensing", "Image Classification"],
      highlights: [
        "Employed eCognition software for Object-Based Image Analysis (OBIA)",
        "Interpreted satellite imagery of Punjab Region for land use classification",
        "Improved classification accuracy compared to pixel-based methods"
      ]
    },
    {
      name: "Land Surface Temperature Analysis",
      description: "Temperature analysis for Gujranwala and Hafizabad regions",
      technologies: ["ArcGIS", "QGIS", "Landsat", "Digital Mapping", "Remote Sensing"],
      highlights: [
        "Conducted atmospheric correction on Landsat Level 1 data",
        "Analyzed land surface temperature patterns for urban heat island studies",
        "Created thermal maps for environmental assessment and planning"
      ]
    }
  ],
  
  certifications: [
    {
      name: "Going Places with Spatial Analysis",
      issuer: "ESRI",
      date: "September 2024",
      credentialUrl: ""
    },
    {
      name: "Cartography",
      issuer: "ESRI",
      date: "March 2024",
      credentialUrl: ""
    },
    {
      name: "Spatial Data Science",
      issuer: "ESRI",
      date: "November 2023",
      credentialUrl: ""
    },
    {
      name: "Shade Equity",
      issuer: "ESRI",
      date: "June 2023",
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