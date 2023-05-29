"use client";

import { IconProps } from "../googleIcon/GoogleIcon";

type IconWithColor = {
  color?: string;
  rotate?: string;
} & IconProps;

const LongArrow = ({
  height,
  width,
  color = "#ffffff",
  rotate = "rotate-0",
}: IconWithColor) => {
  return (
    <div className={`${rotate}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 -4.5 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>arrow_right [#346]</title> <desc>Created with Sketch.</desc>{" "}
          <defs> </defs>{" "}
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            {" "}
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-300.000000, -6643.000000)"
              fill={color}
            >
              {" "}
              <g id="icons" transform="translate(56.000000, 160.000000)">
                {" "}
                <polygon
                  id="arrow_right-[#346]"
                  points="264 6488.26683 258.343 6483 256.929 6484.21678 260.172 6487.2264 244 6487.2264 244 6489.18481 260.172 6489.18481 256.929 6492.53046 258.343 6494"
                >
                  {" "}
                </polygon>{" "}
              </g>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
};

export default LongArrow;
