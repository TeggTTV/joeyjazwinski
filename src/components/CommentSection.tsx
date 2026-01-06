'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaReply, FaTrash } from 'react-icons/fa';
import { Comment } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { toast } from 'react-toastify';

type CommentWithDepth = Comment & { depth: number };

const CommentSection: React.FC<{ slug: string; comments: Comment[] }> = ({
	slug,
	comments,
}) => {
	const [newComment, setNewComment] = useState('');
	const [replyingToId, setReplyingToId] = useState<string | null>(null);
	const [replyingToName, setReplyingToName] = useState<string | null>(null);
	const [dynamicComments, setDynamicComments] = useState(comments);

	const organizedComments = useMemo(() => {
		const map = new Map<string, Comment[]>();
		const roots: Comment[] = [];

		// Group by parent
		dynamicComments.forEach((c) => {
			const parentId = (c as any).replyingToId;
			if (parentId) {
				if (!map.has(parentId)) map.set(parentId, []);
				map.get(parentId)!.push(c);
			} else {
				roots.push(c);
			}
		});

		const result: CommentWithDepth[] = [];
		const traverse = (list: Comment[], depth: number) => {
			list.forEach((c) => {
				result.push({ ...c, depth });
				if (c.id && map.has(c.id)) {
					traverse(map.get(c.id)!, depth + 1);
				}
			});
		};

		traverse(roots, 0);
		return result;
	}, [dynamicComments]);
	// ... keep rest same until render loop

	const refreshComments = async () => {
		try {
			const response = await fetch(getFullUrl('/api/getComments'), {
				method: 'POST',
				body: slug,
			});
			if (!response.ok) {
				throw new Error('Failed to fetch updated comments');
			}
			const data = await response.json();
			const formattedComments = data.comments.map((c: any) => ({
				...c,
				createdAt: c.createdAt
					? new Date(c.createdAt).toLocaleDateString()
					: '',
				updatedAt: c.updatedAt
					? new Date(c.updatedAt).toLocaleDateString()
					: '',
			}));
			setDynamicComments(formattedComments);
		} catch (error) {
			console.error('Error refreshing comments:', error);
		}
	};

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
				if (data.message === 'Comment created successfully.') {
					console.log('Comment added successfully');
					refreshComments(); // Refresh comments after adding a new one
				} else {
					toast.error('Failed to add comment');
				}
			});

		setNewComment('');
	};

	const handleDelete = async (commentId: string) => {
		if (!confirm('Are you sure you want to delete this comment?')) return;
		try {
			const response = await fetch(
				getFullUrl('/api/deleteComment', `id=${commentId}`),
				{
					method: 'DELETE',
				}
			);
			if (response.ok) {
				toast.success('Comment deleted');
				refreshComments();
			} else {
				toast.error('Failed to delete comment');
			}
		} catch (error) {
			console.error(error);
			toast.error('Error deleting comment');
		}
	};

	const handleReply = (commentId: string, authorName: string) => {
		setReplyingToId(commentId);
		setReplyingToName(authorName);
	};

	const handleReplySubmit = async (e: React.FormEvent, commentId: string) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		const reply = {
			content: newComment,
			slug: slug,
			parentId: commentId,
			authorName: replyingToName,
			authorId: replyingToId,
			replying: true,
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
				if (data.message === 'Comment created successfully.') {
					console.log('Reply added successfully');
					refreshComments();
					setReplyingToId(null);
					setReplyingToName(null);
				} else {
					console.error('Failed to add reply');
					toast.error('Failed to add reply');
				}
			});

		setNewComment('');
	};

	const viewProfile = (user: string) => {
		console.log(`Viewing profile of ${user}`);
	};

	return (
		<section className="max-w-5xl py-8">
			<h2 className="text-2xl font-semibold mb-4">Comments</h2>
			<ul className="space-y-4 mb-6">
				<AnimatePresence>
					{organizedComments.map((c) => (
						<motion.li
							key={c.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className={`relative flex flex-col border p-4 rounded space-x-4 ${
								c.depth > 0
									? 'border-l-4 border-l-blue-500 bg-gray-50'
									: ''
							}`}
							style={{ marginLeft: `${c.depth * 24}px` }}
						>
							<div className="flex items-center gap-4 mb-2">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileFocus={{ scale: 0.95 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center space-x-2 cursor-pointer"
									onClick={() =>
										viewProfile(c.authorId || '')
									}
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
							<div className="absolute top-2 right-2 flex gap-2">
								<button
									onClick={() =>
										handleReply(
											c.id || '',
											c.authorName || ''
										)
									}
									className="text-blue-500 hover:text-blue-700"
									aria-label="Reply"
								>
									<FaReply size={20} />
								</button>
								<button
									onClick={() => handleDelete(c.id || '')}
									className="text-red-500 hover:text-red-700"
									aria-label="Delete"
								>
									<FaTrash size={18} />
								</button>
							</div>
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
