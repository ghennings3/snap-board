import { MoreVertical } from 'lucide-react';
import type { Card as CardType } from '../types/kanban';

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  return (
    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex justify-between items-start group cursor-pointer hover:border-indigo-300 transition-all">
      <span className="text-slate-600 text-sm">{card.content}</span>
      <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={14} />
      </button>
    </div>
  );
}