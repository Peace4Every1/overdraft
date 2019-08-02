import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-link-with-icon',
  templateUrl: './link-with-icon.component.html',
  styleUrls: []
})

// usage as tabs in app
export class LinkWithIconComponent {
  // link
  @Input() link: string;
  @Input() text: string;

  // icon
  @Input() iconClassName?: string;

  // image
  @Input() src?: string;
  @Input() alt?: string;
}
