// app/login/page.tsx
import Link from 'next/link';

export default function LoginPage() {
    async function handleSubmit(event: React.FormEvent) {
        const form = event.currentTarget as HTMLFormElement;
        console.log(form);

        event.preventDefault();
        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: (form.children[0] as HTMLInputElement).value,
                password: (form.children[1] as HTMLInputElement).value,
            }),
        });
    }

    return (
        <main className="min-h-screen flex flex-col items-center px-4">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm space-y-4">
                <input className="border rounded w-full py-2 px-3 text-gray-700" type="email" placeholder="Email" />
                <input className="border rounded w-full py-2 px-3 text-gray-700" type="password" placeholder="Password" />
                <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:scale-[1.02] transition-transform">
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
