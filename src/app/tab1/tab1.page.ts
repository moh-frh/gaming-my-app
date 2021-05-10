import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id: any;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id
  }

}
