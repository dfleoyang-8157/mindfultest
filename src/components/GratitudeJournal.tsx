import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Heart, Sparkles } from 'lucide-react';
import { JournalEntry } from '../types';

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('😊');

  useEffect(() => {
    const saved = localStorage.getItem('mindful-journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveEntry = () => {
    if (!newEntry.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', year: 'numeric' }),
      content: newEntry,
      mood,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('mindful-journal', JSON.stringify(updated));
    setNewEntry('');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('mindful-journal', JSON.stringify(updated));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="journal-container">
      <div className="glass-card space-y-4" id="new-entry-form">
        <h3 className="label-caps">感恩日記 · Gratitude</h3>
        <h2 className="text-2xl font-light mb-6">今天，我有什麼值得<span className="italic">感謝的事？</span></h2>
        
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="例如：早晨窗外的鳥鳴聲很清脆..."
          className="w-full h-32 p-4 rounded-xl bg-white/40 border border-sage-100 focus:outline-none focus:ring-1 focus:ring-sage-200 resize-none text-sm leading-relaxed"
          id="entry-textarea"
        />
        <div className="flex justify-between items-center" id="form-controls">
          <div className="flex gap-2" id="mood-selector">
            {['😊', '😌', '🥰', '🌱', '✨'].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${mood === m ? 'bg-sage-200 scale-110 shadow-sm' : 'hover:bg-sage-100'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={saveEntry}
            disabled={!newEntry.trim()}
            className="btn-primary"
            id="save-btn"
          >
            紀錄新日記
          </button>
        </div>
      </div>

      <div className="space-y-4" id="entries-list">
        <AnimatePresence>
          {entries.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sage-400 py-12 italic font-light text-sm"
            >
              尚無紀錄。從第一則感恩日記開始您的正念之旅吧。
            </motion.p>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card relative group hover:border-sage-200 transition-colors"
                id={`entry-${entry.id}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] opacity-40 uppercase tracking-widest font-mono">{entry.date}</span>
                  <span className="text-xl">{entry.mood}</span>
                </div>
                <p className="text-sage-700 font-light leading-relaxed whitespace-pre-wrap text-sm">{entry.content}</p>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="absolute bottom-4 right-4 text-sage-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  id={`delete-${entry.id}`}
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
