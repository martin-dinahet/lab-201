import { darkNetWarrior } from "@/fonts/dark-net-warrior";
import { felipa } from "@/fonts/felipa";
import { FC, PropsWithChildren } from "react";

import "@/globals.css";

export const metadata = {
  title: "PANDEMONIUM",
  description: "Nouvel album de VALD",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={`${felipa.variable} ${darkNetWarrior.variable}`}>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
