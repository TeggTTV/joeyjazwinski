import { PrismaClient } from "../../generated/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.authToken;
    const sessionToken = cookies.sessionToken;

    const { courseSlug, lessonSlug, completed, duration } = req.body;
    try {
        if (req.method === "POST") {
            if (
                !userId ||
                !courseSlug ||
                !lessonSlug ||
                completed === undefined ||
                duration === undefined
            ) {
                return res.status(400).json({
                    error: "Missing required fields",
                    userId,
                    courseSlug,
                    lessonSlug,
                    completed,
                    duration,
                });
            }

            // update course for the user
            // await prisma.user.update({
            //     where: {
            //         id: userId as string,
            //         sessionToken: sessionToken as string,
            //     },
            //     data: {

            // },

            await prisma.user.update({
                where: {
                    id: userId as string,
                    sessionToken: sessionToken as string,
                },

                data: {
                    courses: {
                        update: {
                            where: { slug: courseSlug as string },
                            data: {
                                lessons: {
                                    update: {
                                        where: { slug: lessonSlug as string },
                                        data: {
                                            completed: completed as boolean,
                                            duration: duration as number,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            return res.status(200).json({
                message: "User course data updated successfully",
                data: { courseSlug, lessonSlug, completed, duration },
            });
        } else {
            res.setHeader("Allow", ["POST"]);
            return res
                .status(405)
                .json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error("Error updating user course data:", error);
        return res
            .status(500)
            .json({ error: "Internal server error: " + error });
    }
}
