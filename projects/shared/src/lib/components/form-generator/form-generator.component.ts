import { Component, Input, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.css'
})
export class FormGeneratorComponent {

  form: any[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadform(changes['fileToLoad'].currentValue);
      } 

    } 

  }

  loadform(contentToLoad: String)
  {

    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.form = this.jsonDataService.getData();
    });


  }

  get getForm() {

    return this.form;

  }

  //get getFormFields() {

   // return this.form[0].fields;

  //}

  get getFormFields() {
    return this.form[0]?.fields ?? [];
  }

} 
