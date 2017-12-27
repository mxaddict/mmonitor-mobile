import { AlertController, ModalController, NavController } from 'ionic-angular'
import { Component } from '@angular/core'
import { Storage } from '@ionic/storage'


@Component({
  selector: 'page-overview',
  templateUrl: 'view.html'
})
export class OverviewPage {

  bots: Array<{name: string, url: string, stats}>

  loaded: boolean

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public storage: Storage) {
    // Set the default to an empty array
    this.bots = []
    this.loaded = false

    // Load the bots
    this.loadBotsStorage()
  }

  deleteBot(botId) {
    this.bots.splice(botId, 1)
    this.saveBotsStorage()
  }

  addBot(data) {
    this.bots.push(data)
    this.saveBotsStorage()
  }

  saveBotsStorage() {
    if (!this.loaded) {
      // return
    }
    this.storage.set('bots', JSON.stringify(this.bots))
  }

  loadBotsStorage() {
    this.storage.get('bots').then((val) => {
      if (val) {
        this.bots = JSON.parse(val)
      }
      this.loaded = true
    })
  }

  addBotAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Add Bot',
      message: 'Enter the bot details',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'url',
          placeholder: 'URL'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // Do nothing
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addBot(data)
          }
        }
      ]
    });
    prompt.present();
  }

  deleteBotAlert(botId) {
    this.alertCtrl.create({
      title: 'Delete bot',
      message: 'Delete this bot permanently?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // Do nothing
          }
        },
        {
          text: 'Delete',
          handler: () => {
            // Delete the bot
            this.deleteBot(botId)
          }
        }
      ]
    }).present();
  }

}
