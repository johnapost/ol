import { Component } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar'
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  selector: 'app',
  styleUrls: ['../components/app.component.css'],
  templateUrl: '../components/app.component.html'
})
export class AppComponent {}
