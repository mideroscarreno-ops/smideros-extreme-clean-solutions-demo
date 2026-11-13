import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  COMPANY_INFO,
  IMAGES,
  PRIMARY_SERVICES,
  PROCESS_STEPS,
  SPECIALTY_ADDONS,
  TRUST_STANDARDS,
  PageRoute,
} from '../data/siteData';
import { EstimateServiceType } from './EstimateWizard';
import { BrandImage } from './BrandImage';
import { ServiceAreaChecker } from './ServiceAreaChecker';
import { FaqAccordion } from './FaqAccordion';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onStartEstimate: (options?: {
    service?: EstimateServiceType;
    cityOrZip?: string;
    addOnIds?: string[];
  }) => void;
}

export function HomePage({ onNavigate, onStartEstimate }: HomePageProps) {
  const [exploredAddOnIds, setExploredAddOnIds] = useState<string[]>(['oven']);

  const toggleExploredAddOn = (id: string) => {
    setExploredAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* B. HERO SECTION */}
      <section className="bg-[#FAFCFD] border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#263845]/80">
                Family-Owned <span aria-hidden="true">·</span> Detail-Driven{' '}
                <span aria-hidden="true">·</span> Oklahoma City
              </p>

              <h1 className="font-display font-bold tracking-tight text-[#17304B] leading-[1.08] text-[clamp(2.25rem,4vw,3.5rem)]">
                Come Home to a Whole New Level of Clean.
              </h1>

              <p className="text-base sm:text-lg text-[#263845] leading-relaxed max-w-xl">
                Professional house cleaning, detailed deep cleans, and move-in/move-out services throughout Oklahoma City.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onStartEstimate()}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#17304B] text-white text-sm sm:text-base font-semibold hover:bg-[#263845] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Get My Free Estimate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="#services-overview"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-lg border border-[#E8EFF3] bg-white text-[#17304B] text-sm sm:text-base font-semibold hover:border-[#4CA8D8] transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Cleaning Services
                </a>
              </div>

              <div className="pt-4 border-t border-[#E8EFF3] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#263845]">
                <span>{COMPANY_INFO.tagline}</span>
                <span className="text-[#E8EFF3]" aria-hidden="true">
                  |
                </span>
                <a
                  href={COMPANY_INFO.owners[0].phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-[#17304B] hover:text-[#4CA8D8] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4CA8D8]" aria-hidden="true" />
                  <span>Krista: {COMPANY_INFO.owners[0].phoneDisplay}</span>
                </a>
                <a
                  href={COMPANY_INFO.owners[1].phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-[#17304B] hover:text-[#4CA8D8] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4CA8D8]" aria-hidden="true" />
                  <span>Kris: {COMPANY_INFO.owners[1].phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E8EFF3] bg-white">
                <BrandImage
                  src={IMAGES.heroLivingRoom}
                  alt="Bright open-concept Oklahoma City living room and marble kitchen island freshly cleaned with sunlit hardwood floors"
                  fallbackLabel="Oklahoma City Residential Home Care"
                  priority
                  className="w-full aspect-[16/10] lg:aspect-[4/3] object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. THE EXTREME CLEAN DIFFERENCE */}
      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                The Extreme Clean Difference
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B] leading-tight">
                It’s the Little Details That Make a Big Difference.
              </h2>
              <p className="text-base text-[#263845] leading-relaxed">
                As a local family-owned company, Extreme Clean Solutions builds trust through consistency, honest communication, and genuine respect for every customer’s home.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('approach')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span>Read About Our Cleaning Approach</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {[
                {
                  num: '01.',
                  title: 'Detailed Service Checklists',
                  text: 'Structured room-by-room checklists keep kitchens, bathrooms, dusting, and floors aligned with your service package.',
                },
                {
                  num: '02.',
                  title: 'Consistent Cleaning Care',
                  text: 'Dependable routines help your home maintain a clean, settled feel visit after visit rather than sporadic spot-cleaning.',
                },
                {
                  num: '03.',
                  title: 'Personalized Customer Care',
                  text: 'You communicate directly with Krista and Kris so preferences, priorities, and scheduling notes stay clear.',
                },
                {
                  num: '04.',
                  title: 'Honest Communication',
                  text: 'Clear upfront expectations regarding scope, scheduling, cancellations, and pricing before your appointment is confirmed.',
                },
                {
                  num: '05.',
                  title: 'Professional Supplies & Equipment',
                  text: 'Our team arrives ready with our own professional cleaning supplies and equipment—no shopping list required from you.',
                },
                {
                  num: '06.',
                  title: 'Respect for Your Home',
                  text: 'Screened cleaners and attentive handling of living spaces, pets, and property access instructions.',
                },
              ].map((item) => (
                <div key={item.num} className="pt-4 border-t border-[#E8EFF3] space-y-1.5">
                  <span className="font-mono text-xs text-[#4CA8D8] tabular-nums block">
                    {item.num}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#17304B]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#263845] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D. THREE PRIMARY SERVICE EXPERIENCES */}
      <section id="services-overview" className="bg-[#FAFCFD] border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-14 lg:space-y-20">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
              Confirmed Residential Services
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
              Focused Residential Care for Every Stage of Home Life.
            </h2>
            <p className="text-base text-[#263845] leading-relaxed">
              Whether maintaining a busy household week to week, refreshing overlooked rooms, or preparing an empty residence for moving day, choose the scope built for your space.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {PRIMARY_SERVICES.map((service, index) => {
              const reversed = index % 2 === 1;
              return (
                <article
                  key={service.id}
                  className="bg-white border border-[#E8EFF3] rounded-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div
                      className={`lg:col-span-6 ${
                        reversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <BrandImage
                        src={service.image}
                        alt={service.imageAlt}
                        fallbackLabel={service.shortTitle}
                        className="w-full h-64 sm:h-80 lg:h-full object-cover block"
                      />
                    </div>

                    <div
                      className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
                        reversed ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="space-y-4">
                        <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                          {service.eyebrow}
                        </p>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#17304B] leading-snug">
                          {service.headline}
                        </h3>
                        <p className="text-sm sm:text-base text-[#263845] leading-relaxed">
                          {service.description}
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-2">
                          {service.highlights.map((hl) => (
                            <li
                              key={hl}
                              className="flex items-start gap-2 text-sm text-[#17304B]"
                            >
                              <Check
                                className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-[#E8EFF3] flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => onNavigate(service.route)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{service.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onStartEstimate({
                              service:
                                service.id === 'recurring'
                                  ? 'Recurring Cleaning'
                                  : service.id === 'deep'
                                    ? 'Deep Cleaning'
                                    : 'Move-In Cleaning',
                            })
                          }
                          className="text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                        >
                          Request Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* E. SPECIALTY ADD-ONS */}
      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                Specialty Add-Ons
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
                Make Your Clean Your Own.
              </h2>
              <p className="text-base text-[#263845] leading-relaxed">
                Explore optional extras you can pair with your cleaning visit. Prices shown reflect published add-on rates and remain subject to business confirmation.
              </p>

              <div className="p-4 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] flex items-start gap-3">
                <Info className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-[#263845] leading-relaxed">
                  Selecting add-ons here helps you prepare your estimate inquiry—it does not create a confirmed booking or final quote.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onStartEstimate({ addOnIds: exploredAddOnIds })}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
                >
                  <span>Include Selected in Estimate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('addons')}
                  className="text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  View All Add-On Details
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {SPECIALTY_ADDONS.map((addon) => {
                const isSelected = exploredAddOnIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleExploredAddOn(addon.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAFCFD] border-[#17304B]'
                        : 'bg-white border-[#E8EFF3] hover:border-[#4CA8D8]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#17304B] border-[#17304B] text-white'
                                : 'border-[#E8EFF3] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                          </span>
                          <span className="font-display text-base sm:text-lg font-semibold text-[#17304B]">
                            {addon.title}
                          </span>
                        </div>
                        <p className="text-sm text-[#263845] pl-7.5 leading-relaxed">
                          {addon.detail}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-display text-base sm:text-lg font-bold text-[#17304B] tabular-nums block">
                          {addon.priceLabel}
                        </span>
                        <span className="text-[11px] text-[#263845]/70 block">
                          {addon.quoteType === 'published'
                            ? 'Published rate'
                            : 'Quote required'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* F. MEET KRISTA AND KRIS */}
      <section className="bg-[#17304B] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/15">
                <BrandImage
                  src={IMAGES.craftSupplies}
                  alt="Folded navy and pale aqua microfiber cloths, wooden detail brushes, and glass spray bottle arranged neatly on pale stone"
                  fallbackLabel="Professional Residential Cleaning Care"
                  className="w-full aspect-[4/3] object-cover block"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-wide text-[#DDF5F4]">
                Meet the Owners
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                A Family Business. A Personal Commitment.
              </h2>
              <p className="text-base text-[#E8EFF3] leading-relaxed">
                Extreme Clean Solutions LLC is locally owned and operated by Krista and Kris, the husband-and-wife team dedicated to bringing dependable, detail-oriented residential cleaning to Oklahoma City families.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'Treating every home with personal care',
                  'Maintaining high cleaning standards',
                  'Helping busy local families reclaim time',
                  'Building long-term client relationships',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#FAFCFD]">
                    <Check
                      className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('owners')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#17304B] text-sm font-semibold hover:bg-[#DDF5F4] transition-colors cursor-pointer"
                >
                  <span>Meet Krista &amp; Kris</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-sm font-semibold text-[#DDF5F4] hover:text-white transition-colors cursor-pointer"
                >
                  Direct Owner Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G. HOW THE CLEANING PROCESS WORKS */}
      <section className="bg-[#FAFCFD] border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
              Simple Next Steps
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
              How Getting Started Works.
            </h2>
            <p className="text-base text-[#263845] leading-relaxed">
              Submitting an estimate request starts a personalized review—your cleaning appointment is only scheduled after our team confirms pricing and availability with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#E8EFF3] rounded-2xl p-6 sm:p-8 space-y-4"
              >
                <span className="font-mono text-sm font-medium text-[#4CA8D8] tabular-nums block">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-bold text-[#17304B]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#263845] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H. PROFESSIONAL STANDARDS & I. REPUTATION */}
      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
          {/* Standards */}
          <div className="space-y-10">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                Professional Standards
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
                Clear Policies. Verified Practices.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_STANDARDS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-2.5"
                >
                  <ShieldCheck
                    className="w-5 h-5 text-[#4CA8D8]"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-base font-bold text-[#17304B]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#263845] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent External Reviews Guidance (No invented quotes or ratings) */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4CA8D8]">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Public Reviews &amp; Local Reputation</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#17304B]">
                Verify Customer Feedback Directly on Public Platforms.
              </h3>
              <p className="text-sm sm:text-base text-[#263845] leading-relaxed">
                We never publish unverified testimonials or fabricated ratings. Oklahoma City homeowners can look up Extreme Clean Solutions LLC directly on public review platforms—and speak with Krista or Kris directly before booking.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#E8EFF3] flex items-center justify-between gap-3">
                <div>
                  <span className="block text-sm font-semibold text-[#17304B]">
                    Search “Extreme Clean Solutions LLC Oklahoma City”
                  </span>
                  <span className="block text-xs text-[#263845]/75 mt-0.5">
                    Google Business Profile · Facebook · Nextdoor
                  </span>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-[#4CA8D8] shrink-0"
                  aria-hidden="true"
                />
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3.5 px-5 rounded-lg border border-[#E8EFF3] bg-white text-sm font-semibold text-[#17304B] hover:border-[#4CA8D8] transition-colors cursor-pointer"
              >
                Speak Directly With Krista or Kris
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* J. SERVICE AREAS */}
      <section className="bg-[#FAFCFD] border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                Consistent Metro Coverage Guide
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
                Proudly Cleaning Homes Across the OKC Metro.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('areas')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors shrink-0 cursor-pointer"
            >
              <span>Full Service Area Details</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <ServiceAreaChecker
            compact
            onRequestEstimateForCity={(cityOrZip) => onStartEstimate({ cityOrZip })}
          />
        </div>
      </section>

      {/* K. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[#4CA8D8]">
                Published Policies &amp; Answers
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
                Frequently Asked Questions.
              </h2>
              <p className="text-base text-[#263845]">
                Straightforward answers covering packages, payment arrangements, our 48-hour cancellation policy, and home preparation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('faqs')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors shrink-0 cursor-pointer"
            >
              <span>View All 12 FAQs</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <FaqAccordion limit={6} showCategoryFilter />
        </div>
      </section>

      {/* L. FINAL CTA */}
      <section className="bg-[#DDF5F4]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="bg-white border border-[#E8EFF3] rounded-2xl p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17304B]">
                Your Home Deserves an Extreme Clean.
              </h2>
              <p className="text-base text-[#263845] leading-relaxed">
                Tell us about your space and discover the cleaning service that fits your needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onStartEstimate()}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#17304B] text-white text-sm sm:text-base font-semibold hover:bg-[#263845] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request My Free Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center px-6 py-4 rounded-lg border border-[#E8EFF3] bg-[#FAFCFD] text-[#17304B] text-sm sm:text-base font-semibold hover:border-[#4CA8D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Speak With Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
