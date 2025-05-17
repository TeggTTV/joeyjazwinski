import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextSeo } from 'next-seo';
import { seoContact } from '@/lib/seoConfig';
import { motion } from 'framer-motion';

export default function ContactPage() {
    async function handleSubmit(event: React.FormEvent) {
        const form = event.currentTarget.parentElement as HTMLFormElement;
        event.preventDefault();

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: (form.children[0] as HTMLInputElement).value,
                email: (form.children[1] as HTMLInputElement).value,
                message: (form.children[2] as HTMLTextAreaElement).value,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            toast.success('Message sent successfully!');
            form.reset();
        } else {
            toast.error(result.message || 'An error occurred.');
        }
    }

    return (
        <>
            <NextSeo {...seoContact} />
            <main className="min-h-screen flex flex-col items-center">
                <ToastContainer />
                <motion.h1
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Get In Touch
                </motion.h1>
                <motion.form
                    className="bg-white px-8 pt-6 pb-8 mb-4 w-full max-w-xl space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <input className="border rounded w-full py-2 px-3 text-gray-700" type="text" placeholder="Name" />
                    <input className="border rounded w-full py-2 px-3 text-gray-700" type="email" placeholder="Email" />
                    <textarea className="border rounded w-full py-2 px-3 text-gray-700" placeholder="Message" rows={4}></textarea>
                    <motion.button
                        onClick={handleSubmit}
                        type="submit"
                        className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:scale-[1.02] transition-transform"
                        aria-label="Send Message"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
                <motion.p
                    className="text-gray-500 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Go back to{' '}
                    <Link href="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </motion.p>
            </main>
        </>
    );
}