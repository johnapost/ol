import { provideRouter, RouterConfig } from '@angular/router'
import { BusinessesComponent, BusinessComponent } from './businesses'

const routes: RouterConfig = [
  { path: '', component: BusinessesComponent },
  { path: 'business/:id', component: BusinessComponent }
]

export const appRouterProviders = [
  provideRouter(routes)
]
