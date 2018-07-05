import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Transaction} from "../../loopbacksdk/models";
import {AccountInfoApi, TransactionApi} from "../../loopbacksdk/services/custom";
import {DatePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private loading:boolean = true;
  private transactions: Transaction[] = [];
  constructor(public navCtrl: NavController,
              private transactionApi: TransactionApi,
              private accountInfoApi: AccountInfoApi,
              private translate:TranslateService) {
  }

  async ngOnInit() {
    this.transactions = await this.transactionApi.find<Transaction>(
      {
        order: 'timestamp DESC',
        limit: 10,
      }
    ).toPromise();
    this.loading = false;
  }

  async changeLang(lang) {
    this.translate.use(lang);
  }

}
