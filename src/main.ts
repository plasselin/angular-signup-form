import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
} else {
  // Suppress Angular development mode logs
  console.log = function() {};
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
