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
          <h3 className="text-display text-xl font-medium">
            Visit Our Showroom
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Discover our carefully selected collection of premium vehicles in
            a private showroom environment. Our team is available to assist
            with vehicle enquiries, viewings, and test drive appointments.
          </p>
        </div>


        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

            <div>
              <p className="font-medium">
                Elevon Automotive
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                [YOUR SHOWROOM ADDRESS]
                <br />
                [CITY, COUNTRY]
              </p>
            </div>
          </div>


          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />

            <a
              href="tel:[PHONE]"
              className="text-sm transition-colors hover:text-muted-foreground cursor-pointer"
            >
              [PHONE NUMBER]
            </a>
          </div>


          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />

            <a
              href="mailto:[EMAIL]"
              className="text-sm transition-colors hover:text-muted-foreground cursor-pointer"
            >
              [EMAIL]
            </a>
          </div>

        </div>


        <div>

          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />

            <p className="font-medium">
              Operating Hours
            </p>
          </div>


          <div className="space-y-3">

            {hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between text-sm border-b border-border pb-3"
              >
                <span className="text-muted-foreground">
                  {h.day}
                </span>

                <span>
                  {h.time}
                </span>

              </div>
            ))}

          </div>

        </div>


        <div className="relative aspect-video overflow-hidden bg-muted">

          <iframe
            title="Elevon Showroom Location"

            src="YOUR_GOOGLE_MAPS_EMBED_LINK"

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