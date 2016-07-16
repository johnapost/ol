import { Component } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'

@Component({
  providers: [HTTP_PROVIDERS],
  selector: 'app',
  template: (document.getElementsByTagName('app')[0]).innerHTML
})
export class AppComponent {
  constructor() {
    console.log('Hello World')
  }
}
