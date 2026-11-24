import { Layout } from "@/components/layout/Layout";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LaunchPage = lazy(() => import("@/pages/LaunchPage"));
const DemoPage = lazy(() => import("@/pages/DemoPage"));
const DirectoryPage = lazy(() => import("@/pages/DirectoryPage"));
const BusinessProfilePage = lazy(() => import("@/pages/BusinessProfilePage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const BusinessAdminPage = lazy(() => import("@/pages/BusinessAdminPage"));
const SimulatorPage = lazy(() => import("@/pages/SimulatorPage"));
const RevealPage = lazy(() => import("@/pages/RevealPage"));
const FoundingPage = lazy(() => import("@/pages/FoundingPage"));
const FounderAnalyticsPage = lazy(() => import("@/pages/FounderAnalyticsPage"));
const EarlyAccessPage = lazy(() => import("@/pages/EarlyAccessPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const ReceiptPage = lazy(() => import("@/pages/ReceiptPage"));
const ReconciliationPage = lazy(() => import("@/pages/ReconciliationPage"));
const RoadmapPage = lazy(() => import("@/pages/RoadmapPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RouteFallback() {
  return (
    <output
      data-ocid="page.loading_state"
      className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground"
    >
      Loading…
    </output>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => (
    <Suspense fallback={<RouteFallback />}>
      <NotFoundPage />
    </Suspense>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <LandingPage />
    </Suspense>
  ),
});

const launchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/launch",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <LaunchPage />
    </Suspense>
  ),
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <DemoPage />
    </Suspense>
  ),
});

const directoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/directory",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <DirectoryPage />
    </Suspense>
  ),
});

const businessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/business/$slug",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <BusinessProfilePage />
    </Suspense>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <PortfolioPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/$businessId",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <BusinessAdminPage />
    </Suspense>
  ),
});

const simulatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/simulator",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <SimulatorPage />
    </Suspense>
  ),
});

const revealRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reveal",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <RevealPage />
    </Suspense>
  ),
});

const foundingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/founding",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <FoundingPage />
    </Suspense>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <FounderAnalyticsPage />
    </Suspense>
  ),
});

const earlyAccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/early-access",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <EarlyAccessPage />
    </Suspense>
  ),
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/$slug",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <CheckoutPage />
    </Suspense>
  ),
});

const receiptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/receipt/$token",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <ReceiptPage />
    </Suspense>
  ),
});

const reconciliationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/$businessId/reconciliation",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <ReconciliationPage />
    </Suspense>
  ),
});

const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roadmap",
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <RoadmapPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  launchRoute,
  demoRoute,
  directoryRoute,
  businessRoute,
  portfolioRoute,
  adminRoute,
  simulatorRoute,
  revealRoute,
  foundingRoute,
  analyticsRoute,
  earlyAccessRoute,
  shopRoute,
  receiptRoute,
  reconciliationRoute,
  roadmapRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
