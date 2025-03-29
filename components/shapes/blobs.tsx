import React from "react";


interface svg extends React.SVGProps<SVGSVGElement> {
  style:React.CSSProperties
}
type Blob1Props = {
  svg?: svg;
  imageFill?: string;
  gradientFill?: [string, string];
  className?: string;
  colorfill?: string;
};

export default function Blob1({
  colorfill = "#BB004B",
  imageFill,
  gradientFill,
  ...prop
}: Blob1Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="153.32 3.47 658.4 531.9"
      className={prop.className}
      {...prop}
    >
      <defs>
        {gradientFill && (
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientFill[0]} />
            <stop offset="100%" stopColor={gradientFill[1]} />
          </linearGradient>
        )}
        {imageFill && (
          <pattern
            id="imgpattern"
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image
              href={imageFill}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
      </defs>
      <g transform="translate(461.92237129687317 261.2675484923392)">
        <path
          d="M152.4 -161.5C218.1 -126.6 306 -98 329.8 -45.9C353.5 6.2 313.2 81.8 265.2 142C217.2 202.1 161.6 246.7 103.9 254.1C46.2 261.5 -13.7 231.8 -89.8 217C-165.9 202.2 -258.3 202.3 -288.6 161.2C-318.8 120 -287 37.5 -250.2 -22.2C-213.5 -81.8 -172 -118.7 -129.5 -157.7C-87 -196.7 -43.5 -237.8 -0.1 -237.8C43.4 -237.7 86.8 -196.4 152.4 -161.5"
          fill={
            gradientFill
              ? "url(#gradient)"
              : imageFill
              ? "url(#imgpattern)"
              : colorfill
          }
        />
      </g>
    </svg>
  );
}
