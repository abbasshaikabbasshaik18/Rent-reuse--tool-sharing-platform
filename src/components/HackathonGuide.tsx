import React, { useState } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  Check, 
  Sparkles, 
  X, 
  UserCheck, 
  Send, 
  RotateCcw, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HackathonGuideProps {
  setActiveTab: (tab: string) => void;
}

export const HackathonGuide: React.FC<HackathonGuideProps> = ({ setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, switchUser, items, openRequestModal } = useApp();

  const demoSteps = [
    {
      num: 1,
      title: '1. Browse & Search',
      actionText: 'Browse Items',
      desc: 'Browse items or search for "calculator" or "drafter"',
      run: () => setActiveTab('browse')
    },
    {
      num: 2,
      title: '2. Request Item',
      actionText: 'Try Requesting',
      desc: 'Pick borrow (free) or rent and submit dates',
      run: () => {
        const item = items.find(i => i.id === 'item_1') || items[0];
        if (item) openRequestModal(item, 'rent');
      }
    },
    {
      num: 3,
      title: '3. Owner Accepts',
      actionText: 'Switch to Rahul (Owner)',
      desc: 'Switch to Rahul to review & accept pending request',
      run: () => {
        switchUser('user_rahul');
        setActiveTab('my-listings');
      }
    },
    {
      num: 4,
      title: '4. Campus Chat',
      actionText: 'Open Messages',
      desc: 'Coordinate hostel/library pickup spot in real time',
      run: () => setActiveTab('messages')
    },
    {
      num: 5,
      title: '5. Return & Review',
      actionText: 'My Requests',
      desc: 'Mark returned, leave review & boost trust score',
      run: () => {
        switchUser('user_priya');
        setActiveTab('my-requests');
      }
    }
  ];

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setCollapsed(false)}
          className="bg-indigo-900 text-white p-3 rounded-full shadow-2xl border-2 border-indigo-400/40 hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Hackathon Demo Guide</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-indigo-500/40 p-4 animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Judge Presentation Flow
          </span>
        </div>
        <button 
          onClick={() => setCollapsed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-slate-300 mb-3">
        1-Click through the complete Problem 01 solution cycle:
      </p>

      <div className="space-y-1.5">
        {demoSteps.map(s => (
          <div key={s.num} className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors text-xs">
            <div>
              <span className="font-bold text-white text-[11px]">{s.title}</span>
              <p className="text-[10px] text-slate-400 truncate max-w-[170px]">{s.desc}</p>
            </div>
            <button
              onClick={s.run}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold shrink-0 transition-colors"
            >
              {s.actionText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Logged in as: <strong className="text-yellow-300">{currentUser.name.split(' ')[0]}</strong></span>
        <button 
          onClick={() => setCollapsed(true)}
          className="text-indigo-400 hover:underline"
        >
          Minimize
        </button>
      </div>
    </div>
  );
};
