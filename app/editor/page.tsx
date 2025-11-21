'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Layout,
  Trash2,
  Edit3,
  Maximize,
  Type,
  Square,
  Image as ImageIcon,
  List,
  Heading,
} from 'lucide-react';
import { usePresentationStore } from '@/lib/store';
import { THEMES, SlideElement } from '@/types/presentation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Dynamically import Konva editor to avoid SSR issues
const KonvaSlideEditor = dynamic(
  () => import('@/components/presentation/KonvaSlideEditor'),
  { ssr: false, loading: () => <div className="w-[960px] h-[540px] bg-gray-200 animate-pulse rounded-lg" /> }
);

// Dynamically import FullScreen presentation
const FullScreenPresentation = dynamic(
  () => import('@/components/presentation/FullScreenPresentation'),
  { ssr: false }
);

export default function EditorPage() {
  const router = useRouter();
  const {
    currentPresentation,
    deleteSlide,
    updateTemplate,
    updateTitle,
    reorderSlides,
    addElement,
    updateElement,
    deleteElement,
  } = usePresentationStore();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  useEffect(() => {
    if (!currentPresentation) {
      router.push('/create');
    }
  }, [currentPresentation, router]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedElementId && currentPresentation) {
        const currentSlide = currentPresentation.slides[currentSlideIndex];
        deleteElement(currentSlide.id, selectedElementId);
        setSelectedElementId(null);
      }
      if (e.key === 'Escape') {
        setSelectedElementId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, currentPresentation, currentSlideIndex, deleteElement]);

  if (!currentPresentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentSlide = currentPresentation.slides[currentSlideIndex];
  const theme = THEMES[currentPresentation.template];

  const handleNextSlide = () => {
    if (currentSlideIndex < currentPresentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setSelectedElementId(null);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setSelectedElementId(null);
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

  const addNewElement = (type: SlideElement['type']) => {
    const baseElement: SlideElement = {
      id: `element-${Date.now()}`,
      type,
      content: '',
      position: { x: 100, y: 150 },
      size: { width: 300, height: 50 },
      style: {
        fontSize: '16px',
        color: theme.text,
        backgroundColor: 'transparent',
        padding: '8px',
        textAlign: 'left',
      },
    };

    switch (type) {
      case 'heading':
        baseElement.content = 'New Heading';
        baseElement.size = { width: 600, height: 60 };
        baseElement.style = { ...baseElement.style, fontSize: '32px', fontWeight: 'bold' };
        break;
      case 'text':
        baseElement.content = 'Click to edit text';
        baseElement.size = { width: 400, height: 80 };
        break;
      case 'bullet-list':
        baseElement.content = ['First item', 'Second item', 'Third item'];
        baseElement.size = { width: 400, height: 150 };
        break;
      case 'shape':
        baseElement.content = '';
        baseElement.size = { width: 150, height: 150 };
        baseElement.style = { ...baseElement.style, backgroundColor: theme.primary, borderRadius: '8px' };
        break;
      case 'image':
        baseElement.content = 'Image placeholder';
        baseElement.size = { width: 300, height: 200 };
        break;
    }

    addElement(currentSlide.id, baseElement);
    setSelectedElementId(baseElement.id);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                className="text-lg font-semibold bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <button
                onClick={handleEditTitle}
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                <span className="text-lg font-semibold">{currentPresentation.title}</span>
                <Edit3 className="w-4 h-4 opacity-50" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTemplatePicker(!showTemplatePicker)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
            >
              <Layout className="w-4 h-4" />
              Theme
            </button>
            <button
              onClick={() => setShowFullScreen(true)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
            >
              <Maximize className="w-4 h-4" />
              Present
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Theme Picker Dropdown */}
        {showTemplatePicker && (
          <div className="absolute top-14 right-4 z-50 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl">
            <h3 className="text-white text-sm font-medium mb-3">Choose Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEMES).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => {
                    updateTemplate(key as keyof typeof THEMES);
                    setShowTemplatePicker(false);
                  }}
                  className={`p-2 rounded-lg border-2 transition-colors ${
                    currentPresentation.template === key
                      ? 'border-blue-500'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div
                    className="w-20 h-12 rounded mb-1"
                    style={{ background: themeData.background }}
                  />
                  <p className="text-xs text-gray-300">{themeData.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar - Slide Navigator */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <h2 className="text-white font-medium text-sm">
              Slides ({currentPresentation.slides.length})
            </h2>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="slides">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 overflow-y-auto p-2 space-y-2"
                >
                  {currentPresentation.slides.map((slide, index) => (
                    <Draggable key={slide.id} draggableId={slide.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`cursor-pointer transition-all rounded-lg overflow-hidden ${
                            index === currentSlideIndex
                              ? 'ring-2 ring-blue-500'
                              : 'hover:ring-2 hover:ring-gray-600'
                          } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                          onClick={() => {
                            setCurrentSlideIndex(index);
                            setSelectedElementId(null);
                          }}
                        >
                          <div
                            className="aspect-video p-2 text-xs"
                            style={{
                              background: theme.background,
                              color: theme.text,
                            }}
                          >
                            <p className="font-bold truncate">{slide.title}</p>
                          </div>
                          <div className="bg-gray-700 px-2 py-1 flex items-center justify-between">
                            <span className="text-xs text-gray-400">{index + 1}</span>
                            {currentPresentation.slides.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSlide(slide.id);
                                  if (currentSlideIndex >= index && currentSlideIndex > 0) {
                                    setCurrentSlideIndex(currentSlideIndex - 1);
                                  }
                                }}
                                className="p-1 hover:bg-red-600 rounded transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-gray-400 hover:text-white" />
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
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {/* Toolbar - OUTSIDE the canvas */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-xs mr-2">Add:</span>
              <button
                onClick={() => addNewElement('heading')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-white text-sm transition-colors"
                title="Add Heading"
              >
                <Heading className="w-4 h-4" />
                Heading
              </button>
              <button
                onClick={() => addNewElement('text')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-white text-sm transition-colors"
                title="Add Text"
              >
                <Type className="w-4 h-4" />
                Text
              </button>
              <button
                onClick={() => addNewElement('bullet-list')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-white text-sm transition-colors"
                title="Add List"
              >
                <List className="w-4 h-4" />
                List
              </button>
              <button
                onClick={() => addNewElement('shape')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-white text-sm transition-colors"
                title="Add Shape"
              >
                <Square className="w-4 h-4" />
                Shape
              </button>
              <button
                onClick={() => addNewElement('image')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-white text-sm transition-colors"
                title="Add Image"
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>

              <div className="flex-1" />

              {selectedElementId && (
                <button
                  onClick={() => {
                    deleteElement(currentSlide.id, selectedElementId);
                    setSelectedElementId(null);
                  }}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 text-white text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <KonvaSlideEditor
              elements={currentSlide.elements || []}
              presentation={currentPresentation}
              slideIndex={currentSlideIndex}
              selectedId={selectedElementId}
              onSelect={setSelectedElementId}
              onUpdateElement={(id, updates) => updateElement(currentSlide.id, id, updates)}
              onDeleteElement={(id) => {
                deleteElement(currentSlide.id, id);
                setSelectedElementId(null);
              }}
            />
          </div>

          {/* Bottom Navigation */}
          <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <span className="text-gray-400 text-sm">
              Slide {currentSlideIndex + 1} of {currentPresentation.slides.length}
            </span>

            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === currentPresentation.slides.length - 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 text-white text-sm transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Export Presentation</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Format</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportType('pdf')}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  exportType === 'pdf'
                    ? 'border-blue-500 bg-blue-600/20 text-white'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                PDF
              </button>
              <button
                onClick={() => setExportType('html')}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  exportType === 'html'
                    ? 'border-blue-500 bg-blue-600/20 text-white'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                HTML
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
}
