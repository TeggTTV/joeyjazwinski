// import { PrismaClient } from '@/generated/prisma';
// import { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method === 'POST') {
// 		const { name, email, message } = req.body;

// 		if (!name || !email || !message) {
// 			return res
// 				.status(400)
// 				.json({ message: 'All fields are required.' });
// 		}

// 		try {
// 			// Save the message to the database
// 			const newMessage = await prisma.message.create({
// 				data: {
					
// 					name,
// 					email,
// 					message,
// 				},
// 			});

// 			await prisma.$disconnect();
// 			return res.status(200).json({
// 				message: 'Message sent successfully!',
// 				data: newMessage,
// 			});
// 		} catch (error) {
// 			console.error('Error saving message to the database:', error);
// 			await prisma.$disconnect();
// 			return res.status(500).json({
// 				message: 'An error occurred while sending the message.',
// 			});
// 		}
// 	} else {
// 		await prisma.$disconnect();
// 		res.setHeader('Allow', ['POST']);
// 		return res
// 			.status(405)
// 			.json({ message: `Method ${req.method} not allowed.` });
// 	}
// }
