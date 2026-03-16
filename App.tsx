import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { injectJsonLd, organisationSchema, websiteSchema } from "@/lib/structuredData";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CM2GPTModal from "./components/CM2GPTModal";
import FloatingGPTButton from "./components/FloatingGPTButton";
import FloatingContactButtons from "./components/FloatingContactButtons";
import StickyInvestorBar from "./components/StickyInvestorBar";
import MobileStickyBar from "./components/MobileStickyBar";

// Main pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import HowItWorks from "./pages/HowItWorks";
import Trust from "./pages/Trust";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";

// High-conversion landing pages (no header/footer — standalone)
import TheSource from "./pages/landing/TheSource";
import TheWilds from "./pages/landing/TheWilds";
import Haven from "./pages/landing/Haven";
import RansomesWharf from "./pages/landing/RansomesWharf";
import WestminsterTower from "./pages/landing/WestminsterTower";
import WimbledonBridgeHouse from "./pages/landing/WimbledonBridgeHouse";
import FahidIsland from "./pages/landing/FahidIsland";
import FahidBeachResidences from "./pages/landing/FahidBeachResidences";
import BeachHouseFahid from "./pages/landing/BeachHouseFahid";
import FahidBeachTerraces from "./pages/landing/FahidBeachTerraces";
// Investment Brief landing page
import LondonBrief from "./pages/LondonBrief";

// SEO landing pages
import LondonInvestment from "./pages/seo/LondonInvestment";
import OverseasInvestors from "./pages/seo/OverseasInvestors";
import PrimeLondonProperty from "./pages/seo/PrimeLondonProperty";

// Blog
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Current Opportunities
import CurrentOpportunities from "./pages/CurrentOpportunities";

// New London investment zones
import WandsworthCommon from "./pages/landing/WandsworthCommon";
import Twickenham from "./pages/landing/Twickenham";
import BrookGreen from "./pages/landing/BrookGreen";
import Woolwich from "./pages/landing/Woolwich";
import Croydon from "./pages/landing/Croydon";
import PearsonBuilding from "./pages/landing/PearsonBuilding";
import FiftyBrookGreen from "./pages/landing/FiftyBrookGreen";
import CountyHallKingston from "./pages/landing/CountyHallKingston";

// Landing page slugs — these render without the main header/footer
const LANDING_SLUGS = new Set([
  "abu-dhabi-project-3",
  "dubai-project-1",
  "dubai-project-2",
  "ransomes-wharf-battersea",
  "westminster-tower",
  "wimbledon-bridge-house",
  // Fahid Island
  "fahid-island",
  "fahid-beach-residences",
  "beach-house-fahid",
  "fahid-beach-terraces",
  // New London investment zones
  "wandsworth-common",
  "twickenham",
  "brook-green",
  "woolwich",
  "croydon",
  // New London Square developments
  "pearson-building-croydon",
  "fifty-brook-green",
  "county-hall-kingston",
  // Legacy slug aliases (kept for backward compatibility)
  "london-project-1",
  "london-project-2",
  "london-project-3",
]);

function LandingPageRouter({ slug }: { slug: string }) {
  switch (slug) {
    case "abu-dhabi-project-3": return <TheSource />;
    case "dubai-project-1": return <TheWilds />;
    case "dubai-project-2": return <Haven />;
    case "ransomes-wharf-battersea":
    case "london-project-1": return <RansomesWharf />;
    case "westminster-tower":
    case "london-project-2": return <WestminsterTower />;
    case "wimbledon-bridge-house":
    case "london-project-3": return <WimbledonBridgeHouse />;
    case "fahid-island": return <FahidIsland />;
    case "fahid-beach-residences": return <FahidBeachResidences />;
    case "beach-house-fahid": return <BeachHouseFahid />;
    case "fahid-beach-terraces": return <FahidBeachTerraces />;
    case "wandsworth-common": return <WandsworthCommon />;
    case "twickenham": return <Twickenham />;
    case "brook-green": return <BrookGreen />;
    case "woolwich": return <Woolwich />;
    case "croydon": return <Croydon />;
    case "pearson-building-croydon": return <PearsonBuilding />;
    case "fifty-brook-green": return <FiftyBrookGreen />;
    case "county-hall-kingston": return <CountyHallKingston />;
    default: return null;
  }
}

