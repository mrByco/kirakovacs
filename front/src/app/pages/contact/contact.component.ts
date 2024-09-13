import { Component, OnInit } from '@angular/core';
import { ConfigService, ConfigurableService } from 'ngx-ui-builder/dist/lib';
import { PokemonService } from './pokemon.service';
import { defaultConfig } from './config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {


  // Pokestore state
  allAbilities: string[] = [];
  searchText?: string;
  abilities: string[] = [];
  weight?: number;
  experience?: number;

  constructor(
    public configService: ConfigService,
    public configurableService: ConfigurableService,
    public pokemonService: PokemonService
  ) { }

  ngOnInit() {

    this.allAbilities = this.pokemonService.getAbilities();

    // Initial state of the UI builder
    this.configService.init(defaultConfig);
  }

  // Pokestore functionalities

  search() {
    this.pokemonService.searchPokemons(this.searchText, this.abilities, this.weight, this.experience);
  }

  selectAbility(a: string) {
    this.abilities.push(a);
    this.search();
    return false;
  }

  clear() {
    this.searchText = undefined;
    this.abilities = [];
    this.experience = undefined;
    this.weight = undefined;
    this.pokemonService.Reset();
  }

  // Utilities

  asArray(value: any) {
    return Array.isArray(value) ? value : [value];
  }
}
