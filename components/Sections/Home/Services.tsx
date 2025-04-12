"use client";
import React, { useState } from "react";
import * as motion from "motion/react-client";
import clsx from "clsx";

type Service = {
  id: number;
  name: string;
  description: string;
};

const servicesData: Service[] = [
  {
    id: 1,
    name: "Front-End Development",
    description:
      "Crafting responsive, interactive web interfaces with React, Next.js, and TypeScript to create engaging user experiences.",
  },
  {
    id: 2,
    name: "API Integration & Development",
    description:
      "Designing and integrating robust RESTful and GraphQL APIs to enable seamless communication between front-end and back-end systems.",
  },
  {
    id: 3,
    name: "UI/UX Implementation",
    description:
      "Translating design prototypes into pixel-perfect, accessible interfaces that balance aesthetic appeal with usability.",
  },
  {
    id: 4,
    name: "Performance Optimization",
    description:
      "Enhancing application speed and scalability through code optimization, advanced caching strategies, and modern performance best practices.",
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

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const [shown, setShown] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => {
        setShown(true);
      }}
      onViewportLeave={() => setShown(false)}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{
        amount: 0.5,
      }}
      className={clsx(
        "flex flex-col gap-2 p-6 rounded-lg h-full w-full bg-primary/5 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 duration-500",
        shown
          ? "translate-x-0 scale-100 opacity-100"
          : {
              "scale-50 opacity-0": true,
              "-translate-x-52": index == 0,
              "last:translate-x-52 delay-300": index == 1,
            }
      )}
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
        <p className="text-base text-muted-foreground">{service.description}</p>
      </div>
    </motion.div>
  );
};
export default function Services() {
  const serviceChunks = chunkArray(servicesData, 2);
  const [shown, setShown] = useState(false);

  return (
    <section id="services" className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col gap-5 items-center">
        <motion.div
          onViewportEnter={() => {
            setShown(true);
          }}
          onViewportLeave={() => setShown(false)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{
            amount: 0.2,
          }}
          className="w-full text-center"
        >
          <h2 className="text-3xl font-bold flex items-center justify-center gap-[2px] text-foreground">
            {"Our Services".split("").map((char, index) => (
              <span
                key={index}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                className={clsx("transition-transform duration-300", {
                  "-translate-y-2 -rotate-12 opacity-55": !shown,
                  "translate-y-0 rotate-0 opacity-100": shown,
                })}
              >
                {char}
                {char === " " && <>&nbsp;</>}
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
        </motion.div>
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
              {chunk.map((service, index) => (
                <ServiceCard index={index} service={service} key={service.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
