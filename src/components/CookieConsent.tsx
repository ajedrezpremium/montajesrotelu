"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-zinc-900 border-t border-zinc-800 px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 leading-relaxed">
          This website uses cookies for analytics and functionality.{' '}
          <Link href="/info" className="text-orange hover:underline">Learn more</Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="px-4 py-2 bg-orange text-white text-xs font-medium hover:bg-orange/90 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
