import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ASideComponent } from './layouts/a-side/a-side.component';
import { FilmsComponent } from './pages/films/films.component';

@NgModule({
  declarations: [
    AppComponent,
    ASideComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
