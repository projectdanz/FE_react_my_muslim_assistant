import { useState, useEffect } from "react";

const ScrollNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = document.documentElement.scrollTop;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;
        const handleSmoothScroll = (e, id) => {
  e.preventDefault();
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};
      // Show navbar after scrolling 10%
      if (scrollPercentage > 10) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-2" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center w-11/12 max-w-6xl mx-auto py-4 px-6 bg-blue-200 rounded-2xl shadow-md border border-blue-100">
        {/* Brand */}
        <a
          href="/"
          className="text-2xl font-extrabold text-[#2F8DB5] tracking-tight hover:text-[#1b6f8c] transition-all"
        >
          My Muslim Assistant
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-lg font-semibold text-[#2F8DB5]">
          {[
            { name: "Home", href: "#PrayerTimeSection" },
            { name: "Game", href: "#" },
            { name: "Al-Quran", href: "#QuranSection" },
            { name: "Contact", href: "#contact-me" },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="relative transition-all duration-300 hover:text-[#1b6f8c]
               after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
               after:bg-[#2F8DB5] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button (optional) */}
        <button className="md:hidden text-[#2F8DB5] hover:text-[#1b6f8c] transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default ScrollNavbar;
