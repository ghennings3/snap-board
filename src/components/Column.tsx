import { MoreVertical, Plus } from 'lucide-react';
import type { Column as ColumnType } from '../types/kanban';

interface ColumnProps {
  column: ColumnType;
  onDelete: (id: string) => void;
}

export default function Column({ column, onDelete }: ColumnProps) {
  return (
    <div className="bg-[#f1f2f4] border border-slate-200 rounded-xl min-w-[300px] w-[300px] flex flex-col h-fit p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
          {column.title}
        </h2>
        <button 
          onClick={() => onDelete(column.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {/* Espaço reservado para os Cards no Commit 4 */}
        {column.cards.length === 0 && (
          <div className="h-2"></div> 
        )}
      </div>

      <button className="flex items-center justify-center gap-2 text-slate-500 hover:bg-white p-2 rounded-lg transition-all font-medium text-sm">
        <Plus size={16} />
        Add Card
      </button>
    </div>
  );
}