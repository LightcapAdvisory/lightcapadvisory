import { generateGlobalCssVariables } from '@/utils/theme-style-utils';
import { useEffect, useState } from 'react';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
  const { global, ...page } = pageProps;
  const { theme } = global || {};
  const [isMounted, setIsMounted] = useState(false);

  const cssVars = generateGlobalCssVariables(theme);

  useEffect(() => {
    setIsMounted(true);
    document.body.setAttribute('data-theme', page.colors || 'colors-a');
  }, [page.colors]);

  return (
    <>
      <style jsx global>{`
        :root {
          ${cssVars}
        }
      `}</style>

      {isMounted ? (
        <div
          className="min-h-screen bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/your-background.jpg')" }}
        >
          {/* Optional overlay for better text contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>
          
          {/* Page content */}
          <div className="relative z-10">
            <Component {...pageProps} />
          </div>
        </div>
      ) : null}
    </>
  );
}
