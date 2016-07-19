import { BusinessComponent } from './business.component'
import { BusinessesService } from './businesses.service'
import faker = require('faker')
var businessComponent

describe('BusinessComponent', () => {
  beforeEach(() => {
    let route: any
    let router: any
    let businessesService: BusinessesService
    businessComponent = new BusinessComponent(route, router, businessesService)
  })

  fit('ngOnInit should subscribe to params', () => {
    let id = faker.random.number()
    let business = { id: id }
    let params = { id: id }
    businessComponent.route = {
      params: {
        subscribe(fn1: any) {
          fn1(params)
        }
      }
    }
    businessComponent.businessesService = {
      getBusiness() {
        return {
          subscribe(fn1: any) {
            fn1(business)
          }
        }
      }
    }

    businessComponent.ngOnInit()
    expect(businessComponent.business).toEqual(business)
  })

  it('ngOnDestroy unsubscribes from the Observables', () => {
    businessComponent.subscription = {
      unsubscribe() { return }
    }
    businessComponent.paramsSubscription = {
      unsubscribe() { return }
    }
    let unsubscribeSpy = spyOn(businessComponent.subscription, 'unsubscribe')
    let paramsUnsubscribeSpy =
      spyOn(businessComponent.paramsSubscription, 'unsubscribe')

    businessComponent.ngOnDestroy()
    expect(unsubscribeSpy).toHaveBeenCalled()
    expect(paramsUnsubscribeSpy).toHaveBeenCalled()
  })
})
