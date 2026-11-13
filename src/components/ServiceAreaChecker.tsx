import { useState, FormEvent } from 'react';
import { MapPin, Search, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/siteData';

interface ServiceAreaCheckerProps {
  onRequestEstimateForCity: (cityOrZip: string) => void;
  compact?: boolean;
}

export function ServiceAreaChecker({
  onRequestEstimateForCity,
  compact = false,
}: ServiceAreaCheckerProps) {
  const [query, setQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    status: 'matched' | 'verify';
    title: string;
    detail: string;
    value: string;
  } | null>(null);

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setLookupResult(null);
      return;
    }

    const lower = trimmed.toLowerCase();
    const matchedCity = SERVICE_AREAS.find(
      (city) =>
        city.name.toLowerCase() === lower ||
        city.name.toLowerCase().includes(lower) ||
        city.zipPrefixes.some((prefix) => trimmed.startsWith(prefix))
    );

    if (matchedCity) {
      setLookupResult({
        status: 'matched',
        title: `${matchedCity.name} is within our listed OKC metro communities.`,
        detail: `${matchedCity.note} Every address is confirmed individually before scheduling.`,
        value: trimmed,
      });
    } else {
      setLookupResult({
        status: 'verify',
        title: `Please confirm availability for "${trimmed}" with our team.`,
        detail:
          'Coverage outside or near the edges of our core city list depends on routing and schedule availability. Reach out to Krista or Kris to check your exact address.',
        value: trimmed,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Lookup & Explanation */}
        <div className="lg:col-span-5 space-y-5">
          <form onSubmit={handleCheck} className="space-y-3">
            <label
              htmlFor="service-area-input"
              className="block text-sm font-semibold text-[#17304B]"
            >
              Check Your City or ZIP Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-[#263845]/50 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="service-area-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Edmond, Mustang, or 73120"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Check Area
              </button>
            </div>
          </form>

          {lookupResult && (
            <div className="p-5 rounded-xl bg-white border border-[#E8EFF3] space-y-3">
              <p className="text-sm font-semibold text-[#17304B]">{lookupResult.title}</p>
              <p className="text-sm text-[#263845] leading-relaxed">{lookupResult.detail}</p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onRequestEstimateForCity(lookupResult.value)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17304B] hover:text-[#4CA8D8] transition-colors cursor-pointer"
                >
                  <span>Start Estimate for {lookupResult.value}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <span aria-hidden="true" className="text-[#E8EFF3]">
                  |
                </span>
                <a
                  href={COMPANY_INFO.owners[0].phoneHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#263845] hover:text-[#17304B] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4CA8D8]" aria-hidden="true" />
                  <span>Call {COMPANY_INFO.owners[0].phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}

          <div className="p-5 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-2">
            <p className="text-sm font-semibold text-[#17304B]">
              How Coverage Confirmation Works
            </p>
            <p className="text-sm text-[#263845] leading-relaxed">
              Listing a community indicates our general Oklahoma City metro footprint—not automatic coverage for every address. Submit your city or ZIP code with an estimate inquiry so Krista or Kris can confirm scheduling availability for your street.
            </p>
          </div>
        </div>

        {/* Right: Consistent 11-City Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SERVICE_AREAS.map((city) => (
              <button
                key={city.name}
                type="button"
                onClick={() => {
                  setQuery(city.name);
                  setLookupResult({
                    status: 'matched',
                    title: `${city.name} is within our listed OKC metro communities.`,
                    detail: `${city.note} Every address is confirmed individually before scheduling.`,
                    value: city.name,
                  });
                }}
                className="group text-left p-4 rounded-xl bg-white border border-[#E8EFF3] hover:border-[#4CA8D8] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-semibold text-[#17304B] group-hover:text-[#4CA8D8] transition-colors">
                    {city.name}
                  </span>
                  <MapPin
                    className="w-4 h-4 text-[#4CA8D8] shrink-0"
                    aria-hidden="true"
                  />
                </div>
                {!compact && (
                  <p className="text-xs text-[#263845]/75 mt-1.5 leading-relaxed">
                    {city.note}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
