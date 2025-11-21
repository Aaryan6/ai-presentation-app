import { Slide, Presentation } from '@/types/presentation';
import { THEMES } from '@/types/presentation';

interface SlideTemplateProps {
  slide: Slide;
  presentation: Presentation;
  isTitle?: boolean;
}

// Vibrant Yellow Theme
export function VibrantYellowTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const theme = THEMES['vibrant-yellow'];

  return (
    <div
      className="slide-content relative"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Decorative top border pattern */}
      <div className="absolute top-0 left-0 right-0 h-4 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`}
          />
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-6 right-6 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-black flex items-center justify-center">
          <span className="text-xs">◐</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-black flex items-center justify-center">
          <span className="text-xs">◑</span>
        </div>
      </div>

      {isTitle ? (
        <div className="flex flex-col justify-center items-center h-full text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: theme.text }}>
            {slide.title}
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-32 h-1 bg-black"></div>
            <div className="w-10 h-10 bg-white border-3 border-black rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          {slide.content[0] && (
            <div className="flex gap-4 items-center">
              <div className="px-6 py-2 bg-white border-2 border-black rounded-full">
                <p className="text-lg">{slide.content[0]}</p>
              </div>
              <div className="px-6 py-2 bg-white border-2 border-black rounded-full">
                <p className="text-lg">{slide.content[1] || new Date().toLocaleDateString()}</p>
              </div>
            </div>
          )}

          {/* Decorative bottom element */}
          <div className="absolute bottom-8 right-8">
            <div className="w-16 h-16 bg-white border-3 border-black rounded-2xl flex items-center justify-center transform rotate-12">
              <span className="text-3xl">↻</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-16">
          {/* Content with decorative border */}
          <div className="grid grid-cols-3 gap-6 h-full">
            {slide.content.slice(0, 3).map((point, index) => (
              <div
                key={index}
                className="relative bg-white border-4 border-black p-6 rounded-xl"
                style={{ borderColor: theme.border }}
              >
                {/* Decorative corner accent */}
                <div
                  className="absolute -top-2 -left-2 w-12 h-12 rounded-tl-xl"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  }}
                ></div>

                <h3 className="text-xl font-bold mb-4 relative z-10" style={{ color: theme.text }}>
                  {point.split(':')[0] || `Point ${index + 1}`}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: theme.text }}>
                  {point.split(':')[1] || point}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative bottom border pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-3 flex">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Elegant Purple Theme
export function ElegantPurpleTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const theme = THEMES['elegant-purple'];

  return (
    <div
      className="slide-content relative overflow-hidden"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Decorative top wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,40 Q300,0 600,40 T1200,40 L1200,0 L0,0 Z"
            fill={theme.primary}
            opacity="0.3"
          />
        </svg>
      </div>

      {isTitle ? (
        <div className="flex flex-col justify-center items-center h-full text-center relative z-10">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {slide.title}
            </h1>

            {slide.content[0] && (
              <p className="text-xl mb-8 opacity-90" style={{ color: theme.text }}>
                {slide.content[0]}
              </p>
            )}

            {/* Decorative element */}
            <div className="inline-flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.secondary }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-20">
          <h2
            className="text-3xl font-bold mb-8 relative inline-block"
            style={{ color: theme.text }}
          >
            {slide.title}
            <div
              className="absolute -bottom-2 left-0 w-full h-1 rounded"
              style={{ backgroundColor: theme.primary }}
            />
          </h2>

          <div className="grid grid-cols-2 gap-6 mt-8">
            {slide.content.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                    color: 'white',
                  }}
                >
                  {index + 1}
                </div>
                <p className="text-lg pt-2" style={{ color: theme.text }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative bottom element */}
      <div className="absolute bottom-8 right-8 opacity-20">
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

// Modern Gradient Theme
export function ModernGradientTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const theme = THEMES['modern-gradient'];

  return (
    <div
      className="slide-content relative"
      style={{
        background: theme.background,
        color: theme.text,
      }}
    >
      {isTitle ? (
        <div className="flex flex-col justify-center items-center h-full text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {slide.title}
          </h1>

          {slide.content[0] && (
            <p className="text-2xl text-white/90 max-w-3xl mb-8">{slide.content[0]}</p>
          )}

          {/* Glass morphism card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-white">
              {slide.content[1] || 'Professional Presentation'}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-4xl font-bold mb-12 text-white drop-shadow-lg">
            {slide.title}
          </h2>

          <div className="space-y-4">
            {slide.content.map((point, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-white pt-1">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
    </div>
  );
}

// Professional Blue Theme
export function ProfessionalBlueTemplate({ slide, presentation, isTitle }: SlideTemplateProps) {
  const theme = THEMES['professional-blue'];

  return (
    <div
      className="slide-content relative"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Side accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: theme.primary }}
      />

      {isTitle ? (
        <div className="flex flex-col justify-center h-full pl-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: theme.primary }}>
            {slide.title}
          </h1>

          {slide.content[0] && (
            <p className="text-2xl mb-8" style={{ color: theme.text }}>
              {slide.content[0]}
            </p>
          )}

          <div className="flex gap-4">
            <div
              className="px-6 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: theme.primary }}
            >
              {slide.content[1] || 'Get Started'}
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-12">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: theme.primary }}
            >
              ⚡
            </div>
            <h2 className="text-3xl font-bold" style={{ color: theme.text }}>
              {slide.title}
            </h2>
          </div>

          <div className="space-y-4">
            {slide.content.map((point, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: theme.accent }}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg" style={{ color: theme.text }}>
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative bottom corner */}
      <div className="absolute bottom-6 right-6">
        <div
          className="w-20 h-20 rounded-full opacity-20"
          style={{ backgroundColor: theme.primary }}
        />
      </div>
    </div>
  );
}
