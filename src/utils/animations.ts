import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// https://github.com/sixfwa/nextjs-gsap-page-transitions/blob/main/src/utils/animations.ts
export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const body = document.querySelector("body");
    body?.classList.add("animate__fadeOut");
    setTimeout(() => {
        body?.classList.remove("animate__fadeOut");
        router.push(href);
    }, 200);
}