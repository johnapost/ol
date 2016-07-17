import { Component } from '@angular/core'
import { NgFor } from '@angular/common'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import {
  BusinessesService,
  BusinessObj,
  BusinessesObj
} from './businesses.service'

@Component({
  directives: [NgFor],
  providers: [BusinessesService],
  selector: 'businesses',
  templateUrl: '../components/businesses/businesses.component.html'
})
export class BusinessesComponent {
  businesses: Array<BusinessObj>
  subscription: Subscription

  constructor(
    private router: Router,
    private businessesService: BusinessesService
  ) {}

  // Subscribe to observable, immediately executing XHR for initial list
  ngOnInit() {
    this.subscription = this.businessesService.getBusinesses()
      .subscribe((businesses: BusinessesObj) => {
        this.businesses = businesses.businesses
      })
  }

  // Navigate to the details for a business
  openBusiness(business: BusinessObj) {
    this.router.navigate(['/business', business.id])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
