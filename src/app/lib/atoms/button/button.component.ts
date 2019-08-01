import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.less']
})


export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() iconClass = '';
  @Input() leftIcon = false;
  @Input() rightIcon = false;

  ngOnInit() {
    if (this.iconClass && !this.rightIcon) {
      this.leftIcon = true;
    }
  }
}
