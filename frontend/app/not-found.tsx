import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#faf8f5]">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">404 - Craft Not Found</h2>
      <p className="text-stone-600 mb-6 max-w-md">
        The page or artisan you are looking for has moved or does not exist.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#c55337] text-white rounded-lg hover:bg-[#a5402a] font-medium"
      >
        Return to Home
      </Link>
    </div>
  );
}
