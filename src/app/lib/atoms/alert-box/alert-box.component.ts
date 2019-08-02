import { Component, OnInit, Input } from '@angular/core';
import {AlertBoxService} from './alert-box.service';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.less']
})
export class AlertBoxComponent implements OnInit {
  @Input() visible: string;
  @Input() text: string;
  @Input() type: string = 'error' || 'warning' || 'success';

  constructor(private alertBoxService: AlertBoxService) {}

  ngOnInit() {
    this.alertBoxService.showMsg.subscribe( error => {
      if ( error.type ) {
        this.visible = 'visible';
        this.text = error.text;
        this.type = error.type;


        setTimeout( () => {
          this.visible = '';
        }, 4000);
      }
    });
  }

  onCloseBox() {
    this.visible = '';
  }
}
