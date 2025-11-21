'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Presentation } from '@/types/presentation';
import SlideRenderer from './SlideRenderer';

interface FullScreenPresentationProps {
  presentation: Presentation;
  startSlide?: number;
  onClose: () => void;
}

export default function FullScreenPresentation({
  presentation,
  startSlide = 0,
  onClose,
}: FullScreenPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(startSlide);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          if (currentSlide < presentation.slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
          }
          break;
        case 'Escape':
          onClose();
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(presentation.slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, presentation.slides.length, onClose]);

  const slide = presentation.slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white backdrop-blur-sm"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Slide counter */}
      <div className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white">
        {currentSlide + 1} / {presentation.slides.length}
      </div>

      {/* Main slide area */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-full max-h-[90vh]">
          <SlideRenderer
            slide={slide}
            presentation={presentation}
            slideIndex={currentSlide}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg backdrop-blur-sm text-white flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={() =>
            setCurrentSlide(Math.min(presentation.slides.length - 1, currentSlide + 1))
          }
          disabled={currentSlide === presentation.slides.length - 1}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg backdrop-blur-sm text-white flex items-center gap-2 transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Speaker notes (bottom overlay) */}
      {slide.speakerNotes && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white p-6 max-h-32 overflow-y-auto">
          <p className="text-sm opacity-80">
            <strong>Speaker Notes:</strong> {slide.speakerNotes}
          </p>
        </div>
      )}
    </div>
  );
}
