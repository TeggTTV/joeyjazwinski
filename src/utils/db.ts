export interface BlogPostData {
    title: string;
    description: string;
    content: string;
    tags?: string[]; // Optional tags field
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string; // Optional slug field for URL
}

export interface TutorialData {
    title: string;
    description: string;
    content: string;
    tags?: string[]; // Optional tags field
    createdAt?: Date;
    updatedAt?: Date;
    difficulty?: "Beginner" | "Intermediate" | "Advanced"; // Optional difficulty field
    slug?: string; // Optional slug field for URL
}

export interface CommentData {
    content: string;
    postId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const isLocal = process.env.NEXT_PUBLIC_VERCEL_ENV === "local";
export const domain = isLocal ? "localhost:3000" : "joeyjazwinski.vercel.app";
export const protocol = isLocal ? "http://" : "https://";

export type ApiRoute =
	| '/api/createBlogPost'
	| '/api/createTutorialPost'
	| '/api/createComment'
	| '/api/getBlogPosts'
	| '/api/getTutorials'
	| '/api/getComments'
	| '/api/createUser'
	| '/api/login'
	| '/api/logout'
	| '/api/validateSession'
	| '/api/editUserCourseData'
	| '/api/getUserCourseData'
	| '/api/getCourses'
	| '/api/getCourseData' //TODO get the course data, lessons and exercises
	| '/api/updateCourse';

export const getFullUrl = (route: ApiRoute, query?: string): string => {
    const fullUrl = `${protocol}${domain}${route}${query ? `?${query}` : ""}`;
    console.log("Constructed API URL:", fullUrl);
    return fullUrl;
};

export function createBlogPost(data: BlogPostData) {
    return fetch(getFullUrl("/api/createBlogPost"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error creating blog post:", error);
            throw error;
        });
}

export function createTutorialPost(data: TutorialData) {
    return fetch("/api/createTutorialPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error creating tutorial post:", error);
            throw error;
        });
}

export function createComment(data: CommentData) {
    return fetch("/api/createComment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error creating comment:", error);
            throw error;
        });
}

export function getBlogPosts() {
    return fetch(getFullUrl("/api/getBlogPosts"))
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
            }
            if (!response.headers.get("Content-Type")?.includes("application/json")) {
                throw new Error("Invalid response format: Expected JSON");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data.blogPosts.map((post: BlogPostData) => ({
                ...post,
            }));
        })
        .catch((error) => {
            console.error("Error fetching blog posts:", error);
            throw error;
        });
}

export function getTutorials() {
    return fetch(getFullUrl("/api/getTutorials"))
        .then((response) => response.json())
        .then((data) => data.tutorials)
        .catch((error) => {
            console.error("Error fetching tutorials:", error);
            throw error;
        });
}

export function getComments(postId: number) {
    return fetch(getFullUrl("/api/getComments", `postId=${postId}`))
        .then((response) => response.json())
        .then((data) => data.comments)
        .catch((error) => {
            console.error("Error fetching comments:", error);
            throw error;
        });
}

export function getBlogPostBySlug(slug: string): Promise<BlogPostData> {
    return fetch(getFullUrl("/api/getBlogPosts", `slug=${slug}`))
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
            }
            if (!response.headers.get("Content-Type")?.includes("application/json")) {
                throw new Error("Invalid response format: Expected JSON");
            }
            return response.json();
        })
        .then((data) => data.blogPost)
        .catch((error) => {
            console.error("Error fetching blog post by slug:", error);
            throw error;
        });
}
export function getTutorialBySlug(slug: string) {
    return fetch(getFullUrl("/api/getTutorials", `slug=${slug}`))
        .then((response) => response.json())
        .then((data: { tutorialPost: TutorialData }) => data.tutorialPost)
        .catch((error) => {
            console.error("Error fetching tutorial by slug:", error);
            throw error;
        });
}
export function getBlogPostsByTag(tag: string) {
    return fetch(getFullUrl("/api/getBlogPosts", `tag=${tag}`))
        .then((response) => response.json())
        .then((data) => data.blogPosts)
        .catch((error) => {
            console.error("Error fetching blog posts by tag:", error);
            throw error;
        });
}
export function getTutorialsByTag(tag: string) {
    return fetch(getFullUrl("/api/getTutorials", `tag=${tag}`))
        .then((response) => response.json())
        .then((data) => data.tutorials)
        .catch((error) => {
            console.error("Error fetching tutorials by tag:", error);
            throw error;
        });
}
export function getTutorialsByDifficulty(difficulty: string) {
    return fetch(getFullUrl("/api/getTutorials", `difficulty=${difficulty}`))
        .then((response) => response.json())
        .then((data) => data.tutorials)
        .catch((error) => {
            console.error("Error fetching tutorials by difficulty:", error);
            throw error;
        });
}
