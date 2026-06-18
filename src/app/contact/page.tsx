import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Apex Motors. Schedule a test drive, enquire about financing, or visit our flagship showroom in Beverly Hills.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
