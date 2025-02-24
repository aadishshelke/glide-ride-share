import { ClerkProvider } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import './globals.css';
import AuthWrapper from '../components/AuthWrapper'; // our new client component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Montserrat({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'glide',
  description: 'Your favorite way to book rides!',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthWrapper>{children}</AuthWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
        </body>
      </html>
    </ClerkProvider>
  );
}
