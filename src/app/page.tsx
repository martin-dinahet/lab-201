"use server";

import Link from "next/link";
import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { prisma } from "@/lib/prisma";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomePage: React.FC = async () => {
  const dates = await prisma.date.findMany();

  return (
    <div className="breathe-brightness min-h-screen w-screen bg-black text-white">
      {/* Top section with background image */}
      <div className="relative w-full bg-[url(/image-fond.png)] bg-cover">
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

        <section className="font-darknet mt-[10rem] flex w-full flex-nowrap justify-center gap-64 px-20 pb-[10rem] text-xl text-white">
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
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-black" />
      </div>
      <section className="mt-[15rem] flex w-full flex-col items-center gap-10 px-4 text-white">
        <h2 className="font-darknet text-3xl text-white">DATES / EVENEMENTS</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl">
          {dates.map((date) => (
            <AccordionItem key={date.id} value={date.id}>
              <AccordionTrigger className="text-xl font-bold">
                {new Date(date.date).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                })}{" "}
                – {date.city}, {date.country}
                {date.soldOut && <span className="ml-2 text-red-400">(complet)</span>}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 text-white/90">
                <div>
                  <strong>Lieux :</strong>
                  <ul className="ml-4 list-disc">
                    {date.locations.map((loc, i) => (
                      <li key={i}>{loc}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-white/60">
                  Ajouté le{" "}
                  {new Date(date.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <h2 className="font-darknet text-lg">ET D'AUTRES A VENIR...</h2>
      </section>
      <section className="relative flex w-full flex-col items-center overflow-hidden pt-[15rem] text-white">
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-32 w-full bg-gradient-to-b from-black to-transparent" />
        <h2 className="font-darknet z-10 mb-8 text-4xl tracking-widest">MERCHANDISING</h2>
        <Image
          src="/fond-demon.png"
          alt="démon gauche"
          width={700}
          height={700}
          className="absolute top-1/2 left-0 -translate-y-1/2"
        />
        <Image
          src="/fond-demon.png"
          alt="démon droite"
          width={700}
          height={700}
          className="absolute top-1/2 right-0 -translate-y-1/2 scale-x-[-1]"
        />
        <div className="relative z-10 flex w-full max-w-7xl items-center justify-center">
          <Image
            src="/vinyle.png"
            alt="pochette vinyle"
            width={400}
            height={400}
            className="z-10"
          />
        </div>
        <div className="font-darknet z-10 mt-10 text-center text-xl tracking-wide">
          <p className="text-2xl uppercase">UN VINYLE EN EDITION LIMITEE,</p>
          <p className="text-sm tracking-widest text-white/70">
            COMPRENANT DES TITRES EXCLUSIFS...
          </p>
        </div>
      </section>
      <section className="mt-[15rem] flex w-full justify-center">
        <div className="relative h-[600px] w-[600px]">
          <div className="absolute top-0 left-0 h-[5rem] w-[2px] bg-gray-400" />
          <div className="absolute top-0 left-0 h-[2px] w-[5rem] bg-gray-400" />
          <div className="absolute right-0 bottom-0 h-[5rem] w-[2px] bg-gray-400" />
          <div className="absolute right-0 bottom-0 h-[2px] w-[5rem] bg-gray-400" />
          <Image src="/tshirt-1.png" alt="t-shirt PDM" fill className="object-contain" />
        </div>
      </section>
      <section className="mt-[5rem] flex w-full justify-center">
        <div className="flex flex-col items-center space-y-3">
          <h2 className="font-darknet text-2xl uppercase">UNE COLLECTION PRIVEE</h2>
          <p className="font-darknet uppercase">DISPONIBLE EN PRECOMMANDE</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
