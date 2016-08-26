import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { BusinessesComponent, BusinessComponent } from './businesses'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MdButtonModule } from '@angular2-material/button'
import { MdCardModule } from '@angular2-material/card'
import { MdIconModule } from '@angular2-material/icon'
import { MdInputModule } from '@angular2-material/input'
import { MdListModule } from '@angular2-material/list'
import { MdToolbarModule } from '@angular2-material/toolbar'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    BusinessesComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
    RouterModule,
    routing
  ],
  bootstrap: [AppComponent],
  providers: [
    appRoutingProviders
  ]
})
export class AppModule {}
