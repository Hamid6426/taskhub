import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app.component';
import { config } from './app/app.config.server';
import 'zone.js/node';

const bootstrap = (context: BootstrapContext) => {
  return bootstrapApplication(App, config, context);
};

export default bootstrap;
