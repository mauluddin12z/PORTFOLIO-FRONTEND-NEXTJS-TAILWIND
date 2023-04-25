"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: any) {
  return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>{children}</ThemeProvider>;
}
