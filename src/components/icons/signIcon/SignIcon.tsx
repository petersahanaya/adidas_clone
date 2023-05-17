import { IconProps } from "../googleIcon/GoogleIcon";

const SignIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10.5 7.5L7.5 10.75M10.5 7.5L7.5 4.5M10.5 7.5L1 7.5M7 1.5L13.5 1.5V13.5H7"
          stroke="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default SignIcon;
