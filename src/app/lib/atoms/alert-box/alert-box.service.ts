import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';


@Injectable()
export class AlertBoxService {
  public showMsg = new BehaviorSubject({type: null, text: ''});

  initMsg ( error ) {
    this.showMsg.next(error);
  }
}
