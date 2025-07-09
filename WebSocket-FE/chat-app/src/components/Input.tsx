interface InputTypes {
  size: "sm" | "md" | "lg";
  placeholder: string;
  widthFull?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const sizeClass = {
  sm: "p-1 text-sm",
  md: "p-2 text-base",
  lg: "p-3 text-lg",
};

export function Input(props: InputTypes) {
  const { size, placeholder, widthFull } = props;

  return (
    <input
      ref={props.ref}
      type="text"
      placeholder={placeholder}
      className={`border rounded-md outline-none ${sizeClass[size]} ${widthFull ? "w-full h-11" : ""}`}
    />
  );
}
