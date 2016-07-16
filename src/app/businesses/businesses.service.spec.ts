import { BusinessesService } from './businesses.service'
import { Observable } from 'rxjs'
import faker = require('faker')
let businessesService

describe('BusinessesService', () => {
  beforeEach(() => {
    let http: any
    businessesService = new BusinessesService(http)
  })

  it('handleError return a thrown Observable error', () => {
    spyOn(Observable, 'throw')
    let err = faker.hacker.noun()

    businessesService.handleError(err)
    expect(Observable.throw).toHaveBeenCalledWith(err)
  })
})
