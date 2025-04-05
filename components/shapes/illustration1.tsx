import React from "react";

type Props = {
  svg?: React.SVGProps<SVGSVGElement>;
  colors?: {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
  };
};

export default function Illustration1({
  colors,
  ...props
}: Props) {
    const colorsArray =  {
        "1": "#ffb9b9",
        "2": "#6c63ff",
        "3": "#090814",
        "4": "#ccc",
        "5": "#d0cde1",
        "6": "#f2f2f2",
        "7": "#fff",
        "8": "#3f3d56",
        ...colors,
      }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="829.692"
      height="684.73"
      viewBox="0 0 829.692 684.73"
      role="img"
      aria-label="Illustration"
      {...props.svg}
    >
      <g
        id="Group_204"
        data-name="Group 204"
        transform="translate(-472.5 -182.216)"
      >
        <path
          id="Path_3200-981"
          data-name="Path 3200"
          d="M581.722,260.562S595.577,365,574.262,376.728s126.823,12.789,126.823,12.789-33.038-90.588-18.118-118.3Z"
          transform="translate(211.313 115.611)"
          fill={colorsArray[1]}
        />
        <circle
          id="Ellipse_512"
          data-name="Ellipse 512"
          cx="73.536"
          cy="73.536"
          r="73.536"
          transform="translate(774.386 284.607)"
          fill={colorsArray[1]}
        />
        <path
          id="Path_3201-982"
          data-name="Path 3201"
          d="M809.257,390.045l-12.32,56.1-26.05,118.69-.78,6.5-8.99,75.25-5.98,49.99-4.01,33.58c-24.38,12.53-42.05,21.18-42.05,21.18s-1.52-7.62-3.97-17.37c-17.11,5.13-48.77,13.64-75.6,15.34,9.77,10.89-141.12-266.12-146.91-303.16-4.66-29.81-8.16-55-8.9-60.36-.1-.7-.15-1.06-.15-1.06l112.43-49.68c7.99,18.53,45.3,24.1,45.3,24.1,30.91-2.13,55.14-18.43,55.14-18.43Z"
          transform="translate(211.313 115.611)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3203-983"
          data-name="Path 3203"
          d="M575.433,154.235l-13.749-5.5s28.749-31.651,68.747-28.9l-11.25-12.385s27.5-11.009,52.5,17.89c13.141,15.191,28.346,33.048,37.825,53.163h14.725l-6.146,13.532,21.509,13.532-22.077-2.431a75.616,75.616,0,0,1,.6,22.445,29.041,29.041,0,0,1-10.634,19h0s-17.052-35.3-17.052-40.8v13.761s-13.749-12.385-13.749-20.642l-7.5,9.633-3.75-15.137-46.248,15.137,7.5-12.385-28.749,4.128,11.25-15.137s-32.5,17.89-33.749,33.027-10.762,29.481-10.762,29.481S539.184,174.877,575.433,154.235Z"
          transform="translate(211.313 134.35)"
          fill={colorsArray[3]}
        />
        <path
          id="Path_3204-984"
          data-name="Path 3204"
          d="M889.187,647.955c-7.49,8.12-26.05,20.35-48.55,33.59-8.37,4.92-17.28,9.99-26.37,15.03-21.69,12.03-44.4,23.95-63.14,33.58-24.38,12.53-42.05,21.18-42.05,21.18s-1.52-7.62-3.97-17.37c-3.28-13.05-8.22-29.92-13.37-37.39-.18-.26-.36-.5-.54-.74-1.5-1.97-3.01-3.12-4.5-3.12l74.42-46.13,32.16-19.94-23.17-55.31-29.06-69.38,17.54-55.81,17.63-56.1h33.04s10.94,23.88,24.93,57.18c2.09,4.98,4.25,10.17,6.45,15.53C869.417,532.755,905.3,630.5,889.187,647.955Z"
          transform="translate(211.313 115.611)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3206-985"
          data-name="Path 3206"
          d="M556.677,695.915a47.791,47.791,0,0,0-8.1.66c-22.99,3.95-29.77,24.76-31.7,38.7a71.847,71.847,0,0,0-.7,12.86l-20.31-15.62-7.4-5.69c-17.81-6.21-33.68-17.24-47.44-30.25a238.48,238.48,0,0,1-31.95-37.89,334.145,334.145,0,0,1-24.72-42.4,31.184,31.184,0,0,1-.43-26.45l25.15-56.05,36.76-81.92q.4-2.925.89-5.72c7.29-41.8,26.82-60.36,26.82-60.36h14.92l9.98,60.36,12.4,74.99-8.69,28.34-20.08,65.45,19.19,20.84Z"
          transform="translate(211.313 115.611)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3208-986"
          data-name="Path 3208"
          d="M864.337,765.775v6.07a13.338,13.338,0,0,1-.91,4.87,13.693,13.693,0,0,1-.97,2,13.438,13.438,0,0,1-11.55,6.56H404.357a13.437,13.437,0,0,1-11.55-6.56,13.685,13.685,0,0,1-.97-2,13.339,13.339,0,0,1-.91-4.87v-6.07a13.426,13.426,0,0,1,13.43-13.43H430.1v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.4v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.4v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h105.2a.559.559,0,0,1,.56.56v2.83h8.4v-2.83a.559.559,0,0,1,.56-.56h13.43a.566.566,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.4v-2.83a.559.559,0,0,1,.56-.56H765.3a.557.557,0,0,1,.55.56v2.83h8.4v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h8.39v-2.83a.559.559,0,0,1,.56-.56h13.43a.559.559,0,0,1,.56.56v2.83h39.17a13.426,13.426,0,0,1,13.43,13.43Z"
          transform="translate(211.313 79.816)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_742"
          data-name="Rectangle 742"
          width="733"
          height="2"
          transform="translate(472.5 864.946)"
          fill={colorsArray[4]}
        />
        <path
          id="Path_3209-987"
          data-name="Path 3209"
          d="M828.381,510.145H661.938v-3.431H586.466v3.431H419.337A11.259,11.259,0,0,0,408.079,521.4V749.315a11.259,11.259,0,0,0,11.259,11.259H828.381a11.259,11.259,0,0,0,11.259-11.259V521.4a11.259,11.259,0,0,0-11.259-11.259Z"
          transform="translate(211.313 79.816)"
          fill={colorsArray[3]}
        />
        <circle
          id="Ellipse_513"
          data-name="Ellipse 513"
          cx="25"
          cy="25"
          r="25"
          transform="translate(810.5 644.531)"
          fill="none"
          stroke={colorsArray[5]}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <circle
          id="Ellipse_514"
          data-name="Ellipse 514"
          cx="25"
          cy="25"
          r="25"
          transform="translate(802.5 653.531)"
          fill={colorsArray[6]}
        />
        <ellipse
          id="Ellipse_515"
          data-name="Ellipse 515"
          cx="44.477"
          cy="44.477"
          rx="44.477"
          ry="44.477"
          transform="translate(518.309 289.834)"
          fill={colorsArray[6]}
        />
        <path
          id="Path_3212-988"
          data-name="Path 3212"
          d="M281.185,161.578a48.073,48.073,0,0,0-12.13,0A47.3,47.3,0,0,0,230.03,194.49a46.651,46.651,0,0,0-2.049,12.143c-.02.573-.034,1.152-.034,1.732a47.219,47.219,0,0,0,47.172,47.172c1,0,2.008-.034,3-.094a46.654,46.654,0,0,0,6.914-.957,47.178,47.178,0,0,0-3.848-92.909Zm8.7,90.173h-.007a45.356,45.356,0,0,1-11.759,2.338c-.991.067-1.995.1-3,.1A45.88,45.88,0,0,1,229.3,208.366c0-.58.013-1.159.034-1.732a45.824,45.824,0,1,1,60.556,45.117Z"
          transform="translate(297.101 119.88)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_745"
          data-name="Rectangle 745"
          width="1.348"
          height="9.434"
          transform="translate(571.547 285.117)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_746"
          data-name="Rectangle 746"
          width="1.348"
          height="9.434"
          transform="translate(541.247 298.226) rotate(-45)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_747"
          data-name="Rectangle 747"
          width="1.348"
          height="9.434"
          transform="translate(529.091 328.92) rotate(-90)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_748"
          data-name="Rectangle 748"
          width="1.348"
          height="9.434"
          transform="translate(542.199 359.218) rotate(-135)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_749"
          data-name="Rectangle 749"
          width="1.348"
          height="9.434"
          transform="translate(596.521 304.896) rotate(-135)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_750"
          data-name="Rectangle 750"
          width="1.348"
          height="9.434"
          transform="translate(605.914 328.92) rotate(-90)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_751"
          data-name="Rectangle 751"
          width="1.348"
          height="9.434"
          transform="translate(595.57 352.547) rotate(-45)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_752"
          data-name="Rectangle 752"
          width="1.348"
          height="9.434"
          transform="translate(571.547 361.94)"
          fill={colorsArray[3]}
        />
        <path
          id="Path_3213-989"
          data-name="Path 3213"
          d="M311.476,240.006a3.369,3.369,0,0,0-4.043,0,3.468,3.468,0,0,0-.964,1.132,3.37,3.37,0,1,0,5.007-1.132Zm-2.022,4.717a2.028,2.028,0,0,1-2.022-2.022,2.058,2.058,0,0,1,.357-1.146,2.02,2.02,0,1,1,1.664,3.167Z"
          transform="translate(262.766 85.545)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_753"
          data-name="Rectangle 753"
          width="12.13"
          height="12.13"
          transform="translate(566.154 269.617)"
          fill={colorsArray[3]}
        />
        <ellipse
          id="Ellipse_516"
          data-name="Ellipse 516"
          cx="16.173"
          cy="5.728"
          rx="16.173"
          ry="5.728"
          transform="translate(556.047 260.184)"
          fill={colorsArray[3]}
        />
        <rect
          id="Rectangle_754"
          data-name="Rectangle 754"
          width="4.043"
          height="22.912"
          transform="translate(570.198 302.637)"
          fill={colorsArray[3]}
        />
        <path
          id="Path_3173-990"
          data-name="Path 3173"
          d="M718.414,342.916c-3.279-13.773-2.732-27.339,2.883-40.629a3.113,3.113,0,0,1,3.322-2.882l30.684,2.177a3.113,3.113,0,0,1,2.881,3.322L755.3,345.534a3.113,3.113,0,0,1-3.322,2.882L721.3,346.238A3.113,3.113,0,0,1,718.414,342.916Z"
          transform="translate(365.104 7.308)"
          fill={colorsArray[6]}
        />
        <path
          id="Path_3174-991"
          data-name="Path 3174"
          d="M723.887,332.291c-2.624-6.787-.946-16.121,1.853-26.12a2.915,2.915,0,0,1,3.111-2.7l26.37,1.871a2.915,2.915,0,0,1,2.7,3.111l-2.565,36.154a2.916,2.916,0,0,1-3.111,2.7l-16.336-1.159a12.986,12.986,0,0,1-12.021-13.857Z"
          transform="translate(362.854 5.829)"
          fill={colorsArray[7]}
        />
        <path
          id="Path_3175-992"
          data-name="Path 3175"
          d="M748.081,340.447l-2.416-.415a8.117,8.117,0,0,0,.633-2.76c.381-5.085.42-10.218.623-15.314a.966.966,0,0,0-1.629-.675l-6.069,5.027c-.947.784.41,2.128,1.35,1.35l4.356-3.608q-.2,5.008-.4,10.016c-.064,1.6.131,3.548-.525,5.055a2.432,2.432,0,0,1-.348.565l-2.675-.46c-.641-.11-1.456.425-1.174,1.174a2.927,2.927,0,0,0,3.975,1.515,3.222,3.222,0,0,0,.4-.212l3.4.584C748.775,342.494,749.292,340.655,748.081,340.447Z"
          transform="translate(356.917 -0.556)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3176-993"
          data-name="Path 3176"
          d="M998.3,555.384c-3.089-12.972-2.574-25.748,2.715-38.265a2.932,2.932,0,0,1,3.129-2.714l28.9,2.051a2.932,2.932,0,0,1,2.714,3.129l-2.715,38.265a2.932,2.932,0,0,1-3.129,2.714l-28.9-2.051A2.932,2.932,0,0,1,998.3,555.384Z"
          transform="translate(237.43 -153.484)"
          fill={colorsArray[6]}
        />
        <path
          id="Path_3177-994"
          data-name="Path 3177"
          d="M1003.81,545.614c-2.472-6.392-.891-15.183,1.746-24.6a2.746,2.746,0,0,1,2.93-2.542l24.836,1.762a2.745,2.745,0,0,1,2.542,2.93l-2.416,34.051a2.746,2.746,0,0,1-2.93,2.542l-15.385-1.092A12.231,12.231,0,0,1,1003.81,545.614Z"
          transform="translate(234.953 -155.114)"
          fill={colorsArray[7]}
        />
        <path
          id="Path_3178-995"
          data-name="Path 3178"
          d="M1026.439,546.282a5.058,5.058,0,0,0,.932-.565,5.158,5.158,0,0,0,1.687-5.364c-1.165-4.281-6.286-4.307-9.822-3.792-1.141.166-.656,1.9.478,1.734,2.383-.347,6.123-.628,7.4,1.975a3.419,3.419,0,0,1-.547,3.766,3.327,3.327,0,0,1-2.023.962,5.348,5.348,0,0,0-2.354-.439c-.833.039-1.3,1.251-.454,1.675a5.4,5.4,0,0,0,2.4.567,3.9,3.9,0,0,1,2.2,3.714,4.029,4.029,0,0,1-4.587,3.379l-.022,0c-1.13-.227-1.613,1.505-.478,1.734a5.843,5.843,0,0,0,6.823-4.66q.023-.124.041-.248A5.46,5.46,0,0,0,1026.439,546.282Z"
          transform="translate(228.537 -162.275)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3179-996"
          data-name="Path 3179"
          d="M944.684,221.736c-3.718-15.615-3.1-30.994,3.268-46.062a3.529,3.529,0,0,1,3.766-3.267l34.786,2.468a3.529,3.529,0,0,1,3.267,3.766L986.5,224.7a3.529,3.529,0,0,1-3.766,3.267L947.951,225.5A3.529,3.529,0,0,1,944.684,221.736Z"
          transform="translate(291.4 24.716)"
          fill={colorsArray[6]}
        />
        <path
          id="Path_3180-997"
          data-name="Path 3180"
          d="M950.062,209.145c-2.975-7.695-1.073-18.277,2.1-29.613a3.305,3.305,0,0,1,3.527-3.06l29.9,2.121a3.306,3.306,0,0,1,3.06,3.527l-2.909,40.989a3.305,3.305,0,0,1-3.527,3.06l-18.52-1.314A14.723,14.723,0,0,1,950.062,209.145Z"
          transform="translate(289.678 23.583)"
          fill={colorsArray[7]}
        />
        <path
          id="Path_3181-998"
          data-name="Path 3181"
          d="M973.477,193.076a5.385,5.385,0,0,0-6.82,4.5c-.394,3.562,3.437,6.373,6.754,5.405a1.083,1.083,0,0,0-.575-2.087c-2.431.71-5.024-1.916-3.627-4.262a3.2,3.2,0,0,1,3.265-1.6,3.62,3.62,0,0,1,2.412,2.189c1.193,2.688-.225,5.417-2.1,7.371-1.072,1.114-2.329,1.98-3.484,3a5.037,5.037,0,0,0-1.981,3.574,4.326,4.326,0,0,0,2.461,3.738c1.845.949,3.944.647,5.906.331,1.371-.221.789-2.306-.575-2.087-1.717.276-4.287.695-5.375-1.1-.932-1.533.988-2.879,2.033-3.694,2.628-2.049,5.286-4.7,5.681-8.18C977.772,197.325,976.322,194.063,973.477,193.076Z"
          transform="translate(284.65 19.026)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3187-999"
          data-name="Path 3187"
          d="M524.5,408.774c12.134-3.771,25.124.307,37.325-3.173a25.3,25.3,0,0,0,7.841-3.683,48.73,48.73,0,0,0,5.707-5.079c3.67-3.63,7.656-7.442,13.17-7.4,7.261.055,12.836,5.449,17.676,10.212.684.673,1.738-.38,1.054-1.054-4.447-4.376-9.252-8.993-15.583-10.3a14.38,14.38,0,0,0-8.5.706,22.19,22.19,0,0,0-6.317,4.319c-1.949,1.788-3.747,3.734-5.723,5.494a23.826,23.826,0,0,1-7.02,4.431c-5.593,2.227-11.728,2.5-17.677,2.431-7.468-.081-15.113-.59-22.348,1.658-.913.284-.523,1.722.4,1.437Z"
          transform="translate(454.666 -86.104)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3188-1000"
          data-name="Path 3188"
          d="M686.758,390.171l3.73,6.575,1.8,3.182c.321.565.65,1.127.963,1.7.192.35.611.982.211,1.314a1.943,1.943,0,0,1-1.134.177c-.657,0-1.315-.013-1.973-.02l-3.7-.037-7.645-.077a.745.745,0,0,0,0,1.49c4.438.045,8.879.139,13.317.135a3.184,3.184,0,0,0,2.178-.6,2.072,2.072,0,0,0,.4-2.388,22.678,22.678,0,0,0-1.506-2.763l-1.624-2.864-3.73-6.575a.746.746,0,0,0-1.286.752Z"
          transform="translate(376.793 -86.666)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3192-1001"
          data-name="Path 3192"
          d="M769.144,324.579c5.844-7.922,15.823-11.338,21.842-19.11a19.6,19.6,0,0,0,3.2-5.9,37.747,37.747,0,0,0,1.232-5.79c.625-3.95,1.364-8.159,4.825-10.663,4.558-3.3,10.513-2.49,15.72-1.738a.577.577,0,0,0,.174-1.141c-4.784-.691-9.9-1.368-14.453.722a11.141,11.141,0,0,0-4.982,4.342,17.2,17.2,0,0,0-1.961,5.6c-.4,2.011-.625,4.051-1.051,6.056a18.456,18.456,0,0,1-2.349,5.988c-2.469,3.957-6.176,6.94-9.919,9.63-4.7,3.376-9.7,6.568-13.189,11.291-.44.6.464,1.315.907.715Z"
          transform="translate(392.166 -20.509)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3193-1002"
          data-name="Path 3193"
          d="M884.38,263.394l6.9,3.088,3.339,1.494c.593.266,1.191.523,1.781.8.362.169,1.074.429.948.934-.086.344-.546.62-.809.814-.529.391-1.068.768-1.6,1.153l-3,2.161-6.205,4.466a.745.745,0,0,0,.883,1.2c3.6-2.593,7.236-5.148,10.809-7.78a3.185,3.185,0,0,0,1.4-1.77,2.072,2.072,0,0,0-1.1-2.158,22.688,22.688,0,0,0-2.85-1.334l-3-1.345-6.9-3.088a.746.746,0,0,0-.591,1.368Z"
          transform="translate(319.761 -11.658)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3194-1003"
          data-name="Path 3194"
          d="M989.565,279.124h-49.8a2.075,2.075,0,0,1-.013-4.15h49.808a2.075,2.075,0,1,1,.013,4.15Z"
          transform="translate(292.714 -3.863)"
          fill={colorsArray[2]}
        />
        <path
          id="Path_3195-1004"
          data-name="Path 3195"
          d="M822.271,487.041c6.569,8.906,17.787,12.745,24.553,21.482a22.035,22.035,0,0,1,3.6,6.629,42.434,42.434,0,0,1,1.385,6.508c.7,4.441,1.533,9.171,5.424,11.986,5.124,3.707,11.818,2.8,17.671,1.953a.649.649,0,0,1,.2,1.283c-5.378.777-11.132,1.537-16.247-.812a12.523,12.523,0,0,1-5.6-4.881,19.326,19.326,0,0,1-2.2-6.289c-.446-2.26-.7-4.553-1.182-6.807a20.751,20.751,0,0,0-2.64-6.731c-2.776-4.448-6.942-7.8-11.15-10.825-5.282-3.8-10.909-7.383-14.826-12.692-.494-.67.521-1.479,1.019-.8Z"
          transform="translate(337.438 -122.06)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3196-1005"
          data-name="Path 3196"
          d="M937.38,602.648l6.9-3.088,3.339-1.494c.593-.266,1.191-.523,1.781-.8.362-.169,1.074-.429.948-.934-.086-.344-.546-.62-.809-.814-.529-.391-1.068-.768-1.6-1.153l-3-2.161-6.205-4.466a.745.745,0,0,1,.883-1.2c3.6,2.593,7.236,5.148,10.809,7.78a3.184,3.184,0,0,1,1.4,1.77,2.072,2.072,0,0,1-1.1,2.158,22.688,22.688,0,0,1-2.85,1.334l-3,1.345-6.9,3.088a.746.746,0,0,1-.591-1.368Z"
          transform="translate(271.053 -179.744)"
          fill={colorsArray[8]}
        />
        <path
          id="Path_3197-1006"
          data-name="Path 3197"
          d="M1033.783,609.422H992.415a1.724,1.724,0,0,1-.015-3.447h41.383a1.724,1.724,0,0,1,.015,3.447Z"
          transform="translate(239.718 -190.183)"
          fill={colorsArray[2]}
        />
        <g
          id="Group_201"
          data-name="Group 201"
          transform="translate(1266.529 182.216)"
        >
          <ellipse
            id="Ellipse_44"
            data-name="Ellipse 44"
            cx="15.209"
            cy="15.209"
            rx="15.209"
            ry="15.209"
            transform="translate(5.804 0.001) rotate(11)"
            fill={colorsArray[2]}
          />
          <path
            id="Path_395-1007"
            data-name="Path 395"
            d="M5.162,11.567a1.577,1.577,0,0,1-.949-.315L4.2,11.239.622,8.5A1.588,1.588,0,0,1,2.555,5.984L4.87,7.759,10.341.622A1.588,1.588,0,0,1,12.567.328h0l-.034.047.035-.047a1.59,1.59,0,0,1,.294,2.226L6.427,10.946a1.589,1.589,0,0,1-1.263.619Z"
            transform="translate(12.385 10.9) rotate(11)"
            fill={colorsArray[7]}
          />
        </g>
        <g
          id="Group_202"
          data-name="Group 202"
          transform="translate(1263.958 345.519)"
        >
          <ellipse
            id="Ellipse_44-2"
            data-name="Ellipse 44"
            cx="16.305"
            cy="16.305"
            rx="16.305"
            ry="16.305"
            transform="translate(6.222 0) rotate(11)"
            fill={colorsArray[2]}
          />
          <path
            id="Path_395-2-1008"
            data-name="Path 395"
            d="M5.534,12.4a1.691,1.691,0,0,1-1.017-.338L4.5,12.049.667,9.118a1.7,1.7,0,0,1,2.072-2.7l2.482,1.9L11.086.667A1.7,1.7,0,0,1,13.473.351h0L13.437.4l.037-.051a1.7,1.7,0,0,1,.315,2.387l-6.9,9a1.7,1.7,0,0,1-1.354.664Z"
            transform="translate(13.278 11.685) rotate(11)"
            fill={colorsArray[7]}
          />
        </g>
        <g
          id="Group_203"
          data-name="Group 203"
          transform="translate(1105.688 289.834)"
        >
          <ellipse
            id="Ellipse_44-3"
            data-name="Ellipse 44"
            cx="17.312"
            cy="17.312"
            rx="17.312"
            ry="17.312"
            transform="translate(6.607 0) rotate(11)"
            fill={colorsArray[2]}
          />
          <path
            id="Path_395-3-1009"
            data-name="Path 395"
            d="M5.876,13.167a1.8,1.8,0,0,1-1.08-.359l-.019-.015L.708,9.681a1.808,1.808,0,0,1,2.2-2.87L5.544,8.832,11.771.708A1.807,1.807,0,0,1,14.3.373h0l-.039.054.04-.054a1.809,1.809,0,0,1,.334,2.534L7.316,12.46a1.808,1.808,0,0,1-1.438.705Z"
            transform="translate(14.098 12.407) rotate(11)"
            fill={colorsArray[7]}
          />
        </g>
      </g>
    </svg>
  );
}
