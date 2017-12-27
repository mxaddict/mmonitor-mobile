import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/controller';

@Component({
  templateUrl: 'app.html'
})
export class MMonitor {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('ios') || platform.is('android')) {
        // change #000 to whatever you need
        window['plugins'].webviewcolor.change('#000');
      }
    });
  }
}
