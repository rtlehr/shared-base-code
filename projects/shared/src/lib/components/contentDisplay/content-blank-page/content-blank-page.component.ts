import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-blank-page',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './content-blank-page.component.html',
  styleUrl: './content-blank-page.component.scss'
})
export class ContentBlankPageComponent {

}
