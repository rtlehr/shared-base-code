import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnChanges {

  news: any[] = [];

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('NewsComponent OnInit');
    if (this.fileToLoad) {
      this.loadNews(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NewsComponent ngOnChanges', changes);
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadNews(changes['fileToLoad'].currentValue);
    }
  }

  loadNews(contentToLoad: string): void {
    console.log("contentToLoad: " + contentToLoad);
    this.http.get<any[]>('assets/' + contentToLoad).subscribe(
      (response) => {
        this.news = response;
      },
      (error) => {
        console.error('Error fetching JSON file:', error);
      }
    );
  }

  get getNews() {
    return this.news;
  }
}
