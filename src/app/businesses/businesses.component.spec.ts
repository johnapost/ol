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

  describe('pageHandler', () => {
    var subscribeHandlerSpy

    beforeEach(() => {
      subscribeHandlerSpy = spyOn(businessesComponent, 'subscribeHandler')
    })

    it('should make sure the user cannot go beyond the last page', () => {
      businessesComponent.lastPage = faker.random.number()
      businessesComponent.page = businessesComponent.lastPage + 1

      businessesComponent.pageHandler()
      expect(businessesComponent.page).toEqual(businessesComponent.lastPage)
    })

    it('should set an empty value to 1', () => {
      businessesComponent.page = undefined

      businessesComponent.pageHandler()
      expect(businessesComponent.page).toEqual(1)
    })

    it('should call subscribeHandler', () => {
      businessesComponent.pageHandler()
      expect(subscribeHandlerSpy).toHaveBeenCalled()
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

  describe('previousPage', () => {
    var subscribeHandlerSpy

    beforeEach(() => {
      subscribeHandlerSpy = spyOn(businessesComponent, 'subscribeHandler')
    })

    it('should set businesses to empty', () => {
      businessesComponent.previousPage()
      expect(businessesComponent.businesses).toEqual([])
    })

    it('should update the current page', () => {
      let page = faker.random.number({min: 10, max: 1000})
      businessesComponent.page = page

      businessesComponent.previousPage()
      expect(businessesComponent.page).toEqual(page - 1)
    })

    it('should call subscribeHandler', () => {
      businessesComponent.previousPage()
      expect(subscribeHandlerSpy).toHaveBeenCalled()
    })
  })

  describe('nextPage', () => {
    var subscribeHandlerSpy

    beforeEach(() => {
      subscribeHandlerSpy = spyOn(businessesComponent, 'subscribeHandler')
    })

    it('should set businesses to empty', () => {
      businessesComponent.nextPage()
      expect(businessesComponent.businesses).toEqual([])
    })

    it('should update the current page', () => {
      let page = faker.random.number({min: 10, max: 1000})
      businessesComponent.page = page

      businessesComponent.nextPage()
      expect(businessesComponent.page).toEqual(page + 1)
    })

    it('should call subscribeHandler', () => {
      businessesComponent.nextPage()
      expect(subscribeHandlerSpy).toHaveBeenCalled()
    })
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
