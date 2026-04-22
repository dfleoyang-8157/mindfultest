import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Play, Pause, RefreshCw } from 'lucide-react';

export default function BreathingCircle() {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setTimer(0);
      return;
    }

    // 4-4-4 technique (or 4-7-8)
    // Here we use Box Breathing: 4 inhale, 4 hold, 4 exhale, 4 hold
    const cycleTime = timer % 16;
    if (cycleTime < 4) setPhase('inhale');
    else if (cycleTime < 8) setPhase('hold');
    else if (cycleTime < 12) setPhase('exhale');
    else setPhase('hold');
  }, [timer, isActive]);

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return '吸氣...';
      case 'hold': return '屏息...';
      case 'exhale': return '吐氣...';
      default: return '準備好開始了嗎？';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-16 py-12" id="breathing-container">
      <div className="text-center space-y-2">
        <h3 className="label-caps !mb-0">正念呼吸 · Breathing</h3>
        <h2 className="text-4xl font-light">深呼吸，與當下連結</h2>
      </div>

      <div className="relative flex items-center justify-center" id="circle-wrapper">
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="breath-pulse-ring"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ 
                scale: phase === 'inhale' ? 1.6 : phase === 'exhale' ? 1 : 1.3,
                opacity: phase === 'inhale' ? 0.4 : 0.2
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute w-48 h-48 border border-sage-500 rounded-full"
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.4 : phase === 'exhale' ? 0.9 : 1,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="relative w-48 h-48 rounded-full flex items-center justify-center border-2 border-sage-200 shadow-sm z-10 breathing-circle-gradient"
          id="main-circle"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-sage-500 tracking-[0.2em] h-8">
              {getInstructions()}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-6" id="controls">
        <div className="flex gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="btn-primary"
            id="toggle-btn"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
            {isActive ? '暫停練習' : '開始練習'}
          </button>
          <button
            onClick={() => { setIsActive(false); setTimer(0); setPhase('idle'); }}
            className="btn-secondary"
            id="reset-btn"
          >
            <RefreshCw size={18} />
            重置
          </button>
        </div>
        
        {isActive && (
           <p className="text-[10px] uppercase tracking-tighter opacity-40 font-bold">
             已練習時間：{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
           </p>
        )}
      </div>

      <div className="max-w-md text-center text-sage-400 px-4" id="info">
        <p className="text-xs font-light leading-relaxed">
          跟隨節奏，均勻地吸氣與吐氣，將注意力帶回到心跳的律動中。<br />
          <span className="italic">「方盒呼吸法」：吸氣、憋氣、吐氣、憋氣 各四秒。</span>
        </p>
      </div>
    </div>
  );
}
