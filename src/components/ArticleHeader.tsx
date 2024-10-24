import Markdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";


export function ArticleHeader({ title, description, coverImage, author }: { title: string, description: string, coverImage: string, author: string }) {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Navbar />
            <MaxWidthWrapper className="space-y-4 items-center flex flex-col w-[90%]">
                <div className="md:w-full space-y-2 min-h-20 mx-2 lg:mx-0 lg:ml-0 flex flex-col rounded items-center justify-center">
                    <Image
                        src={coverImage}
                        alt="Article Thumbnail"
                        className="object-cover rounded ml-10 mr-10 max-h-64 w-full"
                        width={300}
                        height={200}
                        quality={100}
                    />
                </div>
                <h1 className="w-full lg:w-full md:text-5xl text-4xl font-bold ml-10 md:ml-0 mr-10 md:mr-0">{title}</h1>
                <Markdown className="w-full lg:w-full text-gray-400 md:ml-0">{description}</Markdown>
                <div className="flex justify-between md:mr-0 w-full lg:w-full">
                    <p className="text-gray-400">Last Updated {date.toDateString()}</p>
                    <Link href="https://github.com/TeggTTV" className="text-white">
                        Written By <span className="text-primary underline">{author}</span>
                    </Link>
                </div>
            </MaxWidthWrapper>

        </>
    );
}