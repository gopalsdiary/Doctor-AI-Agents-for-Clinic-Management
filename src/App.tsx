import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createClient } from './lib/supabase/client';

// Pages
import LandingPage from './app/page';
import AboutPage from './app/about/page';
import PricingPage from './app/pricing/page';
import LoginPage from './app/(auth)/login/page';
import SignupPage from './app/(auth)/signup/page';
import OnboardingPage from './app/onboarding/page';
import DashboardPage from './app/(app)/app/dashboard/page';
import AppointmentsPage from './app/(app)/app/appointments/page';
import CalendarPage from './app/(app)/app/calendar/page';
import PatientsPage from './app/(app)/app/patients/page';
import ServicesPage from './app/(app)/app/services/page';
import AISettingsPage from './app/(app)/app/ai-settings/page';
import BillingPage from './app/(app)/app/billing/page';
import ProfilePage from './app/(app)/app/profile/page';
import SettingsPage from './app/(app)/app/settings/page';
import AppRootPage from './app/(app)/app/page';

// Widget
import WidgetPage from './app/widget/[slug]/page';

// Layouts
import AppLayout from './app/(app)/layout';
import AuthLayout from './app/(auth)/layout';
import WidgetLayout from './app/widget/[slug]/layout';

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Onboarding */}
        <Route path="/onboarding" element={session ? <OnboardingPage /> : <Navigate to="/login" />} />

        {/* App Routes */}
        <Route path="/app" element={session ? <AppLayout /> : <Navigate to="/login" />}>
           <Route index element={<AppRootPage />} />
           <Route path="dashboard" element={<DashboardPage />} />
           <Route path="appointments" element={<AppointmentsPage />} />
           <Route path="calendar" element={<CalendarPage />} />
           <Route path="patients" element={<PatientsPage />} />
           <Route path="services" element={<ServicesPage />} />
           <Route path="ai-settings" element={<AISettingsPage />} />
           <Route path="billing" element={<BillingPage />} />
           <Route path="profile" element={<ProfilePage />} />
           <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Widget Routes */}
        <Route path="/widget/:slug" element={<WidgetLayout />}>
          <Route index element={<WidgetPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
