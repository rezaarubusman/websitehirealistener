import { Card } from "~/components/ui/card";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    thumbnails: string[];
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card
      className="
        group flex flex-col overflow-hidden transition
        hover:-translate-y-0.5 hover:shadow-lg
        sm:flex-row
      "
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted sm:h-28 sm:w-40">
        <img
          src={service.thumbnails?.[0]}
          alt={service.title}
          className="
            h-full w-full object-cover transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-4">
        <h3 className="mb-1 line-clamp-2 text-base font-semibold text-foreground">
          {service.title}
        </h3>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {service.description}
        </p>
      </div>
    </Card>
  );
};

export default ServiceCard;