import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import {
  BusinessesService,
  BusinessObj
} from './businesses.service'

@Component({
  providers: [BusinessesService],
  selector: 'map',
  styleUrls: ['../components/businesses/map.component.css'],
  templateUrl: '../components/businesses/map.component.html'
})
export class MapComponent {
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

      // // Subscribe to observable, immediately executing XHR for details
      // this.subscription = this.businessesService.getBusiness(id)
      //   .subscribe((business: BusinessObj) => {
      //     this.business = business
      //   })
    })
  }

  // Unsubscribe when the component is removed
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.subscription.unsubscribe()
  }
}
