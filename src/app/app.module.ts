import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, InvoiceComponent, FormComponent],
  imports: [
    SharedModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
