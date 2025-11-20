import { Slide, Presentation } from '@/types/presentation';

interface SlideTemplateProps {
  slide: Slide;
  presentation: Presentation;
  isTitle?: boolean;
}

export function ModernTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const { colorScheme } = presentation;

  return (
    <div
      className="slide-content"
      style={{
        background: `linear-gradient(135deg, ${colorScheme.background} 0%, ${colorScheme.primary}15 100%)`,
        color: colorScheme.text,
      }}
    >
      {isTitle ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: colorScheme.primary }}
          >
            {slide.title}
          </h1>
          {slide.content[0] && (
            <p className="text-xl md:text-2xl opacity-80">{slide.content[0]}</p>
          )}
        </div>
      ) : (
        <>
          <div
            className="h-1 w-24 rounded mb-6"
            style={{ backgroundColor: colorScheme.primary }}
          />
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: colorScheme.primary }}
          >
            {slide.title}
          </h2>
          <ul className="space-y-4 text-lg md:text-xl">
            {slide.content.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: colorScheme.accent }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function ProfessionalTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const { colorScheme } = presentation;

  return (
    <div
      className="slide-content"
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        borderLeft: `8px solid ${colorScheme.primary}`,
      }}
    >
      {isTitle ? (
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: colorScheme.primary }}>
            {slide.title}
          </h1>
          {slide.content[0] && (
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl">{slide.content[0]}</p>
          )}
        </div>
      ) : (
        <>
          <div
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: colorScheme.secondary }}
          >
            Presentation
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: colorScheme.text }}>
            {slide.title}
          </h2>
          <ul className="space-y-4 text-lg md:text-xl">
            {slide.content.map((point, index) => (
              <li key={index} className="flex items-start gap-4">
                <span
                  className="px-3 py-1 rounded font-semibold flex-shrink-0"
                  style={{
                    backgroundColor: colorScheme.primary,
                    color: colorScheme.background,
                  }}
                >
                  {index + 1}
                </span>
                <span className="pt-1">{point}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function MinimalTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const { colorScheme } = presentation;

  return (
    <div
      className="slide-content"
      style={{
        backgroundColor: '#ffffff',
        color: '#1f2937',
      }}
    >
      {isTitle ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div
            className="w-16 h-1 mb-8"
            style={{ backgroundColor: colorScheme.primary }}
          />
          <h1 className="text-5xl md:text-6xl font-light mb-4">{slide.title}</h1>
          {slide.content[0] && (
            <p className="text-xl md:text-2xl text-gray-600 font-light">{slide.content[0]}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <h2 className="text-3xl md:text-4xl font-light mb-12">{slide.title}</h2>
          <ul className="space-y-6 text-lg md:text-xl flex-1">
            {slide.content.map((point, index) => (
              <li key={index} className="flex items-start gap-4 font-light">
                <span
                  className="text-2xl font-light"
                  style={{ color: colorScheme.primary }}
                >
                  —
                </span>
                <span className="pt-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CreativeTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const { colorScheme } = presentation;

  return (
    <div
      className="slide-content relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at top right, ${colorScheme.primary}20 0%, ${colorScheme.background} 50%)`,
        color: colorScheme.text,
      }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: colorScheme.accent }}
      />

      {isTitle ? (
        <div className="flex flex-col justify-center h-full relative z-10">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {slide.title}
          </h1>
          {slide.content[0] && (
            <p className="text-xl md:text-2xl opacity-80">{slide.content[0]}</p>
          )}
        </div>
      ) : (
        <div className="relative z-10">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: colorScheme.primary }}
          >
            {slide.title}
          </h2>
          <ul className="space-y-4 text-lg md:text-xl">
            {slide.content.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.accent} 100%)`,
                    color: colorScheme.background,
                  }}
                >
                  {index + 1}
                </span>
                <span className="pt-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
