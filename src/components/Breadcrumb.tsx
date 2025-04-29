"use client";
import Link from "next/link";
import { useBreadcrumb } from './BreadcrumbContext';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { extraCrumbs } = useBreadcrumb();
    const { asPath } = useRouter();
    
    useEffect(() => {
        setIsMounted(true);

    }, []);

    if (!isMounted) return null;

    const pathname = asPath.split("?")[0];
    if (!pathname) return null;

    const rawSegments = pathname.split("/").filter(Boolean);
    const segments = extraCrumbs.length > 0
        ? rawSegments.filter(segment => segment !== 'search')
        : rawSegments;

    const breadcrumbs = segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const label = segment.replace(/-/g, " ");
        return {
            href,
            label: label.charAt(0).toUpperCase() + label.slice(1),
        };
    });
    if (segments.length === 0) return null;
    return (
        <nav className="w-full max-w-5xl mb-5 mx-auto bg-white dark:bg-gray-800 py-3" aria-label="Breadcrumb">
            <ol className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                {segments.length > 0 && (

                    <li>
                        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
                            Home
                        </Link>
                    </li>
                )}
                {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center">
                        <span className="mx-2 text-gray-400 dark:text-gray-500">›</span>
                        {i === breadcrumbs.length - 1 ? (
                            <span className="text-gray-800 dark:text-gray-100 font-medium">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
                {/* dynamic extra crumbs */}
                {extraCrumbs.map((crumb, i) => (
                    <li key={`${crumb.href}-${i}`} className="flex items-center">
                        <span className="mx-2 text-gray-400 dark:text-gray-500">›</span>
                        <Link href={crumb.href} className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-500 font-medium">
                            {crumb.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
