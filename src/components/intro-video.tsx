"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface IntroVideoProps {
  children: ReactNode;
}

export default function IntroVideo({ children }: IntroVideoProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldShowIntro, setShouldShowIntro] = useState(true);
  const foregroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  const stopAllPlayback = () => {
    const foreground = foregroundVideoRef.current;
    const background = backgroundVideoRef.current;

    [foreground, background].forEach((video) => {
      if (!video) return;

      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.volume = 0;
      video.removeAttribute("src");
      video.load();
    });
  };

  const finishIntro = () => {
    if (isExiting) return;

    setIsExiting(true);

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    stopAllPlayback();

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("intro-video-complete", "true");
    }

    setShouldShowIntro(false);

    exitTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      exitTimerRef.current = null;
    }, 300);
  };

  useEffect(() => {
    setMounted(true);

    const shouldRunIntro = window.sessionStorage.getItem("intro-video-complete") !== "true";
    setShouldShowIntro(shouldRunIntro);

    if (!shouldRunIntro) {
      setIsVisible(false);
      return;
    }

    const foreground = foregroundVideoRef.current;
    const background = backgroundVideoRef.current;

    if (!foreground || !background) return;

    const handleEnded = () => {
      stopAllPlayback();
      finishIntro();
    };

    foreground.addEventListener("ended", handleEnded);

    void Promise.all([foreground.play(), background.play()]).catch(() => undefined);

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      foreground.removeEventListener("ended", handleEnded);
      stopAllPlayback();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  if (!shouldShowIntro || !isVisible) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#03050a] transition-opacity duration-500 ${
          isExiting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 h-[100dvh] w-[100vw]">
          <video
            ref={backgroundVideoRef}
            className="absolute inset-0 h-full w-full scale-[1.2] object-cover blur-[40px] brightness-[0.7]"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),linear-gradient(135deg,_rgba(2,6,23,0.9),_rgba(2,6,23,0.72))]" />
        </div>

        <button
          type="button"
          onClick={finishIntro}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:bg-white/20 sm:right-6 sm:top-6"
        >
          See My Work
        </button>

        <div className="relative z-10 flex h-[96vh] w-[98vw] items-center justify-center p-2 sm:p-3 md:p-4">
          <div className="flex h-[84vh] max-h-[84vh] w-auto items-center justify-center sm:h-[85vh] md:h-[88vh]">
            <video
              ref={foregroundVideoRef}
              className="h-full w-auto max-w-[min(92vw,calc(100vw-2rem))] rounded-[24px] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.55)] max-sm:rounded-none"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls
              controlsList="nodownload noplaybackrate nofullscreen"
              disablePictureInPicture
              onEnded={finishIntro}
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          isVisible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
