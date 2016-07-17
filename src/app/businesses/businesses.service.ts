import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs'

export interface BusinessObj {
  id: number
  uuid: string
  name: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  website: string
  created_at: Date
}

export interface BusinessesObj {
  businesses: Array<BusinessObj>
  pages: {
    last: string
    next: string
  }
}

@Injectable()
export class BusinessesService {
  path: string = 'http://ec2-54-84-251-148.compute-1.amazonaws.com'

  constructor(private http: Http) {}

  // Retrieve the list of businesses
  getBusinesses(page?: number, perPage?: number) {
    let params = new URLSearchParams()

    if (page) {
      params.set('page', page.toString())
    }

    if (perPage) {
      params.set('per_page', perPage.toString())
    }

    return this.http
      .get(`${this.path}/businesses`, { search: params })
      .map(this.handleResponse)
      .catch(this.handleError)
  }

  // Retrieve a specific business' details
  getBusiness(id: number) {
    return this.http
      .get(`${this.path}/businesses/${id}`)
      .map(this.handleResponse)
      .catch(this.handleError)
  }

  // Apply any transforms and return JSON
  handleResponse(res: Response) {
    return res.json()
  }

  // Deal with any errors
  handleError(err: any) {
    return Observable.throw(err)
  }

  // Request the previous page of businesses
  previousPage() {

  }

  // Request the next page of businesses
  nextPage(page: number, perPage: number) {
    this.getBusinesses(page, perPage)
  }
}
