---
slug: "building-teacherrank"
title: "TeacherRank: A Student-Driven Teacher Review Platform"
seoTitle: "TeacherRank with React & Supabase"
description: "React, TypeScript, and Supabase in production: multi-dimensional teacher ratings, real-time sync, and the route-splitting pass that cut the initial bundle 60%."
date: "2025-06-15"
author: "Tayyab Manan"
category: "Web Development"
tags: ["React", "TypeScript", "Supabase", "Full-Stack", "Web Development", "Technical"]
image: "/projects/teacher-rank.webp"
readTime: "10 min read"
faqs:
  - question: "What stack does TeacherRank use?"
    answer: "React 18 + TypeScript on Vite, with Supabase for auth, a real-time Postgres database, and row-level security. TanStack Query handles server state and caching, Tailwind + DaisyUI handle styling, and hosting is on Vercel."
  - question: "Why rate teachers on multiple dimensions instead of one score?"
    answer: "A single number can't separate a tough-but-effective professor from a disorganized one. TeacherRank rates teaching quality, communication, helpfulness, and course difficulty separately, so students can see, for example, 'hard course, good teacher.'"
  - question: "How was the app optimized for performance?"
    answer: "Route-based code splitting cut the initial bundle 60% (450KB to 180KB), virtual scrolling renders about 15 cards at a time, and Brotli compression shrank assets ~80%. The Lighthouse score went from 65 to above 95."
  - question: "How does TeacherRank prevent fake or abusive reviews?"
    answer: "Mandatory email verification, DOMPurify + Zod input sanitization, rate limits (5 reviews/hour, 20/day), a 50-character minimum comment, and Supabase row-level security that enforces 'edit only your own reviews' at the database layer."
---

Course registration has a basic information problem: you're picking professors based on almost nothing. Existing platforms give you a single number, which doesn't tell you whether a professor is tough but effective, responsive to emails, or fair with grading. Those are different things, and they matter differently to different students.

I built TeacherRank to fix that with a multi-dimensional rating system that gives students structured, specific feedback about educators.

![the live index · 377 teachers, 59 reviews, ranked](/projects/screens/teacher-rank.webp "app")

## One number is not a review

Students pick professors on incomplete or outdated information. A single star rating can't distinguish a professor who's challenging but teaches well from one who's just disorganized, and that distinction matters a lot when you're committing to a semester. TeacherRank rates four separate dimensions so students can choose on specifics instead of a blurry average.

This was also a learning opportunity for me. As an AI Engineering student, I wanted hands-on experience building a production web application with modern tools. Two birds, one project.

## The stack

I picked tools that are actually used in production, with some bias toward ones I wanted to learn.

React 18 + TypeScript is the foundation. TypeScript's static typing caught a lot of bugs during development, especially when I was refactoring component interfaces and changing prop shapes. I'm not going back to plain JavaScript for anything nontrivial.

Vite handles build tooling. Hot module replacement is nearly instant, and build times dropped from 45 seconds (Create React App) to under 3 seconds. That difference compounds fast when you're iterating.

Supabase runs the entire backend: JWT authentication with refresh token rotation, real-time database subscriptions, and row-level security policies enforced at the PostgreSQL level. Using a Backend-as-a-Service let me spend my time on application logic instead of configuring servers.

TanStack Query manages server state with stale-while-revalidate caching. The app feels responsive on slower connections, and cache invalidations propagate through the UI automatically. It also made the real-time features much easier to implement.

React Router handles navigation, with protected routes that redirect unauthenticated users. Combined with React Hook Form and Zod schemas for validation, that gives me a complete auth flow with type-safe form handling.

Tailwind CSS with DaisyUI speeds up styling. DaisyUI's pre-built components (cards, modals, etc.) can be customized while keeping the design consistent, and I never had to fight CSS specificity.

## The rating system

Reviews rate four dimensions instead of a single score. Teaching quality measures clarity of explanation and effectiveness of teaching methods. Communication covers email responsiveness, clarity of assignment instructions, and office hours accessibility. Helpfulness is about willingness to support students and give constructive feedback. Course difficulty gives context about challenge level without attaching a value judgment.

This gives students much more to work with. A professor rated 4.8/5 for teaching quality but 4.5/5 for difficulty tells you something specific: hard course, good teacher. A single number can't convey that.

Search and filtering use TanStack Query's caching. As users type a professor's name, results update without page reloads. The caching is smart enough that adding filters to an existing search (say, searching "Professor Ahmad" then filtering by "Data Structures") reuses cached data and updates instantly.

