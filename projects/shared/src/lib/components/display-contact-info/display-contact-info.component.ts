import { Component, OnInit, Input } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';

interface ConInfoPhysical {
  name: string;
  text: string;
  icon: string;
}

interface ConInfoSocial {
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-display-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './display-contact-info.component.html',
  styleUrls: ['./display-contact-info.component.scss'], // Fixed typo
})

export class DisplayContactInfoComponent implements OnInit {

  @Input() socialOnly: boolean = false;

  conInfoPhysical: ConInfoPhysical[] = [];
  conInfoSocial: ConInfoSocial[] = [];

  constructor(private jsonDataService: JsonDataService) {}

  ngOnInit(): void {

    this.jsonDataService.loadData('assets/JSON/contact-information.json').subscribe(() => {
      const data = this.jsonDataService.getData();

      this.conInfoPhysical = data.physical;
      this.conInfoSocial = data.social;

    });

  }

  get getConInfoPhysical() {
    return this.conInfoPhysical;
  }

  get getConInfoSocial() {
    return this.conInfoSocial;
  }
}
