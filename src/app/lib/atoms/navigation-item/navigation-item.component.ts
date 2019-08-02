import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.less']
})
export class NavigationItemComponent {
  @Input() item;
}
