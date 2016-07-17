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

  // Retrieve the list of business data
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
      .map(this.handleBusinessesResponse)
      .catch(this.handleError)
  }

  // Apply any transforms and return JSON
  handleBusinessesResponse(res: Response) {
    return res.json()
  }

  // Retrieve a specific business' details
  getBusiness(id: number) {}

  // Deal with any errors
  handleError(err: any) {
    return Observable.throw(err)
  }
}
