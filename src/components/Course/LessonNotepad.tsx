import React, { useState, useEffect, useRef } from 'react';
import { FiSave, FiEdit3, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

interface Props {
	lessonSlug: string;
}

const LessonNotepad = ({ lessonSlug }: Props) => {
	const [content, setContent] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Load initial note
		const fetchNote = async () => {
			try {
				const res = await fetch(
					`/api/getLessonNote?lessonSlug=${lessonSlug}`,
					{
						credentials: 'include',
					}
				);
				if (res.ok) {
					const data = await res.json();
					setContent(data.content || '');
				} else if (res.status === 401) {
					// User not logged in, maybe disable or show login prompt
					// For now, just silently fail or show nothing
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchNote();
	}, [lessonSlug]);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			const res = await fetch('/api/saveLessonNote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lessonSlug, content }),
			});
			if (res.ok) {
				setLastSaved(new Date());
			} else {
				toast.error('Failed to save note');
			}
		} catch (error) {
			console.error('Error saving note:', error);
			toast.error('Error saving note');
		} finally {
			setIsSaving(false);
		}
	};

	// Auto-save logic
	useEffect(() => {
		if (autoSaveTimeoutRef.current) {
			clearTimeout(autoSaveTimeoutRef.current);
		}

		// Don't auto-save if empty or just loaded
		// Debounce 2 seconds
		autoSaveTimeoutRef.current = setTimeout(() => {
			if (content) {
				handleSave();
			}
		}, 2000);

		return () => {
			if (autoSaveTimeoutRef.current)
				clearTimeout(autoSaveTimeoutRef.current);
		};
	}, [content]);

	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50 group"
				title="Open Lesson Notes"
			>
				<FiEdit3 size={24} />
				<span className="absolute right-full mr-3 bg-popover text-popover-foreground px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
					Take Notes
				</span>
			</button>
		);
	}

	return (
		<div className="fixed bottom-6 right-6 w-80 md:w-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
			{/* Header */}
			<div className="flex items-center justify-between p-3 bg-secondary/50 border-b border-border cursor-grab active:cursor-grabbing">
				<div className="flex items-center gap-2">
					<span className="text-sm font-bold flex items-center gap-2">
						<FiEdit3 className="text-primary" /> Notes
					</span>
					{isSaving ? (
						<span className="text-[10px] text-muted-foreground animate-pulse">
							Saving...
						</span>
					) : lastSaved ? (
						<span className="text-[10px] text-green-500">
							Saved{' '}
							{lastSaved.toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					) : null}
				</div>
				<div className="flex items-center gap-1">
					<button
						onClick={handleSave}
						className="p-1.5 hover:bg-background rounded text-muted-foreground hover:text-primary"
						title="Save Now"
					>
						<FiSave size={14} />
					</button>
					<button
						onClick={() => setIsOpen(false)}
						className="p-1.5 hover:bg-background rounded text-muted-foreground hover:text-red-500"
						title="Close"
					>
						<FiMinimize2 size={14} />
					</button>
				</div>
			</div>

			{/* Textarea */}
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Type your notes here... (Markdown supported)"
				className="flex-grow h-64 w-full p-4 bg-background resize-none focus:outline-none text-sm leading-relaxed"
			/>

			{/* Footer hint */}
			<div className="px-3 py-1.5 bg-secondary/30 text-[10px] text-muted-foreground text-center border-t border-border">
				Auto-saved automatically
			</div>
		</div>
	);
};

export default LessonNotepad;
