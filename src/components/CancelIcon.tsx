import React from 'react';

interface CancelIconProps extends React.SVGProps<SVGSVGElement> {}

export const CancelIcon = (props: CancelIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <g stroke="#B1B1B1">
        <circle cx="16" cy="16" r="15.25" fill="#fff" strokeWidth="1" />
        <path
          d="M10 10 22 22m-0-12L10 22"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
