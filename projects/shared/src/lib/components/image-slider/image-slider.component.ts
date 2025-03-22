import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() fileToLoad: string = ''; // JSON configuration file path
  @Input() sliderWidth: string = '100%'; // Default width
  @Input() sliderHeight: string = '300px'; // Default height
  @Input() imagesCount: number = 0; 
  @Input() divId: string = '';

  images: any[] = [];
  currentIndex: number = 0;
  slideInterval: number = 3000; // Default interval in ms
  intervalId: any;

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    console.log("ImageSliderComponent OnInit");
    if (this.fileToLoad) {
      this.loadImages(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ImageSliderComponent ngOnChanges", changes);
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadImages(changes['fileToLoad'].currentValue);
    }
  }

  loadImages(contentToLoad: string): void {
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      const data = this.jsonDataService.getData();
      this.images = data.images || [];
      this.imagesCount = this.images.length;
      this.sliderWidth = data.width || '100%';
      this.sliderHeight = data.height || '400px';
      this.slideInterval = data.slideInterval || 10000;
      this.startAutoSlide();
    });
  }

  startAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
