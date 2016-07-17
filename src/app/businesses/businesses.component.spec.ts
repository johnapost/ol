import { BusinessesComponent } from './businesses.component'
import { BusinessesService } from './businesses.service'
import faker = require('faker')
var businessesComponent

describe('BusinessesComponent', () => {
  beforeEach(() => {
    let router: any
    let businessesService: BusinessesService
    businessesComponent = new BusinessesComponent(router, businessesService)
  })

  describe('ngOnInit', () => {
    var businesses, lastPage

    beforeEach(() => {
      businesses = [faker.lorem.words(1)]
      lastPage = faker.random.number()
      businessesComponent.businessesService = {
        getBusinesses() {
          return {
            subscribe(fn1: any) {
              fn1({
                businesses: businesses,
                pages: {
                  last: `${faker.internet.domainName()}?page=${lastPage}`
                }
              })
            }
          }
        }
      }
    })

    it('should subscribe', () => {
      businessesComponent.ngOnInit()
      expect(businessesComponent.businesses).toEqual(businesses)
    })

    it('should set the lastPage', () => {
      businessesComponent.ngOnInit()
      expect(businessesComponent.lastPage).toEqual(lastPage)
    })
  })

  it('openBusiness should navigate to a business', () => {
    let id = faker.random.number()
    let business = { id: id }
    businessesComponent.router = {
      navigate() { return }
    }
    let navigateSpy = spyOn(businessesComponent.router, 'navigate')

    businessesComponent.openBusiness(business)
    expect(navigateSpy).toHaveBeenCalledWith(['/business', id])
  })

  it('ngOnDestroy unsubscribes from the Observable', () => {
    businessesComponent.subscription = {
      unsubscribe() { return }
    }
    let unsubscribeSpy = spyOn(businessesComponent.subscription, 'unsubscribe')

    businessesComponent.ngOnDestroy()
    expect(unsubscribeSpy).toHaveBeenCalled()
  })
})
