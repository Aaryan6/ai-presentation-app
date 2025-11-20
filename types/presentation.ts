export interface Slide {
  id: string;
  title: string;
  content: string[];
  speakerNotes: string;
}

export interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  template: 'modern' | 'professional' | 'minimal' | 'creative';
  colorScheme: ColorScheme;
  createdAt: Date;
}

export interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface PresentationInput {
  topic: string;
  numberOfSlides: number;
  purpose: 'pitch' | 'training' | 'report' | 'general';
  tone: 'professional' | 'casual' | 'persuasive' | 'educational';
  targetAudience: string;
  additionalContext?: string;
  template: 'modern' | 'professional' | 'minimal' | 'creative';
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    secondary: '#0369a1',
    background: '#f0f9ff',
    text: '#0c4a6e',
    accent: '#38bdf8',
  },
  {
    name: 'Forest Green',
    primary: '#10b981',
    secondary: '#059669',
    background: '#f0fdf4',
    text: '#064e3b',
    accent: '#34d399',
  },
  {
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#ea580c',
    background: '#fff7ed',
    text: '#7c2d12',
    accent: '#fb923c',
  },
  {
    name: 'Royal Purple',
    primary: '#a855f7',
    secondary: '#9333ea',
    background: '#faf5ff',
    text: '#581c87',
    accent: '#c084fc',
  },
];
