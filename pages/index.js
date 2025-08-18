import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <header className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">Campus Connect</h1>
        <p className="text-xl md:text-2xl text-gray-700">Connect with your university community effortlessly.</p>
      </header>

      <main className="flex flex-col items-center">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Link href="/signup" className="btn-primary px-8 py-3 text-lg">Get Started</Link>
          <Link href="/login" className="btn-secondary px-8 py-3 text-lg">Log In</Link>
        </div>

        <section className="max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Post announcements & events
            </li>
            <li className="flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Join study groups & clubs
            </li>
            <li className="flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Find lost & found items
            </li>
          </ul>
        </section>
      </main>

      <footer className="mt-16 text-gray-500 text-sm">
        <div className="flex space-x-6">
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/help" className="hover:text-blue-600 transition-colors">Help</Link>
        </div>
      </footer>
    </div>
  );
}
