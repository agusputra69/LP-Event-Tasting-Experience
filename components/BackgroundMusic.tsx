"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const hasInteracted = useRef(false);
  const autoMutedByVideo = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85; // Keep background music subtle

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    // Bind event listeners for direct sync
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);

    // Initial sync
    setIsPlaying(!audio.paused);
    setIsMuted(audio.muted);

    const startPlayback = () => {
      if (hasInteracted.current) return;
      audio.muted = false;
      setIsMuted(false);
      audio.play().then(() => {
        cleanupListeners();
      }).catch(() => {
        // Blocked by browser autoplay policies, wait for user action
      });
    };

    const cleanupListeners = () => {
      hasInteracted.current = true;
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
      document.removeEventListener("keydown", startPlayback);
    };

    // Listen only to valid user activation gestures (NO scroll)
    document.addEventListener("click", startPlayback);
    document.addEventListener("touchstart", startPlayback);
    document.addEventListener("keydown", startPlayback);

    // Try immediate unmuted autoplay
    audio.muted = false;
    audio.play().then(() => {
      cleanupListeners();
    }).catch(() => {
      // Autoplay blocked, waiting for interaction
    });

    // Detect when any video on the page starts playing to auto-mute background music (filtering for details videos with controls)
    const handleGlobalPlay = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      if (target && target.tagName === "VIDEO" && target.controls) {
        if (audio && !audio.paused && !audio.muted) {
          audio.muted = true;
          autoMutedByVideo.current = true;
          setIsMuted(true);
        }
      }
    };

    // Detect when any video on the page pauses to auto-unmute
    const handleGlobalPause = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      if (target && target.tagName === "VIDEO" && target.controls) {
        setTimeout(() => {
          const videos = Array.from(document.querySelectorAll("video"));
          const anyPlaying = videos.some(video => video.controls && !video.paused && !video.ended);
          if (!anyPlaying && autoMutedByVideo.current) {
            audio.muted = false;
            autoMutedByVideo.current = false;
            setIsMuted(false);
          }
        }, 100);
      }
    };

    document.addEventListener("play", handleGlobalPlay, true);
    document.addEventListener("pause", handleGlobalPause, true);

    // Backup polling check in case videos are unmounted/removed from DOM without firing pause event
    const checkVideoState = setInterval(() => {
      if (autoMutedByVideo.current) {
        const videos = Array.from(document.querySelectorAll("video"));
        const anyPlaying = videos.some(video => video.controls && !video.paused && !video.ended);
        if (!anyPlaying) {
          audio.muted = false;
          autoMutedByVideo.current = false;
          setIsMuted(false);
        }
      }
    }, 300);

    // Hide tooltip after a few seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);

    return () => {
      cleanupListeners();
      clearTimeout(timer);
      clearInterval(checkVideoState);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
      document.removeEventListener("play", handleGlobalPlay, true);
      document.removeEventListener("pause", handleGlobalPause, true);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Prevent any further auto-triggering on scroll/click
    hasInteracted.current = true;
    autoMutedByVideo.current = false; // User manual action overrides auto-mute

    if (audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      setShowTooltip(false);
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    } else {
      const nextMute = !audio.muted;
      audio.muted = nextMute;
      setIsMuted(nextMute);
      if (!nextMute) {
        setShowTooltip(false);
      }
    }
  };

  const isVisualizerActive = isPlaying && !isMuted;

  return (
    <>
      {/* Self-contained CSS keyframes for sound wave and tooltip */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes soundWave {
              0% { height: 4px; }
              100% { height: 16px; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-50%) translateX(10px); }
              to { opacity: 1; transform: translateY(-50%) translateX(0); }
            }
          `
        }}
      />

      <audio
        ref={audioRef}
        src="/audio/bg-song.mp3"
        loop
        playsInline
      />

      <div className="fixed bottom-20 lg:bottom-24 right-4 lg:right-8 z-50 flex items-center">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 10, y: "-50%" }}
              transition={{ duration: 0.3 }}
              className="absolute right-14 top-1/2 bg-[#120809]/85 border border-white/10 text-cream text-[11px] font-sans font-medium py-1.5 px-3 rounded-xl shadow-lg backdrop-blur-md whitespace-nowrap select-none pointer-events-none"
              style={{
                boxShadow: "0 4px 20px rgba(40, 18, 22, 0.4)",
              }}
            >
              {isVisualizerActive ? "🔊 Background music playing" : "🔊 Tap to play music"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <button
          onClick={toggleMute}
          aria-label={isVisualizerActive ? "Mute background music" : "Unmute background music"}
          className="relative flex items-center justify-center size-12 rounded-full border border-white/10 bg-[#120809]/60 text-cream backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:bg-[#120809]/80 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          {!isVisualizerActive ? (
            /* Muted Speaker Icon */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 text-cream/70"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Sound Wave Visualizer when Active */
            <div className="flex items-end gap-[2px] h-4 w-4 justify-center">
              <span
                className="w-[2.5px] bg-accent-soft rounded-full transition-all duration-300 animate-[soundWave_0.8s_ease-in-out_infinite_alternate]"
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className="w-[2.5px] bg-accent-soft rounded-full transition-all duration-300 animate-[soundWave_0.6s_ease-in-out_infinite_alternate]"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="w-[2.5px] bg-accent-soft rounded-full transition-all duration-300 animate-[soundWave_0.7s_ease-in-out_infinite_alternate]"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="w-[2.5px] bg-accent-soft rounded-full transition-all duration-300 animate-[soundWave_0.5s_ease-in-out_infinite_alternate]"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
