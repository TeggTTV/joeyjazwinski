import Image from "next/image";
import { convertToSlug } from "../lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ArticleCard({ article, index, handleEdit, handleDelete, canCreate, router }: { article: any, index: number, handleEdit: any, handleDelete: any, canCreate: boolean, router: any }) {
    const [date, setDate] = useState(new Date().toDateString());

    useEffect(() => {
        setDate(new Date(article.createdAt).toDateString());
    })

    return (
        <div className="flex flex-col lg:flex-row w-full h-full relative" key={index}>
            {/* <div className="flex flex-col space-y-2 relative right-0 w-max h-max m-3">
                    <div className="text-white rounded text-center w-6 h-6" onClick={() => handleEdit(router, article)}></div>

                  </div> */}
            <div className="md:w-full space-y-2 min-h-20 mx-2 lg:mx-0 lg:ml-0 flex flex-col p-4 rounded items-center justify-center">
                <Image src={article.coverImage}
                    alt="Article Thumbnail"
                    className="h-full w-full object-cover bg-center rounded md:max-h-60 max-h-60"
                    width={300}
                    height={200}
                    quality={100}
                    loading="lazy"
                />
            </div>
            <div className="md:w-full space-y-2 min-h-20 h-auto mx-2 lg:mx-0 lg:ml-0 flex flex-col p-4 rounded justify-between">
                <p className="text-center md:text-left text-wrap font-bold text-2xl lg:text-3xl min-h-10">{article.title}</p>
                {/* <Markdown className="text-center md:text-left text-wrap font-light text-md lg:text-xl min-h-10">
                    {article.description}
                    </Markdown> */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center min-h-10">
                    <p className="text-gray-400 text-sm">Last Updated <span className="text-primary">{article.createdAt ? date : ''}</span> by <span className="text-primary underline font-medium">{article.username}</span></p>
                    <Link className="bg-primary p-2 text-white rounded text-center min-w-40" href={`/article/${convertToSlug(article.title)}`}>
                        <span>Read Article</span>
                    </Link>
                </div>
            </div>
            {canCreate && (
                // edit and delete article button
                <div className="flex flex-col space-y-2 relative right-0 w-max h-max m-3">
                    <button className="text-white rounded text-center w-6 h-6" onClick={() => handleEdit(router, article)}>✏️</button>
                    <button className="text-white rounded text-center w-6 h-6" onClick={() => handleDelete(article.id)}>🗑️</button>
                </div>
            )}
        </div>
    );
}