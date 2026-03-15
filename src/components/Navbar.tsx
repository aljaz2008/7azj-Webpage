'use client';

const links = [
  { label: 'ABOUT', target: 'about' },
  { label: 'SCHOOL', target: 'school' },
  { label: 'CONTESTS', target: 'contests' },
  { label: 'SETUP', target: 'setup' },
  { label: 'PROJECTS', target: 'projects' },
  { label: 'CONTACT', target: 'contact' }
];

export default function Navbar() {
  return (
    <div className="fixed left-1/2 top-5 z-50 w-[min(1100px,94vw)] -translate-x-1/2 rounded-full border border-border/90 bg-card/70 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <a href="#hero" className="font-heading text-sm font-semibold tracking-[0.25em] text-primary">
          S57AZJ
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="text-xs tracking-[0.2em] text-secondary transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
