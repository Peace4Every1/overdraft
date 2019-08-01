import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload-results',
  templateUrl: 'file-upload-results.component.html',
  styleUrls: ['file-upload-results.component.less']
})

export class FileUploadResultsComponent {
  @Input() files = [];

  // error
  @Input() hasErr = false;
  @Input() errMsg = '';

  // delete file
  @Input() deleteFileIconClass: string;

  @Output() deleteFile = new EventEmitter<File[]>();

  onDeleteFile(fileName) {
    this.files.map( (file, index) => {
      if ( file.name === fileName) {
        this.files.splice(index, 1);
      }
    });

    this.deleteFile.emit(this.files);
  }
}
