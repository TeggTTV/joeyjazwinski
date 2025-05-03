'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaReply } from 'react-icons/fa';
import { Comment } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';

const CommentSection: React.FC<{ slug: string; comments: Comment[] }> = ({
	slug,
	comments,
}) => {
	const [newComment, setNewComment] = useState('');
	const [replyingToId, setReplyingToId] = useState<number | null>(null);
	const [replyingToName, setReplyingToName] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		await fetch(getFullUrl('/api/createComment'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				content: newComment,
				slug: slug,
			}),
			credentials: 'include',
		})
			.then((response) => {
				if (!response.ok) {
					console.error('Failed to add comment');
					return;
				}
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					console.log('Comment added successfully');
				} else {
					console.error('Failed to add comment');
				}
			});

		setNewComment('');
	};

	const handleReply = (commentId: number, authorName: string) => {
		setReplyingToId(commentId);
		setReplyingToName(authorName);
	};

	const handleReplySubmit = async (e: React.FormEvent, commentId: number) => {
		e.preventDefault();
		if (!newComment.trim()) return;
		return;
		const reply = {
			content: newComment,
			postSlug: slug,
			parentId: commentId,
			authorName: replyingToName,
			authorId: replyingToId,
			replying: true
		};

		await fetch(getFullUrl('/api/createComment'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reply),
			credentials: 'include',
		})
			.then((response) => {
				if (!response.ok) {
					console.error('Failed to add reply');
					return;
				}
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					console.log('Reply added successfully');
				} else {
					console.error('Failed to add reply');
				}
			});

		setNewComment('');
		setReplyingTo(null);
	};

	const viewProfile = (user: string) => {
		console.log(`Viewing profile of ${user}`);
	};

	return (
		<section className="max-w-5xl mx-auto py-8">
			<h2 className="text-2xl font-semibold mb-4">Comments</h2>
			<ul className="space-y-4 mb-6">
				<AnimatePresence>
					{comments.map((c) => (
						<motion.li
							key={c.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="relative flex flex-col border p-4 rounded space-x-4"
						>
							<div className="flex items-center gap-4 mb-2">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileFocus={{ scale: 0.95 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center space-x-2 cursor-pointer"
									onClick={() => viewProfile(c.authorId)}
								>
									<FaUserCircle
										size={30}
										className="text-blue-600"
									/>
								</motion.div>
								<p className="text-sm">
									{c.authorName} on {c.createdAt}
								</p>
							</div>
							<p>{c.content}</p>
							<button
								onClick={() => handleReply(c.id, c.authorName)}
								className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
								aria-label="Reply"
							>
								<FaReply size={20} />
							</button>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
			<form onSubmit={handleSubmit} className="space-y-2">
				{replyingToId && replyingToName && (
					<div className="bg-gray-100 p-2 rounded-t text-sm text-gray-700">
						Replying to {replyingToName}
					</div>
				)}
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					rows={4}
					className="w-full p-2 border rounded focus:outline-none focus:ring"
					placeholder="Write your comment..."
				/>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
					type="submit"
					className="cursor-pointer px-4 py-2 rounded text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-primary"
					onClick={
						replyingToId
							? (e) => handleReplySubmit(e, replyingToId)
							: handleSubmit
					}
					aria-label="Submit Comment"
				>
					Submit
				</motion.button>
			</form>
		</section>
	);
};

export default CommentSection;
