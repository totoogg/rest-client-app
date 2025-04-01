import admin from 'firebase-admin';

import serviceAccount from '@/shared/config/auth/serviceAccountKey.json';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
