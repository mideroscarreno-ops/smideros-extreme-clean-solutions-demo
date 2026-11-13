import { useState, useEffect, FormEvent } from 'react';
import { Check, ArrowLeft, ArrowRight, Info, Phone, Mail, RotateCcw } from 'lucide-react';
import { COMPANY_INFO, SPECIALTY_ADDONS } from '../data/siteData';

export type EstimateServiceType =
  | 'Recurring Cleaning'
  | 'Deep Cleaning'
  | 'Move-In Cleaning'
  | 'Move-Out Cleaning'
  | 'Not Sure Yet';

export type RecurringFrequency = 'Weekly' | 'Biweekly' | 'Monthly';

interface EstimateWizardProps {
  initialService?: EstimateServiceType;
  initialFrequency?: RecurringFrequency;
  initialCityOrZip?: string;
  initialAddOnIds?: string[];
  initialCommercialInquiry?: boolean;
}

export function EstimateWizard({
  initialService = 'Recurring Cleaning',
  initialFrequency = 'Biweekly',
  initialCityOrZip = '',
  initialAddOnIds = [],
  initialCommercialInquiry = false,
}: EstimateWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<EstimateServiceType>(initialService);
  const [frequency, setFrequency] = useState<RecurringFrequency>(initialFrequency);
  const [commercialInquiry, setCommercialInquiry] = useState<boolean>(initialCommercialInquiry);

  const [cityOrZip, setCityOrZip] = useState<string>(initialCityOrZip);
  const [bedrooms, setBedrooms] = useState<string>('3');
  const [bathrooms, setBathrooms] = useState<string>('2');
  const [sqFt, setSqFt] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [timing, setTiming] = useState<string>('');

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(initialAddOnIds);
  const [requestWindowQuote, setRequestWindowQuote] = useState<boolean>(false);
  const [otherAddOnNote, setOtherAddOnNote] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneOrContact, setPhoneOrContact] = useState<string>('');
  const [preferredMethod, setPreferredMethod] = useState<'Phone Call' | 'Text Message' | 'Email'>('Phone Call');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialService) setServiceType(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialCityOrZip) setCityOrZip(initialCityOrZip);
  }, [initialCityOrZip]);

  useEffect(() => {
    if (initialAddOnIds && initialAddOnIds.length > 0) {
      setSelectedAddOns(initialAddOnIds);
    }
  }, [initialAddOnIds]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const validateStep = (targetStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (targetStep === 2) {
      if (!cityOrZip.trim()) {
        newErrors.cityOrZip = 'Please enter your Oklahoma City metro city or ZIP code.';
      }
      if (!bedrooms) {
        newErrors.bedrooms = 'Please select number of bedrooms.';
      }
      if (!bathrooms) {
        newErrors.bathrooms = 'Please select number of bathrooms.';
      }
    }

    if (targetStep === 4) {
      if (!fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!phoneOrContact.trim()) {
        newErrors.phoneOrContact = 'Please provide a phone number or preferred contact detail.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setErrors({});
  };

  const selectedAddOnObjects = SPECIALTY_ADDONS.filter((a) => selectedAddOns.includes(a.id));

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Free Estimate Inquiry — ${serviceType} (${cityOrZip || 'OKC Metro'})`
    );
    const lines = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone / Contact: ${phoneOrContact} (Preferred: ${preferredMethod})`,
      `Service: ${serviceType}${serviceType === 'Recurring Cleaning' ? ` (${frequency})` : ''}`,
      commercialInquiry ? `Note: Also inquiring about commercial cleaning availability.` : '',
      `Location: ${cityOrZip}`,
      `Bedrooms: ${bedrooms} | Bathrooms: ${bathrooms}`,
      sqFt ? `Approx. Sq Ft: ${sqFt}` : '',
      condition ? `Property Condition: ${condition}` : '',
      timing ? `Preferred Timing: ${timing}` : '',
      selectedAddOnObjects.length > 0
        ? `Selected Add-Ons: ${selectedAddOnObjects.map((a) => `${a.title} (${a.priceLabel})`).join(', ')}`
        : '',
      requestWindowQuote ? `Requested info on window-related / custom tasks.` : '',
      otherAddOnNote ? `Additional Add-On Notes: ${otherAddOnNote}` : '',
      additionalInfo ? `Additional Information: ${additionalInfo}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
  };

  const steps = [
    { num: 1, label: 'Cleaning Service' },
    { num: 2, label: 'Property Details' },
    { num: 3, label: 'Add-Ons' },
    { num: 4, label: 'Contact Details' },
  ];

  if (submitted) {
    return (
      <div className="bg-white border border-[#E8EFF3] rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="p-4 rounded-xl bg-[#DDF5F4]/60 border border-[#4CA8D8]/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#17304B] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-[#17304B] space-y-1">
            <p className="font-semibold">Interactive Demonstration Preview</p>
            <p className="text-[#263845]">
              This redesign concept does not connect to a live submission server, so no request has been sent automatically and no appointment is confirmed. To submit this inquiry to Extreme Clean Solutions LLC, email your summary below or call Krista or Kris directly.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-[#17304B]">
            Your Estimate Summary Is Ready
          </h3>
          <p className="text-sm text-[#263845]">
            Extreme Clean Solutions reviews property details and confirms service availability, scope, and pricing directly before scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-[#E8EFF3] text-sm">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-[#263845]/70 block">Requested Service</span>
              <span className="font-semibold text-[#17304B]">
                {serviceType}
                {serviceType === 'Recurring Cleaning' ? ` · ${frequency}` : ''}
              </span>
            </div>
            {commercialInquiry && (
              <div>
                <span className="text-xs font-medium text-[#263845]/70 block">Business Inquiry</span>
                <span className="text-[#17304B]">Checking commercial cleaning availability</span>
              </div>
            )}
            <div>
              <span className="text-xs font-medium text-[#263845]/70 block">Location &amp; Size</span>
              <span className="text-[#17304B] tabular-nums">
                {cityOrZip} · {bedrooms} Bed / {bathrooms} Bath
                {sqFt ? ` · ~${sqFt} sq ft` : ''}
              </span>
            </div>
            {(condition || timing) && (
              <div>
                <span className="text-xs font-medium text-[#263845]/70 block">Condition &amp; Timing</span>
                <span className="text-[#17304B]">
                  {[condition, timing].filter(Boolean).join(' · ')}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium text-[#263845]/70 block">Contact Details</span>
              <span className="font-semibold text-[#17304B] block">{fullName}</span>
              <span className="text-[#263845] block">{email}</span>
              <span className="text-[#263845] block tabular-nums">
                {phoneOrContact} · Prefers {preferredMethod}
              </span>
            </div>
            <div>
              <span className="text-xs font-medium text-[#263845]/70 block">Optional Extras Noted</span>
              {selectedAddOnObjects.length > 0 || requestWindowQuote ? (
                <ul className="text-[#17304B] space-y-1 mt-1">
                  {selectedAddOnObjects.map((a) => (
                    <li key={a.id} className="tabular-nums">
                      {a.title} ({a.priceLabel} published rate, subject to confirmation)
                    </li>
                  ))}
                  {requestWindowQuote && (
                    <li>Information requested for window-related or custom tasks</li>
                  )}
                </ul>
              ) : (
                <span className="text-[#263845]/80">No specialty add-ons selected</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <a
            href={buildMailtoHref()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Open Pre-Filled Email to Extreme Clean</span>
          </a>

          <a
            href={COMPANY_INFO.owners[0].phoneHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-[#E8EFF3] bg-[#FAFCFD] text-[#17304B] text-sm font-semibold hover:bg-[#E8EFF3]/60 transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4 text-[#4CA8D8]" aria-hidden="true" />
            <span>Call Krista {COMPANY_INFO.owners[0].phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-medium text-[#263845] hover:text-[#17304B] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Edit Estimate Details</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E8EFF3] rounded-2xl overflow-hidden">
      {/* Transparent Demonstration Banner */}
      <div className="px-6 sm:px-8 py-3.5 bg-[#FAFCFD] border-b border-[#E8EFF3] flex items-center gap-2.5 text-xs text-[#263845]">
        <Info className="w-4 h-4 text-[#4CA8D8] shrink-0" aria-hidden="true" />
        <span>
          <strong>Demonstration Form:</strong> Submitting prepares your inquiry summary for review—pricing and scheduling are always confirmed directly by Krista or Kris.
        </span>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#E8EFF3]">
        <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label="Estimate Progress">
          {steps.map((item) => {
            const isActive = step === item.num;
            const isDone = step > item.num;
            return (
              <li key={item.num} className="flex items-center gap-2.5">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#17304B] text-white'
                      : isDone
                        ? 'bg-[#DDF5F4] text-[#17304B]'
                        : 'bg-[#E8EFF3] text-[#263845]'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : `0${item.num}`}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium truncate ${
                    isActive ? 'text-[#17304B] font-semibold' : 'text-[#263845]/75'
                  }`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-8" noValidate>
        {/* STEP 1: CLEANING SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#17304B]">
                Step 1 — Select Your Cleaning Service
              </h3>
              <p className="text-sm text-[#263845] mt-1">
                Choose the residential service that best matches your home right now. Required.
              </p>
            </div>

            <fieldset className="space-y-3">
              <legend className="sr-only">Cleaning service options</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  [
                    {
                      value: 'Recurring Cleaning',
                      desc: 'Consistent weekly, biweekly, or monthly residential care.',
                    },
                    {
                      value: 'Deep Cleaning',
                      desc: 'Detailed first-time, seasonal, or overlooked-area cleaning.',
                    },
                    {
                      value: 'Move-In Cleaning',
                      desc: 'Empty home cleaning before you unpack and settle in.',
                    },
                    {
                      value: 'Move-Out Cleaning',
                      desc: 'Empty home clean after moving out (requires working utilities).',
                    },
                    {
                      value: 'Not Sure Yet',
                      desc: 'Tell us about your home and we will help recommend the right fit.',
                    },
                  ] as { value: EstimateServiceType; desc: string }[]
                ).map((option) => {
                  const selected = serviceType === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        selected
                          ? 'border-[#17304B] bg-[#FAFCFD]'
                          : 'border-[#E8EFF3] bg-white hover:border-[#4CA8D8]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={option.value}
                        checked={selected}
                        onChange={() => setServiceType(option.value)}
                        className="mt-1 accent-[#17304B]"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-[#17304B]">
                          {option.value}
                        </span>
                        <span className="block text-xs text-[#263845]/80 mt-0.5 leading-relaxed">
                          {option.desc}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {serviceType === 'Recurring Cleaning' && (
              <div className="p-5 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-3">
                <p className="text-sm font-semibold text-[#17304B]">
                  Preferred Recurring Frequency <span className="font-normal text-[#263845]/75">(Required for recurring)</span>
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Weekly', 'Biweekly', 'Monthly'] as RecurringFrequency[]).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                        frequency === freq
                          ? 'bg-[#17304B] text-white border-[#17304B]'
                          : 'bg-white text-[#17304B] border-[#E8EFF3] hover:border-[#4CA8D8]'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#E8EFF3]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={commercialInquiry}
                  onChange={(e) => setCommercialInquiry(e.target.checked)}
                  className="mt-1 accent-[#17304B]"
                />
                <span className="text-xs sm:text-sm text-[#263845] leading-relaxed">
                  I am a business owner inquiring separately about potential commercial availability (residential cleaning is our primary focus; commercial inquiries are confirmed individually).
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY DETAILS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#17304B]">
                Step 2 — Tell Us About Your Property
              </h3>
              <p className="text-sm text-[#263845] mt-1">
                Required fields help confirm service coverage and scope; optional details speed up your estimate conversation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="estimate-city-zip"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  City or ZIP Code <span className="text-[#4CA8D8]">*</span>
                </label>
                <input
                  id="estimate-city-zip"
                  type="text"
                  value={cityOrZip}
                  onChange={(e) => {
                    setCityOrZip(e.target.value);
                    if (errors.cityOrZip) setErrors((prev) => ({ ...prev, cityOrZip: '' }));
                  }}
                  placeholder="e.g. Oklahoma City, Edmond, or 73013"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45 focus:border-[#4CA8D8]"
                  aria-invalid={Boolean(errors.cityOrZip)}
                />
                {errors.cityOrZip && (
                  <p className="text-xs text-red-700 mt-1.5 font-medium" role="alert">
                    {errors.cityOrZip}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estimate-bedrooms"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Number of Bedrooms <span className="text-[#4CA8D8]">*</span>
                </label>
                <select
                  id="estimate-bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] tabular-nums"
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="estimate-bathrooms"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Number of Bathrooms <span className="text-[#4CA8D8]">*</span>
                </label>
                <select
                  id="estimate-bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] tabular-nums"
                >
                  <option value="1">1 Bathroom</option>
                  <option value="1.5">1.5 Bathrooms</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="2.5">2.5 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="3.5+">3.5+ Bathrooms</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="estimate-sqft"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Approximate Square Footage{' '}
                  <span className="font-normal text-[#263845]/70">(Optional)</span>
                </label>
                <input
                  id="estimate-sqft"
                  type="text"
                  value={sqFt}
                  onChange={(e) => setSqFt(e.target.value)}
                  placeholder="e.g. 2,100 sq ft"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45 tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="estimate-timing"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Preferred Timing{' '}
                  <span className="font-normal text-[#263845]/70">(Optional)</span>
                </label>
                <input
                  id="estimate-timing"
                  type="text"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="e.g. Next week or flexible mornings"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="estimate-condition"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Current Property Condition{' '}
                  <span className="font-normal text-[#263845]/70">(Optional)</span>
                </label>
                <select
                  id="estimate-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B]"
                >
                  <option value="">Select condition (optional)</option>
                  <option value="Lightly lived-in / regularly maintained">
                    Lightly lived-in / regularly maintained
                  </option>
                  <option value="Moderate build-up / ready for thorough detail">
                    Moderate build-up / ready for thorough detail
                  </option>
                  <option value="Needs extra heavy focus in kitchen or baths">
                    Needs extra focus in kitchen or bathrooms
                  </option>
                  <option value="Vacant / empty home for move-in or move-out">
                    Vacant / empty home for move-in or move-out
                  </option>
                </select>
                <p className="text-xs text-[#263845]/75 mt-2">
                  Note: Extreme Clean Solutions does not handle mold, heavy nicotine tar, or biohazard situations. Move-out cleaning requires working utilities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SPECIALTY ADD-ONS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#17304B]">
                Step 3 — Optional Specialty Add-Ons
              </h3>
              <p className="text-sm text-[#263845] mt-1">
                Published add-on prices are shown below and remain subject to business confirmation. Selecting add-ons does not automatically calculate a final total or confirm a booking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIALTY_ADDONS.filter((a) => a.quoteType === 'published').map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-start justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-[#17304B] bg-[#FAFCFD]'
                        : 'border-[#E8EFF3] bg-white hover:border-[#4CA8D8]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAddOn(addon.id)}
                        className="mt-1 accent-[#17304B]"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-[#17304B]">
                          {addon.title}
                        </span>
                        <span className="block text-xs text-[#263845]/80 mt-0.5">
                          {addon.summary}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#17304B] tabular-nums shrink-0">
                      {addon.priceLabel}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="p-5 rounded-xl bg-[#FAFCFD] border border-[#E8EFF3] space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestWindowQuote}
                  onChange={(e) => setRequestWindowQuote(e.target.checked)}
                  className="mt-1 accent-[#17304B]"
                />
                <div>
                  <span className="block text-sm font-semibold text-[#17304B]">
                    Request information about window-related cleaning or custom detailed tasks
                  </span>
                  <span className="block text-xs text-[#263845]/80 mt-0.5">
                    Requires a separate quote once our team reviews your home’s needs.
                  </span>
                </div>
              </label>

              <div>
                <label
                  htmlFor="estimate-addon-notes"
                  className="block text-xs font-semibold text-[#17304B] mb-1.5"
                >
                  Specific add-on notes <span className="font-normal text-[#263845]/70">(Optional)</span>
                </label>
                <input
                  id="estimate-addon-notes"
                  type="text"
                  value={otherAddOnNote}
                  onChange={(e) => setOtherAddOnNote(e.target.value)}
                  placeholder="e.g. Interior windows in living room"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT DETAILS */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#17304B]">
                Step 4 — Your Contact Details
              </h3>
              <p className="text-sm text-[#263845] mt-1">
                We will review the information you share before confirming pricing and scheduling availability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="estimate-fullname"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Full Name <span className="text-[#4CA8D8]">*</span>
                </label>
                <input
                  id="estimate-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-700 mt-1.5 font-medium" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estimate-email"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Email Address <span className="text-[#4CA8D8]">*</span>
                </label>
                <input
                  id="estimate-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="text-xs text-red-700 mt-1.5 font-medium" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estimate-phone"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Phone or Preferred Contact <span className="text-[#4CA8D8]">*</span>
                </label>
                <input
                  id="estimate-phone"
                  type="tel"
                  value={phoneOrContact}
                  onChange={(e) => {
                    setPhoneOrContact(e.target.value);
                    if (errors.phoneOrContact)
                      setErrors((prev) => ({ ...prev, phoneOrContact: '' }));
                  }}
                  placeholder="(405) 555-0199"
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45 tabular-nums"
                  aria-invalid={Boolean(errors.phoneOrContact)}
                />
                {errors.phoneOrContact && (
                  <p className="text-xs text-red-700 mt-1.5 font-medium" role="alert">
                    {errors.phoneOrContact}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <span className="block text-sm font-semibold text-[#17304B] mb-2">
                  Preferred Contact Method
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {(['Phone Call', 'Text Message', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPreferredMethod(method)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                        preferredMethod === method
                          ? 'bg-[#17304B] text-white border-[#17304B]'
                          : 'bg-white text-[#17304B] border-[#E8EFF3] hover:border-[#4CA8D8]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="estimate-additional"
                  className="block text-sm font-semibold text-[#17304B] mb-1.5"
                >
                  Additional Information{' '}
                  <span className="font-normal text-[#263845]/70">(Optional)</span>
                </label>
                <textarea
                  id="estimate-additional"
                  rows={3}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Share helpful details such as pets, entry preferences, or rooms needing priority focus."
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm text-[#17304B] placeholder:text-[#263845]/45"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-6 border-t border-[#E8EFF3] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#E8EFF3] bg-white text-sm font-semibold text-[#17304B] hover:bg-[#FAFCFD] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div className="text-xs text-[#263845]/75">
              Estimate requests are reviewed prior to confirming pricing and availability.
            </div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#17304B] text-white text-sm font-semibold hover:bg-[#263845] transition-colors cursor-pointer"
            >
              <span>Request My Free Cleaning Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
