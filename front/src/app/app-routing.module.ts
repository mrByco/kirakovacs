import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TherapiestPageComponent } from './pages/therapiest-page/therapiest-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'therapies', component: TherapiestPageComponent },
  { path: 'about', component: AboutPageComponent },

  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
