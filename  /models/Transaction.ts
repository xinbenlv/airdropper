/* tslint:disable */

declare var Object: any;
export interface TransactionInterface {
  "id": string;
  "timestamp"?: Date;
  "amount"?: number;
  "ticker"?: string;
  "from"?: any;
  "to"?: any;
}

export class Transaction implements TransactionInterface {
  "id": string;
  "timestamp": Date;
  "amount": number;
  "ticker": string;
  "from": any;
  "to": any;
  constructor(data?: TransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Transaction`.
   */
  public static getModelName() {
    return "Transaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Transaction for dynamic purposes.
  **/
  public static factory(data: TransactionInterface): Transaction{
    return new Transaction(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Transaction',
      plural: 'Transactions',
      path: 'Transactions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "ticker": {
          name: 'ticker',
          type: 'string'
        },
        "from": {
          name: 'from',
          type: 'any'
        },
        "to": {
          name: 'to',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
