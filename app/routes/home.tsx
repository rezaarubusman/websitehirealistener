import { Search } from "lucide-react";
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
    <div className="flex min-h-screen flex-col">
      <Navigationbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="container mx-auto px-4 py-14 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Selamat datang di Hirealistener
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Kami adalah perusahaan yang bergerak dalam usaha untuk menigkatkan kesehatan mental. Kami memberikan berbagai macam solusi agar kesehatan mental dan psikologis anda tetap terjaga dengan baik dan benar. Didukung oleh berbagai tenaga ahli yang telah berpengalaman dalam bidang kesehatan mental dan psikologis sehingga dapat membantu anda dalam memperbaiki kualitas kesehatan mental dan psikologis anda.
          </p>
        </section>

        {/* SEARCH */}
        <section className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari layanan..."
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="container mx-auto px-4 pb-20 space-y-20">
          {layananData.sections.map(
            (section: ServiceSection) => (
              <div key={section.title}>
                <div className="mb-6 max-w-2xl">
                  <h2 className="text-2xl font-bold">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
                  {section.services.map(
                    (service: Service) => (
                      <ServiceCard
                        key={service.title}
                        service={service}
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}