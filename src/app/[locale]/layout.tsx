import '@/app/globals.css';
import '@ant-design/v5-patch-for-react-19';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header, Footer } from '@/widgets';
import { LanguageSelectProps } from '@/i18n/model/types';
import { UserProvider } from '@/shared/lib/context';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LanguageSelectProps>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <UserProvider>
          <>
            <Header locale={locale} />
            <main>{children}</main>
            <Footer />
          </>
        </UserProvider>
      </body>
    </html>
  );
}
