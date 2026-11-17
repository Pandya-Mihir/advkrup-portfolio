"use client";

import * as React from "react";
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const cn = (...args: unknown[]) => twMerge(clsx(args));

export interface DockItemData {
  link: string;
  label: string;
  Icon: React.ReactNode;
  target?: string;
}

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex min-h-14 flex-wrap items-end gap-2 pb-2 sm:gap-3 sm:px-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} label={item.label}>
          <Link
            href={item.link}
            target={item.target}
            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center w-full h-full"
          >
            {/* The icon alone gave the link no text — no accessible name, and
                an empty anchor to search engines. The label (also shown as
                the hover tooltip) is the link's text, visually hidden. */}
            <span aria-hidden="true" className="contents">
              {item.Icon}
            </span>
            <span className="sr-only">{item.label}</span>
          </Link>
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  label: string;
}

const DockItem = ({ mouseX, children, label }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(36, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconSpring = useSpring(1, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="t-meta absolute -top-8 text-[10px] whitespace-nowrap pointer-events-none"
        >
          {label}
        </motion.div>
      )}

      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square bg-[#e8e4dc] border border-[#cdc6b9]/20 hover:border-[#fe5545] transition-colors duration-200 flex items-center justify-center text-[#161513]/50 hover:text-[#fe5545]"
      >
        <motion.div
          style={{ scale: iconSpring }}
          className="flex items-center justify-center w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
