import { Component } from '@angular/core';
import { Invoice } from './invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: Invoice;

  clearCache() {
    localStorage.clear();
  }
}
