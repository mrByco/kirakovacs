import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected keycloak: KeycloakService = inject(KeycloakService);

  async login() {

    var isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      await this.keycloak.login();
    } else {
      await this.keycloak.logout();
    }
  }


}
