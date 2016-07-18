import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { NgForm, NgModel } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'
import { MD_LIST_DIRECTIVES } from '@angular2-material/list'
import {
  BusinessesService,
  BusinessObj,
  BusinessesObj
} from './businesses.service'

@Component({
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    NgFor,
    NgIf,
    NgForm,
    NgModel
  ],
  providers: [BusinessesService, MdIconRegistry],
  selector: 'businesses',
  styleUrls: ['../components/businesses/businesses.component.css'],
  templateUrl: '../components/businesses/businesses.component.html'
})
export class BusinessesComponent {
  businesses: Array<BusinessObj> = []
  subscription: Subscription
  lastPage: number
  page: number = 1
  perPage: number = 50

  constructor(
    private router: Router,
    private businessesService: BusinessesService
  ) {}

  // Get initial list
  ngOnInit() {
    this.subscribeHandler()
  }

  // Subscribe to observable, immediately executing XHR
  subscribeHandler() {
    this.subscription =
      this.businessesService.getBusinesses(this.page, this.perPage)
        .subscribe((businessesObj: BusinessesObj) => {
          this.businesses = businessesObj.businesses
          let lastPageUrl = businessesObj.pages.last
          let pageIndex = lastPageUrl.lastIndexOf('page=')
          this.lastPage = +lastPageUrl.slice(pageIndex).split('page=')[1]
        })
  }

  // Controls the user's interaction with the page input
  pageHandler() {

    // Make sure the user cannot go beyond the last page
    if (this.page > this.lastPage) {
      this.page = this.lastPage
    }

    // Empty values default to the first page
    if (!this.page) {
      this.page = 1
    }

    this.subscribeHandler()
  }

  // Navigate to the details for a business
  openBusiness(business: BusinessObj) {
    this.router.navigate(['/business', business.id])
  }

  // Move backward by one page
  previousPage() {
    this.page = this.page - 1
    this.subscribeHandler()
  }

  // Move forward by one page
  nextPage() {
    this.page = this.page + 1
    this.subscribeHandler()
  }

  // Unsubscribe when the component is removed
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
