import {AlertController, NavController, NavParams} from "ionic-angular";
import {AccountInfoApi, TransactionApi} from "../../loopbacksdk/services/custom";
import {AccountInfo, Transaction} from "../../loopbacksdk/models";
import {Component} from "@angular/core";
import uuid from "uuid/v4";
import {TranslateService} from "@ngx-translate/core";
let CAMPAIGNS = {
  'demo_airdrop_1': {
    amountEach: 10,
    ticker: 'DEMO',
  },
  'demo_airdrop_2': {
    amountEach: 20,
    ticker: 'dPKT',
  }
};

@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html'
})
export class ReceivePage {
  private amountEach:number;
  private ticker:string;
  private campaignId:string;
  private virtualChannel:string = `WeChatId`;
  private accountId:string = '';

  constructor(private nav:NavController,
              private navParams: NavParams,
              private alertCtrl:AlertController,
              private transactionApi:TransactionApi,
              private accountInfoApi:AccountInfoApi,
              private translate:TranslateService) {
    // TODO consider load campaignInfo from another table or even further, use Server-side validation.
    let campaignId = navParams.get('campaignId');
    let campaignInfo = CAMPAIGNS[campaignId];
    this.amountEach = campaignInfo.amountEach;
    this.ticker = campaignInfo.ticker;
    this.campaignId = campaignId;

  }
  private onClick() {
    this.receive().catch((err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  private async receive() {
    console.log(`receive!`);
    if (await this.validate()) {
      console.log(`validate!`);
      let alert = this.alertCtrl.create({
        title: 'Confirm WeChatId',
        message: `Do you confirm your WeChatId is ${this.accountId}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              console.log('Confirm clicked');
              let transaction = new Transaction();
              transaction.id = uuid(); // auto-gen
              transaction.timestamp = new Date(); // auto-gen
              transaction.amount = this.amountEach;
              transaction.ticker = this.ticker;
              transaction.from = this.campaignId;
              transaction.to = this.accountId;

              let accountInfo = new AccountInfo();
              accountInfo.id = this.accountId;
              accountInfo.type = 'VirtualUser';
              accountInfo.virtualChannel = this.virtualChannel;
              this.accountInfoApi.upsert<AccountInfo>(accountInfo).toPromise(); // override?
              this.transactionApi.upsert<Transaction>(transaction).toPromise();
            }
          }
        ]
      });
      console.log(`hey 1!`);
      await alert.present();
      console.log(`hey 2`);
      // alert(`${accountInfo.id}已经成功收到${transaction.amount}的${transaction.ticker}币了`);
    }
  }

  private async validate():Promise<boolean> {
    console.log(`validating...`);
    if (this.accountId.length > 0) {
      console.log(`validated good...`);
      return true;
    } else {
      let alert = this.alertCtrl.create({
        title: (await this.translate.get(`HOME.RECEIVE.CONFIRM_TITLE_PLEASE_TYPE_IN_WECHAT_ID`).toPromise()),
        subTitle: (await this.translate.get(`HOME.RECEIVE.CONFIRM_SUBTITLE_PLEASE_TYPE_IN_WECHAT_ID`).toPromise()),
        buttons: [(await this.translate.get(`GLOBAL.UI.DISMISS`).toPromise())]
      });
      await alert.present();
      console.log(`validated bad...`);
      return false;
    }
  }
}
