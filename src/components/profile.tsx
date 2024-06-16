"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Profile() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="bg-gray-100 dark:bg-gray-800 p-6 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Software Engineer at Acme Inc.
            </p>
          </div>
        </div>
      </header>
      <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2 flex space-x-4">
          <NavigationMenu>
            <NavigationMenuLink className="font-medium" href="#">
              <Link href="/posts" passHref>
                <NavigationMenuLink className="font-medium">
                  Posts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink className="font-medium" href="#">
              <Link href="/photos" passHref>
                <NavigationMenuLink className="font-medium">
                  Photos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink className="font-medium" href="#">
              <Link href="/videos" passHref>
                <NavigationMenuLink className="font-medium">
                  Videos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink className="font-medium" href="#">
              <Link href="/about" passHref>
                <NavigationMenuLink className="font-medium">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuLink>
          </NavigationMenu>
        </div>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-6">
        <div>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    2 hours ago
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Excited to share my latest project with you all! Check it out
                  and let me know what you think.
                </p>
                <img
                  alt="Project Screenshot"
                  className="mt-4 rounded-lg"
                  height={450}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "800/450",
                    objectFit: "cover",
                  }}
                  width={800}
                />
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <Button size="icon" variant="ghost">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MessageCircleIcon className="w-5 h-5" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    1 day ago
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Just finished an amazing hike in the mountains. The views were
                  breathtaking!
                </p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <Button size="icon" variant="ghost">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MessageCircleIcon className="w-5 h-5" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <MapPinIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  San Francisco, CA
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-4">
                <UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium">1,234 Followers</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    456 Following
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-4">
                <LinkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div className="space-y-1">
                  <Link
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Twitter
                  </Link>
                  <Link
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
