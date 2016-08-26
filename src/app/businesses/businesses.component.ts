interface GoogleWindow extends Window {
  google: any
}

declare var window: GoogleWindow

import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import {
  BusinessesService,
  BusinessObj,
  BusinessesObj
} from './businesses.service'

@Component({
  providers: [BusinessesService],
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
  map: any
  markers: any = []
  infoWindows: any = []

  constructor(
    private router: Router,
    private businessesService: BusinessesService
  ) {}

  // Get initial list
  ngOnInit() {
    this.subscribeHandler()
  }

  ngAfterContentInit() {
    this.map = new window.google.maps.Map(
      document.getElementById('map'), {
        center: {lat: 39.50, lng: -98.35},
        zoom: 4,
      }
    )
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

          this.mapLocations()
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
    this.businesses = []
    this.page = this.page - 1
    this.subscribeHandler()
    this.resetMap()
  }

  // Move forward by one page
  nextPage() {
    this.businesses = []
    this.page = this.page + 1
    this.subscribeHandler()
    this.resetMap()
  }

  resetMap() {
    this.markers.map((marker) => {
      marker.setMap(null)
    })
    this.infoWindows.map((marker) => {
      marker.setMap(null)
    })

    this.markers = []
    this.infoWindows = []
  }

  mapLocations() {
    this.businesses.map((business) => {
      let geocoder = new window.google.maps.Geocoder()

      geocoder.geocode({address: business.state}, (results) => {
        this.createMarker(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        )
      })
    })
  }

  createMarker(lat, lng) {
    let latLng =
      new window.google.maps.LatLng(lat, lng)

    let marker = new window.google.maps.Marker({
      position: latLng,
      map: this.map
    })

    this.markers.push(marker)
  }

  createInfoWindows(lat, lng) {
    let infoWindow = new window.google.maps.InfoWindow({content: 'asdf'})

    this.infoWindows.push(infoWindow)
  }

  // Unsubscribe when the component is removed
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
