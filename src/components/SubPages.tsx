import { ArrowRight, Check, Info, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import {
  COMPANY_INFO,
  IMAGES,
  PRIMARY_SERVICES,
  PROCESS_STEPS,
  SPECIALTY_ADDONS,
  TRUST_STANDARDS,
  PageRoute,
} from '../data/siteData';
import { BrandImage } from './BrandImage';
import { EstimateServiceType, EstimateWizard, RecurringFrequency } from './EstimateWizard';
import { ServiceAreaChecker } from './ServiceAreaChecker';
import { FaqAccordion } from './FaqAccordion';

interface SubPageProps {
  onNavigate: (route: PageRoute) => void;
  onStartEstimate: (options?: {
    service?: EstimateServiceType;
    frequency?: RecurringFrequency;
    cityOrZip?: string;
    addOnIds?: string[];
    commercialInquiry?: boolean;
  }) => void;
}

function PageHero({
  eyebrow,
  title,
  subtitle,
  onNavigate,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  onNavigate: (route: PageRoute) => void;
}) {
  return (
    <section className="bg-[#FAFCFD] border-b border-[#E8EFF3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#263845]/75">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#17304B] cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#17304B] font-medium">{eyebrow}</span>
        </div>
        <h1 className="font-display font-bold tracking-tight text-[#17304B] text-[clamp(2rem,3.6vw,3rem)] leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-[#263845] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

/* 2, 3, 4: PRIMARY SERVICE DETAIL PAGE */
export function ServiceDetailPage({
  serviceId,
  onNavigate,
  onStartEstimate,
}: SubPageProps & { serviceId: 'recurring' | 'deep' | 'move' }) {
  const service = PRIMARY_SERVICES.find((s) => s.id === serviceId) ?? PRIMARY_SERVICES[0];

  const estimateServiceMap: Record<'recurring' | 'deep' | 'move', EstimateServiceType> = {
    recurring: 'Recurring Cleaning',
    deep: 'Deep Cleaning',
    move: 'Move-Out Cleaning',
  };

  return (
    <div>
      <PageHero
        eyebrow={service.shortTitle}
        title={service.headline}
        subtitle={service.description}
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E8EFF3]">
                <BrandImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackLabel={service.shortTitle}
                  priority
                  className="w-full aspect-[4/3] object-cover block"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17304B]">
                What This Service Covers
              </h2>
              <p className="text-base text-[#263845] leading-relaxed">{service.summary}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#17304B]">
                    <Check
                      className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onStartEstimate({ service: estimateServiceMap[service.id] })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
                >
                  <span>Request a Free Estimate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('addons')}
                  className="inline-flex items-center px-5 py-3.5 rounded-lg border border-[#E8EFF3] bg-[#FAFCFD] text-sm font-semibold text-[#17304B] hover:border-[#4CA8D8] transition-colors cursor-pointer"
                >
                  Explore Specialty Add-Ons
                </button>
              </div>
            </div>
          </div>

          {/* Checklist Breakdown */}
          <div className="space-y-6 pt-6 border-t border-[#E8EFF3]">
            <h2 className="font-display text-2xl font-bold text-[#17304B]">
              Room-by-Room Checklist Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.checklistGroups.map((group) => (
                <div
                  key={group.room}
                  className="p-6 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4"
                >
                  <h3 className="font-display text-lg font-bold text-[#17304B]">
                    {group.room}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2.5 text-sm text-[#263845]">
                        <Check
                          className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Service Policy Notes */}
          <div className="p-6 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-3">
            <h3 className="font-display text-base font-bold text-[#17304B]">
              Important Service Policies
            </h3>
            <ul className="space-y-2">
              {service.notes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-[#263845]">
                  <Info className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 5: SPECIALTY ADD-ONS PAGE */
export function AddOnsPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Specialty Add-Ons"
        title="Make Your Clean Your Own."
        subtitle="Optional cleaning extras that can be paired with your residential appointment. Published add-on prices are shown clearly below and remain subject to business confirmation."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPECIALTY_ADDONS.map((addon) => (
              <div
                key={addon.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl font-bold text-[#17304B]">
                      {addon.title}
                    </h2>
                    <span className="font-display text-xl font-bold text-[#17304B] tabular-nums shrink-0">
                      {addon.priceLabel}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#4CA8D8]">
                    {addon.quoteType === 'published'
                      ? 'Published add-on rate · Subject to business confirmation'
                      : 'Evaluated individually · Separate quote required'}
                  </p>
                  <p className="text-sm sm:text-base text-[#263845] leading-relaxed">
                    {addon.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EFF3]">
                  <button
                    type="button"
                    onClick={() =>
                      onStartEstimate({
                        addOnIds: addon.quoteType === 'published' ? [addon.id] : [],
                      })
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                  >
                    <span>Request Estimate With This Option</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-[#DDF5F4]/50 border border-[#4CA8D8]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-display text-base font-bold text-[#17304B]">
                Planning a Custom Scope or Window Task?
              </p>
              <p className="text-sm text-[#263845]">
                Selecting add-ons helps prepare your inquiry—Krista or Kris will confirm final pricing and time allocation before scheduling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartEstimate()}
              className="px-6 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Start Free Estimate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 6: MEET THE OWNERS PAGE */
export function MeetOwnersPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Meet the Owners"
        title="A Family Business. A Personal Commitment."
        subtitle="Extreme Clean Solutions LLC is locally owned and operated in Oklahoma City by Krista and Kris—a husband-and-wife team focused on attentive home care and honest communication."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E8EFF3]">
                <BrandImage
                  src={IMAGES.craftSupplies}
                  alt="Professional residential cleaning supplies prepared neatly for Oklahoma City homes"
                  fallbackLabel="Family-Owned Residential Care"
                  priority
                  className="w-full aspect-[4/3] object-cover block"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17304B]">
                Personal Accountability in Every Home We Clean.
              </h2>
              <p className="text-base text-[#263845] leading-relaxed">
                When you reach out to Extreme Clean Solutions, you connect directly with Krista and Kris. We believe welcoming someone into your home requires clear expectations, dependable checklists, and genuine care for your family’s space.
              </p>
              <ul className="space-y-3 pt-1">
                {[
                  'Treating every customer’s home with respect and care',
                  'Maintaining consistent cleaning standards across recurring and one-time visits',
                  'Supporting busy local families across the Oklahoma City metro',
                  'Building long-term relationships grounded in honest communication',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-[#17304B]">
                    <Check
                      className="w-4 h-4 text-[#4CA8D8] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Owner Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {COMPANY_INFO.owners.map((owner) => (
              <div
                key={owner.name}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4"
              >
                <div>
                  <span className="text-xs font-semibold text-[#4CA8D8]">{owner.role}</span>
                  <h3 className="font-display text-2xl font-bold text-[#17304B] mt-1">
                    {owner.name}
                  </h3>
                </div>
                <p className="text-sm text-[#263845]">
                  Call or reach out directly to discuss your home’s cleaning checklist, service area availability, or estimate request.
                </p>
                <a
                  href={owner.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{owner.phoneDisplay}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onStartEstimate()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
            >
              <span>Request a Free Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('approach')}
              className="text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
            >
              Explore Our Cleaning Approach
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 7: OUR CLEANING APPROACH PAGE */
export function ApproachPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Our Cleaning Approach"
        title="Detailed Checklists, Prepared Teams, Honest Policies."
        subtitle="We focus on consistent execution, clear scheduling expectations, and bringing our own professional supplies and equipment to every Oklahoma City home."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_STANDARDS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-3"
              >
                <ShieldCheck className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
                <h2 className="font-display text-lg font-bold text-[#17304B]">
                  {item.title}
                </h2>
                <p className="text-sm text-[#263845] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#17304B]">
              Our Three-Step Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="p-6 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-3"
                >
                  <span className="font-mono text-sm font-medium text-[#4CA8D8] tabular-nums block">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#17304B]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#263845] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
            <h2 className="font-display text-xl font-bold text-[#17304B]">
              Scope &amp; Safety Boundaries
            </h2>
            <p className="text-sm sm:text-base text-[#263845] leading-relaxed">
              For the safety of our team and clarity for homeowners, Extreme Clean Solutions does not handle mold, heavy nicotine tar, or biohazard situations. Move-out cleanings require working utilities (electricity and running water). Cancellations made less than 48 hours in advance are charged in full.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onStartEstimate()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
              >
                <span>Request My Free Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 8: SERVICE AREAS PAGE */
export function ServiceAreasPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Service Areas"
        title="Proudly Cleaning Homes Across the OKC Metro."
        subtitle="Explore our Oklahoma City metro service footprint and check whether your city or ZIP code falls within our regular coverage area. Every address is confirmed individually."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ServiceAreaChecker
            onRequestEstimateForCity={(cityOrZip) => onStartEstimate({ cityOrZip })}
          />
        </div>
      </section>
    </div>
  );
}

/* 9: FAQS PAGE */
export function FaqsPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Published Policies & Cleaning Answers."
        subtitle="Everything you need to know about our packages, supplies, payment arrangements, 48-hour cancellation policy, and home preparation."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
          <FaqAccordion showCategoryFilter />

          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display text-lg font-bold text-[#17304B]">
                Have a Specific Question About Your Home?
              </h2>
              <p className="text-sm text-[#263845]">
                Reach out to Krista or Kris directly, or share your property details in our free estimate request.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onStartEstimate()}
                className="px-5 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
              >
                Free Estimate
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 rounded-lg border border-[#E8EFF3] bg-white text-[#17304B] text-sm font-semibold hover:border-[#4CA8D8] transition-colors cursor-pointer"
              >
                Contact Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 10: FREE ESTIMATE PAGE */
export function EstimatePage({
  onNavigate,
  prefill,
}: {
  onNavigate: (route: PageRoute) => void;
  prefill: {
    service?: EstimateServiceType;
    frequency?: RecurringFrequency;
    cityOrZip?: string;
    addOnIds?: string[];
    commercialInquiry?: boolean;
  };
}) {
  return (
    <div>
      <PageHero
        eyebrow="Free Estimate"
        title="Request Your Free Residential Cleaning Estimate."
        subtitle="Share your preferred cleaning service, property size, and optional extras. Extreme Clean Solutions reviews every inquiry before confirming pricing and scheduling availability."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
          <EstimateWizard
            initialService={prefill.service}
            initialFrequency={prefill.frequency}
            initialCityOrZip={prefill.cityOrZip}
            initialAddOnIds={prefill.addOnIds}
            initialCommercialInquiry={prefill.commercialInquiry}
          />
        </div>
      </section>
    </div>
  );
}

/* 11: CONTACT PAGE */
export function ContactPage({ onNavigate, onStartEstimate }: SubPageProps) {
  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="Speak Directly With Krista & Kris."
        subtitle="Have questions about recurring schedules, move-out readiness, service-area availability, or a free estimate? Call or email our family-owned team in Oklahoma City."
        onNavigate={onNavigate}
      />

      <section className="bg-white border-b border-[#E8EFF3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Krista */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EFF3] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4CA8D8]">Co-Owner</p>
                <h2 className="font-display text-xl font-bold text-[#17304B] mt-1">
                  Call Krista
                </h2>
              </div>
              <p className="text-sm text-[#263845] leading-relaxed">
                Reach Krista directly by phone for residential estimates, scheduling questions, or address verification.
              </p>
              <a
                href={COMPANY_INFO.owners[0].phoneHref}
                className="inline-flex items-center gap-2 text-base font-bold text-[#17304B] hover:text-[#4CA8D8] transition-colors tabular-nums"
              >
                <span>{COMPANY_INFO.owners[0].phoneDisplay}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Kris */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EFF3] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4CA8D8]">Co-Owner</p>
                <h2 className="font-display text-xl font-bold text-[#17304B] mt-1">
                  Call Kris
                </h2>
              </div>
              <p className="text-sm text-[#263845] leading-relaxed">
                Speak with Kris directly regarding deep cleans, move-in/move-out timing, or specialty add-on options.
              </p>
              <a
                href={COMPANY_INFO.owners[1].phoneHref}
                className="inline-flex items-center gap-2 text-base font-bold text-[#17304B] hover:text-[#4CA8D8] transition-colors tabular-nums"
              >
                <span>{COMPANY_INFO.owners[1].phoneDisplay}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Email */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8EFF3] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4CA8D8]">Direct Email</p>
                <h2 className="font-display text-xl font-bold text-[#17304B] mt-1">
                  Email Our Team
                </h2>
              </div>
              <p className="text-sm text-[#263845] leading-relaxed">
                Send property details, city/ZIP code, and preferred cleaning package directly via email.
              </p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#17304B] hover:text-[#4CA8D8] transition-colors break-all"
              >
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
              <div className="flex items-center gap-2.5 text-[#17304B]">
                <MapPin className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold">
                  {COMPANY_INFO.name} — {COMPANY_INFO.location}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#263845] leading-relaxed">
                Serving residential neighborhoods across Oklahoma City, Edmond, Moore, Mustang, Yukon, Bethany, Norman, Piedmont, Nichols Hills, Warr Acres, and The Village. Please include your city or ZIP code when reaching out so we can confirm availability for your address.
              </p>
              <div className="pt-2 border-t border-[#E8EFF3] space-y-2">
                <p className="text-sm font-semibold text-[#17304B]">
                  Business Owners &amp; Commercial Inquiries
                </p>
                <p className="text-sm text-[#263845] leading-relaxed">
                  While residential house cleaning is our primary focus, business owners wishing to inquire about commercial cleaning availability may contact Krista or Kris directly or check the business inquiry option on our estimate form.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#17304B] text-white space-y-5">
              <h2 className="font-display text-2xl font-bold text-white">
                Prefer to Share Your Home Details Online?
              </h2>
              <p className="text-sm text-[#E8EFF3] leading-relaxed">
                Use our 4-step estimate planner to organize your service type, bedroom/bathroom count, and optional add-ons in one place.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onStartEstimate()}
                  className="w-full py-3.5 px-5 rounded-lg bg-white text-[#17304B] text-sm font-semibold hover:bg-[#DDF5F4] transition-colors cursor-pointer"
                >
                  Open Free Estimate Planner
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onStartEstimate({
                      service: 'Not Sure Yet',
                      commercialInquiry: true,
                    })
                  }
                  className="w-full py-3 px-5 rounded-lg border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Commercial Availability Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
