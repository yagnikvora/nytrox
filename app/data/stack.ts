/**
 * Technologies shown in the home-page marquee.
 *
 * NOTE: these mirror the tools already named in the service catalogue
 * (see data/services.tsx). Trim anything the studio doesn't actually work in -
 * a stack strip reads as a capability claim.
 *
 * `logo` is a file in public/stack/ (Devicon originals; Next.js, AWS, and
 * Playwright are recoloured so their dark parts read on the space background).
 * `brand` tints the chip's hover glow.
 */
export type StackItem = {
  name: string;
  logo: string;
  brand: string;
};

export const STACK: StackItem[] = [
  { name: "React", logo: "/stack/react.svg", brand: "#61dafb" },
  { name: "Next.js", logo: "/stack/nextjs.svg", brand: "#ffffff" },
  { name: "TypeScript", logo: "/stack/typescript.svg", brand: "#3178c6" },
  { name: "React Native", logo: "/stack/react.svg", brand: "#61dafb" },
  { name: "Flutter", logo: "/stack/flutter.svg", brand: "#27aacd" },
  { name: "Swift", logo: "/stack/swift.svg", brand: "#f05138" },
  { name: "Kotlin", logo: "/stack/kotlin.svg", brand: "#7f52ff" },
  { name: "Node.js", logo: "/stack/nodejs.svg", brand: "#5fa04e" },
  { name: "PostgreSQL", logo: "/stack/postgresql.svg", brand: "#4169e1" },
  { name: "GraphQL", logo: "/stack/graphql.svg", brand: "#e434aa" },
  { name: "Tailwind CSS", logo: "/stack/tailwindcss.svg", brand: "#38bdf8" },
  { name: "Figma", logo: "/stack/figma.svg", brand: "#a259ff" },
  { name: "AWS", logo: "/stack/aws.svg", brand: "#ff9900" },
  { name: "Playwright", logo: "/stack/playwright.svg", brand: "#2ead33" },
];
