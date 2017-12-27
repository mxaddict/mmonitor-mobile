import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MMonitor } from './app.component';

import { AboutPage } from '../pages/about/controller';
import { SettingsPage } from '../pages/settings/controller';
import { OverviewPage } from '../pages/overview/controller';
import { TabsPage } from '../pages/tabs/controller';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MMonitor,
    AboutPage,
    SettingsPage,
    OverviewPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MMonitor)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MMonitor,
    AboutPage,
    SettingsPage,
    OverviewPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
