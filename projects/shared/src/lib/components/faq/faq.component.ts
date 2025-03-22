import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnChanges {

  faqs: any[] = [];

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    console.log("ngOnInit in FaqComponent");
    if (this.fileToLoad) {
      this.loadFaqs(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges in FaqComponent", changes);
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadFaqs(changes['fileToLoad'].currentValue);
    }
  }

  loadFaqs(contentToLoad: string): void {
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.faqs = this.jsonDataService.getData();
    });
  }

  get getFaqs() {
    return this.faqs;
  }

  scrollToAnswer(index: number): void {
    const element = document.getElementById(`answer-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    const topElement = document.getElementById('faq-questions');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
