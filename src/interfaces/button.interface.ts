interface ButtonInterface {
  className?: string;
  hasPlusIcon?: boolean;
  hasMinusIcon?: boolean;
  children: JSX.Element | JSX.Element[] | string;
  notScrollTop?: boolean;
  click?: () => void;
}

export default ButtonInterface;
