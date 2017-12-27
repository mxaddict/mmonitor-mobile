import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { MomentModule } from 'angular2-moment'
import { NgModule, ErrorHandler } from '@angular/core'

import { MMonitor } from './app.component'

import { AboutPage } from '../pages/about/controller'
import { SettingsPage } from '../pages/settings/controller'
import { OverviewPage } from '../pages/overview/controller'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@NgModule({
  declarations: [
    MMonitor,
    AboutPage,
    SettingsPage,
    OverviewPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MMonitor),
    IonicStorageModule.forRoot(),
    MomentModule,
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
