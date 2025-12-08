import { NextApiRequest, NextApiResponse } from 'next';

// Contact API endpoint - currently disabled
// The contact page now displays contact information instead of a form
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return res.status(404).json({
		message:
			'Contact form is currently disabled. Please use the contact information displayed on the contact page.',
	});
}
