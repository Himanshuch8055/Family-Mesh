'use client';

import { useTheme } from "@/context/ThemeContext";

const BackgroundPattern = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb12_1px,transparent_1px),linear-gradient(to_bottom,#2563eb12_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Gradient orbs */}
      <div className="absolute left-0 right-0 top-0 -z-20 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute right-0 top-0 -z-20 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-20 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />

      {/* Theme-aware grid pattern */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,${
          isDark ? "#ffffff08" : "#2563eb08"
        }_1px,transparent_1px),linear-gradient(to_bottom,${
          isDark ? "#ffffff08" : "#2563eb08"
        }_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]`}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] animate-blob rounded-full bg-gradient-to-r from-primary/30 to-primary/40 mix-blend-multiply blur-[80px] dark:mix-blend-normal" />
        <div className="absolute -right-[10%] top-[30%] h-[400px] w-[400px] animate-blob animation-delay-2000 rounded-full bg-gradient-to-r from-purple-400/30 to-purple-600/40 mix-blend-multiply blur-[80px] dark:mix-blend-normal" />
        <div className="absolute bottom-[10%] left-[20%] h-[400px] w-[400px] animate-blob animation-delay-4000 rounded-full bg-gradient-to-r from-indigo-400/30 to-indigo-600/40 mix-blend-multiply blur-[80px] dark:mix-blend-normal" />
      </div>
    </div>
  );
};

export default BackgroundPattern;