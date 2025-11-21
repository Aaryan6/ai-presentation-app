import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { PresentationInput, Presentation, Slide, SlideElement, COLOR_SCHEMES, THEMES } from '@/types/presentation';
import { z } from 'zod';

// Helper to create elements from AI content
function createSlideElements(
  title: string,
  content: string[],
  isTitle: boolean,
  template: keyof typeof THEMES,
  slideIndex: number
): SlideElement[] {
  const theme = THEMES[template];
  const elements: SlideElement[] = [];
  const timestamp = Date.now() + slideIndex;

  if (isTitle) {
    // Title slide layout - centered heading
    elements.push({
      id: `el-${timestamp}-heading`,
      type: 'heading',
      content: title,
      position: { x: 80, y: 180 },
      size: { width: 800, height: 80 },
      style: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
      },
    });

    // Subtitle if there's content
    if (content.length > 0) {
      elements.push({
        id: `el-${timestamp}-subtitle`,
        type: 'text',
        content: content[0],
        position: { x: 180, y: 280 },
        size: { width: 600, height: 60 },
        style: {
          fontSize: '24px',
          fontWeight: 'normal',
          color: theme.text,
          textAlign: 'center',
        },
      });
    }
  } else {
    // Content slide layout
    elements.push({
      id: `el-${timestamp}-heading`,
      type: 'heading',
      content: title,
      position: { x: 60, y: 40 },
      size: { width: 840, height: 60 },
      style: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'left',
      },
    });

    // Bullet points
    if (content.length > 0) {
      elements.push({
        id: `el-${timestamp}-bullets`,
        type: 'bullet-list',
        content: content,
        position: { x: 60, y: 120 },
        size: { width: 840, height: 380 },
        style: {
          fontSize: '20px',
          fontWeight: 'normal',
          color: theme.text,
          textAlign: 'left',
        },
      });
    }
  }

  return elements;
}

// Define the schema for the presentation
const presentationSchema = z.object({
  title: z.string().describe('Main presentation title'),
  slides: z.array(
    z.object({
      title: z.string().describe('Slide title'),
      content: z.array(z.string()).describe('Bullet points for the slide'),
      speakerNotes: z.string().describe('Notes for the presenter about this slide'),
    })
  ),
});

export async function POST(request: Request) {
  try {
    const input: PresentationInput = await request.json();

    // Validate input
    if (!input.topic || !input.targetAudience) {
      return NextResponse.json(
        { error: 'Topic and target audience are required' },
        { status: 400 }
      );
    }

    // Create the prompt
    const prompt = `Create a professional presentation about "${input.topic}" with the following requirements:
- Number of slides: ${input.numberOfSlides}
- Purpose: ${input.purpose}
- Tone: ${input.tone}
- Target audience: ${input.targetAudience}
${input.additionalContext ? `- Additional context: ${input.additionalContext}` : ''}

Guidelines:
1. First slide should be a title slide with the presentation title
2. Include an introduction/overview slide
3. Create ${input.numberOfSlides - 3} content slides covering key topics
4. End with a conclusion/summary slide
5. Each content slide should have 3-5 concise bullet points
6. Speaker notes should be informative and helpful for the presenter
7. Match the ${input.tone} tone and ${input.purpose} purpose
8. Tailor content for ${input.targetAudience}`;

    // Call Google Gemini API using AI SDK
    const { object: generatedContent } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: presentationSchema,
      system: 'You are a professional presentation designer. Create engaging, well-structured presentations with clear, concise content.',
      prompt,
      temperature: 0.7,
    });

    // Add IDs to slides and create editable elements
    const slides: Slide[] = generatedContent.slides.map((slide: any, index: number) => {
      const slideId = `slide-${Date.now()}-${index}`;
      const isTitle = index === 0; // First slide is title slide

      return {
        id: slideId,
        title: slide.title,
        content: slide.content,
        speakerNotes: slide.speakerNotes || '',
        elements: createSlideElements(slide.title, slide.content, isTitle, input.template, index),
        layout: isTitle ? 'title' : 'content',
      };
    });

    // Create the presentation object
    const presentation: Presentation = {
      id: `pres-${Date.now()}`,
      title: generatedContent.title || input.topic,
      slides,
      template: input.template,
      colorScheme: COLOR_SCHEMES[0], // Default color scheme
      createdAt: new Date(),
    };

    return NextResponse.json(presentation);
  } catch (error: any) {
    console.error('Error generating presentation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}
