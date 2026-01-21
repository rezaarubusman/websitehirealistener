export type Service = {
  title: string;
  description: string;
  thumbnails: string[];
};

export type ServiceSection = {
  title: string;
  description: string;
  services: Service[];
};

export type ServicesData = {
  sections: ServiceSection[];
};
