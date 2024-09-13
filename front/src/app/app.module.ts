import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './misc/header/header.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TherapiestPageComponent } from './pages/therapiest-page/therapiest-page.component';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './components/basic-components/container/container.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { DynamicDirective } from './components/dynamic/dynamic.directive';
import { TextComponent } from './components/basic-components/text/text.component';
import { ImageComponent } from './components/basic-components/image/image.component';
import { SideBarComponent } from './components/editor/generic/side-bar/side-bar.component';
import { SidebarService } from './services/sidebar-service';
import { SafePipe } from './components/pipes/safe.pipe';
import { MultiLangPipe } from './components/pipes/multi-lang.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconButtonComponent } from './components/editor/generic/icon-button/icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageService } from './services/language.service';
import { GenericComponentEditorComponent } from './components/editor/component-editor/generic-component-editor/generic-component-editor.component';
import { ContainerEditorComponent } from './components/basic-components/container/container-editor/container-editor.component';
import { ImageEditorComponent } from './components/basic-components/image/image-editor/image-editor.component';
import { TextEditorComponent } from './components/basic-components/text/text-editor/text-editor.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    TherapiestPageComponent,
    ContainerComponent,
    DynamicComponent,
    DynamicDirective,
    TextComponent,
    ImageComponent,
    SideBarComponent,
    SafePipe,
    MultiLangPipe,
    IconButtonComponent,
    GenericComponentEditorComponent,
    ContainerEditorComponent,
    ImageEditorComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    HttpClientModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration(),
    SidebarService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
