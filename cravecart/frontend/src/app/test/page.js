import React from "react";
import InputOtp from "@/utils/InputOtp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import OtpLogin from "@/components/OtpLogin";
const page = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-customColor">
      {/* <OtpLogin/> */}
      <Tabs defaultValue="SignIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="SignIn">Sign In</TabsTrigger>
          <TabsTrigger value="LogIn">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="SignIn">
          <Card>
            <CardHeader>
              <CardTitle>SignIn</CardTitle>
              <CardDescription>
                Make changes to your SignIn here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name " className="font-bold">Name</Label>
                <Input id="name" defaultValue=" " />
              </div>
              <div className="space-y-1">
              <InputOtp />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="LogIn">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
              <InputOtp/>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