The advanced search panel supports combinations of filters: teacher name, subject, institution, and minimum rating thresholds for specific dimensions.

## Performance

### Cutting load time on a long list

Performance testing with a production-scale database exposed several problems. Initial page load was 4.2 seconds. The teacher list had frame drops during scrolling. Search felt sluggish.

Code splitting through route-based lazy loading made the biggest difference. Instead of bundling everything into one JavaScript file, each route loads as a separate chunk:

```typescript
const TeacherProfile = lazy(() => import('./pages/TeacherProfile'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
```

This cut the initial bundle from 450KB to 180KB, a 60% reduction. First Contentful Paint dropped from 2.1s to 0.8s.

Virtual scrolling fixed the teacher list. The page was rendering every teacher card to the DOM at once, which caused visible frame drops on mobile. With `@tanstack/react-virtual` I implemented windowing that renders only the visible items plus a small buffer:

```typescript
const rowVirtualizer = useVirtualizer({
  count: teachers.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 120,
  overscan: 5
})
```

The browser now renders about 15 teacher cards at a time regardless of total count. Scrolling stays smooth even on older Android phones.

Profile images lazy load with WebP support and responsive sizing. Images load only when approaching the viewport, and the browser picks WebP (30% smaller) or JPEG based on support.

Brotli compression on Vercel reduced asset sizes by 80%. A 300KB JavaScript bundle compresses to 60KB over the wire.

### Real-time sync

When a user submits a review, other users viewing that teacher's profile should see it immediately. Supabase's real-time subscriptions plug into TanStack Query's cache:

```typescript
// Subscribe to real-time updates
const subscription = supabase
  .from('reviews')
  .on('INSERT', payload => {
    queryClient.invalidateQueries(['teacher', teacherId])
  })
  .subscribe()
```

When a new review is inserted, the relevant query cache is invalidated, which triggers a background refetch. TanStack Query updates the UI without disrupting anything the user is doing.

### Form validation

Validation needed to keep data quality high without being annoying. React Hook Form with Zod schemas handles this:

```typescript
const reviewSchema = z.object({
  teacherId: z.string().uuid(),
  rating: z.object({
    teaching: z.number().min(1).max(5),
    communication: z.number().min(1).max(5),
    helpfulness: z.number().min(1).max(5),
    difficulty: z.number().min(1).max(5),
  }),
  comment: z.string().min(50).max(1000),
})
```

The 50-character minimum is there to prevent "good prof" drive-by reviews. The 1000-character maximum keeps feedback focused.

## What I learned building it

### Database schema

My first database schema was a mess. Teacher names were duplicated in the reviews table, institution data was scattered around, and foreign key constraints were missing. Updating a teacher's name meant changing it in multiple places, which led to inconsistencies. I had to refactor the whole thing.

The redesigned schema has four core tables. Teachers stores educator profiles with department, contact info, and a reference to their institution; each teacher gets a UUID that other tables reference. Reviews holds student feedback with the four ratings (teaching, communication, helpfulness, difficulty), written comments, timestamps, and foreign keys to both the teacher and the reviewing user. Institutions contains educational organizations with hierarchical structure, so I can run queries like "show me all teachers at COMSATS." Users handles profiles with role-based access: regular students can write reviews, admins can moderate content and manage teachers.

Learning to use foreign keys properly with `ON DELETE CASCADE` was one of those "why wasn't I doing this before" moments. When a teacher is removed, PostgreSQL deletes all their reviews. When a user deletes their account, their reviews go too. The database maintains referential integrity on its own.

Indexes made a huge difference. A GIN index on teacher names for full-text search dropped query times from 400ms to 12ms. Composite indexes on `(institution_id, subject)` made filtered searches instant.

Row-level security policies in Supabase were new to me. I wrote policies in SQL that enforce business logic at the database level:

```sql
-- Users can only update their own reviews
CREATE POLICY "Users update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Anyone can read approved reviews
CREATE POLICY "Public read approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');
```

Security isn't sitting in application code that can be bypassed. PostgreSQL itself enforces it.

### Users notice different things than I do

I spent weeks on the real-time synchronization system. What users actually noticed was the loading states. Simple skeleton screens that shimmer while data loads built more trust than any caching strategy. I should have started there.

Error boundaries handle failures. When something breaks, users see a "Something went wrong" message with a retry button instead of a white screen or a stack trace. Errors still go to Sentry, but users don't need to see that.

