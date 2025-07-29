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
        // Make element editable
        target.setAttribute('contenteditable', 'true');
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
    try {
      document.execCommand(command, false, value);
    } catch (_) {
      // fallback: inline style
      if (selection.el) {
        if (command === 'foreColor') selection.el.style.color = value;
        if (command === 'hiliteColor') selection.el.style.backgroundColor = value;
        if (command === 'fontName') selection.el.style.fontFamily = value;
        if (command === 'fontSize') selection.el.style.fontSize = value;
        if (command === 'bold') selection.el.style.fontWeight = selection.el.style.fontWeight === '700' ? '400' : '700';
        if (command === 'italic') selection.el.style.fontStyle = selection.el.style.fontStyle === 'italic' ? 'normal' : 'italic';
        if (command === 'underline') selection.el.style.textDecoration = selection.el.style.textDecoration === 'underline' ? 'none' : 'underline';
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