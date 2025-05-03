import { useState, useEffect } from 'react';
import { User } from '@/lib/mdx';
import { getFullUrl } from '@/utils/db';
import { toast } from 'react-toastify';

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

	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch(getFullUrl('/api/getUsers'));
			const data = await response.json();
			console.log('Fetched users:', data);
			setUsers(data.users);
		}
		fetchUsers();
	}, []);

	const handleCreateUser = async () => {
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
	};

	const handleEditUser = async () => {
		if (!editingUser) return;
		// const response = await fetch(getFullUrl(`/api/updateUser`), {
		// 	method: 'PUT',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(editingUser),
		// });
		// if (response.ok) {
		// 	toast.success('User updated successfully!');
		// 	setEditingUser(null);
		// 	const updatedUsers = await response.json();
		// 	setUsers(updatedUsers);
		// } else {
		// 	toast.error('Failed to update user.');
		// }
	};

	const handleDeleteUser = async (userId: string) => {
		const response = await fetch(getFullUrl(`/api/deleteUser`), {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(userId),
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
		currentPage * usersPerPage
	);

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4">Manage Users</h2>

			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Create User</h3>
				<div className="grid gap-4">
					<input
						type="text"
						autoComplete="off"
						autoCorrect="off"
						placeholder="Name"
						value={newUser.name}
						onChange={(e) =>
							setNewUser({ ...newUser, name: e.target.value })
						}
						className="border px-3 py-2 rounded"
					/>
					<input
						type="email"
						autoComplete="off"
						autoCorrect="off"
						placeholder="Email"
						value={newUser.email}
						onChange={(e) =>
							setNewUser({ ...newUser, email: e.target.value })
						}
						className="border px-3 py-2 rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						value={newUser.password}
						onChange={(e) =>
							setNewUser({ ...newUser, password: e.target.value })
						}
						className="border px-3 py-2 rounded"
					/>
					<button
						onClick={handleCreateUser}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Create User
					</button>
				</div>
			</div>

			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Edit User</h3>
				{editingUser && (
					<div className="grid gap-4">
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
							className="border px-3 py-2 rounded"
						/>
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
							className="border px-3 py-2 rounded"
						/>
						<input
							type="password"
							placeholder="Password"
							value={editingUser.password || ''}
							onChange={(e) =>
								setEditingUser({
									...editingUser,
									password: e.target.value,
								})
							}
							className="border px-3 py-2 rounded"
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							value={editingUser.confirmPassword || ''}
							onChange={(e) =>
								setEditingUser({
									...editingUser,
									confirmPassword: e.target.value,
								})
							}
							className="border px-3 py-2 rounded"
						/>
						<div className="flex gap-2">
							<button
								onClick={handleEditUser}
								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
							>
								Save Changes
							</button>
							<button
								onClick={() => setEditingUser(null)}
								className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>

			<div>
				<h3 className="text-lg font-semibold mb-2">User List</h3>
				<ul className="space-y-4">
					{paginatedUsers.map((user) => (
						<li
							key={user.id}
							className="flex justify-between items-center border p-4 rounded"
						>
							<div>
								<p className="font-medium">{user.name}</p>
								<p className="text-sm text-gray-500">
									{user.email}
								</p>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => setEditingUser(user)}
									className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
								>
									Edit
								</button>
								<button
									onClick={() => handleDeleteUser(user.id!)}
									className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
				<div className="flex justify-between items-center mt-4">
					<button
						onClick={() =>
							setCurrentPage((prev) => Math.max(prev - 1, 1))
						}
						disabled={currentPage === 1}
						className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Previous
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() =>
							setCurrentPage((prev) =>
								Math.min(prev + 1, totalPages)
							)
						}
						disabled={currentPage === totalPages}
						className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
