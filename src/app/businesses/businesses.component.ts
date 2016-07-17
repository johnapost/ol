import { Component } from '@angular/core'
import { NgFor } from '@angular/common'
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

  constructor(private businessesService: BusinessesService) {}

  ngOnInit() {
    this.subscription = this.businessesService.getBusinesses()
      .subscribe((businesses: BusinessesObj) => {
        this.businesses = businesses.businesses
      })
  }
}
