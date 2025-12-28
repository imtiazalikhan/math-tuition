import './globals.css';
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
  title: 'Math Kidz - Online Math Tuition & Tutorials for Kids | Expert Math Tutoring',
  description: 'Looking for math tuition for your child? Math Kidz offers fun, interactive online math tutorials and tutoring for kids. Build confidence with expert math teachers. Trusted by 500+ parents. Book a free trial today!',
  keywords: 'math tuition, math tutorial, math tutoring, online math classes, math for kids, math tutor, kids math learning, primary math tuition, elementary math help, math homework help, online math tutor, math classes for children, learn math online, math practice for kids, math education, private math tutor, affordable math tuition, best math tutor, math lessons for kids, interactive math learning',
  authors: [{ name: 'Math Kidz' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://math-kidz.com/',
    title: 'Math Kidz - Online Math Tuition & Tutorials for Kids',
    description: 'Fun, interactive online math tutorials and tutoring for kids. Build confidence with expert math teachers. Trusted by 500+ parents!',
    siteName: 'Math Kidz',
    locale: 'en_US',
    images: [
      {
        url: 'https://math-kidz.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Math Kidz - Online Math Tuition for Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Kidz - Online Math Tuition & Tutorials for Kids',
    description: 'Fun, interactive online math tutorials and tutoring for kids. Build confidence with expert math teachers. Trusted by 500+ parents!',
    images: ['https://math-kidz.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://math-kidz.com/',
  },
  other: {
    'geo.region': 'AE',
    'geo.placename': 'Dubai',
  },
};

export default function RootLayout({ children }) {
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Math Kidz',
    url: 'https://math-kidz.com',
    logo: 'https://math-kidz.com/logo.png',
    description: 'Math Kidz offers fun, interactive online math tutorials and tutoring for kids. Expert math teachers helping children build confidence in mathematics.',
    telephone: '+971543014873',
    email: 'imtiazk4u@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
    },
    openingHours: 'Mo-Sa 10:00-20:00',
    priceRange: '$$',
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Math Tutoring',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Math Kidz',
    },
    name: 'Online Math Tuition for Kids',
    description: 'Interactive online math tutorials and one-on-one tutoring sessions for children. Personalized math lessons to build confidence and improve grades.',
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Math Tutoring Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Primary Math Tuition',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Elementary Math Tutorials',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Math Homework Help',
          },
        },
      ],
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What age groups do you offer math tuition for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Math Kidz offers math tutoring for children of all ages, from primary school to middle school levels. Our personalized approach adapts to each child\'s learning needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do online math tutorials work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our online math tutorials are conducted via interactive video sessions with expert tutors. Students receive personalized attention, practice problems, and homework support.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Math Kidz different from other math tutoring services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Math Kidz focuses on building confidence through friendly teaching, structured practice, and personalized care. We make math fun and engaging for kids.',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#4CAF50" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
