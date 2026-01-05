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
        <>
          {/* Global background image */}
          <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
          >
            <Component {...pageProps} />
          </div>
        </>
      ) : null}
    </>
  );
}
