"use client";

import { useEffect, useState } from "react";

export default function StickyOrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 80 : 400;
      setShow(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="flex gap-2 max-w-md mx-auto">
        <a
          href="#menu"
          className="flex-1 text-center px-4 py-3 bg-white text-gray-800 font-semibold rounded-full text-sm shadow-lg active:scale-95 transition-transform"
        >
          View Menu
        </a>
        <a
          href="#order-online"
          className="flex-[1.3] text-center px-4 py-3 button-primary text-white font-semibold rounded-full text-sm shadow-lg active:scale-95 transition-transform"
        >
          Order Online
        </a>
      </div>
    </div>
  );
}
