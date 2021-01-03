// libs
import { Component, Input, OnInit } from '@angular/core';

// models
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;

  constructor() {}

  ngOnInit(): void {}
}
