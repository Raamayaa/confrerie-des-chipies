type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-black">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}