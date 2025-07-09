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
import { InstagramIcon, Music2Icon, TwitterIcon, YoutubeIcon } from "lucide-react";

const HomePage: React.FC = async () => {
  const dates = await prisma.date.findMany();
  const news = await prisma.news.findMany();

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
        <section className="mt-[5rem] flex w-full flex-col items-center justify-center gap-10 px-4 md:flex-row md:gap-20">
          <Image
            src="/boite-cd.png"
            alt="boite cd"
            height={300}
            width={300}
            className="w-[250px] md:w-[300px]"
          />
          <Image
            src="/cd.png"
            alt="cd"
            height={300}
            width={300}
            className="w-[250px] animate-spin md:w-[300px]"
            style={{ animationDuration: "6s" }}
          />
        </section>

        <section className="font-darknet mt-[10rem] flex w-full flex-col justify-center gap-16 px-6 pb-[10rem] text-xl text-white md:flex-row md:flex-nowrap md:gap-64 md:px-20 md:pb-[10rem]">
          <div className="w-full space-y-2 md:w-[22rem]">
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

          <div className="mt-10 w-full space-y-2 md:mt-0 md:w-[22rem]">
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
              <p key={i} className="flex justify-between gap-2 md:justify-end">
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
      <section className="relative flex w-full flex-col items-center overflow-hidden px-4 pt-[10rem] text-white md:pt-[15rem]">
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-32 w-full bg-gradient-to-b from-black to-transparent" />

        {/* Title */}
        <h2 className="font-darknet z-10 mb-8 text-center text-2xl tracking-widest md:text-4xl">
          MERCHANDISING
        </h2>

        {/* Demon Left */}
        <Image
          src="/fond-demon.png"
          alt="démon gauche"
          width={700}
          height={700}
          className="absolute top-1/2 left-0 w-[60%] max-w-[300px] -translate-y-1/2 md:w-[700px] md:max-w-none"
        />

        {/* Demon Right (Mirrored) */}
        <Image
          src="/fond-demon.png"
          alt="démon droite"
          width={700}
          height={700}
          className="absolute top-1/2 right-0 w-[60%] max-w-[300px] -translate-y-1/2 scale-x-[-1] md:w-[700px] md:max-w-none"
        />

        {/* Vinyl Image */}
        <div className="relative z-10 flex w-full max-w-7xl items-center justify-center">
          <Image
            src="/vinyle.png"
            alt="pochette vinyle"
            width={400}
            height={400}
            className="w-[200px] md:w-[400px]"
          />
        </div>

        {/* Text Below */}
        <div className="font-darknet z-10 mt-10 text-center text-lg tracking-wide md:text-xl">
          <p className="text-xl uppercase md:text-2xl">UN VINYLE EN EDITION LIMITEE,</p>
          <p className="text-sm tracking-widest text-white/70 md:text-base">
            COMPRENANT DES TITRES EXCLUSIFS...
          </p>
        </div>
      </section>

      <section className="flex w-full justify-center px-4 pt-[15rem]">
        <div className="flex max-w-xl flex-col items-center space-y-6 text-center">
          <h2 className="font-darknet text-2xl uppercase md:text-3xl">UNE COLLECTION PRIVÉE</h2>
          <p className="font-darknet text-base uppercase md:text-lg">DISPONIBLE EN PRÉCOMMANDE</p>
          <div className="flex justify-center">
            <Image
              src="/tshirt-2.png"
              alt="tshirt 2"
              width={800}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <div className="relative w-full bg-[url(/image-fond-2.png)] bg-cover">
        <section className="w-full px-4 pt-[10rem] pb-[10rem] text-white">
          <h2 className="font-darknet pb-20 text-center text-2xl">NEWS</h2>
          <div className="mx-auto flex max-w-7xl justify-center">
            <div className="flex flex-wrap justify-center gap-10">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="group w-full max-w-sm flex-shrink-0 flex-grow overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:scale-[1.02] sm:w-[45%] lg:w-[30%]"
                >
                  <div className="flex w-full flex-col">
                    <div className="relative h-56 w-full overflow-hidden rounded-md">
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-darknet mt-4 text-xl uppercase">{item.title}</h3>
                    <span className="mt-1 text-xs text-white/50">
                      {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <p className="mt-2 text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative flex flex-col items-center justify-center bg-transparent px-6 py-16 text-white">
          {/* Pandemonium SVG */}
          <div className="mb-8">
            <Image src="/pandemonium.svg" alt="Pandemonium logo" width={180} height={80} />
          </div>

          {/* Spotify icon centered under the logo */}
          <div className="mb-8 flex justify-center">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0024 0c0-6.627-5.373-12-12-12zm5.044 17.254a.746.746 0 01-1.026.246c-2.81-1.71-6.358-2.093-10.529-1.14a.746.746 0 01-.326-1.449c4.598-1.034 8.555-.59 11.785 1.311a.745.745 0 01.07 1.032zm1.448-3.08a.93.93 0 01-1.282.304c-3.216-1.962-8.111-2.535-11.91-1.381a.931.931 0 11-.49-1.787c4.433-1.215 9.912-.574 13.844 1.555a.93.93 0 01.33 1.31zm.086-3.057c-3.696-2.269-9.885-2.472-13.522-1.351a1.12 1.12 0 11-.692-2.131c4.42-1.437 11.368-1.171 15.722 1.603a1.119 1.119 0 11-1.508 1.879z" />
              </svg>
            </a>
          </div>

          {/* Social media icons */}
          <div className="mb-8 flex gap-8 text-white/70">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <YoutubeIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Music2Icon />
            </a>
          </div>

          {/* Bottom nav and copyright */}
          <div className="flex w-full max-w-7xl justify-between border-t border-white/10 px-6 pt-6 text-xs text-white/50">
            <nav className="flex gap-8">
              <a href="/apropos" className="hover:text-white">
                À PROPOS
              </a>
              <a href="/contact" className="hover:text-white">
                CONTACT
              </a>
              <a href="/aide" className="hover:text-white">
                AIDE
              </a>
              <a href="/politique" className="hover:text-white">
                POLITIQUE
              </a>
            </nav>
            <div>Copyright © 2025 • Lift Media Inc.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
