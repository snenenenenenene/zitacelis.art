import Link from "next/link";
import NavLogo from "./NavLogo";

export default function Navbar() {
  return (
    <nav className="fixed md:justify-start justify-between gap-x-4 inset-0 w-screen h-[3rem] px-[3rem] items-center text-white text-3xl font-sunflower flex">
      {/* //TODO: ADD A CATEGORIES MENU THAT SLIDES OPEN A SIDEBAR WITH ALL POSSIBLE CATEGORIES OF COLLECTIONS */}
      <Link
        href="/shop"
        className="hover:bg-white my-2 h-8 flex justify-center items-center px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
      >
        shop
      </Link>
      <Link
        href="/contact"
        className="hover:bg-white my-2 h-8 flex justify-center items-center px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
      >
        contact
      </Link>
      <Link
        href={"/"}
        className=" absolute z-50 h-full rounded-3xl left-1/2 -translate-x-1/2 text-4xl "
      >
        <NavLogo className="h-full hover:fill-[#662483] rounded-xl font-outline-4 transition-all duration-500 hover:scale-125" />
      </Link>
    </nav>
  );
}
