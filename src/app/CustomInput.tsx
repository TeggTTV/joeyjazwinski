import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export default function CustomInput({
	name,
	type,
	value,
	placeHolder,
	onChange,
	onSubmit,
	className,
	extraButtons,
}: {
	name: string;
	type: string;
	value: string;
	placeHolder?: string;
	onChange: (value: string) => void;
	onSubmit?: () => void;
	setValue?: (value: string) => void;
	className?: string;
	extraButtons?: { name: string; onClick: () => void }[];
}) {
	const [val, setVal] = useState(value);

	useEffect(() => {
		setVal(value);
	});

	return (
		<>
			<label className="w-full h-full text-white text-xl">{name}</label>
			<div className="flex mt-4 justify-between">
				<input
					id="input"
					type={type}
					placeholder={placeHolder}
					onChange={(e) => {
						setVal(e.target.value);
						onChange(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && onSubmit) {
							onSubmit();
						}
					}}
					value={val}
					className={cn(
						'relative w-full h-10 bg-slate-700 border-none outline-none pl-2',
						className
					)}
				/>
				<div className="flex ml-2 gap-2">
					{extraButtons &&
						extraButtons.map((button, index) => (
							<button
								key={index}
								className="outline-none min-w-10 h-full bg-slate-700 text-white hover:bg-slate-800 hover:cursor-pointer"
								onClick={button.onClick}
                                aria-label={button.name}
							>
								{button.name}
							</button>
						))}
				</div>
			</div>
		</>
	);
}
