import { ResponsiveDataAccessorDirective } from './components/editor/generic/responsive-data-accessor.directive';
import { APP_INITIALIZER, NgModule, PLATFORM_ID, Provider } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconButtonComponent } from './components/editor/generic/icon-button/icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageService } from './services/language.service';
import { GenericComponentEditorComponent } from './components/editor/component-editor/generic-component-editor/generic-component-editor.component';
import { ContainerEditorComponent } from './components/basic-components/container/container-editor/container-editor.component';
import { ImageEditorComponent } from './components/basic-components/image/image-editor/image-editor.component';
import { TextEditorComponent } from './components/basic-components/text/text-editor/text-editor.component';
import { DndModule } from 'ngx-drag-drop';
import { EditorDirective } from './components/editor/editor.directive';
import { NewElementsComponent } from './components/editor/toolbar/new-elements/new-elements.component';
import { SaveDataService } from './services/save-data-service';
import { CookieService } from 'ngx-cookie-service';
import { DynamicRootComponent } from './components/dynamic-root/dynamic-root.component';
import { MarginPaddingEditComponent } from './components/editor/generic/margin-padding-edit/margin-padding-edit.component';
import { ScreenSizeSelectorComponent } from './components/editor/screen-size-selector/screen-size-selector.component';
import { LanguageSelectorComponent } from './components/not-reusable/special-functional/language-selector/language-selector.component';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { isPlatformBrowser } from '@angular/common';
import { ApiModule } from './api/api.module';
import { environment } from '../environments/environment';

const ApiUrl = environment.backendUrl

function initializeKeycloak(keycloak: KeycloakService, platformId: any) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      console.log("Keycloak init");
      return keycloak.init({
        config: {
          url: 'https://keycloack.bitberry.tech/',
          realm: 'kirakovacs.com',
          clientId: 'angular'
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        },

        bearerPrefix: 'Bearer',
        enableBearerInterceptor: true,

        shouldAddToken: (request) => {
          const { method, url } = request;
          console.log(url);
          return url.startsWith('https://keycloack.bitberry.tech/') || url.startsWith(environment.backendUrl);
        }
      });
    }
    return Promise.resolve(); // Skip Keycloak initialization on server-side
  };
}


const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};


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
    TextEditorComponent,
    EditorDirective,
    NewElementsComponent,
    DynamicRootComponent,
    MarginPaddingEditComponent,
    ResponsiveDataAccessorDirective,
    ScreenSizeSelectorComponent,
    LanguageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule,

    ApiModule.forRoot({ rootUrl: ApiUrl }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    DndModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakBearerInterceptorProvider,
    SidebarService,
    LanguageService,
    SaveDataService,
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService, PLATFORM_ID],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
