import { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">About Narrato</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Narrato is a premium blog platform designed for modern authors who want to share their stories with the world.
      </p>
      <p className="mb-4">
        Our mission is to provide a clean, beautiful, and easy-to-use platform for writers to create and publish their work. We believe that great stories deserve a great platform.
      </p>
      <p>
        Whether you are a seasoned author or just starting out, Narrato provides the tools you need to build your audience and share your passion.
      </p>
    </div>
  );
};

export default AboutPage;
