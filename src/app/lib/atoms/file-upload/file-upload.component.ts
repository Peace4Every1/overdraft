import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.less']
})

export class FileUploadComponent {
  // file upload options
  @Input() allowMultiple = false;
  @Input() acceptTypes = '*';

  // file upload btn
  @Input() uploadBtnText: string;
  @Input() uploadBtnTextIconClass: string;
  @Input() uploadBtnTextIconClassLeftIcon: string;
  @Input() uploadBtnTextIconClassRightIcon: string;

  // result
  files = [];


  @Output() fileUpload = new EventEmitter<File[]>();

  constructor(private refEl: ElementRef) {}
  @ViewChild('el', {read: ElementRef}) fileInput: ElementRef;

  onChange(event) {
    if (!this.allowMultiple) {
      this.files = [];
    }

    const files = JSON.parse(JSON.stringify(event.target.files));

    for (const file of event.target.files) {
      this.files.push(file);
    }

    this.fileUpload.emit(this.files);

    // reset input file
    this.fileInput.nativeElement.value = '';
  }

  onFileUpload(el) {
    el.click();
  }
}
