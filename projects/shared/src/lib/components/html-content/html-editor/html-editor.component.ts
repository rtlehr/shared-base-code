import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, QuillModule],
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent {
  htmlForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  quillInstance: any;
  // Controls modal visibility
  showModal: boolean = false;

  // Configure Quill toolbar options
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      ['clean'] // remove formatting button
    ]
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.htmlForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      permission: ['public', Validators.required],
      // "content" will hold the HTML output from the Quill editor
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
    
  }

  // Called when the Quill editor is created; captures the instance if needed.
  onEditorCreated(quill: any): void {
    console.log('Quill instance created:', quill);
    this.quillInstance = quill;
  }

  submitForm() {

    if (this.htmlForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    console.log('Form content (HTML):', this.htmlForm.value.content);

    this.http.post('http://yourserver.com/save-html.php', this.htmlForm.value)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.htmlForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Failed to save the document.';
          console.error('Error:', err);
        }
      });
  }

  // Opens the modal to preview the editor content.
  openPreview(): void {
    this.showModal = true;
  }

  // Closes the modal window.
  closeModal(): void {
    this.showModal = false;
  }
}
