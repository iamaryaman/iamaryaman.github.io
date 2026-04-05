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
    <div className={cn("w-full max-w-7xl mx-auto flex flex-col gap-y-6", className)}>
      <div className="flex w-full justify-between items-stretch gap-2 bg-[#F5F1EB]/95 backdrop-blur-md px-3 md:px-6 h-10 md:h-[46px] rounded-full border border-[#004D40]/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 relative px-2 md:px-4 text-[10px] md:text-[11px] lg:text-sm uppercase font-sans font-semibold tracking-widest rounded-full outline-none transition-all duration-300 border border-transparent text-center flex items-center justify-center",
              activeTab === tab.id ? "text-white" : "text-[#004D40]/60 hover:text-[#004D40] hover:bg-[#004D40]/5"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-y-1 inset-x-0 bg-[#004D40] rounded-full shadow-md"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="px-8 py-4 md:px-12 md:py-6 bg-[#e8e2dd]/40 shadow-[0_8px_30px_rgba(42,75,60,0.12)] text-[#2A4B3C] backdrop-blur-xl rounded-none border border-[#2A4B3C]/10 w-full min-h-[65vh] flex flex-col items-center justify-center overflow-hidden">
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
