import Link from "next/link";
import { Article, convertToSlug } from "../lib/utils";


export function ArticleMiddle({ toc, similarArticles }: { toc: string[], similarArticles: Article[] }) {
    return (
        <div className="md:w-full w-[calc(100vw-5rem)] space-y-2 h-auto">
            <div className="flex justify-between">
                <h2 className="text-primary">Table of Contents</h2>
                <h2 className="text-primary">Articles Like This</h2>
            </div>
            <div className="flex gap-10">
                <ul className="space-y-2 w-[50%]">
                    {toc.map((heading, index) => {
                        if (heading.startsWith('-')) {
                            return (
                                <li key={index} className="ml-4 list-disc marker:text-primary hover:underline">
                                    <Link href={`#${convertToSlug(heading.slice(2))}`}>
                                        {heading.slice(2)}
                                    </Link>
                                </li>
                            )
                        } else {
                            return (
                                // custom li bullet
                                <li key={index} className="list-disc marker:text-primary hover:underline">
                                    <Link href={`#${convertToSlug(heading)}`}>{heading}</Link>
                                </li>
                            )
                        }

                    })}
                </ul>
                <div className="w-[50%] lg:space-y-0 space-y-4">
                    {similarArticles.map((article: Article, index: number) => (
                        //    horizontal cards with just the title and description
                        <div className="flex flex-row" key={index}>
                            <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-center lg:space-x-4 space-y-reverse space-y-4 cursor-pointer" onClick={
                                () => {
                                    window.location.href = `/article/${convertToSlug(article.title)}`;
                                }
                            }>
                                {/* <div className="flex justify-between space-x-6 items-center"> */}
                                <a aria-label={convertToSlug(article.title)} href={`/article/${convertToSlug(article.title)}`} className="text-white text-lg hover:underline">{article.title}</a>
                                <div
                                    style={{ backgroundImage: `url('${article.coverImage}')` }}
                                    className={"min-w-52 h-[100px] bg-cover bg-center"}></div>
                                {/* </div> */}
                                {/* <p>{article.description}</p> */}
                                {/* <a className="bg-primary p-2 text-white rounded text-center w-full relative right-0 max-w-36" >Read Article</a> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}