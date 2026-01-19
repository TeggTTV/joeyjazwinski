import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { toast } from 'react-toastify';
import {
	Users,
	UserPlus,
	Edit3,
	Trash2,
	Save,
	X,
	ChevronLeft,
	ChevronRight,
	Mail,
	Lock,
	User as UserIcon,
} from 'lucide-react';

export default function ManageUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 10;

	const [newUser, setNewUser] = useState<User>({
		email: '',
		password: '',
		name: '',
	});
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch(getFullUrl('/api/getUsers'));
				const data = await response.json();
				console.log('Fetched users:', data);
				setUsers(data.users || []);
			} catch (error) {
				console.error('Error fetching users:', error);
				setUsers([]);
			}
		}
		fetchUsers();
	}, []);

	const handleCreateUser = async () => {
		setIsCreating(true);
		try {
			const response = await fetch(getFullUrl('/api/createUser'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});
			if (response.ok) {
				toast.success('User created successfully!');
				setNewUser({ email: '', password: '', name: '' });
				const updatedUsers = await response.json();
				setUsers(updatedUsers);
			} else {
				toast.error('Failed to create user.');
			}
		} finally {
			setIsCreating(false);
		}
	};

	const handleEditUser = async () => {
		if (!editingUser) return;
		const response = await fetch(getFullUrl(`/api/updateUser`), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(editingUser),
		});
		if (response.ok) {
			toast.success('User updated successfully!');
			setEditingUser(null);
			const updatedUsers = await response.json();
			setUsers(updatedUsers);
		} else {
			toast.error('Failed to update user.');
		}
	};

	const handleDeleteUser = async (userId: string) => {
		const response = await fetch(getFullUrl(`/api/deleteUser`), {
			method: 'POST',
			credentials: 'include',
			body: userId,
		});
		if (response.ok) {
			toast.success('User deleted successfully!');
			setUsers(users.filter((user) => user.id !== userId));
		} else {
			toast.error('Failed to delete user.');
		}
	};

	const totalPages = Math.ceil(users.length / usersPerPage);
	const paginatedUsers = users.slice(
		(currentPage - 1) * usersPerPage,
		currentPage * usersPerPage,
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="space-y-6"
		>
			{/* Create User Card */}
			<div className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl shadow-black/5">
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

				<div className="p-6 md:p-8 space-y-6">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25">
							<UserPlus className="w-6 h-6 text-white" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-foreground">
								Create User
							</h2>
							<p className="text-sm text-muted-foreground">
								Add a new user to the system
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-foreground">
								<UserIcon className="w-4 h-4 text-muted-foreground" />
								Name
							</label>
							<input
								type="text"
								autoComplete="off"
								autoCorrect="off"
								placeholder="Enter name..."
								value={newUser.name}
								onChange={(e) =>
									setNewUser({
										...newUser,
										name: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-foreground">
								<Mail className="w-4 h-4 text-muted-foreground" />
								Email
							</label>
							<input
								type="email"
								autoComplete="off"
								autoCorrect="off"
								placeholder="Enter email..."
								value={newUser.email}
								onChange={(e) =>
									setNewUser({
										...newUser,
										email: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-sm font-medium text-foreground">
								<Lock className="w-4 h-4 text-muted-foreground" />
								Password
							</label>
							<input
								type="password"
								placeholder="Enter password..."
								value={newUser.password}
								onChange={(e) =>
									setNewUser({
										...newUser,
										password: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							/>
						</div>
					</div>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleCreateUser}
						disabled={isCreating}
						className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
					>
						{isCreating ? (
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 1,
									repeat: Infinity,
									ease: 'linear',
								}}
							>
								<UserPlus className="w-5 h-5" />
							</motion.div>
						) : (
							<UserPlus className="w-5 h-5" />
						)}
						Create User
					</motion.button>
				</div>
			</div>

			{/* Edit User Modal */}
			<AnimatePresence>
				{editingUser && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/50 rounded-3xl shadow-xl shadow-primary/10"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />

						<div className="p-6 md:p-8 space-y-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg shadow-yellow-500/25">
										<Edit3 className="w-6 h-6 text-white" />
									</div>
									<div>
										<h2 className="text-xl font-bold text-foreground">
											Edit User
										</h2>
										<p className="text-sm text-muted-foreground">
											Editing: {editingUser.name}
										</p>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={() => setEditingUser(null)}
									className="p-2 hover:bg-secondary rounded-lg transition-colors"
								>
									<X className="w-5 h-5 text-muted-foreground" />
								</motion.button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-sm font-medium text-foreground">
										<UserIcon className="w-4 h-4 text-muted-foreground" />
										Name
									</label>
									<input
										type="text"
										placeholder="Name"
										value={editingUser.name}
										onChange={(e) =>
											setEditingUser({
												...editingUser,
												name: e.target.value,
											})
										}
										className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-sm font-medium text-foreground">
										<Mail className="w-4 h-4 text-muted-foreground" />
										Email
									</label>
									<input
										type="email"
										placeholder="Email"
										value={editingUser.email}
										onChange={(e) =>
											setEditingUser({
												...editingUser,
												email: e.target.value,
											})
										}
										className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-sm font-medium text-foreground">
										<Lock className="w-4 h-4 text-muted-foreground" />
										New Password
									</label>
									<input
										type="password"
										placeholder="Leave blank to keep current"
										value={editingUser.password || ''}
										onChange={(e) =>
											setEditingUser({
												...editingUser,
												password: e.target.value,
											})
										}
										className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-sm font-medium text-foreground">
										<Lock className="w-4 h-4 text-muted-foreground" />
										Confirm Password
									</label>
									<input
										type="password"
										placeholder="Confirm password"
										value={
											editingUser.confirmPassword || ''
										}
										onChange={(e) =>
											setEditingUser({
												...editingUser,
												confirmPassword: e.target.value,
											})
										}
										className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
									/>
								</div>
							</div>

							<div className="flex gap-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={handleEditUser}
									className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-green-500/25 transition-all"
								>
									<Save className="w-5 h-5" />
									Save Changes
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setEditingUser(null)}
									className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-all"
								>
									<X className="w-5 h-5" />
									Cancel
								</motion.button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* User List */}
			<div className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl shadow-black/5">
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

				<div className="p-6 md:p-8 space-y-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl shadow-lg shadow-violet-500/25">
								<Users className="w-6 h-6 text-white" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-foreground">
									User Directory
								</h2>
								<p className="text-sm text-muted-foreground">
									{users.length} users total
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<AnimatePresence>
							{paginatedUsers.map((user, index) => (
								<motion.div
									key={user.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ delay: index * 0.05 }}
									className="group flex items-center justify-between p-4 bg-gradient-to-br from-secondary/30 to-muted/20 hover:from-secondary/50 hover:to-muted/40 rounded-2xl border border-border/50 transition-all"
								>
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/25">
											{user.name?.[0]?.toUpperCase() ||
												'U'}
										</div>
										<div>
											<p className="font-semibold text-foreground">
												{user.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{user.email}
											</p>
										</div>
									</div>
									<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => setEditingUser(user)}
											className="p-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 rounded-xl transition-colors"
										>
											<Edit3 className="w-4 h-4" />
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() =>
												handleDeleteUser(user.id!)
											}
											className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-xl transition-colors"
										>
											<Trash2 className="w-4 h-4" />
										</motion.button>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between pt-4 border-t border-border">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() =>
									setCurrentPage((prev) =>
										Math.max(prev - 1, 1),
									)
								}
								disabled={currentPage === 1}
								className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronLeft className="w-4 h-4" />
								Previous
							</motion.button>

							<div className="flex items-center gap-2">
								{Array.from({ length: totalPages }, (_, i) => (
									<motion.button
										key={i + 1}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={() => setCurrentPage(i + 1)}
										className={`w-10 h-10 rounded-xl font-medium transition-all ${
											currentPage === i + 1
												? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
												: 'bg-secondary hover:bg-secondary/80 text-foreground'
										}`}
									>
										{i + 1}
									</motion.button>
								))}
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() =>
									setCurrentPage((prev) =>
										Math.min(prev + 1, totalPages),
									)
								}
								disabled={currentPage === totalPages}
								className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</motion.button>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
