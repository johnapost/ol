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

  it('ngOnInit should call subscribeHandler', () => {
    let subscribeHandlerSpy = spyOn(businessesComponent, 'subscribeHandler')

    businessesComponent.ngOnInit()
    expect(subscribeHandlerSpy).toHaveBeenCalled()
  })

  describe('subscribeHandler', () => {
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
      businessesComponent.subscribeHandler()
      expect(businessesComponent.businesses).toEqual(businesses)
    })

    it('should set the lastPage', () => {
      businessesComponent.subscribeHandler()
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

  it('previousPage', () => {
    let page = faker.random.number({min: 10, max: 1000})
    businessesComponent.page = page
    let subscribeSpy = spyOn(businessesComponent, 'subscribeHandler')

    businessesComponent.previousPage()
    expect(businessesComponent.page).toEqual(page - 1)
    expect(subscribeSpy).toHaveBeenCalled()
  })

  it('nextPage', () => {
    let page = faker.random.number({min: 10, max: 1000})
    businessesComponent.page = page
    let subscribeSpy = spyOn(businessesComponent, 'subscribeHandler')

    businessesComponent.nextPage()
    expect(businessesComponent.page).toEqual(page + 1)
    expect(subscribeSpy).toHaveBeenCalled()
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
