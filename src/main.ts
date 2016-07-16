// TypeScript definitions
///<reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { AppComponent } from './app/app.component'

enableProdMode()
bootstrap(AppComponent).catch((err: any) => console.error(err))