function AppLayout() {
  const [gptOpen, setGptOpen] = useState(false);

  return (
    <>
      <Header onOpenGPT={() => setGptOpen(true)} />
      <main className="pt-16">
        <Switch>
          <Route path="/" component={() => <Home onOpenGPT={() => setGptOpen(true)} />} />
          <Route path="/projects" component={() => <Projects onOpenGPT={() => setGptOpen(true)} />} />
          <Route
            path="/projects/:slug"
            component={({ params }) => {
              const slug = params?.slug || "";
              // Landing pages have their own full-page layout — render without shell
              if (LANDING_SLUGS.has(slug)) {
                return <LandingPageRouter slug={slug} />;
              }
              return <ProjectDetail slug={slug} onOpenGPT={() => setGptOpen(true)} />;
            }}
          />
          <Route path="/how-it-works" component={() => <HowItWorks onOpenGPT={() => setGptOpen(true)} />} />
          <Route path="/trust" component={() => <Trust />} />
          <Route path="/privacy" component={() => <Privacy />} />
          <Route path="/contact" component={() => <Contact />} />
          <Route path="/thank-you" component={() => <ThankYou />} />
          <Route path="/admin" component={() => <Admin />} />
          {/* SEO landing pages */}
          <Route path="/london-investment" component={() => <LondonInvestment />} />
          <Route path="/overseas-investors" component={() => <OverseasInvestors />} />
          <Route path="/prime-london-property" component={() => <PrimeLondonProperty />} />
          {/* Blog */}
          <Route path="/blog" component={() => <Blog />} />
          <Route path="/blog/:slug" component={({ params }) => <BlogPost />} />
          <Route path="/current-opportunities" component={() => <CurrentOpportunities />} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <StickyInvestorBar />
      <MobileStickyBar />
      <FloatingGPTButton onClick={() => setGptOpen(true)} />
      <FloatingContactButtons />
      <CM2GPTModal open={gptOpen} onClose={() => setGptOpen(false)} />
    </>
  );
}

// Landing pages that match LANDING_SLUGS render standalone (no header/footer from AppLayout)
// We detect this at the router level and bypass AppLayout entirely
function RootRouter() {
  const [gptOpen, setGptOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  // Inject site-wide structured data (Organisation + Website) once on mount
  useEffect(() => {
    const cleanOrg = injectJsonLd(organisationSchema, "json-ld-organisation");
    const cleanWeb = injectJsonLd(websiteSchema, "json-ld-website");
    return () => { cleanOrg(); cleanWeb(); };
  }, []);

  return (
    <Switch>
      {/* Standalone landing pages — full page, no outer chrome */}
      <Route path="/projects/abu-dhabi-project-3" component={() => <TheSource />} />
      <Route path="/projects/dubai-project-1" component={() => <TheWilds />} />
      <Route path="/projects/dubai-project-2" component={() => <Haven />} />
      <Route path="/projects/ransomes-wharf-battersea" component={() => <RansomesWharf />} />
      <Route path="/projects/westminster-tower" component={() => <WestminsterTower />} />
      <Route path="/projects/wimbledon-bridge-house" component={() => <WimbledonBridgeHouse />} />
      {/* Fahid Island */}
      <Route path="/projects/fahid-island" component={() => <FahidIsland />} />
      <Route path="/projects/fahid-beach-residences" component={() => <FahidBeachResidences />} />
      <Route path="/projects/beach-house-fahid" component={() => <BeachHouseFahid />} />
      <Route path="/projects/fahid-beach-terraces" component={() => <FahidBeachTerraces />} />
      {/* New London investment zones */}
      <Route path="/projects/wandsworth-common" component={() => <WandsworthCommon />} />
      <Route path="/projects/twickenham" component={() => <Twickenham />} />
      <Route path="/projects/brook-green" component={() => <BrookGreen />} />
      <Route path="/projects/woolwich" component={() => <Woolwich />} />
      <Route path="/projects/croydon" component={() => <Croydon />} />
      {/* New London Square developments */}
      <Route path="/projects/pearson-building-croydon" component={() => <PearsonBuilding />} />
      <Route path="/projects/fifty-brook-green" component={() => <FiftyBrookGreen />} />
      <Route path="/projects/county-hall-kingston" component={() => <CountyHallKingston />} />
      {/* Legacy slug aliases */}
      <Route path="/projects/london-project-1" component={() => <RansomesWharf />} />
      <Route path="/projects/london-project-2" component={() => <WestminsterTower />} />
      <Route path="/projects/london-project-3" component={() => <WimbledonBridgeHouse />} />
      <Route path="/projects/abu-dhabi-project-3" component={() => <TheSource />} />

      {/* Investment Brief — standalone, no header/footer */}
      <Route path="/london-investment-brief" component={() => <LondonBrief />} />

      {/* All other routes use the main layout with header/footer */}
      <Route component={() => <AppLayout />} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <RootRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
