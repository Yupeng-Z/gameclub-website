import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gametest',
  templateUrl: './gametest.component.html',
  styleUrls: ['./gametest.component.scss']
})
export class GametestComponent implements OnInit {
  @Input()
  url: string;
  urlSafe: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  
}
