import React from 'react';
import { Bold, Italic, Underline, Undo2, Redo2 } from 'lucide-react';

const fontFamilies = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Calibri', value: 'Calibri, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Cambria', value: 'Cambria, Georgia, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
];

const fontSizes = [
  { label: 'S', value: '2' }, // execCommand fontSize takes 1-7 (approx!)
  { label: 'M', value: '3' },
  { label: 'L', value: '4' },
  { label: 'XL', value: '5' },
];

const TextEditorToolbar = ({ selection, actions, toolbarRef }) => {
  if (!selection.el) return null;
  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 bg-white/90 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg p-2 flex items-center space-x-2"
      style={{ top: selection.y, left: selection.x, transform: 'translate(-50%, -100%)' }}
    >
      {/* Font family */}
      <select
        className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none"
        defaultValue=""
        onChange={(e) => actions.fontFamily(e.target.value)}
      >
        <option value="" disabled>Font</option>
        {fontFamilies.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>

      {/* Font size */}
      <select
        className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none"
        defaultValue=""
        onChange={(e) => actions.fontSize(e.target.value)}
      >
        <option value="" disabled>Size</option>
        {fontSizes.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {/* Color pickers */}
      <input type="color" onChange={(e) => actions.color(e.target.value)} />
      <input type="color" onChange={(e) => actions.bgColor(e.target.value)} />

      {/* Bold / Italic / Underline */}
      <button className="p-1 hover:bg-gray-200 rounded" onClick={actions.bold}><Bold className="w-4 h-4" /></button>
      <button className="p-1 hover:bg-gray-200 rounded" onClick={actions.italic}><Italic className="w-4 h-4" /></button>
      <button className="p-1 hover:bg-gray-200 rounded" onClick={actions.underline}><Underline className="w-4 h-4" /></button>

      {/* Undo / Redo */}
      <button className="p-1 hover:bg-gray-200 rounded" onClick={actions.undo}><Undo2 className="w-4 h-4" /></button>
      <button className="p-1 hover:bg-gray-200 rounded" onClick={actions.redo}><Redo2 className="w-4 h-4" /></button>
    </div>
  );
};

export default TextEditorToolbar; 