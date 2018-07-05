/* tslint:disable */
import { Injectable } from '@angular/core';
import { Transaction } from '../../models/Transaction';
import { AccountInfo } from '../../models/AccountInfo';
import { Campaign } from '../../models/Campaign';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Transaction: Transaction,
    AccountInfo: AccountInfo,
    Campaign: Campaign,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
