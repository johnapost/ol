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

  it('ngOnInit should subscribe', () => {
    var business = { id: faker.random.number() }
    businessComponent.route = { params: [] }
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

  it('ngOnDestroy unsubscribes from the Observable', () => {
    businessComponent.subscription = {
      unsubscribe() { return }
    }
    let unsubscribeSpy = spyOn(businessComponent.subscription, 'unsubscribe')

    businessComponent.ngOnDestroy()
    expect(unsubscribeSpy).toHaveBeenCalled()
  })
})
