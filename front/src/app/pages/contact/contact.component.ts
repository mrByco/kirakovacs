import { Component, OnInit } from '@angular/core';
import { ExampleData } from '../../../models/ExampleData';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  protected sampleData = ExampleData

  ngOnInit(): void {

  }
}
