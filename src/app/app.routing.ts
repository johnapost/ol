import { Routes, RouterModule }   from '@angular/router';
import { BusinessesComponent, BusinessComponent } from './businesses'

const routes: Routes = [
  { path: '', component: BusinessesComponent },
  { path: 'business/:id', component: BusinessComponent }
]

export const appRoutingProviders = [
]

export const routing = RouterModule.forRoot(routes)
