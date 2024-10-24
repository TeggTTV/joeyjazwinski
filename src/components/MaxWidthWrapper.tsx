import { cn } from "../lib/utils";

export default function MaxWidthWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("mt-10 max-w-4xl w-full dark:bg-gray-900 left-0 right-0 mx-auto", className)}>
            {children}
        </div>
    );
}