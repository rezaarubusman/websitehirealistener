import { Link } from "react-router";
import { PenSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/50">
      <div className="page-container py-12">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
            <div className="md:col-span-2 md:pl-4 lg:pl-8">
                <Link to="/" className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <PenSquare className="h-4 w-4 text-primary-foreground" />
                    </div>
                        <span
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                        >
                        Hirealistener
                        </span>
                </Link>

                <p className="max-w-sm text-muted-foreground">
                    Website company ini adalah tugas Code Challenge 2
                </p>
            </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-4 font-semibold">Kontak</h4>
            <ul className="space-y-2">
              {[
                { label: "LinkedIn", url: "https://www.linkedin.com" },
                { label: "Email", url: "https://mail.google.com" },
                { label: "WhatsApp", url: "https://www.whatsapp.com" },
                { label: "Instagram", url: "https://www.instagram.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT — DIPISAH */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hirealistener. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
