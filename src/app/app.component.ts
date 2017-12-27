import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AboutPage } from '../pages/about/controller';
import { OverviewPage } from '../pages/overview/controller';
// import { SettingsPage } from '../pages/settings/controller';

@Component({
  templateUrl: 'app.html'
})
export class MMonitor {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = OverviewPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // What pages do we have?
    this.pages = [
      { title: 'Overview', component: OverviewPage },
      { title: 'About', component: AboutPage }
      // { title: 'Settings', component: SettingsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
