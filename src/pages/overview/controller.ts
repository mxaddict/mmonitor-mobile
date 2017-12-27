import { AlertController, ModalController, NavController, ToastController } from 'ionic-angular'
import { Component } from '@angular/core'
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-overview',
  templateUrl: 'view.html'
})
export class OverviewPage {

  bots: Array<{
    name: string,
    url: string,
    stats: any,
    subscription: any,
    updated: Date
  }>

  loaded: boolean

  pollRate: number

  pollRateMinutes: number

  toastDuration: number

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    // Set the default to an empty array
    this.bots = []
    this.loaded = false
    this.pollRateMinutes = 1
    this.pollRate = 60000 * this.pollRateMinutes
    this.toastDuration = 3000

    // Load the bots
    this.loadBotsStorage()

    // We need to load the bots stats
    setInterval(() => {
      this.loadBotsStats()
    }, this.pollRate)
  }

  deleteBot(botId) {
    // Check if we have a subscription
    if (typeof this.bots[botId].subscription === 'function') {
      // Turn of the subscription
      this.bots[botId].subscription.unsubscribe()
    }

    // Remove the bot
    this.bots.splice(botId, 1)

    // Save changes to storage
    this.saveBotsStorage()
  }

  addBot(data) {
    // Add the bot
    this.bots.push(data)

    // Save changes to storage
    this.saveBotsStorage()

    // Load the stats
    this.loadBotsStats()
  }

  saveBotsStorage() {
    // We are not loaded yet
    if (!this.loaded) {
      return
    }

    for (let bot of this.bots) {
      // Check if we have a subscription
      if (typeof bot.subscription === 'function') {
        // Turn of the subscription
        bot.subscription.unsubscribe()
      }

      // Delete it from object
      delete bot.subscription
    }

    // Save changes to storage
    this.storage.set('bots', JSON.stringify(this.bots))
  }

  loadBotsStorage() {
    this.storage.get('bots').then((val) => {
      if (val) {
        try {
          // Parse the bots
          this.bots = JSON.parse(val)

          // Load stats when we start up
          this.loadBotsStats()
        } catch (e) {
          /* handle error */
        }
      }

      // Tell everyone we are loaded
      this.loaded = true
    })
  }

  addBotAlert() {
    this.alertCtrl.create({
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
    }).present()
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
    }).present()
  }

  loadBotsStats() {
    // Create the observers
    if (this.bots.length) {
      for (let bot of this.bots) {
        bot.subscription = this.http
          .get(`${bot.url}/report.json`)
          .subscribe(response => {
            try {
              bot.stats = response.json()
              bot.stats.spreadPercent = bot.stats.spread / bot.stats.bid
              bot.stats.balance.profit = bot.stats.balance.current - bot.stats.balance.start
              bot.updated = new Date

              this.toastCtrl.create({
                message: `Updated stats for "${bot.name}" bot`,
                duration: this.toastDuration
              }).present()

              this.saveBotsStorage()
            } catch (e) {
              /* handle error */
            }
          })
      }
    }
  }

}
