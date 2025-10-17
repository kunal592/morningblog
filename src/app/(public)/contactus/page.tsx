'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';

const ContactUsPage: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', { name, email, message });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      {isSubmitted ? (
        <p className="text-lg text-green-500">Your message has been sent successfully!</p>
      ) : (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <p className="text-lg text-muted-foreground mb-8">
            We would love to hear from you! Whether you have a question, a suggestion, or just want to say hello, feel free to reach out.
          </p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-border rounded-md px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-border rounded-md px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full border-border rounded-md px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground rounded-md px-4 py-2">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactUsPage;
