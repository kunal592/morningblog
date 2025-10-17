"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Crown } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">New Follower</Label>
                  <p className="text-sm text-muted-foreground">Notify me when someone new follows me.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">New Comment</Label>
                  <p className="text-sm text-muted-foreground">Notify me when someone comments on my post.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Send me a weekly digest of popular posts.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
             <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Font Size</Label>
                <RadioGroup defaultValue="medium" className="flex gap-4">
                  <Label htmlFor="small" className="flex flex-col items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="small" id="small" className="sr-only"/>
                    <div className="border rounded-md p-4 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                        <span className="text-sm">Aa</span>
                    </div>
                     Small
                  </Label>
                   <Label htmlFor="medium" className="flex flex-col items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="medium" id="medium" className="sr-only"/>
                    <div className="border rounded-md p-4 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                        <span className="text-base">Aa</span>
                    </div>
                     Medium
                  </Label>
                   <Label htmlFor="large" className="flex flex-col items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="large" id="large" className="sr-only"/>
                    <div className="border rounded-md p-4 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                        <span className="text-lg">Aa</span>
                    </div>
                     Large
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card className="mt-4 rounded-2xl">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription plan.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="relative flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                <div>
                  <h3 className="text-2xl font-semibold">Free</h3>
                  <p className="mt-2 text-muted-foreground">For casual readers and writers.</p>
                  <p className="mt-6 text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  <ul className="mt-6 space-y-2 text-muted-foreground">
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />Read all public posts</li>
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />Publish up to 3 posts/month</li>
                  </ul>
                </div>
                <Button variant="outline" className="mt-6 w-full" disabled>Current Plan</Button>
              </div>
              <div className="relative flex flex-col justify-between rounded-lg border-2 border-primary p-6 shadow-lg">
                <div className="absolute top-0 right-4 -mt-3">
                  <div className="inline-flex items-center rounded-full border border-primary bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                    <Crown className="mr-2 h-4 w-4" /> Premium
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Premium</h3>
                  <p className="mt-2 text-muted-foreground">For dedicated authors and supporters.</p>
                  <p className="mt-6 text-4xl font-bold">$9<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  <ul className="mt-6 space-y-2 text-muted-foreground">
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />All free features</li>
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />Unlimited posts</li>
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />Advanced analytics</li>
                    <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />AI SEO tools</li>
                  </ul>
                </div>
                <Button className="mt-6 w-full">Upgrade to Premium</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
