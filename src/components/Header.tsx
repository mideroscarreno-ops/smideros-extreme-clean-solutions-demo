import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO, PageRoute } from '../data/siteData';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'services' | 'about' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGo = (route: PageRoute) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    onNavigate(route);
  };

  const isServiceRoute = ['recurring', 'deep', 'move', 'addons'].includes(currentRoute);
  const isAboutRoute = ['owners', 'approach'].includes(currentRoute);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFCFD]/95 backdrop-blur-md border-b border-[#E8EFF3]">
      <div
        ref={navRef}
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-6 lg:gap-8"
      >
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleGo('home');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-[#17304B] whitespace-nowrap shrink-0 hover:text-[#4CA8D8] transition-colors"
        >
          {COMPANY_INFO.shortName}
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#263845]"
        >
          <button
            type="button"
            onClick={() => handleGo('home')}
            className={`py-2 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              currentRoute === 'home'
                ? 'border-[#4CA8D8] text-[#17304B]'
                : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
            }`}
          >
            Home
          </button>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'services'}
              aria-haspopup="true"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'services' ? null : 'services'))
              }
              className={`py-2 inline-flex items-center gap-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                isServiceRoute
                  ? 'border-[#4CA8D8] text-[#17304B]'
                  : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'services' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openDropdown === 'services' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-2 w-64 bg-white border border-[#E8EFF3] rounded-xl shadow-lg py-2 z-50"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('recurring')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Recurring House Cleaning</span>
                  <span className="block text-xs text-[#263845]/75">
                    Weekly, biweekly &amp; monthly upkeep
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('deep')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Deep Cleaning</span>
                  <span className="block text-xs text-[#263845]/75">
                    First-time &amp; detailed seasonal care
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('move')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Move-In / Move-Out Cleaning</span>
                  <span className="block text-xs text-[#263845]/75">
                    Empty home preparation &amp; checklists
                  </span>
                </button>
                <div className="my-1 border-t border-[#E8EFF3]" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('addons')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Specialty Add-Ons</span>
                  <span className="block text-xs text-[#263845]/75">
                    Oven, refrigerator &amp; garage options
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'about'}
              aria-haspopup="true"
              onClick={() => setOpenDropdown((prev) => (prev === 'about' ? null : 'about'))}
              className={`py-2 inline-flex items-center gap-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                isAboutRoute
                  ? 'border-[#4CA8D8] text-[#17304B]'
                  : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
              }`}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'about' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {openDropdown === 'about' && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-2 w-60 bg-white border border-[#E8EFF3] rounded-xl shadow-lg py-2 z-50"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('owners')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Meet the Owners</span>
                  <span className="block text-xs text-[#263845]/75">
                    Krista &amp; Kris — family-owned care
                  </span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleGo('approach')}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#17304B] hover:bg-[#FAFCFD] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span className="block font-semibold">Our Cleaning Approach</span>
                  <span className="block text-xs text-[#263845]/75">
                    Checklists, supplies &amp; standards
                  </span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleGo('areas')}
            className={`py-2 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              currentRoute === 'areas'
                ? 'border-[#4CA8D8] text-[#17304B]'
                : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
            }`}
          >
            Service Areas
          </button>

          <button
            type="button"
            onClick={() => handleGo('faqs')}
            className={`py-2 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              currentRoute === 'faqs'
                ? 'border-[#4CA8D8] text-[#17304B]'
                : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
            }`}
          >
            FAQs
          </button>

          <button
            type="button"
            onClick={() => handleGo('contact')}
            className={`py-2 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              currentRoute === 'contact'
                ? 'border-[#4CA8D8] text-[#17304B]'
                : 'border-transparent hover:text-[#17304B] hover:border-[#E8EFF3]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleGo('estimate')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#17304B] hover:bg-[#263845] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            Get a Free Estimate
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E8EFF3] bg-white text-[#17304B] hover:bg-[#E8EFF3]/50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8EFF3] bg-[#FAFCFD] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="px-4 py-5 space-y-5">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleGo('home')}
                className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
              >
                Home
              </button>
            </div>

            <div>
              <p className="px-3 text-xs font-semibold tracking-wide text-[#263845]/70 mb-1">
                Cleaning Services
              </p>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleGo('recurring')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Recurring House Cleaning
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('deep')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Deep Cleaning
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('move')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Move-In / Move-Out Cleaning
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('addons')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Specialty Add-Ons
                </button>
              </div>
            </div>

            <div>
              <p className="px-3 text-xs font-semibold tracking-wide text-[#263845]/70 mb-1">
                Company &amp; Planning
              </p>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleGo('owners')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Meet the Owners
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('approach')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Our Cleaning Approach
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('areas')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Service Areas
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('faqs')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  FAQs &amp; Policies
                </button>
                <button
                  type="button"
                  onClick={() => handleGo('contact')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17304B] hover:bg-[#E8EFF3]/60 cursor-pointer"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8EFF3] space-y-3">
              <button
                type="button"
                onClick={() => handleGo('estimate')}
                className="w-full py-3.5 px-5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
              >
                Get a Free Estimate
              </button>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {COMPANY_INFO.owners.map((owner) => (
                  <a
                    key={owner.name}
                    href={owner.phoneHref}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-[#E8EFF3] text-sm font-medium text-[#17304B]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#4CA8D8]" aria-hidden="true" />
                      Call {owner.name}
                    </span>
                    <span className="tabular-nums text-[#263845]">{owner.phoneDisplay}</span>
                  </a>
                ))}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#E8EFF3] text-sm font-medium text-[#17304B] truncate"
                >
                  <Mail className="w-4 h-4 text-[#4CA8D8] shrink-0" aria-hidden="true" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
