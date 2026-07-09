type Props = {
  text: string;
};

export default function EmptyState({
  text,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-gray-400">
      {text}
    </div>
  );
}