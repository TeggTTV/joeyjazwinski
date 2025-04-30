import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

type ResponseData = {
	message: string;
};

export default async function POST(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const cookie = serialize('authToken', '', {
		path: '/',
		httpOnly: true,
		expires: new Date(0),
	});

	res.setHeader('Set-Cookie', cookie);
	return res.status(200).json({ message: 'Logout successful' });
}
