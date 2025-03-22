import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, OnChanges {

  images: any[] = [];

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {
    console.log("ImageGalleryComponent OnInit");
    if (this.fileToLoad) {
      this.loadImages(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ImageGalleryComponent ngOnChanges", changes);
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
}
