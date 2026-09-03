---
slug: "teacher-rank"
title: "TeacherRank"
subtitle: "Student-Driven Teacher Review Platform"
description: "A teacher rating and review platform where students score educators on teaching quality, communication, helpfulness, and course difficulty, so others can choose courses with better information. Built with React, TypeScript, and Supabase."
category: "Web Application"
metric: "−60% bundle"
metricChart: "bars-down"
techStack: ["React", "TypeScript", "Supabase", "TanStack Query", "React Router", "Tailwind CSS", "DaisyUI", "Vite", "React Hook Form", "Zod"]
image: "/projects/teacher-rank.webp"
demoUrl: "https://teacherrank.vercel.app/"
githubUrl: "https://github.com/TayyabManan/TeacherRank"
featured: false
date: "2025-01-06"
---

## Overview
TeacherRank is a web app where students rate and review their teachers across several dimensions instead of reducing them to one number. It scores teaching quality, communication, helpfulness, and course difficulty separately, with live data sync and a responsive interface. The point is to help students pick courses with better information, and to give institutions feedback they can use.

**[Read the full write-up →](/blog/building-teacherrank)**

![the live index · 377 teachers, 59 reviews, ranked](/projects/screens/teacher-rank.webp "app")

## Features
Ratings are split into four dimensions: teaching quality, communication, helpfulness, and course difficulty. Students can search by name, subject, institution, or rating with results updating as they type, browse teachers grouped by institution, and open a profile page with the ratings breakdown, student reviews, and teaching statistics. Accounts run on Supabase auth with email verification and password recovery. New reviews sync live through Supabase subscriptions with TanStack Query cache invalidation. Admins get a panel for managing teachers, reviews, and user reports. The interface is built for phones first, desktops second.

## Technical architecture
React 18 and TypeScript, with Vite for builds and hot module replacement. Supabase handles the backend: authentication, the real-time database, and row-level security at the PostgreSQL level. TanStack Query manages server state with stale-while-revalidate caching. The UI uses Tailwind CSS and DaisyUI components.

## Performance

| Optimization | Impact |
|-------------|--------|
| Code Splitting | Route-based lazy loading cuts initial bundle size by 60% |
| Virtual Scrolling | Renders only visible teacher cards using @tanstack/react-virtual |
| Image Optimization | Lazy loading with WebP support and responsive sizing |
| Caching Strategy | Stale-while-revalidate pattern via TanStack Query |
| Bundle Compression | Brotli compression reducing asset sizes by up to 80% |
| PWA Features | Service worker for offline functionality |

## User experience

| Feature | Description |
|---------|-------------|
| Protected Routes | Auth-gated access for review submission and admin features |
| Form Validation | React Hook Form with Zod schemas for type-safe validation |
| Error Boundaries | Friendly error states with retry options instead of white screens |
| SEO | Dynamic meta tags with React Helmet |
| Accessibility | WCAG 2.1 compliant with keyboard navigation and screen reader support |
| Dark Mode | Respects OS theme preference by default |

## Database design

| Table | Purpose |
|-------|---------|
| Teachers | Educator profiles with department and contact info |
| Reviews | Student feedback with four-dimensional ratings and timestamps |
| Institutions | Educational organizations with hierarchical structure |
| Users | Profiles with role-based access (student vs admin) |
| Row-Level Security | PostgreSQL policies enforcing permissions at the data layer |

## Security

| Feature | Description |
|---------|-------------|
| Authentication | JWT tokens with refresh token rotation (1hr access, 30-day refresh) |
| Input Sanitization | DOMPurify for XSS protection, Zod for schema validation |
| Rate Limiting | Max 5 reviews/hour, 20/day per user |
| HTTPS + HSTS | Enforced encrypted connections |
| Content Security Policy | Strict CSP headers for script execution control |

## Monitoring

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Traffic and performance metrics |
| Speed Insights | Core Web Vitals monitoring |
| Sentry | Error tracking and performance monitoring in production |

## What's next
Sentiment analysis on review text, to surface patterns the numeric ratings miss. Collaborative filtering to recommend professors based on what similar students liked. Anomaly detection to flag suspicious review clusters. I'd also like automatic topic classification (teaching style, grading, workload) so students can filter reviews by what they care about, and eventually a natural language query interface using RAG so a student can ask "Which Data Structures professors have high ratings with manageable workload?"
