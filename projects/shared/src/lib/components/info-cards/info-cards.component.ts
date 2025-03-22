import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';
import { CommonModule } from '@angular/common';

export interface InfoItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss'
})
export class InfoCardsComponent {

  constructor(private jsonDataService: JsonDataService) {}

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  infoItems: InfoItem[] = [];
  
  ngOnInit(): void {
    console.log("ngOnInit in FaqComponent");
    if (this.fileToLoad) {
      this.loadInfo(this.fileToLoad);
    }
  }

  loadInfo(contentToLoad: string): void {
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.infoItems = this.jsonDataService.getData();
    });
  }


  
}
