import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit, OnChanges {

  images: any[] = [];
  selectedImage: any = null;

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    console.log("ImageDisplayComponent OnInit");
    if (this.fileToLoad) {
      this.loadImages(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ImageDisplayComponent ngOnChanges", changes);
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadImages(changes['fileToLoad'].currentValue);
    }
  }

  loadImages(contentToLoad: string): void {
    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.images = this.jsonDataService.getData();
    });
  }

  get getImages() {
    return this.images;
  }

  openModal(image: any): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
}
