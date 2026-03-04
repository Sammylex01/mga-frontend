import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";

export default function Insurance() {
  return (
    <>
      <section className="bg-stone py-16 md:py-20">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold md:text-4xl">
              Insurance Information
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Understanding insurance requirements before your rental ensures a
              smooth, worry-free experience.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-xl font-semibold">
                  Insurance Requirements
                </h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Full coverage auto insurance (liability, collision, and
                    comprehensive) is required for all private rentals.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Proof of valid insurance must be provided before vehicle
                    pickup. Digital copies are accepted.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Insurance must be active for the entire duration of the
                    rental period.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    The rental vehicle must be listed as a covered vehicle on
                    your policy, or your policy must cover rental vehicles.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold">
                  Accepted Coverage
                </h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Personal auto insurance policies with full coverage
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Commercial auto insurance policies
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    Non-owner auto insurance with rental coverage endorsement
                  </li>
                </ul>
              </div>

              <div className="rounded border border-border bg-card p-6">
                <h3 className="font-serif text-base font-semibold">
                  Important Disclaimers
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Mead Green Autos does not provide insurance coverage for
                  private rentals. Renters are solely responsible for
                  maintaining adequate insurance coverage throughout the rental
                  period. In the event of an accident or damage, the renter's
                  insurance is the primary coverage. Turo bookings include
                  Turo's insurance options — please refer to Turo for details.
                </p>
              </div>

              <div className="rounded border border-border bg-primary/5 p-6">
                <h3 className="font-serif text-base font-semibold">
                  Questions About Insurance?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  If you have questions about insurance requirements or need
                  guidance on what coverage to obtain, please reach out to our
                  team. We are happy to help clarify before your rental.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link to="/contact">
                    <Button variant="premiumOutline" size="sm">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/private-inquiry">
                    <Button variant="premium" size="sm">
                      Submit Inquiry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
