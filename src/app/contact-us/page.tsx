/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0l0Om7GgBmv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 md:py-20 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Have a question or need assistance? Fill out the form and we'll
              get back to you as soon as possible.
            </p>
          </div>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter the subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Contact Information</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Find us at the office or get in touch through our various
              channels.
            </p>
          </div>
          {/* <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-500 dark:text-gray-400">
                123 Main Street, Anytown USA 12345
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-500 dark:text-gray-400">
                <a href="#">+1 (234) 567-890</a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-500 dark:text-gray-400">
                <a href="#">info@example.com</a>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
