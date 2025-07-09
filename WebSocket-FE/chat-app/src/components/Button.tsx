interface ButtonProps {
  text: string;
  variant: "primary";
  size: "sm" | "md" | "lg";
  width?:string;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-indigo-300  text-black",
};

const sizeStyles = {
  sm: "py-1 px-2 text-sm font-md",
  md: "py-2 px-4 text-base font-md ",
  lg: "py-3 px-6 text-xl font-md ",
};

const defaultStyles = "rounded-md border border-indigo-400  hover:bg-indigo-400";

export function Button(props: ButtonProps) {
  const { text, variant, size } = props;

  return (
    <button
    onClick={props.onClick}
      className={ `${variantStyles[variant]} ${sizeStyles[size]} ${defaultStyles} ${props.width? props.width : ""} `}
    >
      {text}
    </button>
  );
}
