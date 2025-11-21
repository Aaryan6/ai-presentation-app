'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Palette,
  Layout,
  Plus,
  Trash2,
  Edit3,
  GripVertical,
  Sparkles,
  Maximize,
} from 'lucide-react';
import { usePresentationStore } from '@/lib/store';
import SlideRenderer from '@/components/presentation/SlideRenderer';
import EditableSlide from '@/components/presentation/EditableSlide';
import FullScreenPresentation from '@/components/presentation/FullScreenPresentation';
import { COLOR_SCHEMES } from '@/types/presentation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export default function EditorPage() {
  const router = useRouter();
  const {
    currentPresentation,
    updateSlide,
    deleteSlide,
    updateTemplate,
    updateColorScheme,
    updateTitle,
    reorderSlides,
    addElement,
    updateElement,
    deleteElement,
  } = usePresentationStore();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  useEffect(() => {
    if (!currentPresentation) {
      router.push('/create');
    }
  }, [currentPresentation, router]);

  if (!currentPresentation) {
    return null;
  }

  const currentSlide = currentPresentation.slides[currentSlideIndex];

  const handleNextSlide = () => {
    if (currentSlideIndex < currentPresentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleEditTitle = () => {
    setEditedTitle(currentPresentation.title);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      updateTitle(editedTitle);
    }
    setIsEditingTitle(false);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderSlides(result.source.index, result.destination.index);
    setCurrentSlideIndex(result.destination.index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                  className="text-xl font-semibold border-b-2 border-blue-600 outline-none"
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-800">
                  {currentPresentation.title}
                </h1>
                <button
                  onClick={handleEditTitle}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit3 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTemplatePicker(!showTemplatePicker)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Layout className="w-4 h-4" />
              Template
            </button>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Palette className="w-4 h-4" />
              Colors
            </button>
            <button
              onClick={() => setShowFullScreen(true)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Maximize className="w-4 h-4" />
              Present
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Template Picker */}
        {showTemplatePicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-3">Choose Template</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'vibrant-yellow' as const, name: 'Vibrant Yellow', color: 'from-yellow-300 to-yellow-100' },
                { id: 'elegant-purple' as const, name: 'Elegant Purple', color: 'from-purple-300 to-purple-100' },
                { id: 'modern-gradient' as const, name: 'Modern Gradient', color: 'from-blue-500 to-purple-500' },
                { id: 'professional-blue' as const, name: 'Professional Blue', color: 'from-blue-400 to-blue-200' },
              ].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      updateTemplate(template.id);
                      setShowTemplatePicker(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      currentPresentation.template === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-full h-12 bg-gradient-to-br ${template.color} rounded mb-2`}></div>
                    <p className="text-xs font-medium">{template.name}</p>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Color Picker */}
        {showColorPicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-3">Choose Color Scheme</h3>
            <div className="grid grid-cols-4 gap-3">
              {COLOR_SCHEMES.map((scheme) => (
                <button
                  key={scheme.name}
                  onClick={() => {
                    updateColorScheme(scheme);
                    setShowColorPicker(false);
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    currentPresentation.colorScheme.name === scheme.name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <span className="text-sm">{scheme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Slide Navigator */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              Slides ({currentPresentation.slides.length})
            </h2>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="slides">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {currentPresentation.slides.map((slide, index) => (
                    <Draggable key={slide.id} draggableId={slide.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group relative cursor-pointer transition-all ${
                            index === currentSlideIndex
                              ? 'ring-2 ring-blue-600'
                              : 'hover:ring-2 hover:ring-gray-300'
                          } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                          onClick={() => setCurrentSlideIndex(index)}
                        >
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <div className="scale-[0.2] origin-top-left w-[500%] h-[500%]">
                              <SlideRenderer
                                slide={slide}
                                presentation={currentPresentation}
                                slideIndex={index}
                              />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="w-4 h-4 text-gray-400" />
                              </div>
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {index + 1}. {slide.title}
                              </p>
                            </div>
                            {currentPresentation.slides.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSlide(slide.id);
                                  if (currentSlideIndex >= index && currentSlideIndex > 0) {
                                    setCurrentSlideIndex(currentSlideIndex - 1);
                                  }
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col bg-gray-100 p-8">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-5xl w-full">
              <EditableSlide
                slide={currentSlide}
                presentation={currentPresentation}
                slideIndex={currentSlideIndex}
                onUpdateElement={(elementId, updates) =>
                  updateElement(currentSlide.id, elementId, updates)
                }
                onDeleteElement={(elementId) =>
                  deleteElement(currentSlide.id, elementId)
                }
                onAddElement={(element) =>
                  addElement(currentSlide.id, element)
                }
              />

              {/* Navigation Arrows */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    currentSlideIndex === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="text-sm text-gray-600 flex items-center">
                  Slide {currentSlideIndex + 1} of {currentPresentation.slides.length}
                </div>

                <button
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === currentPresentation.slides.length - 1}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    currentSlideIndex === currentPresentation.slides.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          presentation={currentPresentation}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Full Screen Presentation */}
      {showFullScreen && (
        <FullScreenPresentation
          presentation={currentPresentation}
          startSlide={currentSlideIndex}
          onClose={() => setShowFullScreen(false)}
        />
      )}
    </div>
  );
}

// Export Modal Component
function ExportModal({
  presentation,
  onClose,
}: {
  presentation: any;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [exportType, setExportType] = useState<'pdf' | 'html'>('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    setIsExporting(true);

    try {
      // Import dynamically to avoid SSR issues
      if (exportType === 'pdf') {
        const { exportToPDF } = await import('@/lib/export');
        await exportToPDF(presentation);
      } else {
        const { exportToHTML } = await import('@/lib/export');
        await exportToHTML(presentation);
      }

      alert('Export successful! Check your downloads folder.');
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export presentation. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Export Presentation</h2>
            <p className="text-sm text-gray-600">Enter your email to download</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportType('pdf')}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  exportType === 'pdf'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setExportType('html')}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  exportType === 'html'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                HTML
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
