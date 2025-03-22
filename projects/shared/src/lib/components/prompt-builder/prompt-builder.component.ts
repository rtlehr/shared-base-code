import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-prompt-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.scss']
})
export class PromptBuilderComponent {
  promptDetails = {
    subject: '',
    details: '',
    style: '',
    lighting: '',
    camera: '',
    environment: '',
    medium: '',
    quality: '',
    negative: '',
    additionalNotes: '' 
  };

  artisticStyles: string[] = [
    'Fantasy',
    'Cyberpunk',
    'Impressionism',
    'Vintage',
    'Realism',
    'Anime',
    'Steampunk',
    'Minimalist',
    'Baroque',
    'Abstract',
    'Photojournalism',
    'Candid photography'
  ];

  lightingMoods: string[] = [
    'Golden sunset',
    'Dramatic shadows',
    'Soft morning light',
    'Eerie moonlight',
    'Chiaroscuro lighting',
    'Warm ambient',
    'Cool tones',
    'Natural light',
    'Overcast sky'
  ];

  cameraAngles: string[] = [
    'Wide-angle landscape',
    'Close-up portrait',
    'Bird\'s-eye view',
    'Shallow depth-of-field',
    'Low-angle perspective',
    'Over-the-shoulder',
    'Eye-level perspective'
  ];

  techMedium: string[] = [
    'Digital Painting',
    'Photorealistic Render',
    'Oil Painting',
    'Watercolor',
    'Pencil Sketch',
    'Anime Style',
    '3D Render',
    'Pixel Art',
    'Charcoal Drawing',
    'Ink Illustration',
    'Vector Illustration',
    'Mixed Media',
    'Concept Art',
    'Comic Book Style',
    'Matte Painting',
    'Pastel Art',
    'Low Poly Render',
    'Claymation Style',
    'Collage',
    'Stencil Art'
  ];

  // Add this to PromptBuilderComponent
  realismOptions: { label: string, value: string }[] = [
    { label: 'Average body types', value: 'average body types' },
    { label: 'Realistic proportions', value: 'realistic proportions' },
    { label: 'Natural human anatomy', value: 'natural human anatomy' },
    { label: 'Everyday people', value: 'everyday people' },
    { label: 'Visible imperfections', value: 'visible imperfections like body hair, scars, folds' },
    { label: 'Natural skin texture', value: 'natural skin texture' },
    { label: 'Non-idealized physiques', value: 'non-idealized physiques' },
    { label: 'Unretouched appearance', value: 'unretouched appearance' }
  ];

  selectedRealism: string[] = [];

  generatedPrompt: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  generatePrompt() {
    this.isLoading = true;

  // Append realism notes to additionalNotes (or use 'details' if preferred)
  const realismText = this.selectedRealism.length > 0
    ? 'Realism focus: ' + this.selectedRealism.join(', ') + '.'
    : '';

  const body = {
    ...this.promptDetails,
    additionalNotes: this.promptDetails.additionalNotes
      ? this.promptDetails.additionalNotes + '\n' + realismText
      : realismText
  };

  const apiUrl = 'https://rosslehr.com/api/generate-prompt.php';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.post<any>(apiUrl, body, { headers }).subscribe({
    next: (response) => {
      this.generatedPrompt = response.generatedPrompt;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error generating prompt:', error);
      this.isLoading = false;
    }
  });
  }

  copyPrompt() {
    navigator.clipboard.writeText(this.generatedPrompt);
    alert('Prompt copied to clipboard!');
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      if (!this.selectedRealism.includes(value)) {
        this.selectedRealism.push(value);
      }
    } else {
      this.selectedRealism = this.selectedRealism.filter(v => v !== value);
    }
  }

  
}
