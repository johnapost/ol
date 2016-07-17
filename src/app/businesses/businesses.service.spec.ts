import { BusinessesService } from './businesses.service'
import { Observable } from 'rxjs'
import faker = require('faker')
var businessesService

describe('BusinessesService', () => {
  beforeEach(() => {
    let http: any
    businessesService = new BusinessesService(http)
  })

  it('handleResponse should return JSON', () => {
    let uuid = faker.random.uuid()
    let res = {
      json: () => {
        return [{ uuid: uuid }]
      }
    }

    expect(businessesService.handleResponse(res))
      .toEqual([{ uuid: uuid }])
  })

  it('handleError should return a thrown Observable error', () => {
    spyOn(Observable, 'throw')
    let err = faker.hacker.noun()

    businessesService.handleError(err)
    expect(Observable.throw).toHaveBeenCalledWith(err)
  })
})
