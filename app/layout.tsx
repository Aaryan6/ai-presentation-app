import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Presentation Maker - Create Stunning Presentations in Minutes',
  description: 'Generate professional, AI-powered presentations in seconds. Perfect for pitches, training, reports, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
