import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Custom FadingVideo component implementing precise requestAnimationFrame fading
interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const FadingVideo: React.FC<FadingVideoProps> = ({ src, className, style }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55; // seconds before end to trigger fade out

  // fadeTo implementation using requestAnimationFrame and reading current style.opacity
  const fadeTo = (target: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current opacity step
      const currentOpacity = startOpacity + (target - startOpacity) * progress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      }
    };

    rafIdRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial opacity to 0
    video.style.opacity = "0";

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || video.duration <= 0) return;
      const timeLeft = video.duration - video.currentTime;

      if (!fadingOutRef.current && timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    // Attach listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // If source already loaded
    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, transition: "none" }}
      muted
      playsInline
      autoPlay
      preload="auto"
    />
  );
};

// BlurText component implementing word-by-word blur in trigger
interface BlurTextProps {
  text: string;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const words = text.split(" ");

  const wordVariants: any = {
    initial: { filter: "blur(10px)", opacity: 0, y: 50 },
    animate: (i: number) => ({
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      transition: {
        duration: 0.7,
        times: [0, 0.5, 1],
        ease: [0.25, 0.1, 0.25, 1], // easeOut cubic-bezier
        delay: (i * 100) / 1000,
      },
    }),
  };

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default function App() {
  const [ticketClaimed, setTicketClaimed] = useState(false);

  // Smooth ease-out entrance transitions for hero items
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    initial: { filter: "blur(10px)", opacity: 0, y: 20 },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-body">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen w-full flex flex-col justify-between z-10 overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
            style={{ width: "120%", height: "120%" }}
          />
        </div>

        {/* Navbar */}
        <header className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between">
          
          {/* Left: Logo circle */}
          <div className="h-12 w-12 rounded-full liquid-glass flex items-center justify-center cursor-pointer group hover:scale-105 transition-all">
            <span className="font-heading italic text-2xl text-white select-none transition-transform duration-300 group-hover:rotate-12">a</span>
          </div>

          {/* Center Links (Desktop only) */}
          <div className="hidden md:flex items-center gap-1.5 liquid-glass rounded-full px-1.5 py-1.5 shadow-lg">
            {["Home", "Voyages", "Worlds", "Innovation", "Plan Launch"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 font-body hover:text-white transition-all rounded-full hover:bg-white/5"
              >
                {link}
              </a>
            ))}
            
