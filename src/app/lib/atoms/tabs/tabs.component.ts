import { Component, Input} from '@angular/core';

@Component ({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less']
})

export class TabsComponent {
  @Input() tabPathPrefix = '';
  @Input() tabs: TabInterface[];
  @Input() translationprefix = '';
}

export interface TabInterface {
   link: string;
   text: string;
   iconClass?: string;
 }
