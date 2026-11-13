import { useState, useEffect } from 'react';
import { PageRoute } from './data/siteData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { EstimateServiceType, RecurringFrequency } from './components/EstimateWizard';
import {
  ServiceDetailPage,
  AddOnsPage,
  MeetOwnersPage,
  ApproachPage,
  ServiceAreasPage,
  FaqsPage,
  EstimatePage,
  ContactPage,
} from './components/SubPages';

const VALID_ROUTES: PageRoute[] = [
  'home',
  'recurring',
  'deep',
  'move',
  'addons',
  'owners',
  'approach',
  'areas',
  'faqs',
  'estimate',
  'contact',
];

function getInitialRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '') as PageRoute;
  return VALID_ROUTES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(getInitialRoute);
  const [estimatePrefill, setEstimatePrefill] = useState<{
    service?: EstimateServiceType;
    frequency?: RecurringFrequency;
    cityOrZip?: string;
    addOnIds?: string[];
    commercialInquiry?: boolean;
  }>({});

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    if (window.location.hash !== `#${nextRoute}`) {
      window.history.pushState(null, '', `#${nextRoute}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEstimate = (options?: {
    service?: EstimateServiceType;
    frequency?: RecurringFrequency;
    cityOrZip?: string;
    addOnIds?: string[];
    commercialInquiry?: boolean;
  }) => {
    setEstimatePrefill(options ?? {});
    navigateTo('estimate');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFD] text-[#263845]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#17304B] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header currentRoute={route} onNavigate={navigateTo} />

      <main id="main-content" className="flex-1">
        {route === 'home' && (
          <HomePage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'recurring' && (
          <ServiceDetailPage
            serviceId="recurring"
            onNavigate={navigateTo}
            onStartEstimate={handleStartEstimate}
          />
        )}
        {route === 'deep' && (
          <ServiceDetailPage
            serviceId="deep"
            onNavigate={navigateTo}
            onStartEstimate={handleStartEstimate}
          />
        )}
        {route === 'move' && (
          <ServiceDetailPage
            serviceId="move"
            onNavigate={navigateTo}
            onStartEstimate={handleStartEstimate}
          />
        )}
        {route === 'addons' && (
          <AddOnsPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'owners' && (
          <MeetOwnersPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'approach' && (
          <ApproachPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'areas' && (
          <ServiceAreasPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'faqs' && (
          <FaqsPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
        {route === 'estimate' && (
          <EstimatePage onNavigate={navigateTo} prefill={estimatePrefill} />
        )}
        {route === 'contact' && (
          <ContactPage onNavigate={navigateTo} onStartEstimate={handleStartEstimate} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
