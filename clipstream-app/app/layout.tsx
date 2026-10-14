import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipperHub — iGaming clipping network prototype",
  description: "ClipStream-based prototype for licensed iGaming brands: campaign pools, verified views, paced rates and transparent clip payouts."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
