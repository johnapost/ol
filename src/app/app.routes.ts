import { provideRouter, RouterConfig } from '@angular/router'
import { BusinessesComponent } from './businesses'

const routes: RouterConfig = [
  { path: '', component: BusinessesComponent }
]

export const appRouterProviders = [
  provideRouter(routes)
]
