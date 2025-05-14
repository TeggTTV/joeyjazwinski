// app/login/page.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function LoginPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent) {
		setLoading(true);
		const form = event.currentTarget.parentElement as HTMLFormElement;
		event.preventDefault();

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: (form.children[0] as HTMLInputElement).value,
				password: (form.children[1] as HTMLInputElement).value,
			}),
		});

		const result = await response.json();
		if (response.ok) {
			toast.success('Login successful!', {
				autoClose: 1000,
				onClose: () => {
					router.push('/'); // Redirect to home page
				},
			});
		} else {
			toast.error(result.message || 'An error occurred.');
		}

		setLoading(false);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="loader" />
			</div>
		);
	}

	return (
		<main className="min-h-screen flex flex-col items-center px-4">
			<ToastContainer />
			<h1 className="text-4xl font-bold mb-4">Login</h1>
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm space-y-4">
				<input
					className="border rounded w-full py-2 px-3 text-gray-700"
					type="email"
					placeholder="Email"
				/>
				<input
					className="border rounded w-full py-2 px-3 text-gray-700"
					type="password"
					placeholder="Password"
				/>
				<button
					onClick={handleSubmit}
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded hover:scale-[1.02] transition-transform"
				>
					Log In
				</button>
			</form>
			<p className="text-gray-500 text-sm">
				Don&apos;t have an account?{' '}
				<Link href="/signup" className="text-primary hover:underline">
					Sign Up
				</Link>
			</p>
		</main>
	);
}
