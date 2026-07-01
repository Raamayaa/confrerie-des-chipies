export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[#09090B]" />

      <div className="fixed left-[-150px] top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px] -z-10" />

      <div className="fixed right-[-150px] bottom-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] -z-10" />
    </>
  );
}