"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconMenu } from "@tabler/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { APP_LOGO } from "@/constants/metadata";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  link: string;
  icon: any;
  label: string;
  active?: boolean;
}

const Navigation = ({ link, icon, label, active }: NavigationProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={link}
            className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[state=open]:bg-gray-800/50",
              active &&
                "bg-blue-100/50 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            )}
            aria-label={label}
          >
            {icon}
            <span className="sr-only">Open {label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface HeaderProps {
  links: { link: string; label: string; icon: any }[];
}

export function Header({ links }: HeaderProps) {
  const pathname = usePathname();
  return (
    <header className="flex h-[60px] w-full shrink-0 items-center px-4 md:px-6 rounded-md">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <nav aria-label="Main navigation" className="flex w-full items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden"
              size="icon"
              variant="outline"
              aria-label="Toggle navigation menu"
            >
              <IconMenu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link
              className="flex items-center gap-2 "
              href="/"
              aria-label="Home"
            >
              <Image
                src={APP_LOGO}
                alt="UMT Fellow's logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-extrabold">UMT Fellow</span>
            </Link>
            <div className="grid gap-2 py-6">
              {links.map((link, index) => (
                <Link
                  href={link.link}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  key={index}
                  aria-label={link.label}
                >
                  <span className="flex gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-[210px]">
          <Link
            className="hidden lg:flex items-center gap-2 "
            href="/"
            aria-label="Home"
          >
            <Image
              src={APP_LOGO}
              alt="UMT Fellow's logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-extrabold">UMT Fellow</span>
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {links.map((link, index) => (
                <Navigation
                  link={link.link}
                  icon={link.icon}
                  label={link.label}
                  key={index}
                  active={pathname === link.link}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex w-[150px] items-center justify-end gap-2">
          <ThemeToggle />
          <Button>Get Started</Button>
        </div>
      </nav>
    </header>
  );
}
