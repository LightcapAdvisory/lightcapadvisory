import Head from 'next/head';

import { DynamicComponent } from '@/components/components-registry';
import { PageComponentProps } from '@/types';
import { allContent } from '@/utils/content';
import { seoGenerateMetaDescription, seoGenerateMetaTags, seoGenerateTitle } from '@/utils/seo-utils';
import { resolveStaticProps } from '@/utils/static-props-resolvers';

const Page: React.FC<PageComponentProps> = (props) => {
    const { global, ...page } = props;
    const { site } = global;

    // Generate the original title from your site data
    let title = seoGenerateTitle(page, site);

    // If the title is "Home", force it to your brand name
    if (title === 'Home' || title === 'home') {
        title = 'Lightcap Advisory';
    }

    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);

    return (
        <>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        // OpenGraph meta tags (og:*) should have the format <meta property="og:…" content="…">
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }
                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <DynamicComponent {...props} />
        </>
    );
};

export function getStaticPaths() {
    const allData = allContent();
    const paths = allData.map((obj) => obj.__metadata.urlPath).filter(Boolean);
    return { paths, fallback: false };
}

export function getStaticProps({ params }) {
    const allData = allContent();
    const urlPath = '/' + (params.slug || []).join('/');
    const props = resolveStaticProps(urlPath, allData);
    return { props };
}

export default Page;
