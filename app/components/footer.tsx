import { Link } from "react-router";
import {
  MessagesSquare,
  Linkedin,
  Mail,
  MessageCircle,
  Instagram,
} from "lucide-react";

/* ================= CONTACT CONFIG ================= */
const CONTACTS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    label: "Email",
    url: "https://mail.google.com/mail/?view=cm&to=hirealistener@gmail.com",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/6281234567890?text=Halo%20Hirealistener",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com",
    icon: <Instagram className="h-4 w-4" />,
  },
];

/* ================= BRAND ================= */
const Brand = () => (
  <div className="md:col-span-2 md:pl-4 lg:pl-8">
    <Link to="/" className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <MessagesSquare className="h-4 w-4 text-primary-foreground" />
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
);

/* ================= CONTACT LIST ================= */
const ContactList = () => (
  <div>
    <h4 className="mb-4 font-semibold">Kontak</h4>
    <ul className="space-y-2">
      {CONTACTS.map((item) => (
        <li key={item.label}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="mt-16 border-t border-border bg-secondary/50">
    <div className="page-container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Brand />
        <ContactList />
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hirealistener. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
