import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalWindowService } from '../../../services/modal-window.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

@Component({
  selector: 'app-html-content',
  standalone: true,
  imports: [],
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent implements OnInit, OnChanges {

  @Input() fileToLoad: string = '';
  @Input() divId: string = '';

  htmlContent!: SafeHtml;

  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private modalWindow: ModalWindowService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    //console.log("ngOnInit for MainContentComponent");
    // If fileToLoad is already defined when the component is created,
    // ensure content is loaded.
    if (this.fileToLoad) {
      this.loadContent(this.fileToLoad);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("ngOnChanges for MainContentComponent", changes);
    if (changes['fileToLoad'] && changes['fileToLoad'].currentValue) {
      this.loadContent(changes['fileToLoad'].currentValue);
    }
  }

  loadContent(fileName: string) {
    this.http.get(`assets/${fileName}`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe({
        next: (html) => {
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
          this.observeContentChanges();
        },
        error: (err) => {
          console.error('Failed to load content:', err);
          this.htmlContent = '<p>Sorry, the content could not be loaded.</p>';
        }
      });
  }
  
  /**
   * Uses a MutationObserver to wait until the content has rendered
   * before attaching events, highlighting code, and checking for modal triggers.
   */
  observeContentChanges() {
    if (this.contentContainer) {
      const observer = new MutationObserver(() => {
        observer.disconnect();
        this.attachClickEvents();
        this.highlightCode();
        this.checkForModalTrigger();
      });
  
      observer.observe(this.contentContainer.nativeElement, {
        childList: true,
        subtree: true
      });
    } else {
      // Fallback in the unlikely event that contentContainer isn't available
      setTimeout(() => {
        this.attachClickEvents();
        this.highlightCode();
        this.checkForModalTrigger();
      }, 10);
    }
  }

  checkForModalTrigger() {
    if (!this.contentContainer) return;
  
    const modalTrigger = this.contentContainer.nativeElement.querySelector('trigger-modal');
    if (modalTrigger) {
      const jsonData = modalTrigger.getAttribute('data-content');
      if (jsonData) {
        try {
          const modalData = JSON.parse(jsonData);
          this.openModalWindow(modalData);
        } catch (error) {
          console.error("Invalid JSON in trigger-modal:", error);
        }
      }
      // Remove the trigger-modal tag to avoid duplicate triggers
      modalTrigger.remove();
    }
  }
  
  attachClickEvents() {
    if (!this.contentContainer) return;
  
    const elements = this.contentContainer.nativeElement.querySelectorAll('[data-click]');
    elements.forEach((element: HTMLElement) => {
      const functionName = element.getAttribute('data-click');
      const jsonData = element.getAttribute('data-content');
      if (functionName === 'openModalWindow' && jsonData) {
        try {
          const modalData = JSON.parse(jsonData);
          this.renderer.listen(element, 'click', (event) => {
            event.preventDefault();
            this.openModalWindow(modalData);
          });
        } catch (error) {
          console.error("Invalid JSON in data-content:", error);
        }
      }
    });
  }
  
  highlightCode() {
    if (this.contentContainer) {
      this.contentContainer.nativeElement.querySelectorAll('pre code').forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
    }
  }

  openModalWindow(modalContent: any) {
    //console.log("Modal Content:", modalContent);
    this.modalWindow.openModalWindow(modalContent);
  }
}
