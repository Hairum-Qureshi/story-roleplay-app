import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert(
            (process.env.NODE_ENV === 'production'
              ? process.env.FIREBASE_SERVICE_ACCOUNT
              : serviceAccount) as admin.ServiceAccount,
          ),
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
