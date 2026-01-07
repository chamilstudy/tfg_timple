type HeroTitleProps = {
  title: string;
  description: string;
};
export default function Title({ title, description }: HeroTitleProps) {
  return (
    <div className="w-full">
      <h2>{title}</h2>
      <p className="subheader">{description}</p>
    </div>
  );
}
