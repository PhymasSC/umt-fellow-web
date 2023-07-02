const SEOConfig = {
    title: 'UMT Fellow', // Default title
    description: 'UMT Fellow is a social forum built for University Malaysia Terengganu.', // Default description
    canonical: 'https://www.umtfellow.social/', // Canonical URL
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.umtfellow.social/',
        title: 'UMT Fellow',
        description: 'UMT Fellow is a social forum built for University Malaysia Terengganu.',
        images: [
            {
                url: 'https://www.umtfellow.social/favicon.ico',
                width: 120,
                height: 120,
                alt: 'UMT Fellow',
            },
        ],
    },
    twitter: {
        handle: '@yourtwitterhandle',
        site: '@yoursitename',
        cardType: 'summary_large_image',
    },
    // Add any additional SEO configuration options here
};

export default SEOConfig;
