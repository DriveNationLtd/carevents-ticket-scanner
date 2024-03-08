import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const body = document.querySelector("body");
    body?.classList.add("animate__fadeOut");
    setTimeout(() => {
        body?.classList.remove("animate__fadeOut");
        router.push(href);
    }, 200);
}