import {NavController, NavParams} from "ionic-angular";
import {AccountInfoApi, TransactionApi} from "../../loopbacksdk/services/custom";
import {AccountInfo, Transaction} from "../../loopbacksdk/models";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage implements OnInit {
  private accountId: string;
  private accountInfo: AccountInfo;
  private realAccountInfo: AccountInfo;
  private transactions: Transaction[] = [];
  private realAccountId: string = '';
  private isLoaded = false;
  private headers = [
    'timestamp',
    'ticker',
    'amount',
    'from',
  ];

  constructor(private nav: NavController,
              private navParams: NavParams,
              private transactionApi: TransactionApi,
              private accountInfoApi: AccountInfoApi) {
    this.accountId = navParams.get('accountId');
  }

  async ngOnInit() {
    await this.loadTransaction();
  }

  async activateRealAccount() {
    let realAccounts = await this.accountInfoApi.find<AccountInfo>({where: {id: this.realAccountId}}).toPromise();
    if (realAccounts.length == 1) {
      this.realAccountInfo = realAccounts[0];
      alert(`真实账号已经存在，其他虚拟账号为${this.realAccountInfo.virtualAccountIds.join(',')}`)
    } else {
      this.realAccountInfo = new AccountInfo();
      this.realAccountInfo.id = this.realAccountId;
      this.realAccountInfo.type = 'RealUser';
      this.realAccountInfo.virtualAccountIds = [];
      alert(`成功创建真实账户`);
    }
    alert(`this.accountId = ${this.accountId}`);
    if (this.realAccountInfo.virtualAccountIds.indexOf(this.accountId) >= 0) {
      alert(`之前已经成功连接真实账户与虚拟账户！`);
    } else {
      this.realAccountInfo.virtualAccountIds.push(this.accountId);

      alert(this.realAccountInfo.virtualAccountIds);
      await this.accountInfoApi.upsert<AccountInfo>(this.realAccountInfo).toPromise();
      alert(`成功连接真实账户与虚拟账户！`);
    }
  }

  private async loadTransaction() {
    this.isLoaded = false;
    this.accountInfo = await this.accountInfoApi.findById<AccountInfo>(this.accountId, {
      include: ['virtualAccountInfos', 'realAccountInfo'],
    }).toPromise();
    if (this.accountInfo.type == 'RealUser') {
      console.log(`query real user: ${this.accountInfo.virtualAccountIds.join(',')}`);
      this.transactions = await this.transactionApi.find<Transaction>(
        {
          where: {
            or:
              [
                {to:
                  {inq: this.accountInfo.virtualAccountIds}},
                {from:
                  {inq: this.accountInfo.virtualAccountIds}}
              ]
          },
          order: 'ticker ASC timestamp ASC',
          limit: 24,
        }
      ).toPromise();
    } else {
      console.log(`query single user`);
      this.transactions = await this.transactionApi.find<Transaction>(
        {
          where: {
            or:
              [
                {to: this.accountId},
                {from: this.accountId}
              ]
          },
          order: 'ticker ASC timestamp ASC',
          limit: 10,
        }
      ).toPromise();
    }
    this.isLoaded = true;
  }
}
