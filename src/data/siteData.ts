export type PageRoute =
  | 'home'
  | 'recurring'
  | 'deep'
  | 'move'
  | 'addons'
  | 'owners'
  | 'approach'
  | 'areas'
  | 'faqs'
  | 'estimate'
  | 'contact';

export const IMAGES = {
  heroLivingRoom: '/images/hero-okc-living-room.webp',
  recurringKitchen: '/images/service-recurring-kitchen.webp',
  deepBathroom: '/images/service-deep-bathroom.webp',
  moveEmptyHome: '/images/service-move-empty-home.webp',
  craftSupplies: '/images/craft-cleaning-supplies.webp',
};

export const COMPANY_INFO = {
  name: 'Extreme Clean Solutions LLC',
  shortName: 'Extreme Clean Solutions',
  tagline: 'A Deeper Clean. A Better Feeling.',
  location: 'Oklahoma City, Oklahoma',
  email: 'extremecleanhouses@hotmail.com',
  owners: [
    {
      name: 'Krista',
      role: 'Co-Owner',
      phoneDisplay: '(405) 818-1215',
      phoneHref: 'tel:+14058181215',
    },
    {
      name: 'Kris',
      role: 'Co-Owner',
      phoneDisplay: '(405) 818-1149',
      phoneHref: 'tel:+14058181149',
    },
  ],
  agencyDisclosure: 'Independent website redesign concept by S.Mideros Agency.',
};

export interface ServiceAreaCity {
  name: string;
  note: string;
  zipPrefixes: string[];
}

export const SERVICE_AREAS: ServiceAreaCity[] = [
  {
    name: 'Oklahoma City',
    note: 'Primary metro service area; confirm exact neighborhood availability.',
    zipPrefixes: ['731'],
  },
  {
    name: 'Edmond',
    note: 'North metro coverage subject to address verification.',
    zipPrefixes: ['73003', '73012', '73013', '73025', '73034'],
  },
  {
    name: 'Moore',
    note: 'South metro coverage subject to address verification.',
    zipPrefixes: ['73160', '73165', '73170'],
  },
  {
    name: 'Mustang',
    note: 'Southwest metro coverage subject to address verification.',
    zipPrefixes: ['73064'],
  },
  {
    name: 'Yukon',
    note: 'West metro coverage subject to address verification.',
    zipPrefixes: ['73085', '73099'],
  },
  {
    name: 'Bethany',
    note: 'Northwest metro coverage subject to address verification.',
    zipPrefixes: ['73008'],
  },
  {
    name: 'Norman',
    note: 'South corridor coverage subject to address verification.',
    zipPrefixes: ['73019', '73026', '73069', '73071', '73072'],
  },
  {
    name: 'Piedmont',
    note: 'Northwest corridor coverage subject to address verification.',
    zipPrefixes: ['73078'],
  },
  {
    name: 'Nichols Hills',
    note: 'Central OKC enclave coverage subject to address verification.',
    zipPrefixes: ['73116', '73120'],
  },
  {
    name: 'Warr Acres',
    note: 'Northwest OKC metro coverage subject to address verification.',
    zipPrefixes: ['73122', '73132'],
  },
  {
    name: 'The Village',
    note: 'North-central OKC metro coverage subject to address verification.',
    zipPrefixes: ['73120'],
  },
];

export interface AddOnItem {
  id: string;
  title: string;
  priceLabel: string;
  numericPrice?: number;
  summary: string;
  detail: string;
  quoteType: 'published' | 'custom';
}

export const SPECIALTY_ADDONS: AddOnItem[] = [
  {
    id: 'oven',
    title: 'Oven Cleaning',
    priceLabel: '$50',
    numericPrice: 50,
    summary: 'Interior oven degreasing and rack detailing.',
    detail:
      'Published add-on rate of $50, subject to business confirmation based on oven condition and scheduling.',
    quoteType: 'published',
  },
  {
    id: 'refrigerator',
    title: 'Refrigerator Cleaning & Sanitation',
    priceLabel: '$80',
    numericPrice: 80,
    summary: 'Interior shelf, drawer, and gasket cleaning and sanitation.',
    detail:
      'Published add-on rate of $80, subject to business confirmation. Please clear perishable items prior to service if requested.',
    quoteType: 'published',
  },
  {
    id: 'garage-single',
    title: 'Empty Garage Sweep (Single-Car)',
    priceLabel: '$50',
    numericPrice: 50,
    summary: 'Thorough sweep and debris removal for an empty single-car garage.',
    detail:
      'Published add-on rate of $50 for empty single-car garages, subject to business confirmation.',
    quoteType: 'published',
  },
  {
    id: 'garage-double',
    title: 'Empty Garage Sweep (Double-Car)',
    priceLabel: '$100',
    numericPrice: 100,
    summary: 'Thorough sweep and debris removal for an empty double-car garage.',
    detail:
      'Published add-on rate of $100 for empty double-car garages, subject to business confirmation.',
    quoteType: 'published',
  },
  {
    id: 'windows-custom',
    title: 'Window-Related & Custom Detailed Tasks',
    priceLabel: 'Separate Quote',
    summary: 'Window detailing and additional room-specific tasks.',
    detail:
      'Window-related cleaning and specialized detail work are evaluated individually and require a separate quote after discussing your home.',
    quoteType: 'custom',
  },
];

