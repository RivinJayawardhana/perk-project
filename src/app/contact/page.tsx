import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import StaticContactHero from "@/components/StaticContactHero";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us - VentureNext",
  description: "Get in touch with VentureNext. We'd love to hear from you.",
  openGraph: {
    url: "https://venturenext.co/contact",
  },
  alternates: {
    canonical: "https://venturenext.co/contact",
  },
};

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen py-0">
        <StaticContactHero />
        <ContactFormClient />
      </main>
      <Footer />
    </>
  );
}
