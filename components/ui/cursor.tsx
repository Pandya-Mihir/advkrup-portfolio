"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
} from "framer-motion";

type CursorState = "default" | "hover" | "click";

export function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.2 });

  // Track velocity to stretch the cursor in direction of movement
  const vx = useVelocity(mouseX);
  const vy = useVelocity(mouseY);

  const scaleX = useTransform(vx, [-1500, 0, 1500], [1.8, 1, 1.8]);
  const scaleY = useTransform(vy, [-1500, 0, 1500], [1.8, 1, 1.8]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setMounted(true);
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive =
        el.tagName === "A" || el.tagName === "BUTTON" ||
        el.tagName === "INPUT" || el.tagName === "TEXTAREA" ||
        el.closest("a") || el.closest("button");
      setState(interactive ? "hover" : "default");
    };

    const onDown = () => setState("click");
    const onUp = () => setState((prev) => (prev === "click" ? "default" : prev));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX: isHover || isClick ? 1 : scaleX,
        scaleY: isHover || isClick ? 1 : scaleY,
      }}
      animate={{
        width: isClick ? 8 : isHover ? 12 : 10,
        height: isClick ? 8 : isHover ? 12 : 10,
        backgroundColor: "#ffffff",
        borderRadius: isHover ? "0%" : "50%",
        rotate: isHover ? 45 : 0,
        opacity: isClick ? 0.5 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
