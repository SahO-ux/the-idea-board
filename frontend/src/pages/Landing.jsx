import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [showFeaturesBtn, setShowFeaturesBtn] = useState(false);

  useEffect(() => {
    const checkSize = () => setShowFeaturesBtn(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">IdeaBoard</h1>
          <nav>
            <Link
              to="/app"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Open App
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1 container mx-auto px-6 py-12 grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-4xl font-extrabold mb-4">
            Capture ideas. Share instantly.
          </h2>
          <p className="text-gray-700 mb-6">
            IdeaBoard is an anonymous, realtime idea board for teams, events,
            and communities. Submit your idea, upvote great suggestions, and
            watch the board update live.
          </p>
          <div className="flex gap-3">
            <Link
              to="/app"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium shadow"
            >
              Try Idea Board
            </Link>
            {showFeaturesBtn && (
              <a
                href="#features"
                className="px-6 py-3 border rounded-md text-gray-700"
              >
                Features
              </a>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-lg shadow-inner">
          <div className="rounded border border-dashed border-gray-200 p-6 bg-white">
            <p className="text-gray-600">"Great idea! —</p>
            <p className="font-semibold mt-4">
              Make meetings more productive. Gather anonymous suggestions. Vote
              on what matters.
            </p>
            <div className="mt-6 text-gray-500 text-sm">
              Built with ❤️ — React + Express + Socket.IO
            </div>
          </div>
        </div>

        <div id="features" className="lg:col-span-2 mt-4">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Realtime</h4>
              <p className="text-sm text-gray-600">
                Instant idea and vote updates via WebSockets.
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Anonymous</h4>
              <p className="text-sm text-gray-600">
                No accounts or tracking — just ideas.
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Persistent</h4>
              <p className="text-sm text-gray-600">
                Ideas stored in PostgreSQL for reliability.
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Portable</h4>
              <p className="text-sm text-gray-600">
                Runs everywhere via Docker Compose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} IdeaBoard — built for the practical
          assessment
        </div>
      </footer>
    </main>
  );
}
