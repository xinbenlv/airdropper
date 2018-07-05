import {NavController} from "ionic-angular";
import uuid from "uuid/v4";
import {AccountInfoApi, TransactionApi} from "../../loopbacksdk/services/custom";
import {AccountInfo} from "../../loopbacksdk/models";
import {Component} from "@angular/core";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private virtualId:string;
  constructor(private nav:NavController,
              private accountInfoApi:AccountInfoApi,
              private transactionApi:TransactionApi) {

  }
  private async register() {
    let accountInfo = new AccountInfo();
    accountInfo.type = `RealUser`; // TODO use enum if possible
    accountInfo.id = uuid();
    accountInfo.virtualAccountIds = [this.virtualId];
    this.accountInfoApi.create(accountInfo);
  }
}