export interface ServicePackageDetail {
  id: 'recurring' | 'deep' | 'move';
  route: PageRoute;
  eyebrow: string;
  headline: string;
  shortTitle: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  highlights: string[];
  checklistGroups: {
    room: string;
    tasks: string[];
  }[];
  notes: string[];
}

export const PRIMARY_SERVICES: ServicePackageDetail[] = [
  {
    id: 'recurring',
    route: 'recurring',
    eyebrow: 'Recurring House Cleaning',
    headline: 'A Beautifully Clean Home, Week After Week.',
    shortTitle: 'Recurring House Cleaning',
    summary:
      'Weekly, biweekly, or monthly residential upkeep tailored around consistent checklists and your household rhythm.',
    description:
      'Keep kitchens, bathrooms, living spaces, and floors consistently fresh with scheduled weekly, biweekly, or monthly visits from a dependable team using professional supplies.',
    image: IMAGES.recurringKitchen,
    imageAlt:
      'Bright residential kitchen with gleaming white quartz countertops, polished chrome faucet, and neatly folded linen towel',
    ctaLabel: 'Explore Recurring Cleaning',
    highlights: [
      'Weekly cleaning schedules',
      'Biweekly cleaning schedules',
      'Monthly cleaning schedules',
      'Kitchen and bathroom upkeep',
      'Dusting and surface cleaning',
      'Thorough floor care',
    ],
    checklistGroups: [
      {
        room: 'Kitchen Upkeep',
        tasks: [
          'Wipe and sanitize countertops and backsplash surfaces',
          'Clean sink basin, faucet fixtures, and exterior appliance fronts',
          'Wipe stovetop surface and microwave interior/exterior',
          'Sweep and mop kitchen flooring',
        ],
      },
      {
        room: 'Bathrooms',
        tasks: [
          'Clean and sanitize sinks, vanity tops, and mirrors',
          'Scrub toilets, tubs, and shower surrounds',
          'Polish chrome and bathroom hardware',
          'Sweep and mop bathroom floors',
        ],
      },
      {
        room: 'Living Areas & Bedrooms',
        tasks: [
          'Dust accessible surfaces, sills, and decorative ledges',
          'Wipe high-touch switches and door frames as scheduled',
          'Vacuum carpets, rugs, and upholstered edges',
          'Care for hard-surface floors throughout common areas',
        ],
      },
    ],
    notes: [
      'Recurring customers require a valid card on file.',
      'Cancellations made less than 48 hours in advance are charged in full.',
      'We bring our own cleaning supplies and equipment.',
    ],
  },
  {
    id: 'deep',
    route: 'deep',
    eyebrow: 'Deep Cleaning',
    headline: 'Every Corner Deserves Attention.',
    shortTitle: 'Deep Cleaning',
    summary:
      'Detailed top-to-bottom cleaning ideal for first-time customers, seasonal resets, and homes needing extra care.',
    description:
      'Designed to tackle built-up dust, residue, and overlooked corners before transitioning to recurring visits or whenever your home needs an intensive refresh.',
    image: IMAGES.deepBathroom,
    imageAlt:
      'Spotless primary bathroom featuring gleaming porcelain subway tile, frameless glass shower, and folded white towels',
    ctaLabel: 'Explore Deep Cleaning',
    highlights: [
      'First-time residential customers',
      'Seasonal home refreshes',
      'Homes needing extra attention',
      'Built-up dirt and overlooked areas',
    ],
    checklistGroups: [
      {
        room: 'Detailed Surface & Trim Work',
        tasks: [
          'Detailed attention to baseboards, trim, and window sills',
          'Thorough dusting of vents, ceiling fans within reach, and blinds',
          'Spot-checking doors, switch plates, and cabinet exteriors',
        ],
      },
      {
        room: 'Kitchen & Bath Detail',
        tasks: [
          'Extra focus on kitchen grease build-up around range and hood exteriors',
          'Intensive scrubbing of tile, grout surfaces, and shower glass',
          'Descaling and polishing around faucets and tub fixtures',
        ],
      },
      {
        room: 'Floors & Overlooked Spaces',
        tasks: [
          'Thorough edge vacuuming along baseboards and corners',
          'Detailed hard-floor mopping across rooms and hallways',
          'Preparation for optional recurring maintenance plans',
        ],
      },
    ],
    notes: [
      'One-time customer payment arrangements are made during scheduling.',
      'Cancellations made less than 48 hours in advance are charged in full.',
      'Extreme Clean Solutions does not handle mold, heavy nicotine tar, or biohazard situations.',
    ],
  },
  {
    id: 'move',
    route: 'move',
    eyebrow: 'Move-In / Move-Out Cleaning',
    headline: 'A Fresh Start for Your Next Chapter.',
    shortTitle: 'Move-In / Move-Out Cleaning',
    summary:
      'Detailed cleaning for empty homes before arrival or after move-out so every room feels ready for what comes next.',
    description:
      'Whether preparing a newly purchased Oklahoma home for move-in or leaving a residence clean after packing out, our detailed checklist covers empty rooms, cabinets, fixtures, and floors.',
    image: IMAGES.moveEmptyHome,
    imageAlt:
      'Freshly cleaned empty living room with sunlit oak hardwood floors, crisp white baseboards, and bright neighborhood windows',
    ctaLabel: 'Explore Moving Cleaning',
    highlights: [
      'Empty homes before move-in',
      'Empty homes after move-out',
      'Interior cabinets, drawers & closets',
      'Baseboards, fixtures & full floor care',
    ],
    checklistGroups: [
      {
        room: 'Empty Rooms & Storage',
        tasks: [
          'Wipe interior and exterior of empty kitchen and bathroom cabinets and drawers',
          'Dust closet shelving, rods, and interior trim',
          'Detailed cleaning of baseboards, ledges, and window sills',
        ],
      },
      {
        room: 'Sanitation & Fixtures',
        tasks: [
          'Full kitchen and bathroom sanitization for incoming occupants',
          'Clean countertops, sinks, tubs, showers, and toilets',
          'Pair with optional Oven ($50), Refrigerator ($80), or Empty Garage Sweep ($50/$100) add-ons',
        ],
      },
      {
        room: 'Final Floor Preparation',
        tasks: [
          'Full vacuuming of open carpets and corners',
          'Sweep and mop hardwood, tile, and vinyl flooring throughout',
        ],
      },
    ],
    notes: [
      'Move-out cleaning requires working utilities (electricity and running water).',
      'Homes should be empty prior to move-in/move-out service.',
      'One-time payment arrangements are finalized during scheduling.',
    ],
  },
];

