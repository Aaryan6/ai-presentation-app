'use client';

import { useState, useRef, useEffect } from 'react';
import { Trash2, GripVertical, Edit3 } from 'lucide-react';
import { SlideElement } from '@/types/presentation';

interface EditableElementProps {
  element: SlideElement;
  onUpdate: (element: SlideElement) => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

export default function EditableElement({
  element,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
}: EditableElementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    Array.isArray(element.content) ? element.content.join('\n') : element.content
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    if (element.type === 'text' || element.type === 'heading' || element.type === 'bullet-list') {
      setIsEditing(true);
      onSelect();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    const newContent = element.type === 'bullet-list'
      ? editedContent.split('\n').filter(line => line.trim())
      : editedContent;

    onUpdate({
      ...element,
      content: newContent,
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === elementRef.current || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - element.position.x,
        y: e.clientY - element.position.y,
      });
      onSelect();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const container = elementRef.current?.parentElement;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const newX = Math.max(0, Math.min(e.clientX - dragStart.x - rect.left, rect.width - element.size.width));
        const newY = Math.max(0, Math.min(e.clientY - dragStart.y - rect.top, rect.height - element.size.height));

        onUpdate({
          ...element,
          position: { x: newX, y: newY },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, element, onUpdate]);

  const renderContent = () => {
    const baseStyle: React.CSSProperties = {
      fontSize: element.style?.fontSize || '16px',
      fontWeight: element.style?.fontWeight || 'normal',
      color: element.style?.color || '#000000',
      backgroundColor: element.style?.backgroundColor || 'transparent',
      borderRadius: element.style?.borderRadius || '0',
      padding: element.style?.padding || '8px',
      textAlign: element.style?.textAlign || 'left',
      width: '100%',
      height: '100%',
    };

    if (isEditing) {
      return (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full h-full resize-none outline-none border-2 border-blue-500"
          style={baseStyle}
        />
      );
    }

    switch (element.type) {
      case 'heading':
        return (
          <h2 style={{ ...baseStyle, fontSize: '32px', fontWeight: 'bold' }}>
            {element.content}
          </h2>
        );
      case 'text':
        return <p style={baseStyle}>{element.content}</p>;
      case 'bullet-list':
        return (
          <ul style={baseStyle} className="list-disc list-inside space-y-2">
            {Array.isArray(element.content) &&
              element.content.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
      case 'shape':
        return (
          <div
            style={{
              ...baseStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid currentColor',
            }}
          >
            {element.content}
          </div>
        );
      case 'image':
        return (
          <div
            style={baseStyle}
            className="flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400"
          >
            <span className="text-gray-500">📷 {element.content || 'Image'}</span>
          </div>
        );
      default:
        return <p style={baseStyle}>{element.content}</p>;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-move group ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={onSelect}
    >
      {renderContent()}

      {/* Controls (shown on hover or when selected) */}
      {(isSelected || !isEditing) && (
        <div className="absolute -top-8 left-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-lg rounded px-2 py-1">
          <button
            className="drag-handle p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
