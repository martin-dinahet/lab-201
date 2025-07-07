"use server";

import Link from "next/link";
import Image from "next/image";
import { Countdown } from "@/components/countdown";

const HomePage: React.FC = async () => {
  return (
    <div className="min-h-screen w-screen bg-[url(/image-fond.png)] bg-cover">
      <header className="w-full p-8">
        <div className="font-felipa flex items-center justify-evenly text-2xl text-white">
          <Link href="#">Accueil</Link>
          <Link href="#">Album</Link>
          <Link href="#">
            <Image src="/logo.svg" alt="PDM Logo" height={200} width={200} />
          </Link>
          <Link href="#">Évènement</Link>
          <Link href="#">Blog</Link>
        </div>
      </header>
      <section className="mt-[15rem] mb-[25rem] flex w-full justify-center">
        <Countdown />
      </section>
      <section className="mt-[10rem] flex w-full justify-center gap-20">
        <Image src="/boite-cd.png" alt="boite cd" height={400} width={400} />
        <Image
          src="/cd.png"
          alt="cd"
          height={400}
          width={400}
          className="animate-spin"
          style={{ animationDuration: "6s" }}
        />
      </section>
      <section className="font-darknet mt-[10rem] flex w-full flex-nowrap justify-center gap-64 px-20 text-xl text-white">
        {/* Left column: Title left, number right */}
        <div className="w-[22rem] space-y-2">
          {[
            "DIEU MERCI",
            "REGULATION",
            "LETHARGIE",
            "PANDEMONIUM",
            "FLPVCOF",
            "GAUCHE DROITE",
            "ROCHE NOIRE",
            "DARKNET",
            "FUMEE",
            "QUE DES PROBLEMES",
          ].map((track, i) => (
            <p key={i} className="flex gap-2">
              <span>{track}</span>
              <span className="font-felipa text-white/60">{String(i + 1).padStart(2, "0")}</span>
            </p>
          ))}
        </div>

        {/* Right column: Number left, title right */}
        <div className="w-[22rem] space-y-2">
          {[
            "UFOV",
            "SUPERMAN",
            "PROZACZOPIXAN",
            "INTERLUDE",
            "93 MILLIARDS",
            "LES ECHAPPES",
            "PARADIS PERDU",
            "PTSD",
            "VICTOIRE",
            "DEMON",
          ].map((track, i) => (
            <p key={i} className="flex justify-end gap-2">
              <span className="font-felipa text-white/60">{String(i + 11).padStart(2, "0")}</span>
              <span className="text-right">{track}</span>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
