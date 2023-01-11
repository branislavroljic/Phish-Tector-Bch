import { Component, OnInit } from '@angular/core';
import { UrlResponse } from 'src/app/interfaces/UrlResponse.model';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {

  public urlResponse : UrlResponse | undefined;

  constructor(private mailService: MailService) { 
    mailService.phishTectorResponse$.subscribe(phishTectorResponse => this.urlResponse = phishTectorResponse.urlResponse);
    //this.urlResponse = JSON.parse("{\r\n        \"validUrls\": [\r\n            \"http:\/\/branislav.roljic\/\",\r\n            \"http:\/\/0.8ex\/\",\r\n            \"http:\/\/etf.unibl.org\/\",\r\n            \"http:\/\/student.etf.unibl.org\/\"\r\n        ],\r\n        \"blacklistedUrls\": [\"http:\/\/0.8ex\/maliciousNeki\"],\r\n        \"exceptionMessage\": null\r\n    }");
    this.urlResponse?.blacklistedUrls.forEach(u => console.log(u.threat.url));
  }
  ngOnInit(): void {
  }

}
