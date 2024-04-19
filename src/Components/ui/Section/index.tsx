import "./style.css";

type SectionType = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export default function Section({ children, className = "" }: SectionType) {
  return <section className={className}>{children}</section>;
}
