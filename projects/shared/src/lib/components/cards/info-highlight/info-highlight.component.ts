import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { JsonDataService } from '../../../services/json-data.service'; 

interface ImageData {
  imageUrl: string;
  title: string;
  textBoxes: { text: string }[];
  componentSize: number;
}

@Component({
  selector: 'app-info-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-highlight.component.html',
  styleUrls: ['./info-highlight.component.scss']
})
export class InfoHighlightComponent implements OnInit, OnDestroy, OnChanges {

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  images: ImageData[] = [];
  currentIndex = 0;
  autoScroll = false;
  autoScrollSub: Subscription | null = null;
  imageSize: number = 150; // Default size, will be updated from JSON 

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    if (this.fileToLoad) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      // Unsubscribe previous auto-scroll (if any) before reloading data
      if (this.autoScrollSub) {
        this.autoScrollSub.unsubscribe();
        this.autoScrollSub = null;
      }
      this.loadData();
    }
  }

  loadData(): void {
    this.jsonDataService.loadData('assets/' + this.fileToLoad).subscribe(() => {
      const data = this.jsonDataService.getData();
      this.images = data.images || [];
      this.imageSize = data.componentSize || 300;
      this.autoScroll = data.autoScroll;
      this.currentIndex = 0;
      if (this.autoScroll && this.images.length > 0) {
        this.startAutoScroll();
      }
    });
  }

  changeImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoScroll();
  }

  startAutoScroll(): void {
    this.autoScrollSub = interval(5000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
  }

  resetAutoScroll(): void {
    if (this.autoScrollSub) {
      this.autoScrollSub.unsubscribe();
      this.startAutoScroll();
    }
  }

  ngOnDestroy(): void {
    if (this.autoScrollSub) {
      this.autoScrollSub.unsubscribe(); 
    }
  }

  getFontSize(): number {
    return Math.min(this.imageSize / 400, 1);
  }
}
