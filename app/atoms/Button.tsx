import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // size: "small" | "medium" | "large";
  mode?: "normal" | "inverse";
  styles?: Record<string, unknown>;
  fill?: boolean;
} & Record<string, unknown>;

const Button = ({
  mode = "normal",
  fill = false,
  children,
  styles,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const styleOverrides = {
    ...(fill ? { margin: 0 } : {}),
    ...styles,
  };
  const classNames = [
    "btn",
    ...(mode === "normal" ? [] : ["btn-reverse"]),
  ].join(" ");

  return (
    <button className={classNames} style={styleOverrides} {...rest}>
      {children}
    </button>
  );
};

export default Button;
