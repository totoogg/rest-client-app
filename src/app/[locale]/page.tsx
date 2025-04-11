import { useTranslations } from 'next-intl';
// import { UnauthorizedSection } from '@/widgets';
import { AuthenticatedSection } from '@/widgets';

export default function HomePage() {
  const t = useTranslations('homePage');

  return (
    <div className="main">
      <h1>{t('title')}</h1>
      <div>
        <AuthenticatedSection />
        {/* <UnauthorizedSection /> */}
      </div>
    </div>
  );
}
