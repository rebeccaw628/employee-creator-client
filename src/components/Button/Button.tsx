interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants: string;
}

const Button = ({ variants, children, ...rest }: ButtonProps) => {
  return (
    <button className={variants} {...rest}>
      {children}
    </button>
  );
};

export default Button;
