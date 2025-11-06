# Project Content Management System

This directory contains markdown files for managing your portfolio projects. Each project is stored as a separate markdown file with frontmatter metadata.

## Directory Structure
```
content/
├── projects/
│   ├── _template.md          # Template for new projects
│   ├── project-1.md          # Individual project files
│   ├── project-2.md
│   └── ...
└── README.md                 # This file
```

## Adding a New Project

1. **Copy the template**: Start with `_template.md` as your base
2. **Create new file**: Name it with your project slug (e.g., `my-awesome-project.md`)
3. **Fill in metadata**: Update the frontmatter at the top of the file
4. **Write content**: Add your project description, features, and details
5. **Add images**: Place project images in `public/projects/` directory

## Frontmatter Fields

### Required Fields
- `slug`: Unique identifier for the project (used in URLs)
- `title`: Project title
- `description`: Brief description for cards and SEO
- `category`: Project category (see options below)
- `date`: Project date in YYYY-MM-DD format

### Optional Fields
- `subtitle`: Brief subtitle for the project
- `techStack`: Array of technologies used
- `image`: Path to project thumbnail image
- `demoUrl`: Link to live demo
- `githubUrl`: Link to GitHub repository
- `featured`: Set to `true` to show on homepage

### Category Options
- "Urban Planning"
- "Environmental Analysis" 
- "Smart Cities"
- "Transportation"
- "Business Intelligence"

## Example Frontmatter
```yaml
---
slug: "traffic-analysis-dashboard"
title: "Traffic Analysis Dashboard"
subtitle: "Real-time traffic monitoring and analytics"
description: "Interactive dashboard for analyzing traffic patterns and optimizing urban mobility with machine learning predictions."
category: "Urban Planning"
techStack: ["React.js", "Python", "PostGIS", "Docker"]
image: "/projects/traffic-dashboard.jpg"
demoUrl: "https://traffic-demo.example.com"
githubUrl: "https://github.com/username/traffic-dashboard"
featured: true
date: "2024-01-15"
---
```

## Content Guidelines

### Writing Style
- Use clear, professional language
- Focus on technical achievements and impact
- Include specific metrics and results when possible
- Use active voice and action verbs

### Structure Recommendations
1. **Overview**: What the project does and why it's important
2. **Key Features**: Main functionality and capabilities
3. **Technical Implementation**: Technologies and architecture
4. **Challenges & Solutions**: Problems faced and how you solved them
5. **Impact & Results**: Measurable outcomes and achievements
6. **Future Enhancements**: Planned improvements

### Images
- Place all project images in `public/projects/` directory
- Use descriptive filenames (e.g., `traffic-dashboard-main.jpg`)
- Optimize images for web (compressed, appropriate size)
- Include alt text for accessibility

## File Naming Convention
- Use lowercase letters
- Use hyphens instead of spaces or underscores
- Make names descriptive and URL-friendly
- Examples: `smart-city-dashboard.md`, `environmental-monitoring.md`

## Best Practices

### SEO Optimization
- Write compelling descriptions (150-160 characters)
- Use relevant keywords naturally
- Include alt text for images
- Use descriptive headings

### Technical Details
- Be specific about technologies used
- Explain architectural decisions
- Include code snippets if relevant
- Mention performance metrics

### Project Showcase
- Lead with the most impressive aspects
- Use bullet points for easy scanning
- Include links to live demos when possible
- Showcase problem-solving skills

## Maintenance

### Regular Updates
- Keep project information current
- Update demo links if they change
- Add new projects as you complete them
- Archive or update old projects

### Quality Control
- Proofread content before publishing
- Test all external links
- Verify image paths work correctly
- Ensure consistent formatting

## Migration Notes

Currently, your website uses a static `projects.ts` file. To migrate to the markdown system:

1. The markdown files are already created for your existing projects
2. Utility functions are available in `src/lib/markdown.ts`
3. You can gradually migrate by updating your components to use the markdown functions
4. The current system will continue to work until you're ready to switch

## Future Enhancements

Consider these potential improvements:
- Git-based CMS integration (Forestry, Netlify CMS)
- Admin interface for easier editing
- Automated image optimization
- Content validation scripts
- Search functionality