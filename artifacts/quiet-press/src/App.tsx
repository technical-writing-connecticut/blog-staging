import { type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Route, Switch, useLocation, Router as WouterRouter, Link } from 'wouter';
import Home from '@/pages/home';
import PostPage from '@/pages/post';
import AdminPage from '@/pages/admin';
import EditorPage from '@/pages/editor';

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/post/:slug" component={PostPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/admin/editor/:slug" component={EditorPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col justify-center px-5">
      <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-primary">404 / quiet detour</p>
      <h1 className="mt-5 font-editorial text-7xl leading-[.9] tracking-[-.045em]">Nothing<br /><i>here yet.</i></h1>
      <Link href="/" className="mt-9 inline-flex w-fit border-b border-primary pb-1 text-sm" data-testid="link-not-found-home">Return to Quiet Press</Link>
    </main>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
