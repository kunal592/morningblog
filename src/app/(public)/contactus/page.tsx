import { NextPage } from 'next';

const ContactUsPage: NextPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We would love to hear from you! Whether you have a question, a suggestion, or just want to say hello, feel free to reach out.
      </p>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input type="text" id="name" className="w-full border-border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" className="w-full border-border rounded-md px-3 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea id="message" rows={5} className="w-full border-border rounded-md px-3 py-2" />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground rounded-md px-4 py-2">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUsPage;
