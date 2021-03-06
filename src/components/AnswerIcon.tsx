type AnswerProps = {
  color?: string;
};

export function AnswerIcon({ color }: AnswerProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.999 17.9995H17.999C19.656 17.9995 20.999 16.6565 20.999 14.9995V6.99951C20.999 5.34251 19.656 3.99951 17.999 3.99951H5.99902C4.34202 3.99951 2.99902 5.34251 2.99902 6.99951V14.9995C2.99902 16.6565 4.34202 17.9995 5.99902 17.9995H7.49902V20.9995L11.999 17.9995Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
