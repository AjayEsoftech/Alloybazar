import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, LogIn, UserPlus, Copy } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePortalAuth, DEMO_ACCOUNT } from "@/lib/portalAuth";

/**
 * Static onboarding gate for the Customer Portal demo. Offers a login form
 * (pre-fillable with the hardcoded demo credentials) and a sign-up form that
 * stores the new account locally. No network calls — everything is local.
 */
export default function PortalLogin() {
  const { login, signup } = usePortalAuth();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", company: "", email: "", password: "" });

  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginForm.email, loginForm.password);
    if (res.ok) {
      toast({ title: "Welcome back", description: "Signed in to your Customer Portal." });
      return;
    }
    toast({ title: "Sign in failed", description: res.error, variant: "destructive" });
  };

  const doSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const res = signup(signupForm);
    if (res.ok) {
      toast({ title: "Account created", description: "You're signed in to your Customer Portal." });
      return;
    }
    toast({ title: "Sign up failed", description: res.error, variant: "destructive" });
  };

  const useDemo = () => {
    setLoginForm({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
    toast({ title: "Demo credentials filled", description: "Press Sign in to continue." });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-zinc-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
            <div className="space-y-2 max-w-2xl">
              <div className="text-sm text-zinc-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Customer Portal</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Customer Portal</h1>
              <p className="text-sm md:text-base text-zinc-400">
                Sign in to manage vendor onboarding, enquiries, quotations, purchase orders,
                payments, dispatch and documents — all in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="max-w-md mx-auto px-4">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login" className="gap-1.5"><LogIn className="h-4 w-4" /> Sign in</TabsTrigger>
                <TabsTrigger value="signup" className="gap-1.5"><UserPlus className="h-4 w-4" /> Sign up</TabsTrigger>
              </TabsList>

              {/* ---- Sign in ---- */}
              <TabsContent value="login" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>Access your procurement dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={doLogin} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          autoComplete="username"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="you@company.in"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          autoComplete="current-password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                          placeholder="••••••••"
                        />
                      </div>
                      <Button type="submit" className="w-full">Sign in</Button>
                    </form>

                    <div className="mt-4 rounded-lg border border-dashed bg-muted/40 p-3 text-sm">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" /> Demo credentials
                      </div>
                      <div className="mt-1.5 font-mono text-xs text-muted-foreground">
                        <div>{DEMO_ACCOUNT.email}</div>
                        <div>{DEMO_ACCOUNT.password}</div>
                      </div>
                      <Button type="button" variant="outline" size="sm" className="mt-2.5 gap-1.5" onClick={useDemo}>
                        <Copy className="h-3.5 w-3.5" /> Use demo credentials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ---- Sign up ---- */}
              <TabsContent value="signup" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create account</CardTitle>
                    <CardDescription>Register to start your procurement journey.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={doSignup} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>Full name</Label>
                        <Input
                          value={signupForm.name}
                          onChange={(e) => setSignupForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Aarav Mehta"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Company</Label>
                        <Input
                          value={signupForm.company}
                          onChange={(e) => setSignupForm((f) => ({ ...f, company: e.target.value }))}
                          placeholder="Meridian Steel Traders"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          autoComplete="username"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="you@company.in"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm((f) => ({ ...f, password: e.target.value }))}
                          placeholder="At least 6 characters"
                        />
                      </div>
                      <Button type="submit" className="w-full">Create account & sign in</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
