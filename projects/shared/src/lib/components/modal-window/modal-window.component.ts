import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';
import { HtmlContentComponent } from '../html-content/html-content/html-content.component';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [HtmlContentComponent],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent implements AfterViewInit {

  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;

  constructor(private modalWindow: ModalWindowService) {}

  fileToLoad: string = "";
  divId: string = "";
  modalTitle: string = "";
  //modalHeight: number = 500;
  //modalWidth: number = 700;
  isVisible = false;

  ngOnInit() {
    this.modalWindow.actionTriggered$.subscribe((windowInfo: any) => {
      console.log("openModalWindow from modal-window component subscribe");
      this.fileToLoad = windowInfo.contentFile;
      this.divId = windowInfo.divId;
      this.modalTitle = windowInfo.title;
      this.openModalWindow();
    });
  }

  ngAfterViewInit() {
    this.adjustSize();
  }

  openModalWindow(): void {
    console.log("openModalWindow from modal-window component");
    this.isVisible = true;
    setTimeout(() => this.adjustSize(), 100); // Allow content to load before adjusting
  }

  closeModalWindow(): void {
    console.log("closeModalWindow from modal-window component");
    this.isVisible = false;
  }

  adjustSize(): void {
    if (this.modalContent) {
      const contentElement = this.modalContent.nativeElement;
      //this.modalWidth = contentElement.scrollWidth + 40; // Adding padding
      //this.modalHeight = contentElement.scrollHeight + 80; // Including header/footer
    }
  }
}
