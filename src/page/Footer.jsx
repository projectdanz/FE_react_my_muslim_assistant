import {
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import clsx from "clsx";
import IconThemeLight from "../assets/image/icon-theme-dark.svg";

const footer = () => {
  const buttons = [
    {
      icon: <IoLogoWhatsapp size={25} />,
      color: "green-600",
      url: "https://wa.me/62081914430274",
    },
    {
      icon: <IoLogoInstagram size={25} />,
      color: "pink-500",
      url: "https://www.instagram.com/zhnkys_36?utm_source=qr&igsh=Y3dibWtseW82YWoz",
    },
    {
      icon: <IoLogoGithub size={25} />,
      color: "black",
      url: "https://github.com/projectdanz",
    },
    {
      icon: <IoLogoLinkedin size={25} />,
      color: "blue-700",
      url: "https://www.linkedin.com/in/mas-danz-b88327363",
    },
  ];

  return (
    <>
      <footer
        id="contact-me"
        className="bg-blue-700 text-white py-8 px-6 mt-10"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
          {/* Section kiri */}
          <div className="w-full lg:w-1/3">
            <div className="flex justify-start items-center p-0">
              <img
                src={IconThemeLight}
                alt="Light Theme Icon"
                className="w-24 h-24 object-contain"
              />
              <h1 className="text-3xl font-semibold text-gray-50 tracking-wide leading-none">
                MY MUSLIM ASSISTANT
              </h1>
            </div>

            <div className="flex flex-col space-y-2 text-md">
              {[
                { name: "Jadwal Shalat", href: "#PrayerTimeSection" },
                { name: "Game", href: "#" },
                { name: "Daftar Surah", href: "#QuranSection" },
                { name: "Contact Me", href: "#contact-me" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="border-b-2 border-transparent hover:border-gray-300 hover:text-gray-300 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <p className="text-gray-200 text-sm mt-6">
              &copy; 2025 My Muslim Assistant. All rights reserved.
            </p>
          </div>

          {/* Section kanan / contact */}
          <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <h1 className="text-lg font-semibold text-gray-800 my-6">
              Contact Me
            </h1>

            {/* Grid tombol kontak */}
            <div className="grid grid-cols-4 gap-4 justify-items-center mb-3">
              {buttons.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => window.open(btn.url, "_blank")}
                  className={clsx(
                    "w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:border text-gray-700 transition-all duration-200",
                    {
                      "hover:border-green-600 hover:text-green-600":
                        btn.color === "green-600",
                      "hover:border-pink-500 hover:text-pink-500":
                        btn.color === "pink-500",
                      "hover:border-black hover:text-black":
                        btn.color === "black",
                      "hover:border-blue-700 hover:text-blue-700":
                        btn.color === "blue-700",
                    }
                  )}
                >
                  {btn.icon}
                </button>
              ))}
            </div>

            {/* Teks promosi */}
            <p className="text-center text-gray-700 text-sm">
              Jangan ragu untuk menghubungi saya! <br />
              Yuk, kita wujudkan proyekmu menjadi nyata bersama-sama
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
