import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PresentationInput, Presentation, Slide, COLOR_SCHEMES } from '@/types/presentation';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
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

    // Create the prompt for OpenAI
    const prompt = `Create a professional presentation about "${input.topic}" with the following requirements:
- Number of slides: ${input.numberOfSlides}
- Purpose: ${input.purpose}
- Tone: ${input.tone}
- Target audience: ${input.targetAudience}
${input.additionalContext ? `- Additional context: ${input.additionalContext}` : ''}

Generate a JSON object with the following structure:
{
  "title": "Main presentation title",
  "slides": [
    {
      "title": "Slide title",
      "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
      "speakerNotes": "Notes for the presenter about this slide"
    }
  ]
}

Guidelines:
1. First slide should be a title slide with the presentation title
2. Include an introduction/overview slide
3. Create ${input.numberOfSlides - 3} content slides covering key topics
4. End with a conclusion/summary slide
5. Each content slide should have 3-5 concise bullet points
6. Speaker notes should be informative and helpful for the presenter
7. Match the ${input.tone} tone and ${input.purpose} purpose
8. Tailor content for ${input.targetAudience}

Return ONLY the JSON object, no additional text.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a professional presentation designer. Create engaging, well-structured presentations with clear, concise content. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No content received from OpenAI');
    }

    const generatedContent = JSON.parse(responseContent);

    // Add IDs to slides
    const slides: Slide[] = generatedContent.slides.map((slide: any, index: number) => ({
      id: `slide-${Date.now()}-${index}`,
      title: slide.title,
      content: slide.content,
      speakerNotes: slide.speakerNotes || '',
    }));

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
