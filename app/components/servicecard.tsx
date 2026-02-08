import { Card } from "~/components/ui/card";

export interface ServiceCardProps {
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
        group flex flex-col overflow-hidden
        bg-amber-50 shadow-md transition-all
        hover:-translate-y-1 hover:shadow-xl hover:bg-amber-100
        sm:flex-row
      "
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-32 sm:w-40">
        <img
          src={service.thumbnails?.[0]}
          alt={service.title}
          className="
            h-full w-full object-cover transition-transform duration-300
            group-hover:scale-105
          "
        />
        <div className="absolute inset-0 bg-linear-to-t from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-4 sm:p-6">
        <h3 className="mb-2 text-lg font-semibold text-amber-700 line-clamp-2">
          {service.title}
        </h3>
        <p className="text-sm text-amber-900/80 line-clamp-3">{service.description}</p>
        <button className="mt-3 self-start rounded-md bg-amber-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-amber-600">
          Learn More
        </button>
      </div>
    </Card>
  );
};

export default ServiceCard;
