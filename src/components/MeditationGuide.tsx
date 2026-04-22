import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Play, MessageSquare, Timer, Sparkles, Loader2 } from 'lucide-react';
import { generateGuidedMeditation } from '../services/geminiService';

export default function MeditationGuide() {
  const [mood, setMood] = useState('');
  const [duration, setDuration] = useState(5);
  const [guide, setGuide] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startMeditation = async () => {
    if (!mood) return;
    setLoading(true);
    const meditation = await generateGuidedMeditation(mood, duration);
    setGuide(meditation);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="meditation-container">
      {!guide ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card space-y-8"
          id="meditation-setup"
        >
          <div className="space-y-2">
            <h3 className="label-caps !mb-0">冥想引導 · Meditation</h3>
            <h2 className="text-3xl font-light">開啟您的正念對話</h2>
            <p className="text-sm text-sage-400 font-light italic">讓 AI 為您當下的心情量身打造專屬冥想腳本</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-sage-500 flex items-center gap-2">
                <MessageSquare size={14} /> 您現在的感覺如何？
              </label>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="例如：感到壓力大、想提升專注力..."
                className="w-full p-4 rounded-xl bg-white/40 border border-sage-100 focus:outline-none focus:ring-1 focus:ring-sage-200 text-sm"
                id="mood-input"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-sage-500 flex items-center gap-2">
                <Timer size={14} /> 預計時間 (分鐘)
              </label>
              <div className="flex gap-4" id="duration-selector">
                {[3, 5, 10, 15].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-3 rounded-xl border transition-all text-xs font-medium ${duration === d ? 'bg-sage-600 text-white border-sage-600' : 'bg-white border-sage-100 hover:border-sage-300'}`}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startMeditation}
            disabled={loading || !mood}
            className="w-full btn-primary justify-center py-4 text-sm uppercase tracking-widest font-bold"
            id="generate-btn"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                生成專屬引導
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card min-h-[400px] relative overflow-hidden"
          id="meditation-display"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-sage-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: duration * 60, ease: "linear" }}
              className="h-full bg-sage-500"
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setGuide(null)}
              className="text-sage-400 hover:text-sage-600 transition-colors text-xs font-bold uppercase tracking-widest"
              id="back-btn"
            >
              ← 返回重選
            </button>
            <div className="flex items-center gap-2 text-sage-400 text-xs font-mono">
              <Timer size={12} /> {duration}:00
            </div>
          </div>

          <div className="prose prose-sage max-w-none" id="meditation-content">
            <div className="whitespace-pre-wrap leading-relaxed text-sage-800 text-base font-light italic text-center px-6">
              {guide}
            </div>
          </div>

          <div className="mt-12 flex justify-center" id="finish-btn-wrapper">
             <button
              onClick={() => setGuide(null)}
              className="btn-primary"
              id="finish-btn"
            >
              完成修習
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
