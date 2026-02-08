import Navigationbar from "~/components/navigationbar";
import Footer from "~/components/footer";
import ServiceCard from "~/components/servicecard";
import { Input } from "~/components/ui/input";
import { layananData } from "~/types/layanan";
import type { Route } from "./+types/home";
import type {
  ServiceSection,
  Service,
} from "~/types/services";
import { Search, MessagesSquare } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hirealistener" },
    {
      name: "description",
      content:
        "Platform kesehatan mental dengan berbagai layanan terpercaya.",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <Navigationbar />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col-reverse items-center gap-12 sm:flex-row">
            {/* TEXT */}
            <div className="sm:w-1/2 text-center sm:text-left">
              <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-amber-800 sm:text-5xl">
                Selamat datang di <br />
                <span className="text-amber-600">Hirealistener</span>
              </h1>

              <p className="mb-8 max-w-lg text-lg text-amber-900/80">
                Kami membantu Anda menjaga kesehatan mental dan psikologis
                melalui layanan profesional yang aman, nyaman, dan terpercaya.
              </p>

              {/* SEARCH */}
              <div className="relative mx-auto max-w-md sm:mx-0">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600" />
                <Input
                  placeholder="Cari layanan..."
                  className="pl-10 bg-white/80 backdrop-blur"
                />
              </div>
            </div>

            {/* ICON HERO */}
            <div className="flex sm:w-1/2 items-center justify-center">
              <div className="rounded-2xl bg-amber-100 p-12 shadow-xl">
                <MessagesSquare
                  className="h-40 w-40 text-amber-500 sm:h-56 sm:w-56"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="container mx-auto px-4 pb-24 space-y-24">
          {layananData.sections.map((section: ServiceSection) => (
            <div key={section.title}>
              {/* SECTION HEADER */}
              <div className="mb-8 max-w-2xl">
                <h2 className="mb-2 text-3xl font-bold text-amber-800">
                  {section.title}
                </h2>
                <p className="text-amber-900/70">
                  {section.description}
                </p>
              </div>

              {/* SERVICE LIST */}
              <div className="mx-auto max-w-3xl space-y-6">
                {section.services.map((service: Service) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}