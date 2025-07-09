"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 text-white">
      {/* Desktop layout */}
      <div className="font-felipa hidden items-center justify-evenly text-2xl sm:flex">
        <Link href="#album">Album</Link>
        <Link href="#events">Evenements</Link>

        <Link href="#">
          <Image src="/logo.svg" alt="PDM Logo" height={200} width={200} />
        </Link>

        <Link href="#merch">Merch</Link>
        <Link href="#news">News</Link>
      </div>

      {/* Mobile layout */}
      <div className="flex items-center justify-between sm:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        <Link href="#">
          <Image src="/logo.svg" alt="PDM Logo" height={60} width={60} />
        </Link>

        {/* Invisible spacer to balance layout */}
        <div className="w-[30px]"></div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <nav className="font-felipa mt-4 flex flex-col items-center space-y-4 text-xl sm:hidden">
          <Link href="#album" onClick={() => setIsOpen(false)}>
            Album
          </Link>
          <Link href="#events" onClick={() => setIsOpen(false)}>
            Evenements
          </Link>
          <Link href="#merch" onClick={() => setIsOpen(false)}>
            Merch
          </Link>
          <Link href="#news" onClick={() => setIsOpen(false)}>
            News
          </Link>
        </nav>
      )}
    </header>
  );
};
