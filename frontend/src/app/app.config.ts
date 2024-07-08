import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import ptBr from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { CurrencyPipe, registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    BrowserAnimationsModule,
    BrowserModule,
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'pt',
      },
      {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
      },
  ],
};
