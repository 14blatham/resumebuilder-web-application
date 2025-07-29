import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useTextEditor – hook that converts any clicked text element inside a container
 * into a content-editable element and shows a floating toolbar for rich-text actions.
 */
const useTextEditor = (containerRef) => {
  const [selection, setSelection] = useState({ el: null, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const toolbarRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Helper: hide toolbar & disable editing
  const clearSelection = useCallback(() => {
    if (selection.el) {
      selection.el.removeAttribute('contenteditable');
      selection.el.classList.remove('editing-active');
      selection.el.blur();
    }
    setSelection({ el: null, x: 0, y: 0 });
    setIsDragging(false);
  }, [selection.el]);

  // Click handler: activate editing on any text node element
  const handleClick = useCallback(
    (e) => {
      // Ignore clicks on toolbar
      if (toolbarRef.current && toolbarRef.current.contains(e.target)) return;
      // Look for element with text content
      let target = e.target;
      if (!target) return;
      // If the clicked element is inside the container
      if (containerRef.current && containerRef.current.contains(target)) {
        // Only activate if text is present and not the container itself
        if (target === containerRef.current) return;
        // Prevent selecting toolbar again
        clearSelection();
        // Make element editable and add visual feedback
        target.setAttribute('contenteditable', 'true');
        target.classList.add('editing-active');
        target.focus();
        const rect = target.getBoundingClientRect();
        setSelection({ el: target, x: rect.left + rect.width / 2, y: rect.top - 8 });
      } else {
        clearSelection();
      }
    },
    [clearSelection, containerRef]
  );

  // Listen to outside clicks to hide toolbar
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  // Commands -------------------------------------------------------------
  const exec = (command, value = null) => {
    if (!selection.el) return;
    
    const el = selection.el;
    
    // Ensure the element is focused for execCommand to work
    el.focus();
    
    try {
      // Try execCommand first
      const success = document.execCommand(command, false, value);
      if (!success) throw new Error('execCommand failed');
    } catch (_) {
      // Fallback to inline styles
      switch (command) {
        case 'foreColor':
          el.style.color = value;
          break;
        case 'hiliteColor':
          el.style.backgroundColor = value;
          break;
        case 'fontName':
          el.style.fontFamily = value;
          break;
        case 'fontSize':
          // Convert execCommand font size (1-7) to actual sizes
          const sizeMap = { '1': '0.75rem', '2': '0.875rem', '3': '1rem', '4': '1.125rem', '5': '1.25rem', '6': '1.5rem', '7': '2rem' };
          el.style.fontSize = sizeMap[value] || value;
          break;
        case 'bold':
          el.style.fontWeight = el.style.fontWeight === 'bold' || el.style.fontWeight === '700' ? 'normal' : 'bold';
          break;
        case 'italic':
          el.style.fontStyle = el.style.fontStyle === 'italic' ? 'normal' : 'italic';
          break;
        case 'underline':
          el.style.textDecoration = el.style.textDecoration.includes('underline') ? 'none' : 'underline';
          break;
        default:
          break;
      }
    }
  };

  const actions = {
    bold: () => exec('bold'),
    italic: () => exec('italic'),
    underline: () => exec('underline'),
    undo: () => exec('undo'),
    redo: () => exec('redo'),
    color: (c) => exec('foreColor', c),
    bgColor: (c) => exec('hiliteColor', c),
    fontFamily: (ff) => exec('fontName', ff),
    fontSize: (fs) => exec('fontSize', fs),
  };

  // Drag functionality
  const handleMouseDown = useCallback((e) => {
    if (toolbarRef.current && toolbarRef.current.contains(e.target)) {
      const rect = toolbarRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      setDragStart({ x: e.clientX, y: e.clientY });
      setDragOffset({ x: offsetX, y: offsetY });
      setDragPosition({ x: 0, y: 0 }); // Reset drag position
      setIsDragging(true);
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && toolbarRef.current) {
      // Calculate drag distance for threshold
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - dragStart.x, 2) + 
        Math.pow(e.clientY - dragStart.y, 2)
      );
      
      // Only start dragging after threshold (5px)
      if (dragDistance < 5) return;
      
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        
        // Calculate new position relative to original position
        const newX = selection.x + deltaX;
        const newY = selection.y;
        
        // Keep toolbar within viewport bounds
        const maxX = window.innerWidth - toolbarRef.current.offsetWidth;
        const maxY = window.innerHeight - toolbarRef.current.offsetHeight;
        
        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));
        
        // Update drag position for transform
        setDragPosition({
          x: clampedX - selection.x,
          y: clampedY - selection.y
        });
        
        // Update selection position
        setSelection(prev => ({
          ...prev,
          x: clampedX,
          y: clampedY
        }));
      });
    }
  }, [isDragging, dragStart, selection.x, selection.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Add drag event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Export content
  const exportHTML = () => {
    return containerRef.current ? containerRef.current.innerHTML : '';
  };

  return { 
    selection, 
    toolbarRef, 
    actions, 
    clearSelection, 
    exportHTML, 
    handleMouseDown,
    isDragging,
    dragPosition
  };
};

export default useTextEditor; 