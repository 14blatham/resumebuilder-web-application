import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useTextEditor – hook that converts any clicked text element inside a container
 * into a content-editable element and shows a floating toolbar for rich-text actions.
 */
const useTextEditor = (containerRef) => {
  const [selection, setSelection] = useState({ el: null, x: 0, y: 0 });
  const toolbarRef = useRef(null);

  // Helper: hide toolbar & disable editing
  const clearSelection = useCallback(() => {
    if (selection.el) {
      selection.el.removeAttribute('contenteditable');
      selection.el.classList.remove('editing-active');
      selection.el.blur();
    }
    setSelection({ el: null, x: 0, y: 0 });
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
    
    try {
      // Try execCommand first
      document.execCommand(command, false, value);
    } catch (_) {
      // Fallback to inline styles
      const el = selection.el;
      
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
          el.style.fontSize = value;
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

  // Export content
  const exportHTML = () => {
    return containerRef.current ? containerRef.current.innerHTML : '';
  };

  return { selection, toolbarRef, actions, clearSelection, exportHTML };
};

export default useTextEditor; 