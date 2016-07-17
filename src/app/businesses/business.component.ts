import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import {
  BusinessesService,
  BusinessObj
} from './businesses.service'

@Component({
  directives: [NgIf],
  providers: [BusinessesService],
  selector: 'business',
  templateUrl: '../components/businesses/business.component.html'
})
export class BusinessComponent {
  business: BusinessObj
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessesService: BusinessesService
  ) {}

  // Subscribe to observable, immediately executing XHR for details
  ngOnInit() {
    let id = +this.route.params['id']

    this.subscription = this.businessesService.getBusiness(id)
      .subscribe((business: BusinessObj) => {
        this.business = business
      })
  }

  // Unsubscribe when the component is removed
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
