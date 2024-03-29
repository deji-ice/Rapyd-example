import Head from "next/head";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }) {
  return (
    <main className="w-full h-[100vh] p-2 grid place-items-center">
      <div className="w-50 border p-6 max-h-[400px] overflow-y-auto">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Learn how to build a personal website using Next.js" />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        {children}
      </div>
    </main>
  );
}
