import FadeIn from "@/components/FadeIn";
import { useSEO } from "@/hooks/useSEO";

interface PolicySection {
  title: string;
  content?: string;
  items?: string[];
  footer?: string;
}

const sections: PolicySection[] = [
  {
    title: "Introduction",
    content:
      "These policies are designed to protect both our guests and our vehicles. By booking or operating a vehicle through Mead Green Autos, you agree to the following terms and conditions.",
  },
  {
    title: "Authorized Drivers",
    content:
      "Only drivers approved by Mead Green Autos and listed on the reservation may operate the vehicle. Allowing unauthorized drivers to operate the vehicle may result in termination of the rental agreement and additional liability.",
  },
  {
    title: "Prohibited Use",
    items: [
      "Off-roading or driving on unpaved terrain",
      "Racing, drifting, burnouts, or reckless driving",
      "Towing another vehicle or trailer",
      "Illegal activity of any kind",
      "Ride-share, delivery, or commercial transport services unless approved beforehand",
      "Smoking or vaping inside the vehicle",
    ],
    footer: "Any prohibited use may result in immediate termination of the rental and full financial responsibility for resulting damages.",
  },
  {
    title: "Vehicle Responsibility",
    content:
      "Renters are responsible for returning the vehicle in the same condition in which it was received, excluding normal wear and tear. The renter is financially responsible for any damage occurring during the rental period, including but not limited to: wheel and tire damage, interior damage, windshield damage, underbody damage, mechanical damage caused by misuse or negligence, and lost keys or accessories. We strongly recommend documenting the vehicle condition at pickup and return.",
  },
  {
    title: "Fuel Requirements",
    content:
      "Vehicles must be returned with the same fuel level provided at pickup. Vehicles requiring premium fuel must only be filled with premium-grade gasoline.",
  },
  {
    title: "Late Returns",
    content:
      "Vehicles must be returned at the agreed-upon time stated in the reservation. Late returns may result in additional charges and may affect future reservations. Failure to return a vehicle without communication may result in further action in accordance with applicable law.",
  },
  {
    title: "Payment Authorization",
    content:
      "By booking with Mead Green Autos, the renter authorizes additional charges related to tolls, parking fees, traffic violations, mileage overages, cleaning, damages, smoking violations, late returns, or other policy violations to be charged to the payment method on file.",
  },
  {
    title: "Right to Refuse Service",
    content:
      "Mead Green Autos reserves the right to refuse, cancel, or terminate any rental if policies are violated or if a rental presents a safety, insurance, or operational concern.",
  },
];

export default function Policies() {
  useSEO({
    title: "Policies & Terms | Mead Green Autos — Atlanta Car Rental Policies",
    description: "Review Mead Green Autos rental policies including deposits, fuel policy, prohibited use, late returns, cancellations, and damages.",
    canonical: "https://meadgreenautos.com/policies",
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
              Policies & Terms
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
              Policies designed to protect both our guests and our vehicles. Please review these terms before your rental.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section with White Container */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
              <div className="space-y-8">
                {sections.map((section, i) => (
                  <FadeIn key={section.title} delay={i * 0.05}>
                    <div className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <h2 className="font-serif text-xl font-semibold text-gray-900">
                        {section.title}
                      </h2>
                      {section.content && (
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                          {section.content}
                        </p>
                      )}
                      {section.items && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-2">Vehicles may not be used for:</p>
                          <ul className="space-y-1 ml-4">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start">
                                <span className="mr-3">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          {section.footer && (
                            <p className="mt-3 text-sm text-gray-600">
                              {section.footer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
