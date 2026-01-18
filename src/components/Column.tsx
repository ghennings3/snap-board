import { MoreVertical, Plus } from 'lucide-react';
import type { Column as ColumnType } from '../types/kanban';
import Card from './Card';

interface ColumnProps {
  column: ColumnType;
  onDelete: (id: string) => void;
  onAddCard: (columnId: string) => void; // Nova prop
}

export default function Column({ column, onDelete, onAddCard }: ColumnProps) {
  return (
    <div className="bg-[#f1f2f4] border border-slate-200 rounded-xl min-w-[300px] w-[300px] flex flex-col h-fit p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="font-bold text-slate-700 uppercase text-[11px] tracking-wider">
          {column.title}
        </h2>
        <button onClick={() => onDelete(column.id)} className="text-slate-400 hover:text-red-500">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {column.cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <button 
        onClick={() => onAddCard(column.id)}
        className="flex items-center justify-center gap-2 text-slate-500 hover:bg-white p-2 rounded-lg transition-all font-medium text-sm"
      >
        <Plus size={16} />
        Add Card
      </button>
    </div>
  );
}