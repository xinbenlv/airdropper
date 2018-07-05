import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Transaction} from "../../loopbacksdk/models";
import {AccountInfoApi, TransactionApi} from "../../loopbacksdk/services/custom";

@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html'
})
export class DemoPage implements OnInit {
  private demoCampaigns: string[] = [
    'demo_airdrop_1',
    'demo_airdrop_2'
  ];

  private demoAccounts: string[] = [
    'demo_user_1',
    'demo_user_2',
    'demo_real_user_1',
  ];
  private loading:boolean = true;
  constructor(public navCtrl: NavController) {
  }

  async ngOnInit() {
    this.loading = false;
  }

}
