import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from './components/Footer'

import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News App',
  description: 'this is about multilanguage news articles website',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    >
      <html lang='en'>
        <body className={inter.className}>
          <Header />
          <main className='container mx-auto'>
            <div className='flex items-start justify-center min-h-screen'>
              <div className='mt-20'>{children}</div>
            </div>
          </main>
         
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
