import { Slide, Presentation } from '@/types/presentation';
import {
  VibrantYellowTemplate,
  ElegantPurpleTemplate,
  ModernGradientTemplate,
  ProfessionalBlueTemplate,
} from './ProfessionalTemplates';

interface SlideRendererProps {
  slide: Slide;
  presentation: Presentation;
  slideIndex: number;
}

export default function SlideRenderer({
  slide,
  presentation,
  slideIndex,
}: SlideRendererProps) {
  const isTitle = slideIndex === 0;

  const TemplateComponent = {
    'vibrant-yellow': VibrantYellowTemplate,
    'elegant-purple': ElegantPurpleTemplate,
    'modern-gradient': ModernGradientTemplate,
    'professional-blue': ProfessionalBlueTemplate,
  }[presentation.template];

  return (
    <div className="slide-container">
      <TemplateComponent
        slide={slide}
        presentation={presentation}
        isTitle={isTitle}
      />
    </div>
  );
}