export interface FaqItem {
  id: string;
  category: 'Services & Checklists' | 'Scheduling & Policies' | 'Preparation & Home Access' | 'Coverage & Scope';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'packages',
    category: 'Services & Checklists',
    question: 'What is included in each cleaning package?',
    answer:
      'Every service follows detailed room-by-room checklists tailored to the package you select. Recurring cleaning (weekly, biweekly, or monthly) maintains kitchens, bathrooms, dusting, surfaces, and floors. Deep cleaning focuses on built-up dirt, trim, and overlooked areas—ideal for first-time customers or seasonal resets. Move-in/move-out cleaning is designed for empty homes and includes interior cabinets, drawers, fixtures, and full floor care.',
  },
  {
    id: 'supplies',
    category: 'Preparation & Home Access',
    question: 'Do I need to provide cleaning supplies or equipment?',
    answer:
      'No. Extreme Clean Solutions brings its own professional cleaning supplies and equipment to every appointment. If you have a specific product preference for a delicate surface, please share that note when discussing your estimate.',
  },
  {
    id: 'prepare',
    category: 'Preparation & Home Access',
    question: 'How should I prepare my home before the team arrives?',
    answer:
      'Clearing clutter, personal items, dishes, and clothing from floors and countertops allows our cleaners to focus directly on thorough surface cleaning and sanitation rather than tidying around belongings. For move-in or move-out cleans, the home should be emptied beforehand.',
  },
  {
    id: 'moveout-utilities',
    category: 'Preparation & Home Access',
    question: 'What are the requirements for a move-out cleaning?',
    answer:
      'Move-out cleaning requires working utilities—specifically active electricity and running water—so our team has proper lighting and water access to complete sanitation and floor care. The home should also be empty of furniture and personal belongings.',
  },
  {
    id: 'addons',
    category: 'Services & Checklists',
    question: 'How are specialty add-ons priced and scheduled?',
    answer:
      'Published add-on rates include oven cleaning ($50), refrigerator cleaning/sanitation ($80), and empty garage sweeps ($50 for a single-car garage, $100 for a double-car garage), all subject to business confirmation. Window-related cleaning and other detailed requests require a separate quote. Add-ons should be requested in advance so appropriate time is scheduled.',
  },
  {
    id: 'recurring-vs-onetime',
    category: 'Scheduling & Policies',
    question: 'What is the difference between recurring and one-time cleaning?',
    answer:
      'Recurring cleaning (weekly, biweekly, or monthly) keeps your home consistently maintained on an ongoing schedule, while one-time deep cleans or move-in/move-out cleans address single-visit needs. Submitting an estimate request starts a conversation—appointments are only confirmed once availability and pricing are reviewed with our team.',
  },
  {
    id: 'payment',
    category: 'Scheduling & Policies',
    question: 'How do payment arrangements work?',
    answer:
      'Recurring customers require a card on file. For one-time cleanings, payment arrangements are made directly during the scheduling process prior to your appointment.',
  },
  {
    id: 'cancellation',
    category: 'Scheduling & Policies',
    question: 'What is your cancellation policy?',
    answer:
      'Cancellations made less than 48 hours in advance are charged in full. Please contact Krista or Kris as early as possible if you need to reschedule so we can adjust the team calendar accordingly.',
  },
  {
    id: 'pets',
    category: 'Preparation & Home Access',
    question: 'Can you clean homes with pets?',
    answer:
      'Yes, many of our Oklahoma City clients have pets. Please let us know about any pets in your home when requesting an estimate, and ensure pets that may become anxious around vacuums or open doors are safely secured during the visit.',
  },
  {
    id: 'access',
    category: 'Preparation & Home Access',
    question: 'How does property access work if I am not home?',
    answer:
      'During scheduling, we coordinate property access instructions with you—whether someone will be home to welcome our screened team or you prefer to provide entry instructions. We treat every home and key/access detail with strict care.',
  },
  {
    id: 'limitations',
    category: 'Coverage & Scope',
    question: 'Are there any situations Extreme Clean Solutions does not clean?',
    answer:
      'Yes. For safety and scope integrity, Extreme Clean Solutions does not handle mold, heavy nicotine tar, or biohazard situations. Please reach out directly if you are unsure whether a specific condition falls within standard residential cleaning.',
  },
  {
    id: 'service-area',
    category: 'Coverage & Scope',
    question: 'Which cities do you serve, and how do I confirm my address?',
    answer:
      'Our primary service area includes Oklahoma City, Edmond, Moore, Mustang, Yukon, Bethany, Norman, Piedmont, Nichols Hills, Warr Acres, and The Village. Because routing depends on your exact neighborhood and schedule, service availability should be confirmed for each address.',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Tell Us About Your Home',
    description:
      'Choose your cleaning service and share basic property details, including your city or ZIP code, bedrooms, and bathrooms.',
  },
  {
    number: '02',
    title: 'Review Your Cleaning Needs',
    description:
      'Discuss your home’s condition, desired frequency, and optional extras with Krista or Kris so expectations are crystal clear.',
  },
  {
    number: '03',
    title: 'Schedule Your Clean',
    description:
      'Coordinate a suitable cleaning appointment after receiving confirmation of pricing, scope, and availability.',
  },
];

export const TRUST_STANDARDS = [
  {
    title: 'Insured & Bonded',
    description:
      'Extreme Clean Solutions LLC operates as an insured and bonded residential cleaning company for added peace of mind.',
  },
  {
    title: 'Screened Employees',
    description:
      'Team members are screened before entering customer homes, supporting trustworthy, consistent care.',
  },
  {
    title: 'Supplies & Equipment Included',
    description:
      'We bring our own professional cleaning supplies and equipment to every scheduled home visit.',
  },
  {
    title: 'Detailed Service Checklists',
    description:
      'Every cleaning follows structured checklists so kitchens, bathrooms, surfaces, and floors receive consistent attention.',
  },
];
