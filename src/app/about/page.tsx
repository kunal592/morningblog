import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers, getImageById } from "@/lib/mock-data";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">About Narrato</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Empowering authors and readers to connect through compelling stories and insightful ideas.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to provide a beautiful, intuitive, and powerful platform for writers to share their voice with the world. We believe that everyone has a story to tell, and we're here to help them tell it. We focus on a clean, distraction-free reading and writing experience.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Our Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We aim to build a vibrant community of passionate readers and writers. Our goal is to foster meaningful connections, facilitate discovery of new ideas, and champion high-quality content in an increasingly noisy digital world.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-8 text-center text-3xl font-bold">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => {
            const image = getImageById(member.imageId);
            return (
              <Card key={member.name} className="rounded-2xl text-center">
                <CardContent className="p-6">
                  {image && (
                    <Avatar className="mx-auto h-32 w-32">
                      <AvatarImage src={image.imageUrl} alt={member.name} data-ai-hint={image.imageHint} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
