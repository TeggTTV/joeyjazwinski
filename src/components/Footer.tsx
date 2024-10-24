"use client";
import { toast } from "react-toastify";
import { getFullUrl } from "../lib/utils";
import Link from "next/link";

async function submitEmail(email: string) {
    await fetch(getFullUrl("/api/subscribe"), {
        method: "POST",
        body: JSON.stringify({ email: email }),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
        }
    }).then((data) => {
        console.log(data);
        
        if (data.message === "Email created") {
            toast.success("Subscribed successfully");
        } else if (data.message == "Email already exists") {
            toast.error("Email already exists");
        } else {
            toast.error("Internal Server Error");
        }
    })
}

export default function Footer() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;

        if (!email) {
            toast.error("Please enter a valid email!");
            return;
        }
        submitEmail(email);
    }

    return (
        <footer className="bg-gray-900 max-w-4xl static left-0 right-0 bottom-0 mx-auto">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between flex flex-col md:flex-row flex-wrap">
                    <div className="mb-6 md:mb-0">
                        <Link href="https://flowbite.com/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">TDBlog</span>
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* create a newsletter section */}
                        <div className="w-[100%]">
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Newsletter</h2>
                            <p className="text-gray-400">Subscribe to our newsletter and get the latest news and updates.</p>
                            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row">
                                <input type="email" id="email" placeholder="Email" className="sm:w-[200%] h-10 p-2 rounded bg-gray-800 text-gray-100 outline-none" />
                                <button type="submit" className="w-full h-10 sm:ms-2 mt-2 sm:mt-0 bg-primary text-white rounded hover:bg-blue-600">Subscribe</button>
                            </form>
                        </div>

                        <div className="min-w-[150px]">
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="https://github.com/TeggTTV" className="hover:underline ">Github</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="https://x.com/T3ggTTV" className="hover:underline ">Twitter</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="min-w-[150px]">
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="https://td-blog-five.vercel.app/" className="hover:underline">TDBlog</Link>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
                        <Link href="https://x.com/T3ggTTV" className="text-gray-500 hover:text-gray-900 dark:hover:text-white sm:ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </Link>
                        <Link href="https://github.com/teggttv" className="text-gray-500 hover:text-gray-900 dark:hover:text-white sm:ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>

    );
}