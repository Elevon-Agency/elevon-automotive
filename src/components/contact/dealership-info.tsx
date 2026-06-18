import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 6:00 PM" },
  { day: "Sunday", time: "By Appointment" },
];

export function DealershipInfo() {
  return (
    <RevealOnScroll>
      <div className="space-y-12">
        <div>
          <h3 className="text-display text-xl font-medium">Visit Our Showroom</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Experience our curated collection in an environment designed for
            the discerning enthusiast. Private viewings available by appointment.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">Apex Motors Flagship</p>
              <p className="mt-1 text-sm text-muted-foreground">
                1000 Luxury Lane
                <br />
                Beverly Hills, CA 90210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
            <a
              href="tel:+13105550100"
              className="text-sm transition-colors hover:text-muted-foreground cursor-pointer"
            >
              +1 (310) 555-0100
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
            <a
              href="mailto:concierge@apexmotors.com"
              className="text-sm transition-colors hover:text-muted-foreground cursor-pointer"
            >
              concierge@apexmotors.com
            </a>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="font-medium">Operating Hours</p>
          </div>
          <div className="space-y-3">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between text-sm border-b border-border pb-3"
              >
                <span className="text-muted-foreground">{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden bg-muted">
          <iframe
            title="Apex Motors Showroom Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.393553120906!2d-118.432097963225!3d34.090009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6a14731%3A0xff6dbc10ad190126!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        </div>
      </div>
    </RevealOnScroll>
  );
}
