'use client';

import { Loader } from '@/shared';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(true), 100);

    return () => clearTimeout(timeout);
  }, []);

  return <>{showLoader && <Loader />}</>;
}
