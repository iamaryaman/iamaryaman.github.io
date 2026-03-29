import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const AnimatedTabs = ({
  tabs = [],
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-7xl mx-auto flex flex-col gap-y-4", className)}>
      <div className="flex w-full justify-between items-center gap-2 bg-[#e8e2dd]/60 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#2A4B3C]/10 shrink-0 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 relative px-4 py-3 text-base md:text-lg font-bold rounded-xl outline-none transition-colors border border-transparent text-center flex items-center justify-center tracking-wide",
              activeTab === tab.id ? "text-[#2A4B3C]" : "text-[#2A4B3C]/60 hover:text-[#2A4B3C]"
            )}
            style={{ fontFamily: 'var(--serif)' }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#fdfaf5] shadow-sm !rounded-xl border border-[#2A4B3C]/5"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-8 py-4 md:px-12 md:py-6 bg-[#e8e2dd]/40 shadow-[0_8px_30px_rgba(42,75,60,0.12)] text-[#2A4B3C] backdrop-blur-xl rounded-2xl border border-[#2A4B3C]/10 w-full min-h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    x: -20,
                    filter: "blur(10px)",
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, x: 20, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.4,
                    ease: "circInOut",
                    type: "spring",
                  }}
                  className="w-full h-full"
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { AnimatedTabs };
