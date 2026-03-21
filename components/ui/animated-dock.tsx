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
        "flex h-14 items-end gap-3 px-4 pb-2",
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
            {item.Icon}
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
          className="absolute -top-8 font-label uppercase tracking-[0.2em] text-[8px] text-[#e2e2e2]/50 whitespace-nowrap pointer-events-none"
        >
          {label}
        </motion.div>
      )}

      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square bg-[#1f1f1f] border border-[#5b403c]/20 hover:border-[#fe5545] transition-colors duration-200 flex items-center justify-center text-[#e2e2e2]/50 hover:text-[#fe5545]"
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
