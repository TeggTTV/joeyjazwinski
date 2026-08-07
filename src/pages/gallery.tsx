import { useEffect, useState } from 'react';
import Image from 'next/image';

const GalleryPage = () => {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		// Fetch the list of images from the uploads folder
		const fetchImages = async () => {
			const res = await fetch('/api/listImages');
			const data = await res.json();
			setImages(data.images || []);
		};
		fetchImages();
	}, []);

	return (
		<div className="max-w-3xl mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Gallery</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{images.length === 0 && <p>No images found.</p>}
				{images.map((img) => (
					<Image
						key={img}
						src={img}
						alt="Uploaded"
						className="w-full h-auto rounded shadow"
					/>
				))}
			</div>
		</div>
	);
};

export default GalleryPage;
