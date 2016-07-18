// TypeScript definitions
///<reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { AppComponent } from './app/app.component'
import { appRouterProviders } from './app/app.routes'

enableProdMode()
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  appRouterProviders
]).catch((err: any) => console.error(err))
