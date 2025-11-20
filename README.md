## AI Presentation Generator App

### Goal
Enable users to quickly create professional, visually appealing presentations using AI, demonstrating the practical value of AI in everyday work tasks.

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
