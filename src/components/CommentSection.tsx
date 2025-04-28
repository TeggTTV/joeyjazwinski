"use client";

import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Alice', text: 'Great post!', date: '2025-04-25' },
    { id: 2, author: 'Bob', text: 'Very informative.', date: '2025-04-26' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const nextComment: Comment = {
      id: Date.now(),
      author: 'Anonymous',
      text: newComment,
      date: new Date().toLocaleDateString(),
    };
    setComments([...comments, nextComment]);
    setNewComment('');
  };

  return (
    <section className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-4 mb-6">
        {comments.map(c => (
          <li key={c.id} className="border p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">
              {c.author} on {c.date}
            </p>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded focus:outline-none focus:ring"
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 rounded text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-primary"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentSection;
