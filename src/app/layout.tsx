import { darkNetWarrior } from "@/fonts/dark-net-warrior";
import { felipa } from "@/fonts/felipa";
import { FC, PropsWithChildren } from "react";

import "@/globals.css";

export const metadata = {
  title: "Fullstack App Quickstart",
  description: "Made with <3 by Martin Dinahet",
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
