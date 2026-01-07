type HeroTitleProps = {
  title: string;
  description: string;
};

export default function HeroTitle({ title, description }: HeroTitleProps) {
  return (
    <div className="grid gap-2 w-full">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
