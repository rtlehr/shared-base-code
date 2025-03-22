import { Component } from '@angular/core';
import { Input, SimpleChanges  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HtmlContentComponent } from '../html-content/html-content/html-content.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { NewsComponent } from '../news/news.component';
import { FaqComponent } from '../faq/faq.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';
import { JsonDataService } from '../../services/json-data.service';

@Component({
  selector: 'app-content-tabs', 
  standalone: true,
  imports: [HtmlContentComponent,
    ImageGalleryComponent,
    ImageDisplayComponent,
    ImageSliderComponent,
    NewsComponent,
    FaqComponent,
    FormGeneratorComponent
  ],
  templateUrl: './content-tabs.component.html',
  styleUrl: './content-tabs.component.scss'
})
export class ContentTabsComponent { 

  pageContent: any [] = [];

  tabsData: any[] = [];

  activeTabIndex: number = 0;

  constructor(private jsonDataService: JsonDataService) { }

  @Input() fileToLoad: String = '';

  @Input() divId: String = '';

  ngOnChanges(changes: SimpleChanges): void { 

    if (changes['fileToLoad']) {

      if(changes['fileToLoad'].currentValue != "")
      {
        this.loadTabsData(changes['fileToLoad'].currentValue);
      } 

    } 

  }

  loadTabsData(contentToLoad: String)
  {

    this.jsonDataService.loadData('assets/' + contentToLoad).subscribe(() => {
      this.tabsData = this.jsonDataService.getData();
    });

  }


  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

}
