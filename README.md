# AI Presentation Generator App

Create stunning, professional presentations in minutes using the power of AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-00a67e)

## Overview
Enable users to quickly create professional, visually appealing presentations using AI, demonstrating the practical value of AI in everyday work tasks.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-presentation-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

### Core Features
1. **Input Form**
   - Topic/Title input
   - Number of slides (5-15 range)
   - Presentation purpose (pitch, training, report, general)
   - Tone selection (professional, casual, persuasive, educational)
   - Target audience specification

2. **AI Generation**
   - Generate slide titles and structure
   - Create bullet points for each slide
   - Add speaker notes
   - Suggest relevant talking points

3. **Customization**
   - 3-4 pre-designed beautiful templates
   - Color scheme selector
   - Ability to regenerate individual slides
   - Edit slide content inline
   - Reorder slides via drag-and-drop

4. **Export Options**
   - Download as PDF
   - Download as HTML presentation
   - Copy to PowerPoint-compatible format (future)

5. **Lead Capture**
   - Email required before export
   - Option to save presentation to account
   - Newsletter signup integration

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **AI:** OpenAI API (GPT-4 or GPT-3.5-turbo)
- **Styling:** Tailwind CSS
- **Slide Rendering:** Custom React components or Reveal.js
- **PDF Generation:** jsPDF or Puppeteer
- **State Management:** React Context or Zustand
- **Database:** PostgreSQL (Supabase) for saving presentations
- **Authentication:** NextAuth.js (optional for saved presentations)

### Design Layout

#### Landing Page
```
Header: Logo | Navigation | CTA Button
Hero Section:
  - Headline: "Create Stunning Presentations in Minutes with AI"
  - Subheadline: "From idea to polished slides in 3 simple steps"
  - Demo video or animated preview
  - Primary CTA: "Create Your Presentation"
  
Features Section:
  - 3 columns: Fast, Professional, AI-Powered
  - Icons + brief descriptions

How It Works:
  - 3 steps with visuals
  - 1. Enter your topic | 2. AI generates slides | 3. Customize & Download

Social Proof:
  - User testimonials
  - Number of presentations created

Footer: Links | Social | Contact
```

#### App Interface
```
Layout: 2-column

Left Sidebar (30%):
  - Presentation settings panel
  - Slide navigator (thumbnails)
  - Template selector
  - Color scheme options
  - Export button

Main Canvas (70%):
  - Large slide preview
  - Inline editing capabilities
  - Navigation arrows (prev/next slide)
  - Regenerate slide button
  - Add/Delete slide buttons

Top Bar:
  - Presentation title (editable)
  - Save button
  - Settings icon
  - User menu
```

#### Input Form (Multi-step)
```
Step 1: Topic & Purpose
  - Large text input for topic
  - Dropdown for presentation purpose
  - Radio buttons for tone

Step 2: Customization
  - Slider for number of slides
  - Text area for additional context
  - Target audience input

Step 3: Template Selection
  - Visual grid of 4 templates
  - Preview on hover

Progress indicator at top
Back/Next buttons
Generate button on final step
```

### User Flow
1. Land on page → See demo/value prop
2. Click CTA → Multi-step form
3. Fill details → Click "Generate"
4. Loading state (30-60 seconds) with progress messages
5. See generated presentation → Edit as needed
6. Email gate for export → Download PDF/HTML

## Project Structure

```
ai-presentation-app/
├── app/                      # Next.js App Router
│   ├── api/
│   │   └── generate/        # AI generation API endpoint
│   ├── create/              # Multi-step form page
│   ├── editor/              # Presentation editor
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── presentation/        # Presentation components
│   │   ├── SlideRenderer.tsx
│   │   └── SlideTemplates.tsx
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── store.ts             # Zustand state management
│   └── export.ts            # PDF/HTML export utilities
├── types/
│   └── presentation.ts      # TypeScript types
└── public/                  # Static assets
```

## Available Templates

1. **Modern** - Clean, gradient-based design with bold typography
2. **Professional** - Classic business presentation style
3. **Minimal** - Simple, elegant design with maximum readability
4. **Creative** - Vibrant, eye-catching design with dynamic elements

## Color Schemes

- Ocean Blue
- Forest Green
- Sunset Orange
- Royal Purple

## Tech Stack Details

- **Frontend Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **AI Integration:** OpenAI GPT-4 Turbo
- **State Management:** Zustand
- **Drag & Drop:** react-beautiful-dnd
- **PDF Export:** jsPDF + html2canvas
- **Icons:** Lucide React

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

This app can be deployed to Vercel, Netlify, or any platform that supports Next.js:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy

## Future Enhancements

- [ ] User authentication and saved presentations
- [ ] Database integration (Supabase/PostgreSQL)
- [ ] Individual slide regeneration
- [ ] PowerPoint (PPTX) export
- [ ] Collaborative editing
- [ ] Custom branding options
- [ ] AI-generated images for slides
- [ ] Presenter mode with notes view

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
