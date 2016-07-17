// TypeScript definitions
///<reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppComponent } from './app/app.component'
import { appRouterProviders } from './app/app.routes'

enableProdMode()
bootstrap(AppComponent, [
  appRouterProviders
]).catch((err: any) => console.error(err))
