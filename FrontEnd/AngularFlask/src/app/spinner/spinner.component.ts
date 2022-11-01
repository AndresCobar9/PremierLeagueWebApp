import { Component, OnInit } from '@angular/core';
import { spinnerService } from './spinnerService';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
    <div class="lds-hourglass"></div>
  </div>`,
  styleUrls: ['./spinner.component.css'],
  
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinnerSvc.isLoading$
  constructor(private spinnerSvc: spinnerService) { }

  ngOnInit(): void {
  }

}
