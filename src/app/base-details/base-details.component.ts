import { Component } from '@angular/core';

@Component({
  selector: 'app-base-details',
  templateUrl: './base-details.component.html',
  styleUrl: './base-details.component.scss'
})
export class BaseDetailsComponent {
  protected data: any = null;
  protected error: string = '';
}
