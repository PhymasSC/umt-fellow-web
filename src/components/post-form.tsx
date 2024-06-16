"use client";

import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PostForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("profile");
  const textareaRef = useRef(null);
  const componentRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target) &&
      inputValue.trim() === ""
    ) {
      setIsExpanded(false);
    }
  };
  const handleScroll = () => {
    if (inputValue.trim() === "") {
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inputValue, handleClickOutside, handleScroll]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsExpanded(true);
  };
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <div className="w-full max-w-2xl mx-auto" ref={componentRef}>
      <div
        className={`bg-white dark:bg-gray-950 rounded-lg shadow-sm transition-all duration-300 ${
          isExpanded
            ? "p-6 border border-gray-200 dark:border-gray-800"
            : "p-4 hover:bg-gray-100 dark:hover:bg-gray-900"
        }`}
      >
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleOptionChange("profile")}>
                Post to Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleOptionChange("community")}
              >
                Post to Community
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p
            className={`flex-1 text-gray-500 dark:text-gray-400 transition-all duration-300 ${
              isExpanded ? "text-gray-900 dark:text-gray-50" : ""
            }`}
            onClick={() => setIsExpanded(true)}
          >
            What's on your mind?
          </p>
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <Textarea
              ref={textareaRef}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-800 p-4 focus:border-gray-400 dark:focus:border-gray-600"
              placeholder="Write your post..."
              rows={4}
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <SmileIcon className="w-5 h-5" />
                  <span className="sr-only">Add emoji</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="w-5 h-5" />
                  <span className="sr-only">Upload image</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <PaperclipIcon className="w-5 h-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">Advanced Mode</Button>
                <Button>Publish</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function PaperclipIcon(props) {
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
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SmileIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
