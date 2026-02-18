"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

/* ── colour maps ── */
const menuBgMap: Record<string, string> = {
  "dirt-pop": "bg-dirt-pop",
  "dirt-deep": "bg-dirt-deep",
  "dirt-black": "bg-dirt-black",
};

const navBgMap: Record<string, string> = {
  "dirt-deep": "bg-dirt-deep",
  "dirt-black": "bg-dirt-black",
  transparent: "bg-transparent",
};

/* ── props ── */
export interface DirtNavProps {
  logo?: string;
  actions?: ReactNode;
  menuLinks?: ReactNode;
  menuImage?: string;
  menuBackground?: string;
  navBackground?: string;
}

export function DirtNav({
  logo,
  actions,
  menuLinks,
  menuImage,
  menuBackground = "dirt-pop",
  navBackground = "dirt-deep",
}: DirtNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>([]);

  /* ── sticky on scroll ── */
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── responsive flag ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── unwrap Plasmic slot fragment ── */
  const unwrapSlot = (slot: ReactNode): React.ReactNode[] => {
    const arr = React.Children.toArray(slot);
    if (
      arr.length === 1 &&
      React.isValidElement(arr[0]) &&
      arr[0].type === React.Fragment
    ) {
      return React.Children.toArray(
        (arr[0].props as { children?: ReactNode }).children
      );
    }
    return arr;
  };

  /* ── inject index + isMobile into each link child ── */
  const linkItems = unwrapSlot(menuLinks).map((child, i) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement<any>, {
      index: i,
      isMobile,
    });
  });

  /* ── measure link widths for staircase layout ── */
  useEffect(() => {
    if (isMobile || !linksContainerRef.current) {
      setOffsets([]);
      return;
    }

    const items = linksContainerRef.current.querySelectorAll<HTMLElement>(
      ":scope > [data-nav-link]"
    );

    const measure = () => {
      const next: number[] = [];
      let cumulative = 0;
      items.forEach((el) => {
        next.push(cumulative);
        cumulative += el.offsetWidth;
      });
      setOffsets((prev) => {
        if (
          prev.length === next.length &&
          prev.every((v, i) => v === next[i])
        )
          return prev;
        return next;
      });
    };

    const ro = new ResizeObserver(measure);
    items.forEach((el) => ro.observe(el));
    document.fonts.ready.then(measure);

    return () => ro.disconnect();
  }, [isMobile, linkItems.length]);

  const navBg = navBgMap[navBackground] ?? "bg-dirt-deep";
  const menuBg = menuBgMap[menuBackground] ?? "bg-dirt-pop";
  const NAV_HEIGHT = 72;

  return (
    <>
      {/* Spacer to prevent layout shift when sticky */}
      {isSticky && (
        <div style={{ height: NAV_HEIGHT, gridColumn: "1 / -1" }} />
      )}

      <nav
        ref={navRef}
        className={`${navBg} ${
          isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative w-full"
        }`}
        style={{ gridColumn: "1 / -1", height: NAV_HEIGHT }}
      >
        <div className="flex items-center justify-between h-full px-5 md:px-8">
          {/* Logo */}
          {logo ? (
            <a href="/" className="shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-10 md:h-9 w-auto"
              />
            </a>
          ) : (
            <div className="h-10" />
          )}

          {/* Right side: actions + hamburger */}
          <div className="flex items-center gap-4">
            {actions}

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="relative flex flex-col justify-center items-center bg-dirt-pop hover:bg-dirt-pop-hover w-10 h-10 gap-1.5 cursor-pointer border-0"
              aria-label="Open menu"
            >
              <img src={`/Hamburger Button.png`} className={`w-6 h-auto`}  alt={`Menu Button`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen menu overlay ── */}
      <div
        className={`fixed inset-0 z-9999 ${menuBg} transition-transform duration-400 ease-in-out ${
          menuOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Logo */}
        <a href="/" className="shrink-0 absolute top-5 left-5 md:top-8.5 md:left-8">
          <img
              src={`/Dirt Dark Logo.png`}
              alt="Logo"
              className="h-7 md:h-9 w-auto"
          />
        </a>
        
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 md:top-8 md:right-8 p-2 pr-3 flex items-center justify-center cursor-pointer bg-dirt-deep border-0 z-10"
          aria-label="Close menu" 
        >
          <div className={`flex items-center gap-1`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-dirt-off-white"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className={`font-display font-bold text-dirt-off-white uppercase text-base`}>Close</span>
          </div>
        </button>

        {/* Menu content */}
        <div className="flex flex-col justify-between h-full px-5 md:px-8 py-20 md:py-40 overflow-y-auto">
          {/* Links */}
          <div ref={linksContainerRef} className="grow flex flex-col gap-2 md:gap-4 justify-start">
            {linkItems.map((child, i) => (
              <div
                key={i}
                data-nav-link
                style={{
                  width: "fit-content",
                  marginLeft: !isMobile ? (offsets[i] ?? 0) : 0,
                  transition: "margin-left 0.4s ease",
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom image */}
        {menuImage && (
            <div className="absolute bottom-0 left-0 right-0 shrink-0">
              <img
                  src={menuImage}
                  alt=""
                  className="max-h-32 md:max-h-60 w-full object-bottom object-cover"
              />
            </div>
        )}
      </div>
    </>
  );
}
