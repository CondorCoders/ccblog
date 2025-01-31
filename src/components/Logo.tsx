import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative w-40 h-36">
      <Image
        alt="Logo"
        fill
        src="/Logo_DarkMode.svg"
        className="m-0 object-contain hidden dark:block"
      />
      <Image
        alt="Logo"
        fill
        src="/Logo_LightMode.svg"
        className="m-0 object-contain block dark:hidden"
      />
    </div>
  );
};
