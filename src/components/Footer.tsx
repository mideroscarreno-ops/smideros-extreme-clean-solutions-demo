import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO, PageRoute, SERVICE_AREAS } from '../data/siteData';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#17304B] text-[#FAFCFD]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-xl font-bold tracking-tight text-white text-left cursor-pointer hover:text-[#DDF5F4] transition-colors"
            >
              {COMPANY_INFO.name}
            </button>
            <p className="text-sm text-[#DDF5F4] font-medium">
              {COMPANY_INFO.tagline}
            </p>
            <p className="text-sm text-[#E8EFF3]/80 leading-relaxed max-w-sm">
              Family-owned residential house cleaning operated by Krista and Kris, serving homes across Oklahoma City and surrounding metro communities.
            </p>
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2.5 text-[#E8EFF3]">
                <MapPin className="w-4 h-4 text-[#4CA8D8] shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              {COMPANY_INFO.owners.map((owner) => (
                <div key={owner.name} className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#4CA8D8] shrink-0" aria-hidden="true" />
                  <a
                    href={owner.phoneHref}
                    className="text-[#E8EFF3] hover:text-white transition-colors tabular-nums"
                  >
                    {owner.name}: {owner.phoneDisplay}
                  </a>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4CA8D8] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-[#E8EFF3] hover:text-white transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Cleaning Services
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8EFF3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('recurring')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Recurring House Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('deep')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Deep Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('move')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Move-In / Move-Out Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('addons')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Specialty Add-Ons
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('estimate')}
                  className="text-[#DDF5F4] font-medium hover:text-white transition-colors text-left cursor-pointer"
                >
                  Free Estimate Request
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8EFF3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('owners')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Meet the Owners
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('approach')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Our Cleaning Approach
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('areas')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  FAQs &amp; Policies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas Summary Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              OKC Metro Communities
            </h3>
            <p className="text-xs text-[#E8EFF3]/75 leading-relaxed">
              {SERVICE_AREAS.map((c) => c.name).join(' · ')}
            </p>
            <p className="text-xs text-[#E8EFF3]/70 leading-relaxed pt-1">
              Address availability is confirmed individually upon inquiry. Business owners interested in commercial availability may inquire via Estimate or Contact.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Agency Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#E8EFF3]/75">
          <p>
            {COMPANY_INFO.name} · {COMPANY_INFO.location}
          </p>
          <p className="text-[#DDF5F4]/90">
            {COMPANY_INFO.agencyDisclosure}
          </p>
        </div>
      </div>
    </footer>
  );
}
