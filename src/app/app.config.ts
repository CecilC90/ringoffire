import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-1ff2e", "appId": "1:86233815657:web:a08cb3c8a4b53488df20f8", "storageBucket": "ring-of-fire-1ff2e.appspot.com", "apiKey": "AIzaSyBnHlTdOmditplbrWrstJ6bJe_OgP8rUow", "authDomain": "ring-of-fire-1ff2e.firebaseapp.com", "messagingSenderId": "86233815657" }))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-1ff2e", "appId": "1:86233815657:web:a08cb3c8a4b53488df20f8", "storageBucket": "ring-of-fire-1ff2e.appspot.com", "apiKey": "AIzaSyBnHlTdOmditplbrWrstJ6bJe_OgP8rUow", "authDomain": "ring-of-fire-1ff2e.firebaseapp.com", "messagingSenderId": "86233815657" }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-1ff2e", "appId": "1:86233815657:web:a08cb3c8a4b53488df20f8", "storageBucket": "ring-of-fire-1ff2e.appspot.com", "apiKey": "AIzaSyBnHlTdOmditplbrWrstJ6bJe_OgP8rUow", "authDomain": "ring-of-fire-1ff2e.firebaseapp.com", "messagingSenderId": "86233815657" }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideRemoteConfig(() => getRemoteConfig()))]
};
