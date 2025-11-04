import {
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";

const ButtonContact = () => {
  const colorMap = {
    Whatsapp: "hover:border-green-600 hover:text-green-600",
    Instagram: "hover:border-pink-500 hover:text-pink-500",
    Github: "hover:border-black hover:text-black",
    Linkedin: "hover:border-blue-700 hover:text-blue-700",
  };
  const icon = [
    {
      name: "Whatsapp",
      icon: <IoLogoWhatsapp size={25} />,
      url: "https://wa.me/62081914430274",
    },
    {
      name: "Instagram",
      icon: <IoLogoInstagram size={25} />,
      url: "https://www.instagram.com/masdanz/",
    },
    {
      name: "Github",
      icon: <IoLogoGithub size={25} />,
      url: "https://github.com/projectdanz",
    },
    {
      name: "Linkedin",
      icon: <IoLogoLinkedin size={25} />,
      url: "https://www.linkedin.com/in/mas-danz-b88327363",
    },
  ];

  console.log(colorMap[icon[1].name]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 justify-items-center mb-3">
        {icon.map((btn, index) => (
          <button
            key={index}
            className={`
              w-10 h-10 flex items-center justify-center
              rounded-full border border-transparent text-gray-700
              ${colorMap[btn.name]}
            } hover:bg-white
              transition-all duration-200
            `}
            onClick={() => window.open(btn.url, "_blank")}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </>
  );
};

export default ButtonContact;
