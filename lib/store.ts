import { create } from 'zustand';
import { Presentation, PresentationInput, Slide, ColorScheme, COLOR_SCHEMES } from '@/types/presentation';

interface PresentationStore {
  currentPresentation: Presentation | null;
  isGenerating: boolean;
  generationProgress: string;
  setPresentation: (presentation: Presentation) => void;
  updateSlide: (slideId: string, updates: Partial<Slide>) => void;
  deleteSlide: (slideId: string) => void;
  addSlide: (slide: Slide, index?: number) => void;
  reorderSlides: (startIndex: number, endIndex: number) => void;
  updateTemplate: (template: Presentation['template']) => void;
  updateColorScheme: (colorScheme: ColorScheme) => void;
  updateTitle: (title: string) => void;
  setGenerating: (isGenerating: boolean, progress?: string) => void;
  reset: () => void;
}

export const usePresentationStore = create<PresentationStore>((set) => ({
  currentPresentation: null,
  isGenerating: false,
  generationProgress: '',

  setPresentation: (presentation) =>
    set({ currentPresentation: presentation, isGenerating: false }),

  updateSlide: (slideId, updates) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      return {
        currentPresentation: {
          ...state.currentPresentation,
          slides: state.currentPresentation.slides.map((slide) =>
            slide.id === slideId ? { ...slide, ...updates } : slide
          ),
        },
      };
    }),

  deleteSlide: (slideId) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      return {
        currentPresentation: {
          ...state.currentPresentation,
          slides: state.currentPresentation.slides.filter(
            (slide) => slide.id !== slideId
          ),
        },
      };
    }),

  addSlide: (slide, index) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      const slides = [...state.currentPresentation.slides];
      if (index !== undefined) {
        slides.splice(index, 0, slide);
      } else {
        slides.push(slide);
      }
      return {
        currentPresentation: {
          ...state.currentPresentation,
          slides,
        },
      };
    }),

  reorderSlides: (startIndex, endIndex) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      const slides = Array.from(state.currentPresentation.slides);
      const [removed] = slides.splice(startIndex, 1);
      slides.splice(endIndex, 0, removed);
      return {
        currentPresentation: {
          ...state.currentPresentation,
          slides,
        },
      };
    }),

  updateTemplate: (template) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      return {
        currentPresentation: {
          ...state.currentPresentation,
          template,
        },
      };
    }),

  updateColorScheme: (colorScheme) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      return {
        currentPresentation: {
          ...state.currentPresentation,
          colorScheme,
        },
      };
    }),

  updateTitle: (title) =>
    set((state) => {
      if (!state.currentPresentation) return state;
      return {
        currentPresentation: {
          ...state.currentPresentation,
          title,
        },
      };
    }),

  setGenerating: (isGenerating, progress = '') =>
    set({ isGenerating, generationProgress: progress }),

  reset: () => set({ currentPresentation: null, isGenerating: false, generationProgress: '' }),
}));
