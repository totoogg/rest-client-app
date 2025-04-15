'use client';

import { useTransition } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from '@/shared/Loader';

export function Link({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <Loader />}
      <NextLink
        href={href}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => {
            const url = href.toString();
            if (replace) {
              router.replace(url);
            } else {
              router.push(url);
            }
          });
        }}
        {...rest}
      >
        {children}
      </NextLink>
    </>
  );
}
