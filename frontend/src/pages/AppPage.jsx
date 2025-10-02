import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

import { getIdeas, postIdea } from "../helpers/api";
import IdeaCard from "../components/IdeaCard";
import { MAX_TEXT_LENGTH } from "../helpers/constants";

export default function AppPage() {
  const [ideas, setIdeas] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [upvoteInFlight, setUpvoteInFlight] = useState({});

  const getBaseUrl = () => {
    return (
      import.meta.env.VITE_API_URL ||
      `${window.location.protocol}//${window.location.hostname}:4000`
    );
  };

  useEffect(() => {
    // load existing ideas
    getIdeas("/api/ideas")
      .then((data) => setIdeas(data))
      .catch((err) => {
        console.error("fetch ideas failed", err);
        toast.error("Failed to load ideas");
      });

    const socket = io(getBaseUrl());

    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.on("idea:created", (idea) => {
      setIdeas((prev) => [idea, ...prev]);
      toast.success("New idea added!");
    });

    socket.on("idea:upvoted", ({ id, upvotes }) => {
      setIdeas((prev) =>
        prev.map((it) => (it.id === id ? { ...it, upvotes } : it))
      );
      setUpvoteInFlight((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => socket.close();
  }, []);

  const submitIdea = async (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.error("Idea text is required");
    if (text.trim().length > MAX_TEXT_LENGTH) {
      toast.error("Max 280 characters allowed");
      return;
    }
    setSubmitting(true);
    try {
      await postIdea("/api/ideas", { text: text.trim() });
      setText("");
      //   toast.success("Idea submitted!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit idea");
    } finally {
      setSubmitting(false);
    }
  };

  const onUpvote = async (id) => {
    setUpvoteInFlight((s) => ({ ...s, [id]: true }));
    try {
      await postIdea(`/api/ideas/${id}/upvote`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upvote");
      setUpvoteInFlight((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Idea Board</h1>
          <a href="/" className="text-sm text-indigo-600">
            ← Back to landing
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-8">
          <form onSubmit={submitIdea} className="grid gap-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_TEXT_LENGTH ?? 280}
              placeholder={`Share your idea (max ${
                MAX_TEXT_LENGTH || 280
              } chars)...`}
              className="w-full p-4 rounded shadow border"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {" "}
                {text.length}/{MAX_TEXT_LENGTH || 280}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Idea"}
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Ideas</h2>
          {ideas.length === 0 ? (
            <div className="text-gray-500">No ideas yet — be the first!</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onUpvote={onUpvote}
                  disabled={!!upvoteInFlight[idea.id]}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
