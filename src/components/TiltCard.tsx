import React, { useRef, useState } from 'react';

interface TiltCardProps {
	children: React.ReactNode;
	className?: string;
	tiltAmount?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
	children,
	className = '',
	tiltAmount = 15,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [rotation, setRotation] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (y - centerY) / tiltAmount;
		const rotateY = (centerX - x) / tiltAmount;
		setRotation({ x: rotateX, y: rotateY });
	};

	const handleMouseLeave = () => {
		setRotation({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			style={{
				transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
				transition: 'transform 0.15s ease-out',
			}}
			className={className}
		>
			{children}
		</div>
	);
};

export default TiltCard;
