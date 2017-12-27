import { Component } from '@angular/core';

import { AboutPage } from '../about/controller';
import { SettingsPage } from '../settings/controller';
import { OverviewPage } from '../overview/controller';

@Component({
  templateUrl: 'view.html'
})
export class TabsPage {

  tab1Root = OverviewPage;
  tab2Root = SettingsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
