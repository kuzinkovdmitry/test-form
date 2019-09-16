import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from './shared/shared.module';
import { SearchRequestComponent } from './components/search-request/search-request.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FavoritesComponent,
    SearchRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
