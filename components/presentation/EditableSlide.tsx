'use client';

import { useState } from 'react';
import { Type, Square, Image as ImageIcon, List } from 'lucide-react';
import { Slide, Presentation, SlideElement } from '@/types/presentation';
import SlideRenderer from './SlideRenderer';
import EditableElement from './EditableElement';

interface EditableSlideProps {
  slide: Slide;
  presentation: Presentation;
  slideIndex: number;
  onUpdateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onAddElement: (element: SlideElement) => void;
}

export default function EditableSlide({
  slide,
  presentation,
  slideIndex,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
}: EditableSlideProps) {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);

  const addElement = (type: SlideElement['type']) => {
    const newElement: SlideElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === 'bullet-list' ? ['New item'] : type === 'heading' ? 'New Heading' : 'New text',
      position: { x: 50, y: 100 },
      size: {
        width: type === 'heading' ? 600 : type === 'shape' ? 150 : 300,
        height: type === 'heading' ? 60 : type === 'shape' ? 150 : type === 'bullet-list' ? 150 : 50,
      },
      style: {
        fontSize: type === 'heading' ? '32px' : '16px',
        fontWeight: type === 'heading' ? 'bold' : 'normal',
        color: '#000000',
        backgroundColor: type === 'shape' ? '#E5E7EB' : 'transparent',
        padding: '12px',
        textAlign: 'left',
      },
    };

    onAddElement(newElement);
    setSelectedElementId(newElement.id);
  };

  return (
    <div className="relative w-full h-full">
      {/* Base template */}
      <SlideRenderer slide={slide} presentation={presentation} slideIndex={slideIndex} />

      {/* Custom elements overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {slide.elements?.map((element) => (
            <EditableElement
              key={element.id}
              element={element}
              onUpdate={(updated) => onUpdateElement(element.id, updated)}
              onDelete={() => onDeleteElement(element.id)}
              isSelected={selectedElementId === element.id}
              onSelect={() => setSelectedElementId(element.id)}
            />
          ))}
        </div>
      </div>

      {/* Element toolbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center divide-x divide-gray-200">
            <button
              onClick={() => addElement('text')}
              className="px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col items-center gap-1 group"
              title="Add Text"
            >
              <Type className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-600">Text</span>
            </button>
            <button
              onClick={() => addElement('heading')}
              className="px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col items-center gap-1 group"
              title="Add Heading"
            >
              <Type className="w-6 h-6 text-gray-700 font-bold" />
              <span className="text-xs text-gray-600">Heading</span>
            </button>
            <button
              onClick={() => addElement('bullet-list')}
              className="px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col items-center gap-1 group"
              title="Add List"
            >
              <List className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-600">List</span>
            </button>
            <button
              onClick={() => addElement('shape')}
              className="px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col items-center gap-1 group"
              title="Add Shape"
            >
              <Square className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-600">Shape</span>
            </button>
            <button
              onClick={() => addElement('image')}
              className="px-4 py-3 hover:bg-gray-50 transition-colors flex flex-col items-center gap-1 group"
              title="Add Image Placeholder"
            >
              <ImageIcon className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-600">Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions overlay (shown when no elements) */}
      {(!slide.elements || slide.elements.length === 0) && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800 pointer-events-none">
          Click the toolbar below to add text, shapes, or images
        </div>
      )}
    </div>
  );
}
