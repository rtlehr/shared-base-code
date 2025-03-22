import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../../services/json-data.service';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit, OnChanges { 

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  people: any[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    if (this.fileToLoad) {
      this.loadPeople(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadPeople(changes['fileToLoad'].currentValue);
    }
  }

  loadPeople(contentToLoad: string): void {
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      const data = this.jsonDataService.getData();
      this.people = data.people;
    });
  }

  get getPeople() {
    return this.people;
  }
}
