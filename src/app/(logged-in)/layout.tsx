import { Header } from "@/components/header";
import React from "react";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-6">
      <Header />
      {children}
    </section>
  );
}
