import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  company: z.string().min(2, "Please enter your company name."),
  role: z.string().min(2, "Please enter your role."),
  email: z.string().email("Please enter a valid email address."),
  mobile: z
    .string()
    .min(8, "Please enter a valid mobile number.")
    .max(20, "Mobile number seems too long.")
    .regex(/^[0-9+\-\s()]+$/, "Use digits and basic phone symbols only."),
  message: z.string().max(1000, "Please keep your message under 1000 characters.").optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const LeadForm = () => {
  const { toast } = useToast();
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Email send failed");
      }

      toast({
        title: "Thanks for registering your interest",
        description: "Our team will reach out as Alloybazaar early access opens up.",
      });

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_form_submission", {
          event_category: "lead",
          event_label: "alloybazaar_landing",
        });
      }

      form.reset();
    } catch (error) {
      toast({
        title: "Unable to submit right now",
        description: "Please try again in a moment or email us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-xl border bg-background p-5 md:p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your organisation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Procurement Head" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 98xxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message / requirement (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Tell us about the grade, size, quantity or any specific application."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-full bg-amber-brand text-zinc-950 hover:bg-amber-300 font-bold shadow-md shadow-amber-brand/20"
          >
            Submit &amp; Register Interest
          </Button>

          <p className="text-[11px] text-muted-foreground">
            By submitting this form you agree to be contacted about Alloybazaar.com. Your details will not be sold or
            shared with third-party advertisers.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LeadForm;
