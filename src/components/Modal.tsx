import { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export default function Modal({ onClose, onSubmit }: ModalProps) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[450px] max-w-[90%] flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Container</h2>
        
        <input 
          autoFocus
          type="text"
          placeholder="Container Title"
          className="w-full border border-slate-200 rounded-lg p-3 mb-6 outline-none focus:ring-2 ring-indigo-500/20 text-slate-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />

        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={handleAdd}
            className="w-full bg-[#B1B1F9] hover:bg-[#9f9ff0] text-white font-bold py-3 rounded-lg transition-colors"
          >
            Add container
          </button>
          <button 
            onClick={onClose}
            className="text-slate-400 text-sm hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}