            <button
              onClick={() => {
                setTicketClaimed(true);
                setTimeout(() => setTicketClaimed(false), 4000);
              }}
              className="rounded-full bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 hover:bg-slate-100 transition-all shadow-md hover:scale-[1.02]"
            >
              <span>{ticketClaimed ? "Spot Claimed" : "Claim a Spot"}</span>
              <svg className="h-3 w-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={3}>
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right: Invisible Spacer to balance logo */}
          <div className="h-12 w-12 opacity-0" />
        </header>

        {/* Hero Content (Centered) */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center text-center pt-32 px-4 z-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="liquid-glass rounded-full p-1 pr-3 flex items-center gap-3 hover:scale-102 transition-transform cursor-pointer"
          >
            <span className="bg-white text-black px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest rounded-full">New</span>
            <span className="text-xs font-medium tracking-wide text-white/95 uppercase font-body">Maiden Crewed Voyage to Mars Arrives 2026</span>
          </motion.div>

          {/* Headline (BlurText Word-by-word animation) */}
          <div className="mt-8">
            <BlurText 
              text="Venture Past Our Sky Across the Universe" 
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-2xl justify-center tracking-[-4px]"
            />
          </div>

          {/* Subheading */}
          <motion.p 
            variants={{
              initial: { filter: "blur(10px)", opacity: 0, y: 20 },
              animate: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }
              }
            } as any}
            className="mt-6 text-sm md:text-base text-white/80 max-w-2xl font-body font-light leading-relaxed tracking-wide"
          >
            Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={{
              initial: { filter: "blur(10px)", opacity: 0, y: 20 },
              animate: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.1 }
              }
            } as any}
            className="flex flex-col sm:flex-row items-center gap-6 mt-8"
          >
            <button className="liquid-glass-strong rounded-full px-7 py-3 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 hover:bg-white/10 transition-all shadow-xl hover:scale-102">
              <span>Start Your Voyage</span>
              <svg className="h-4 w-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={2.5}>
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors py-2 group">
              <span className="text-xs font-bold uppercase tracking-wider border-b border-white/30 group-hover:border-white transition-colors pb-0.5">View Liftoff</span>
              <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="h-3 w-3 fill-current text-white" viewBox="0 0 24 24">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            variants={{
              initial: { filter: "blur(10px)", opacity: 0, y: 20 },
              animate: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.3 }
              }
            } as any}
            className="flex flex-col sm:flex-row items-stretch gap-4 mt-12 mb-8"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left hover:scale-[1.03] transition-transform cursor-pointer">
              <div className="text-white opacity-90">
                <svg className="h-7 w-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="mt-8">
                <span className="text-4xl tracking-[-1px] leading-none font-heading italic text-white">34.5 Min</span>
                <p className="text-[11px] text-white/70 font-body font-light mt-1.5 uppercase tracking-wider">Average Videos Watch Time</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between text-left hover:scale-[1.03] transition-transform cursor-pointer">
              <div className="text-white opacity-90">
                <svg className="h-7 w-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="mt-8">
                <span className="text-4xl tracking-[-1px] leading-none font-heading italic text-white">2.8B+</span>
                <p className="text-[11px] text-white/70 font-body font-light mt-1.5 uppercase tracking-wider">Users Across the Globe</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Partners */}
        <motion.div 
          variants={{
            initial: { filter: "blur(10px)", opacity: 0, y: 20 },
            animate: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.4 }
            }
          } as any}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-4 pb-8 z-10"
        >
          <div className="liquid-glass rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
            Collaborating with top aerospace pioneers globally
          </div>
          <div className="flex items-center justify-center gap-10 md:gap-16 mt-2">
            {["Aeon", "Vela", "Apex", "Orbit", "Zeno"].map((partner) => (
              <span 
                key={partner} 
                className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/80 hover:text-white hover:scale-105 transition-all cursor-pointer"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>

      </section>

      {/* SECTION 2: CAPABILITIES */}
      <section className="relative min-h-screen w-full flex flex-col justify-between z-10 overflow-hidden bg-black border-t border-white/5">
        
        {/* Background Video (full-bleed, no 120% scale) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen justify-between w-full">
          
          {/* Header */}
          <div className="mb-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-3 font-mono">// Capabilities</span>
            <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
              Production<br />evolved
            </h2>
          </div>

          {/* Three Capabilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            {/* Card 1 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="h-11 w-11 rounded-[0.75rem] liquid-glass flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1 max-w-[70%]">
                  {["Natural Context", "Photo Realism", "Infinite Settings", "Eco-Vibe"].map((tag) => (
                    <span key={tag} className="liquid-glass rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-8 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">AI Scenery</h3>
                <p className="mt-3 text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch]">
                  AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.
                </p>
              </div>

            </div>

            {/* Card 2 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="h-11 w-11 rounded-[0.75rem] liquid-glass flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1 max-w-[70%]">
                  {["Scale Fast", "Visual Consistency", "Time Saver", "Ready to Post"].map((tag) => (
                    <span key={tag} className="liquid-glass rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-8 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Batch Production</h3>
                <p className="mt-3 text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch]">
                  Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.
                </p>
              </div>

            </div>

            {/* Card 3 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="h-11 w-11 rounded-[0.75rem] liquid-glass flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1 max-w-[70%]">
                  {["Ray Tracing", "Physical Shadows", "Studio Quality", "Sunlight Sync"].map((tag) => (
                    <span key={tag} className="liquid-glass rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-8 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Smart Lighting</h3>
                <p className="mt-3 text-xs md:text-sm text-white/80 font-body font-light leading-relaxed max-w-[32ch]">
                  Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.
                </p>
              </div>

            </div>

          </div>

          {/* Footer of Section 2 */}
          <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-white/40">
            <span>Aetheris Space Logistics &copy; 2026</span>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Launch</span>
              <span className="hover:text-white cursor-pointer transition-colors">Coordinates</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
