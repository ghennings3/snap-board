import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/Modal';
import Column from './components/Column';
import type { Column as ColumnType } from './types/kanban';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Inicializa o estado com dados do LocalStorage
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("snap-board-data");
    return saved ? JSON.parse(saved) : [];
  });

  // Salva no LocalStorage sempre que 'columns' mudar
  useEffect(() => {
    localStorage.setItem("snap-board-data", JSON.stringify(columns));
  }, [columns]);

  const addColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: uuidv4(),
      title,
      cards: []
    };
    setColumns([...columns, newColumn]);
    setIsModalOpen(false);
  };

  const deleteColumn = (id: string) => {
    if (window.confirm("Deseja realmente deletar esta coluna?")) {
      setColumns(columns.filter(col => col.id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="p-8 flex justify-between items-center border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Snap-board</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7c7cf8] hover:bg-[#6b6be0] text-white px-6 py-2 rounded-lg font-medium transition-all shadow-md"
        >
          Add Container
        </button>
      </header>

      <main className="p-8 flex gap-6 overflow-x-auto items-start">
        {columns.map(col => (
          <Column 
            key={col.id} 
            column={col} 
            onDelete={deleteColumn} 
          />
        ))}
      </main>

      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addColumn} 
        />
      )}
    </div>
  );
}