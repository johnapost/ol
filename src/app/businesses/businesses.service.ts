import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs'

export interface BusinessObj {
}

@Injectable()
export class BusinessesService {
  path: string = 'http://ec2-54-84-251-148.compute-1.amazonaws.com'

  constructor(private http: Http) {}

  // Retrieve the list of business data
  getBusinesses() {}

  // Retrieve a specific business' details
  getBusiness() {}

  // Deal with any errors
  handleError(err: any) {
    return Observable.throw(err)
  }
}
