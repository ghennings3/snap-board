import { useState } from 'react';
import Modal from './components/Modal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] p-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-slate-800">Snap-board</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7c7cf8] hover:bg-[#6b6be0] text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
        >
          Add Container
        </button>
      </header>

      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={(title) => {
            console.log("Nova coluna:", title);
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
}