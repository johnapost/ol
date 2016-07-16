import { Component } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'

@Component({
  providers: [HTTP_PROVIDERS],
  selector: 'app',
  templateUrl: '../components/app.component.html'
})
export class AppComponent {
  constructor() {
    console.log('Hello World')
  }
}
