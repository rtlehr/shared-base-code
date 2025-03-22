import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { NewsComponent } from './components/news/news.component';
import { FaqComponent } from './components/faq/faq.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { InfoHighlightComponent } from './components/cards/info-highlight/info-highlight.component';
import { BusinessCardComponent } from './components/cards/business-card/business-card.component';
import { ContentTabsComponent } from './components/content-tabs/content-tabs.component';
import { InfoCardsComponent } from './components/info-cards/info-cards.component';
import { PageGeneratorComponent } from './components/contentDisplay/page-generator/page-generator.component';
import { ContentWithMenuComponent } from './components/contentDisplay/content-with-menu/content-with-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';
import { DisplayLogoComponent } from './components/display-logo/display-logo.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HtmlContentComponent } from './components/html-content/html-content/html-content.component';
import { LoginComponent } from './components/login/login.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [
    // Add your components, directives, and pipes here
  ],
  imports: [
    CommonModule,
    BlogDetailsComponent,
    ImageGalleryComponent,
    ImageDisplayComponent,
    ImageSliderComponent,
    NewsComponent,
    FaqComponent,
    FormGeneratorComponent,
    InfoHighlightComponent,
    BusinessCardComponent,
    ContentTabsComponent,
    InfoCardsComponent,
    PageGeneratorComponent,
    ContentWithMenuComponent,
    ContentBlankPageComponent,
    DisplayLogoComponent,
    HeaderMenuComponent,
    HtmlContentComponent,
    LoginComponent,
    ModalWindowComponent
  ],
  exports: [
    BlogDetailsComponent,
    ImageGalleryComponent,
    ImageDisplayComponent,
    ImageSliderComponent,
    NewsComponent,
    FaqComponent,
    FormGeneratorComponent,
    InfoHighlightComponent,
    BusinessCardComponent,
    ContentTabsComponent,
    InfoCardsComponent,
    PageGeneratorComponent,
    ContentWithMenuComponent,
    ContentBlankPageComponent,
    DisplayLogoComponent,
    HeaderMenuComponent,
    HtmlContentComponent,
    LoginComponent,
    ModalWindowComponent
  ]
})
export class SharedModule { }
