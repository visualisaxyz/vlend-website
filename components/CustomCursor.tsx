"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouch("ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (!mounted || isTouch) return;

    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursor-ring");
    if (!cursor || !cursorRing) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + "px";
      cursorRing.style.top = ry + "px";
      rafId = requestAnimationFrame(animateRing);
    };

    let rafId = requestAnimationFrame(animateRing);

    const handleHoverEnter = () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      cursorRing.style.width = "48px";
      cursorRing.style.height = "48px";
      cursorRing.style.borderColor = "rgba(34,197,94,0.7)";
    };

    const handleHoverLeave = () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursorRing.style.width = "32px";
      cursorRing.style.height = "32px";
      cursorRing.style.borderColor = "rgba(34,197,94,0.4)";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) handleHoverEnter();
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      if (!target.closest("a, button") || !related?.closest("a, button")) {
        handleHoverLeave();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, isTouch]);

  useEffect(() => {
    if (!mounted || isTouch) return;
    document.body.classList.add("cursor-custom");
    return () => document.body.classList.remove("cursor-custom");
  }, [mounted, isTouch]);

  if (!mounted || isTouch) return null;

  return (
    <>
      <div id="cursor" aria-hidden />
      <div id="cursor-ring" aria-hidden />
    </>
  );
}
