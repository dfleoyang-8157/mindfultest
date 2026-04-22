/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Wind, 
  Leaf, 
  Home, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppTab } from './types';
import GratitudeJournal from './components/GratitudeJournal';
import BreathingCircle from './components/BreathingCircle';
import MeditationGuide from './components/MeditationGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'journal': return <GratitudeJournal />;
      case 'breathing': return <BreathingCircle />;
      case 'meditation': return <MeditationGuide />;
      default: return <HomeView onNavigate={setActiveTab} />;
    }
  };

  const tabs = [
    { id: 'home' as AppTab, icon: Home, label: '首頁' },
    { id: 'journal' as AppTab, icon: BookOpen, label: '感恩日記' },
    { id: 'breathing' as AppTab, icon: Wind, label: '正念呼吸' },
    { id: 'meditation' as AppTab, icon: Leaf, label: '冥想引導' },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-20">
      {/* Sidebar for Desktop */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-white border-r border-sage-100 hidden md:flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-12 h-12 bg-sage-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
          <Sparkles size={24} />
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-xl transition-all relative group ${activeTab === tab.id ? 'bg-sage-100 text-sage-800' : 'text-sage-400 hover:text-sage-600 hover:bg-sage-50'}`}
          >
            <tab.icon size={24} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-sage-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-sage-100 flex md:hidden justify-around items-center h-20 px-4 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === tab.id ? 'text-sage-800' : 'text-sage-400'}`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="mobile-indicator" className="w-1 h-1 bg-sage-800 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-sage-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-cream-200/40 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}

function HomeView({ onNavigate }: { onNavigate: (tab: AppTab) => void }) {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-medium tracking-tight">靜心空間 · Zen Space</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-light leading-tight">
          找回內心的<span className="italic">寧靜與對話</span>
        </h1>
        <p className="text-lg text-sage-500 max-w-xl font-light">
          在這裡，我們透過正念與呼吸，重新與當下的自己建立連結。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="感恩日記"
          description="紀錄生活中的微光，培養感恩的心，轉變看世界的視角。"
          icon={BookOpen}
          color="bg-sage-100"
          label="GRATITUDE"
          onClick={() => onNavigate('journal')}
        />
        <FeatureCard
          title="正念呼吸"
          description="透過科學的呼吸法，在幾分鐘內穩定情緒，重拾平靜。"
          icon={Wind}
          color="bg-sage-100"
          label="BREATHING"
          onClick={() => onNavigate('breathing')}
        />
        <FeatureCard
          title="冥想引導"
          description="由 AI 根據您的心情生成的個性化冥想腳本，深入探索心靈。"
          icon={Leaf}
          color="bg-sage-200"
          label="MEDITATION"
          onClick={() => onNavigate('meditation')}
        />
        <div className="glass-card flex flex-col justify-center p-8 bg-sage-800 text-white border-none">
           <h4 className="label-caps !text-sage-300">身心狀態</h4>
           <div className="flex items-end justify-between mt-4">
             <div className="space-y-1">
               <p className="text-4xl font-light">78%</p>
               <p className="text-[10px] opacity-60 uppercase tracking-wider">今日放鬆指數</p>
             </div>
             <div className="flex gap-1 items-end h-16">
               <div className="w-2 h-8 bg-white/20 rounded-full"></div>
               <div className="w-2 h-10 bg-white/40 rounded-full"></div>
               <div className="w-2 h-14 bg-white/100 rounded-full"></div>
               <div className="w-2 h-12 bg-white/60 rounded-full"></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon: Icon, color, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="glass-card text-left group hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden flex flex-col"
    >
      <h3 className="label-caps">{label}</h3>
      <div className="flex-1">
        <h2 className="text-2xl font-light mb-4">{title}</h2>
        <p className="text-sage-500 mb-6 text-sm leading-relaxed font-light">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sage-600 font-bold text-xs uppercase tracking-wider mt-auto">
        開始練習 →
      </div>
    </button>
  );
}

