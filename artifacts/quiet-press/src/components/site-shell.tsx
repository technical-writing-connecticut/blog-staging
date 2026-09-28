import { ArrowUpRight, BookOpen, Github, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = location.startsWith('/admin');

  return (
    <div className="paper-noise min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-home">
          <span className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-[-8deg]">
            <BookOpen size={16} strokeWidth={1.8} />
          </span>
          <span className="font-editorial text-[1.65rem] leading-none tracking-[-.035em]">The Kayaking Technical Writer</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[.17em] text-muted-foreground md:flex" aria-label="Primary">
          <Link href="/" className={`transition-colors hover:text-foreground ${!isAdmin ? 'text-foreground' : ''}`} data-testid="link-essays">Essays</Link>
          
          
          <a href="https://bsky.app/profile/thekayakingwriter.bsky.social" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground" data-testid="link-bluesky">
            BlueSky <ArrowUpRight size={13} strokeWidth={1.7} />
          </a>
        </nav>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      {menuOpen && (
        <nav className="mx-5 mb-4 flex flex-col border-y border-border py-3 text-[11px] font-semibold uppercase tracking-[.17em] md:hidden" aria-label="Mobile">
          <Link href="/" onClick={() => setMenuOpen(false)} className="border-b border-border py-3" data-testid="link-mobile-essays">Essays</Link>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="border-b border-border py-3" data-testid="link-mobile-linkedin">LinkedIn</a>
          <a href="https://bsky.app/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="py-3" data-testid="link-mobile-bluesky">BlueSky</a>
        </nav>
      )}
      {children}
      <footer className="mx-auto mt-28 flex max-w-[1320px] flex-col gap-5 border-t border-border px-5 py-8 text-[11px] uppercase tracking-[.15em] text-muted-foreground sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>Quiet Press · Notes for the long middle</p>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground" data-testid="link-footer-github">
          <Github size={14} /> Built with GitHub and Replit
        </a>
      </footer>
    </div>
  );
}

export function DateLabel({ date }: { date: string }) {
  return <time dateTime={date}>{new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`))}</time>;
}

export function ArrowRule() {
  return <span aria-hidden="true" className="inline-block h-px w-9 bg-primary transition-all duration-300 group-hover:w-14" />;
}
