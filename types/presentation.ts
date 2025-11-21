export interface SlideElement {
  id: string;
  type: 'text' | 'heading' | 'bullet-list' | 'image' | 'shape' | 'icon';
  content: string | string[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface Slide {
  id: string;
  title: string;
  content: string[];
  speakerNotes: string;
  elements?: SlideElement[];
  layout?: 'default' | 'title' | 'content' | 'two-column' | 'image-text';
}

export interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  template: 'vibrant-yellow' | 'elegant-purple' | 'modern-gradient' | 'professional-blue';
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
  template: 'vibrant-yellow' | 'elegant-purple' | 'modern-gradient' | 'professional-blue';
}

export const THEMES = {
  'vibrant-yellow': {
    name: 'Vibrant Yellow',
    primary: '#FFF500',
    secondary: '#FFD700',
    background: '#FFFACD',
    text: '#000000',
    accent: '#FF6B00',
    border: '#000000',
  },
  'elegant-purple': {
    name: 'Elegant Purple',
    primary: '#C084FC',
    secondary: '#A855F7',
    background: '#F3E8FF',
    text: '#4C1D95',
    accent: '#8B5CF6',
    border: '#7C3AED',
  },
  'modern-gradient': {
    name: 'Modern Gradient',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    text: '#FFFFFF',
    accent: '#60A5FA',
    border: '#4F46E5',
  },
  'professional-blue': {
    name: 'Professional Blue',
    primary: '#1E40AF',
    secondary: '#3B82F6',
    background: '#EFF6FF',
    text: '#1E3A8A',
    accent: '#60A5FA',
    border: '#2563EB',
  },
} as const;

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: 'Vibrant Yellow',
    primary: '#FFF500',
    secondary: '#FFD700',
    background: '#FFFACD',
    text: '#000000',
    accent: '#FF6B00',
  },
  {
    name: 'Elegant Purple',
    primary: '#C084FC',
    secondary: '#A855F7',
    background: '#F3E8FF',
    text: '#4C1D95',
    accent: '#8B5CF6',
  },
  {
    name: 'Modern Gradient',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    background: '#667EEA',
    text: '#FFFFFF',
    accent: '#60A5FA',
  },
  {
    name: 'Professional Blue',
    primary: '#1E40AF',
    secondary: '#3B82F6',
    background: '#EFF6FF',
    text: '#1E3A8A',
    accent: '#60A5FA',
  },
];
