import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SlideshowModule } from 'ng-simple-slideshow';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarPreviewComponent } from './components/car-preview/car-preview.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { DistanceCalculatorComponent } from './components/distance-calculator/distance-calculator.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SlidesComponent } from './components/slide-show/slides.component';
import { IconDirective } from './directive/icon.directive';
import { EuroPipe } from './pipe/euro.pipe';
import { AutoCompleteComponent } from './shared/components/auto-complete/auto-complete.component';
import { InputComponent } from './shared/components/input/input.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    HeaderComponent,
    NavigationComponent,
    IconDirective,
    CarPreviewComponent,
    DistanceCalculatorComponent,
    AutoCompleteComponent,
    EuroPipe,
    ContactFormComponent,
    InputComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SlideshowModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
