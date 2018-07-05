import {Component, Input} from "@angular/core";
import {Transaction} from "../../loopbacksdk/models";

/**
 * TxComp: A component to show list of all transactions
 */
@Component({
  selector: 'tx-comp',
  templateUrl: 'tx.comp.html'
})
export class TxComponent {

  @Input()
  public transactions:Transaction[];
}
