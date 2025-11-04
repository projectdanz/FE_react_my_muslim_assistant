import ButtonContact from "../components/ButtonContact";

const footer = () => {
  const links = [
                { name: "Home", href: "/" },
                { name: "Game Quran", href: "#" },
                { name: "Daftar Surah", href: "#" },
                { name: "Contact Me", href: "#" },
              ]
  return (
    <>
      <div className="bg-blue-700 text-white py-8 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
          {/* Section kiri */}
          <div className="w-full lg:w-1/3">
            <h1 className="text-3xl font-semibold mb-4">MY MUSLIM ASSISTANT</h1>
            <div className="flex flex-col space-y-2 text-md">
              {links.map((link, idx) => (
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
          <div className="w-full lg:w-1/2 flex flex-col items-center bg-gray-100 rounded-lg p-4">
            <h1 className="text-lg font-semibold text-gray-800 my-6">
              Contact Me
            </h1>

            {/* Grid tombol kontak */}
            <ButtonContact />

            {/* Teks promosi */}
            <p className="text-center text-gray-700 text-sm">
              Jangan ragu untuk menghubungi saya! <br />
              Yuk, kita wujudkan proyekmu menjadi nyata bersama-sama
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
