import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-overview',
  templateUrl: 'view.html'
})
export class OverviewPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  deleteConfirm(botId) {
    let confirm = this.alertCtrl.create({
      title: 'Delete bot',
      message: 'Delete this bot permanently?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Deleted bot', botId);
          }
        }
      ]
    });
    confirm.present();
  }

}
