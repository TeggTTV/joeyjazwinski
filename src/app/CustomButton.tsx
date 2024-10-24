"use client";

import { cn } from "../lib/utils";

export function CustomButton({ name, onClick, className }: { name: String, onClick: () => void, className?: string }) {
    return (
        <div onClick={onClick} className={cn("text-center bg-green-600 w-40 rounded py-2 hover:cursor-pointer hover:bg-green-600/90 mt-4", className)}>
            {name}
        </div>
    )
}