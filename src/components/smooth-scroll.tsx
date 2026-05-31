"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

function ScrollHandler() {
    const pathname = usePathname();
    const lenis = useLenis();
    const isPopNavigation = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handlePopState = () => {
            isPopNavigation.current = true;
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        if (!lenis || typeof window === "undefined") return;

        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                lenis.scrollTo(target, { immediate: true });
                return;
            }
        }

        if (isPopNavigation.current) {
            isPopNavigation.current = false;
            return;
        }

        lenis.scrollTo(0, { immediate: true });
    }, [pathname, lenis]);

    return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothWheel: true }}>
            <ScrollHandler />
            {children}
        </ReactLenis>
    );
}
