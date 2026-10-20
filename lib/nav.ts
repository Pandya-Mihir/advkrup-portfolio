/**
 * The site's primary pages, in menu order. Shared by the navbar's menu and
 * the footer's "Navigate" list so the two cannot drift apart.
 *
 * A plain module rather than an export of navbar.tsx: that file is a client
 * component, and a server component (the footer) importing a value from a
 * "use client" module gets a client reference, not the array.
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/areas", label: "Areas" },
] as const;
