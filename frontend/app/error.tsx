'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#faf8f5]">
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Something went wrong</h2>
      <p className="text-stone-600 mb-4">We encountered an issue loading this view.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#c55337] text-white rounded-lg hover:bg-[#a5402a]"
      >
        Try again
      </button>
    </div>
  );
}
