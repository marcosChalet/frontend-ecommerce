import "./style.css";

export default function Main({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <main>{children}</main>;
}
