import { Component } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  selector: 'app',
  templateUrl: '../components/app.component.html'
})
export class AppComponent {
  constructor() {
    console.log('Hello World')
  }
}
