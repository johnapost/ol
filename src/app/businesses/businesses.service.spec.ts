import { BusinessesService } from './businesses.service'
import { URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs'
import faker = require('faker')
var businessesService

describe('BusinessesService', () => {
  beforeEach(() => {
    let http: any = {
      get() {
        return {
          map(fn: Function) {
            return {
              catch() { return }
            }
          },
        }
      }
    }
    businessesService = new BusinessesService(http)
  })

  describe('getBusinesses', () => {
    var getSpy, params

    beforeEach(() => {
      getSpy = spyOn(businessesService.http, 'get').and.callThrough()
      params = new URLSearchParams()
    })

    it('should make a GET request', () => {
      businessesService.getBusinesses()

      expect(getSpy).toHaveBeenCalledWith(
        `${businessesService.path}/businesses`, { search: params }
      )
    })
  })

  describe('getBusiness', () => {
    var id, getSpy

    beforeEach(() => {
      id = faker.random.number()
      getSpy = spyOn(businessesService.http, 'get').and.callThrough()
    })

    it('should make a GET request', () => {
      businessesService.getBusiness(id)

      expect(getSpy).toHaveBeenCalledWith(
        `${businessesService.path}/businesses/${id}`
      )
    })
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
