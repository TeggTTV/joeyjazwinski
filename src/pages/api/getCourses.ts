import { PrismaClient } from "../../generated/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('asd');
    
    try {

        const courses = await prisma.course.findMany();

        return res.status(200).json({ data: courses });
    } catch (error) {
        console.error("Error in getCourses API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
