"use client";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import UpArrow from "@/public/upArrow.svg";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show button after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // React Spring animation
  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    config: { tension: 300, friction: 20 },
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  return (
    <animated.button
      style={fadeIn}
      onClick={scrollToTop}
      className="fixed  bottom-32  right-6 dark:bg-slate-500 bg-purple-200 text-white p-3 rounded-full shadow-lg dark:hover:bg-slate-800 transition"
    >
      <UpArrow size={20} />
    </animated.button>
  );
}
