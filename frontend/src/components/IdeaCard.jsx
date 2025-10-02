import { useState } from "react";
import Modal from "./IdeaModal";

export default function IdeaCard({ idea, onUpvote, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="p-4 bg-white rounded-lg shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setIsOpen(true);
        }}
      >
        {/* Wrapping container ensures truncation works */}
        <div className="w-full min-w-0">
          <p className="truncate text-gray-800">{idea.text}</p>
        </div>

        {/* Read more link */}
        <p className="text-xs text-indigo-600 mt-1">Read more →</p>

        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-500">
            Posted{" "}
            {new Date(idea.createdAt || idea.created_at).toLocaleString()}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpvote(idea.id);
              }}
              disabled={disabled}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Upvote
            </button>
            <div className="text-sm font-medium">{idea.upvotes}</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Idea</h3>
            <p className="whitespace-pre-wrap break-words text-gray-800 mb-6">
              {idea.text}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Posted{" "}
                {new Date(idea.createdAt || idea.created_at).toLocaleString()}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => onUpvote(idea.id)}
                  disabled={disabled}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Upvote
                </button>
                <div className="text-sm font-medium">{idea.upvotes}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
