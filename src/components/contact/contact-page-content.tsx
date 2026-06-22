"use client";

import { Vehicle } from "@/lib/types/vehicle";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/shared/animated-text";
import { ContactForm } from "@/components/contact/contact-form";
import { TestDriveForm } from "@/components/contact/test-drive-form";
import { DealershipInfo } from "@/components/contact/dealership-info";

interface ContactPageContentProps {
  vehicles: Vehicle[];
}

export function ContactPageContent({
  vehicles,
}: ContactPageContentProps) {
  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="container-wide">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
          >
            Contact
          </motion.p>
          <AnimatedText
            text="Let's Begin the Conversation"
            as="h1"
            className="text-display mt-4 max-w-4xl text-4xl font-light sm:text-5xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            Whether you&apos;re seeking a specific vehicle, exploring financing
            options, or scheduling a private viewing — our concierge team is
            ready to assist.
          </motion.p>
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="container-wide grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display text-2xl font-light mb-8">
              Send an Enquiry
            </h2>
            <ContactForm />
          </motion.div>

          <DealershipInfo />
        </div>
      </section>

      <section id="test-drive" className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Private Viewing
              </p>
              <AnimatedText
                text="Book a Test Drive"
                as="h2"
                className="text-display mt-4 text-3xl font-light sm:text-4xl lg:text-5xl"
              />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Experience the vehicle firsthand with a personalized test drive
                at our flagship showroom or arrange a private viewing at your
                location.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-border bg-background p-8 lg:p-12"
            >
              <TestDriveForm vehicles={vehicles} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
