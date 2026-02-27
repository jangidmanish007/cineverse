import "./globals.css";

export const metadata = {
  title: "MovieFlix - Premium Video Platform",
  description: "Stream and download movies in 4K, 1080p, and 720p quality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className="antialiased bg-gray-900">
        {children}
      </body>
    </html>
  );
}
