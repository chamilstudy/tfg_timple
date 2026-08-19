type DialogHeroProps = {
  title: string;
  description: string;
};

export default function DialogHero({ title, description }: DialogHeroProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-3">
      <div className="grid gap-2">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
