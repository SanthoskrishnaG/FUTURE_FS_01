import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Santhoskrishna G | Software Developer Portfolio',
  description:
    'Portfolio of Santhoskrishna G — M.Sc. Software Systems Student at Coimbatore Institute of Technology. Building secure digital solutions through code, innovation, and leadership.',
  keywords:
    'Santhoskrishna G, Portfolio, Software Systems, CIT, Coimbatore Institute of Technology, Software Developer, Java, C, Web Development',
  authors: [{ name: 'Santhoskrishna G' }],
  openGraph: {
    type: 'website',
    title: 'Santhoskrishna G | Software Developer Portfolio',
    description:
      "Explore Santhoskrishna G's projects, cyber security internship, leadership experience, and academic journey.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santhoskrishna G | Software Developer Portfolio',
    description:
      "Explore Santhoskrishna G's projects, cyber security internship, leadership experience, and academic journey.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