Mobile-first design stopped being optional once I checked the analytics. Over 60% of TeacherRank sessions happen on phones; students check ratings between classes or on the bus. The app had to work on a 5-inch screen first and scale up from there.

Students expected dark mode. DaisyUI's theme system made it straightforward, but I still had to check color contrast ratios. The app follows the OS theme preference by default.

I built to WCAG 2.1: keyboard navigation works throughout, every interactive element has a visible focus state, screen readers get proper ARIA labels and semantic HTML, and color is never the only way information is conveyed. Those constraints improved the design for everyone.

### Security

Building an app where users submit reviews about real people meant security couldn't be bolted on later.

Authentication uses Supabase Auth with JWT tokens and refresh token rotation. Users get a short-lived access token (1 hour) and a long-lived refresh token (30 days). The app requests new tokens before expiration, so users stay logged in without weakening anything.

Email verification is mandatory. Users can't submit reviews until they confirm their email. This one requirement cut spam and fake accounts significantly during testing.

Every review goes through DOMPurify for sanitization and Zod for schema validation before it reaches the database, which covers XSS.

Rate limiting: users can't submit more than 5 reviews per hour or 20 per day. Enough for legitimate use, tight enough to stop bad actors.

Content Security Policy headers only allow scripts from trusted sources. Vercel handles HTTPS automatically, but I added HSTS headers so browsers always use HTTPS even if someone types http:// manually.

Protected routes check authentication before rendering sensitive pages. The admin dashboard and review submission forms require the right permissions.

### Lighthouse, 65 to 95

My initial Lighthouse score was 65, which felt embarrassing for a platform meant to serve students on potentially slow university WiFi.

Iterating on it pushed the score above 95. Service workers (via Workbox) give offline support, so core features work without internet. PWA features let students "install" TeacherRank to their home screen. Tree-shaking with Vite eliminated dead code. `font-display: swap` prevents invisible text while fonts load. Vercel Analytics and Speed Insights give me real-time Core Web Vitals monitoring.

## What's live today

The platform is live at [teacherrank.vercel.app](https://teacherrank.vercel.app/), and students are using it.

In production: teacher profiles with four-dimensional ratings, aggregated statistics, and chronological review feeds. Search and filtering update as you type, with options to narrow by institution, subject, or minimum rating thresholds. Authentication has email verification, password recovery, and protected routes. Only verified students can submit reviews, and you can only edit or delete your own.

There's an admin dashboard for content moderation, teacher profile management, and platform analytics. Institution management lets you browse teachers organized by school. Real-time sync means new reviews appear immediately for everyone. The mobile-first responsive design with dark mode works across phones, tablets, and desktops.

The feedback I've gotten backs up the multi-dimensional ratings. Students say they use the distinction between teaching quality and difficulty when deciding on courses, which was the whole point.

## ML features I'm planning

As I continue my AI Engineering studies, I'm planning several ML features for the platform.

Sentiment analysis on review text would detect patterns that numeric ratings miss, like professors who get praised for teaching but criticized for grading. Collaborative filtering could recommend professors based on what similar students rated highly. Anomaly detection would flag suspicious review clusters (new accounts, short timeframes, extreme language) that suggest fake or coordinated reviews.

I'm also interested in automatic topic classification so students can filter reviews by aspects like teaching style, grading fairness, or workload. Time-series models could track whether a professor's ratings are trending up or down. And eventually, RAG-based natural language queries would let students ask things like "Which Data Structures professors have high ratings with manageable workload?" and get answers synthesized from actual review data.

## What I'd tell someone starting this

Start with the user problem. Having a real need to solve gave me clear requirements and kept me going when the database schema fell apart for the second time.

Use boring, well-adopted tools. React, TypeScript, Supabase, and TanStack Query are widely used in industry for good reasons. I learned patterns I can take directly to a job, not framework-specific tricks.

Users care about how it feels, not how it works. I spent weeks on real-time sync; they noticed loading states. Technical sophistication that doesn't show up in the user experience doesn't count for much.

Build security in from the start. Retrofitting it is painful and leaves gaps. Row-level security in Supabase convinced me the best place to enforce security is the data layer, not application code.

Talk to actual users. Regular feedback exposed assumptions that didn't match how people used the app. More than half my users are on phones, and I almost designed desktop-first.

## Project links

- Live platform: [teacherrank.vercel.app](https://teacherrank.vercel.app/)
- Source code: [GitHub Repository](https://github.com/TayyabManan/TeacherRank)
- Documentation: [Project Page](/projects/teacher-rank)

Questions about the implementation? [Reach out](/contact).
