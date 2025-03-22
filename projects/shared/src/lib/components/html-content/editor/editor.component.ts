import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [QuillModule, FormsModule, CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  // Bind the editor content to a variable for two-way binding 
  editorContent: string = '';
  quillInstance: any;
  value: string = '';
  // Control modal display state
  showModal: boolean = false;

  // Configure the Quill modules (toolbar options, etc.)
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      ['clean'] // remove formatting button
    ]
  };

  // Capture the underlying Quill instance when it is created.
  onEditorCreated(quill: any): void {
    console.log('onEditorCreated fired:', quill);
    this.quillInstance = quill;
  }

  // Optional: Event handler to log content changes
  handleContentChanged(event: any) {
    console.log('Editor content changed:', event);
  }

  // ControlValueAccessor methods (if used as a form control)
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  saveContent(): void {
    if (this.quillInstance) {
      console.log('Delta content:', this.quillInstance.getContents());
      console.log('HTML content:', this.quillInstance.root.innerHTML);
    } else {
      console.warn('Quill instance is not available.');
    }
  }

  // Open the preview modal
  openPreview(): void {
    this.showModal = true;
  }

  // Close the preview modal (click anywhere in the modal)
  closeModal(): void {
    this.showModal = false;
  }
}
