import { Slide, Presentation } from '@/types/presentation';
import {
  ModernTemplate,
  ProfessionalTemplate,
  MinimalTemplate,
  CreativeTemplate,
} from './SlideTemplates';

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
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
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
