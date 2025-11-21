'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import { SlideElement, Presentation, THEMES } from '@/types/presentation';

interface KonvaSlideEditorProps {
  elements: SlideElement[];
  presentation: Presentation;
  slideIndex: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<SlideElement>) => void;
  onDeleteElement: (id: string) => void;
}

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

export default function KonvaSlideEditor({
  elements,
  presentation,
  slideIndex,
  selectedId,
  onSelect,
  onUpdateElement,
  onDeleteElement,
}: KonvaSlideEditorProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const theme = THEMES[presentation.template] || THEMES['vibrant-yellow'];
  const isGradient = theme.background.includes('gradient');

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      } else {
        transformerRef.current.nodes([]);
      }
    }
  }, [selectedId]);

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // Click on empty area - deselect
    if (e.target === e.target.getStage()) {
      onSelect(null);
      setEditingId(null);
    }
  };

  const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    onUpdateElement(id, {
      position: { x: e.target.x(), y: e.target.y() },
    });
  };

  const handleTransformEnd = (id: string, e: Konva.KonvaEventObject<Event>) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale and apply to size
    node.scaleX(1);
    node.scaleY(1);

    onUpdateElement(id, {
      position: { x: node.x(), y: node.y() },
      size: {
        width: Math.max(50, node.width() * scaleX),
        height: Math.max(30, node.height() * scaleY),
      },
    });
  };

  const handleDoubleClick = (id: string, element: SlideElement) => {
    if (element.type === 'text' || element.type === 'heading' || element.type === 'bullet-list') {
      setEditingId(id);

      // Create textarea for editing
      const stage = stageRef.current;
      if (!stage) return;

      const stageBox = stage.container().getBoundingClientRect();
      const textNode = stage.findOne(`#${id}`);
      if (!textNode) return;

      const textPosition = textNode.getAbsolutePosition();
      const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = Array.isArray(element.content)
        ? element.content.join('\n')
        : String(element.content);
      textarea.style.position = 'absolute';
      textarea.style.top = `${areaPosition.y}px`;
      textarea.style.left = `${areaPosition.x}px`;
      textarea.style.width = `${element.size.width}px`;
      textarea.style.height = `${element.size.height}px`;
      textarea.style.fontSize = element.style?.fontSize || '16px';
      textarea.style.fontWeight = element.style?.fontWeight || 'normal';
      textarea.style.color = element.style?.color || '#000000';
      textarea.style.border = '2px solid #3b82f6';
      textarea.style.padding = '8px';
      textarea.style.margin = '0';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'white';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = '1.4';
      textarea.style.fontFamily = 'inherit';
      textarea.style.zIndex = '1000';
      textarea.style.borderRadius = '4px';

      textarea.focus();
      textarea.select();

      const removeTextarea = () => {
        const newContent = element.type === 'bullet-list'
          ? textarea.value.split('\n').filter(line => line.trim())
          : textarea.value;

        onUpdateElement(id, { content: newContent });
        document.body.removeChild(textarea);
        setEditingId(null);
      };

      textarea.addEventListener('blur', removeTextarea);
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          removeTextarea();
        }
      });
    }
  };

  const renderElement = (element: SlideElement) => {
    const isSelected = selectedId === element.id;
    const commonProps = {
      id: element.id,
      x: element.position.x,
      y: element.position.y,
      width: element.size.width,
      height: element.size.height,
      draggable: true,
      onClick: () => onSelect(element.id),
      onTap: () => onSelect(element.id),
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(element.id, e),
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) => handleTransformEnd(element.id, e),
      onDblClick: () => handleDoubleClick(element.id, element),
      onDblTap: () => handleDoubleClick(element.id, element),
    };

    switch (element.type) {
      case 'heading':
        return (
          <Group key={element.id} {...commonProps}>
            <Text
              text={String(element.content)}
              width={element.size.width}
              height={element.size.height}
              fontSize={parseInt(element.style?.fontSize || '32')}
              fontStyle="bold"
              fill={element.style?.color || theme.text}
              padding={8}
              verticalAlign="middle"
            />
          </Group>
        );

      case 'text':
        return (
          <Group key={element.id} {...commonProps}>
            <Text
              text={String(element.content)}
              width={element.size.width}
              height={element.size.height}
              fontSize={parseInt(element.style?.fontSize || '16')}
              fill={element.style?.color || theme.text}
              padding={8}
              verticalAlign="top"
            />
          </Group>
        );

      case 'bullet-list':
        const bulletText = Array.isArray(element.content)
          ? element.content.map(item => `• ${item}`).join('\n')
          : `• ${element.content}`;
        return (
          <Group key={element.id} {...commonProps}>
            <Text
              text={bulletText}
              width={element.size.width}
              height={element.size.height}
              fontSize={parseInt(element.style?.fontSize || '16')}
              fill={element.style?.color || theme.text}
              padding={8}
              lineHeight={1.6}
              verticalAlign="top"
            />
          </Group>
        );

      case 'shape':
        return (
          <Rect
            key={element.id}
            {...commonProps}
            fill={element.style?.backgroundColor || '#E5E7EB'}
            stroke={theme.border}
            strokeWidth={2}
            cornerRadius={parseInt(element.style?.borderRadius || '0')}
          />
        );

      case 'image':
        return (
          <Group key={element.id} {...commonProps}>
            <Rect
              width={element.size.width}
              height={element.size.height}
              fill="#f3f4f6"
              stroke="#d1d5db"
              strokeWidth={2}
              dash={[10, 5]}
              cornerRadius={8}
            />
            <Text
              text="📷 Image"
              width={element.size.width}
              height={element.size.height}
              fontSize={16}
              fill="#6b7280"
              align="center"
              verticalAlign="middle"
            />
          </Group>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-xl">
      <Stage
        ref={stageRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        {/* Background Layer */}
        <Layer>
          <Rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill={isGradient ? '#667EEA' : theme.background}
          />

          {/* Decorative elements based on theme */}
          {presentation.template === 'vibrant-yellow' && (
            <>
              {/* Top border pattern */}
              {Array.from({ length: 48 }).map((_, i) => (
                <Rect
                  key={`top-${i}`}
                  x={i * 20}
                  y={0}
                  width={10}
                  height={8}
                  fill={i % 2 === 0 ? '#000000' : 'transparent'}
                />
              ))}
              {/* Bottom border pattern */}
              {Array.from({ length: 48 }).map((_, i) => (
                <Rect
                  key={`bottom-${i}`}
                  x={i * 20}
                  y={CANVAS_HEIGHT - 8}
                  width={10}
                  height={8}
                  fill={i % 2 === 0 ? '#000000' : 'transparent'}
                />
              ))}
            </>
          )}
        </Layer>

        {/* Elements Layer */}
        <Layer>
          {elements.map(renderElement)}

          {/* Transformer for selected element */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (newBox.width < 50 || newBox.height < 30) {
                return oldBox;
              }
              return newBox;
            }}
            anchorSize={8}
            anchorCornerRadius={2}
            borderStroke="#3b82f6"
            anchorStroke="#3b82f6"
            anchorFill="white"
          />
        </Layer>
      </Stage>

      {/* Selection hint */}
      {selectedId && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Press Delete to remove • Double-click to edit
        </div>
      )}
    </div>
  );
}
