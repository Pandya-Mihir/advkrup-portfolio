import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react';

export function MinimalFooter() {
  const year = new Date().getFullYear();
  const company = [
    { title: 'About Us', href: '#about' },
    { title: 'Practice Areas', href: '#services' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Disclaimer', href: '#' },
    { title: 'Terms of Service', href: '#' },
  ];
  const resources = [
    { title: 'Blog', href: '/blog' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Land Disputes', href: '#services' },
    { title: 'Property Docs', href: '#services' },
    { title: 'Revenue Records', href: '#services' },
  ];
  const socialLinks = [
    { icon: <LinkedinIcon className="size-4" />, link: 'https://linkedin.com/in/krupal-savjani-a6a52a1b0/' },
    { icon: <TwitterIcon className="size-4" />, link: 'https://x.com/SavjaniKrupal' },
    { icon: <InstagramIcon className="size-4" />, link: '#' },
    { icon: <FacebookIcon className="size-4" />, link: '#' },
  ];
  return (
    <footer className="relative">
      <div className="bg-[radial-gradient(35%_80%_at_30%_0%,theme(colors.yellow.400/.1),transparent)] mx-auto max-w-4xl md:border-x">
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <a href="/" className="w-max">
              <span className="text-xl font-bold tracking-wider">Adv. Krupal Savjani</span>
            </a>
            <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
              Expert Land & Revenue Lawyer based in Ahmedabad, Gujarat. Dedicated to justice and personalized legal solutions.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="hover:bg-accent rounded-md border p-1.5"
                  target="_blank"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Resources</span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }, i) => (
                <a key={i} className="w-max py-1 text-sm duration-200 hover:underline" href={href}>
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Company</span>
            <div className="flex flex-col gap-1">
              {company.map(({ href, title }, i) => (
                <a key={i} className="w-max py-1 text-sm duration-200 hover:underline" href={href}>
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
          <p className="text-muted-foreground text-center font-thin">
            © Adv. Krupal Savjani. All rights reserved {year}. The information on this website is for general informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
