import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Column as ColumnType } from './types/kanban';
import Modal from './components/Modal';
import Column from './components/Column';

export default function App() {
  // Estado principal: tenta carregar do LocalStorage ou inicia vazio
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("snap-board-data");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efeito para salvar sempre que as colunas ou cards mudarem
  useEffect(() => {
    localStorage.setItem("snap-board-data", JSON.stringify(columns));
  }, [columns]);

  // Função para criar nova coluna (Passo 3)
  const addColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: uuidv4(),
      title,
      cards: []
    };
    setColumns([...columns, newColumn]);
    setIsModalOpen(false);
  };

  // Função para deletar coluna
  const deleteColumn = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta coluna?")) {
      setColumns(columns.filter(col => col.id !== id));
    }
  };

  // Função para adicionar card (Passo 4)
  const addCard = (columnId: string) => {
    const content = window.prompt("O que precisa ser feito?");
    if (!content) return;

    const newCard = { id: uuidv4(), content };

    setColumns(prevColumns => 
      prevColumns.map(col => {
        if (col.id === columnId) {
          return { ...col, cards: [...col.cards, newCard] };
        }
        return col;
      })
    );
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans text-slate-900">
      {/* Header seguindo o design limpo */}
      <header className="p-6 flex justify-between items-center border-b border-slate-100 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Snap-board</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7c7cf8] hover:bg-[#6b6be0] text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-sm active:scale-95"
        >
          Add Container
        </button>
      </header>

      {/* Área das Colunas com scroll horizontal */}
      <main className="px-8 flex gap-6 overflow-x-auto items-start pb-10">
        {columns.map(col => (
          <Column 
            key={col.id} 
            column={col} 
            onDelete={deleteColumn}
            onAddCard={addCard}
          />
        ))}

        {/* Placeholder visual se não houver colunas */}
        {columns.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-2xl">
            <p className="text-slate-400 italic">Nenhum container criado ainda.</p>
          </div>
        )}
      </main>

      {/* Modal de Criação (Passo 2 e 3) */}
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addColumn} 
        />
      )}
    </div>
  );
}