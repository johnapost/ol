import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
import { Subscription } from 'rxjs/Subscription'
import {
  BusinessesService,
  BusinessObj
} from './businesses.service'

@Component({
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    NgIf,
    ROUTER_DIRECTIVES
  ],
  providers: [BusinessesService, MdIconRegistry],
  selector: 'business',
  styleUrls: ['../components/businesses/business.component.css'],
  templateUrl: '../components/businesses/business.component.html'
})
export class BusinessComponent {
  business: BusinessObj
  paramsSubscription: Subscription
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessesService: BusinessesService
  ) {}

  ngOnInit() {

    // Subscribe to the route params as an observable
    this.paramsSubscription = this.route.params.subscribe((params) => {
      let id = +params['id']

      // Subscribe to observable, immediately executing XHR for details
      this.subscription = this.businessesService.getBusiness(id)
        .subscribe((business: BusinessObj) => {
          this.business = business
        })
    })
  }

  // Unsubscribe when the component is removed
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.subscription.unsubscribe()
  }
}
