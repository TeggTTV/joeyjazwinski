import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFullUrl } from '@/utils/db';
import { User } from '@/lib/mdx';
import Select from 'react-select';
import { toast } from 'react-toastify';

export default function SendMessage() {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch(getFullUrl('/api/getUsers'), {
				method: 'GET',
				credentials: 'include',
			});
			const data = await response.json();
			console.log('Fetched users:', data.users);
			setUsers(data.users);
		}
		fetchUsers();
	}, []);

	const toggleSelectAll = () => {
		if (selectedUsers.length === users.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(
				users
					.map((user) => user.id)
					.filter((id): id is string => id !== undefined)
			);
		}
	};

	async function sendMessage() {
		try {
			const response = await fetch(getFullUrl('/api/sendMessages'), {
				method: 'POST',
				body: JSON.stringify({
					title,
					description,
					users: selectedUsers,
				}),
			});

			const data = await response.json();
			if (data.message === 'ok') {
				toast.success('Message sent successfully!');
				setTitle('');
				setDescription('');
				setSelectedUsers([]);
			} else {
				toast.error(`Failed to send message: ${data.message}`);
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred while sending the message.');
		}
	}

	return (
		<>
			<motion.section
				className="mb-4"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
				exit={{ opacity: 0, y: -20 }}
			>
				<h2 className="text-2xl font-bold mb-4">
					Send Messages To User(s)
				</h2>
				<label className="block text-sm font-medium text-gray-700">
					Select Users
				</label>
				<div className="flex items-center gap-2">
					<Select
						isMulti
						options={users
							.filter((user) => user.id !== undefined)
							.map((user) => ({
								value: user.id as string,
								label: user.name,
							}))}
						value={selectedUsers.map((userId) => {
							const user = users.find(
								(user) => user.id === userId
							);
							return { value: userId, label: user?.name };
						})}
						onChange={(selectedOptions) =>
							setSelectedUsers(
								selectedOptions.map((option) => option.value)
							)
						}
						className=""
						classNamePrefix="react-select"
					/>
					<button
						onClick={toggleSelectAll}
						className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
					>
						{selectedUsers.length === users.length
							? 'Deselect All'
							: 'Select All'}
					</button>
				</div>
			</motion.section>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border border-gray-300 rounded p-2 w-full"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="border border-gray-300 rounded p-2 w-full"
				/>
			</div>

			<motion.button
				whileFocus={{ scale: 0.95 }}
				whileTap={{ scale: 0.95 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.2 }}
				type="submit"
				className="cursor-pointer bg-primary-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
				onClick={sendMessage}
			>
				Send Message
			</motion.button>
		</>
	);
}
