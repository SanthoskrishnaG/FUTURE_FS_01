import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticleCanvas from '@/components/ParticleCanvas';

export const metadata: Metadata = {
  title: 'Santhoskrishna G | Software Developer & Cyber Security Portfolio',
  description:
    'Portfolio of Santhoskrishna G — M.Sc. Software Systems Student at Coimbatore Institute of Technology. Building secure digital solutions through code, innovation, and leadership.',
  keywords: [
    'Santhoskrishna G',
    'Portfolio',
    'Software Systems',
    'CIT',
    'Coimbatore Institute of Technology',
    'Cyber Security',
    'Software Developer',
    'Java',
    'Python',
    'C',
    'Web Development',
  ],
  authors: [{ name: 'Santhoskrishna G' }],
  openGraph: {
    title: 'Santhoskrishna G | Software Developer Portfolio',
    description:
      'Explore Santhoskrishna G\'s projects, cyber security internship, leadership experience, and academic journey.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santhoskrishna G | Software Developer Portfolio',
    description:
      'Explore Santhoskrishna G\'s projects, cyber security internship, leadership experience, and academic journey.',
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
      <body>
        <CustomCursor />
        <ParticleCanvas />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
