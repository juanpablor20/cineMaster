import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// export const appConfig: ApplicationConfig = {

//   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
//      provideRouter(routes), provideClientHydration(withEventReplay())]
// };
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideNativeDateAdapter(),
   
   provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
    provideClientHydration(withHttpTransferCacheOptions({
      includePostRequests: true,
    })),
  ],
};