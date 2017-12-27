import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';

import { MMonitor } from './app.component';

import { AboutPage } from '../pages/about/controller';
import { SettingsPage } from '../pages/settings/controller';
import { OverviewPage } from '../pages/overview/controller';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MMonitor,
    AboutPage,
    SettingsPage,
    OverviewPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MMonitor),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MMonitor,
    AboutPage,
    SettingsPage,
    OverviewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
