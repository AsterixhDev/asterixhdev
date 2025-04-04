import React from "react";

type Service = {
  id: number;
  name: string;
  description: string;
};

const servicesData: Service[] = [
  {
    id: 1,
    name: "Web Development",
    description:
      "Building responsive, interactive websites using modern technologies to deliver engaging user experiences.",
  },
  {
    id: 2,
    name: "Mobile Development",
    description:
      "Creating cross-platform mobile applications with a focus on performance and usability.",
  },
  {
    id: 3,
    name: "UI/UX Design",
    description:
      "Designing intuitive interfaces and seamless user experiences with attention to detail.",
  },
  {
    id: 4,
    name: "SEO Optimization",
    description:
      "Improving search engine rankings through data-driven strategies and best practices.",
  },
];

// Helper function to split an array into chunks of a specified size.
const chunkArray = (arr: Service[], chunkSize: number): Service[][] => {
  const chunks: Service[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

export default function Services() {
  const serviceChunks = chunkArray(servicesData, 2);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 flex flex-col gap-5 items-center">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-[2px] text-foreground">
            {"Our Services".split("").map((char, index) => (
              <span
                key={index}
                className={`transition-transform duration-300 hover:-translate-y-2 hover:-rotate-12`}
              >
                {char}
                {char===" " && <>&nbsp;</>}
              </span>
            ))}
          </h2>
          <div className="mt-4">
            <p className="text-muted-foreground text-lg mt-1">
              Explore the range of services I offer, from cutting-edge web and
              mobile development to innovative UI/UX design.
            </p>
            <p className="text-muted-foreground text-lg mt-1">
              Each service is tailored to deliver exceptional results and
              engaging user experiences. Let’s create something remarkable
              together!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {serviceChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className={`grid gap-4 ${
                // For even rows, the left card is larger; for odd rows, the right card is larger.
                chunkIndex % 2 === 0
                  ? "md:grid-cols-[4fr_2fr]"
                  : "md:grid-cols-[2fr_4fr]"
              }`}
            >
              {chunk.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col gap-2 p-6 rounded-lg h-full w-full bg-primary/5 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100"
                >
                  {/* Index/Number Column */}
                  <div className="w-full">
                    <span className="text-2xl font-extrabold text-primary">
                      {service.id < 10 ? `0${service.id}` : service.id}
                    </span>
                  </div>
                  {/* Service Details Column */}
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {service.name}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
