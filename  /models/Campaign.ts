/* tslint:disable */

declare var Object: any;
export interface CampaignInterface {
  "name"?: string;
  "ticker"?: string;
  "id": string;
  "accountId"?: any;
}

export class Campaign implements CampaignInterface {
  "name": string;
  "ticker": string;
  "id": string;
  "accountId": any;
  constructor(data?: CampaignInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Campaign`.
   */
  public static getModelName() {
    return "Campaign";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Campaign for dynamic purposes.
  **/
  public static factory(data: CampaignInterface): Campaign{
    return new Campaign(data);
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
      name: 'Campaign',
      plural: 'Campaigns',
      path: 'Campaigns',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "ticker": {
          name: 'ticker',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'string'
        },
        "accountId": {
          name: 'accountId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
