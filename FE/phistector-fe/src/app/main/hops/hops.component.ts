import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hop, IpAnalysisResponse } from 'src/app/interfaces/Hop.model';
import { MailService } from 'src/app/services/mail.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hops',
  templateUrl: './hops.component.html',
  styleUrls: ['./hops.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HopsComponent implements OnInit {

  private hops!: Hop[];
  public dataSource = new MatTableDataSource<Hop>();
  public displayedColumns: string[] = ['delay', 'from', 'by', 'with', 'dateTime', 'blacklist'];
  public displayedColumnsWithExpand = [...this.displayedColumns, 'expand']
  public expandedElement! : Hop | null;

  constructor(private mailService: MailService) {
    mailService.phishTectorResponse$.subscribe(phishTectorResponse => this.hops = phishTectorResponse.hops);
    //this.hops = JSON.parse("[\r\n        {\r\n            \"delay\": null,\r\n            \"from\": \"mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])\",\r\n            \"by\": \"mx.google.com\",\r\n            \"with\": \"SMTPS\",\r\n            \"dateTime\": \"2022-08-31T22:45:40.000+00:00\",\r\n            \"ipAnalysisResponse\": {\r\n                \"status\": \"success\",\r\n                \"continent\": \"North America\",\r\n                \"country\": \"United States\",\r\n                \"countryCode\": \"US\",\r\n                \"regionName\": \"California\",\r\n                \"city\": \"Mountain View\",\r\n                \"zip\": \"94035\",\r\n                \"lat\": 37.3861,\r\n                \"lon\": -122.084,\r\n                \"timezone\": \"America\/Los_Angeles\",\r\n                \"currency\": \"USD\",\r\n                \"isp\": \"Google LLC\",\r\n                \"org\": \"Google LLC\",\r\n                \"as\": \"AS15169 Google LLC\",\r\n                \"reverse\": \"mail-sor-f41.google.com\",\r\n                \"mobile\": false,\r\n                \"proxy\": true,\r\n                \"ip\": \"209.85.220.41\"\r\n            },\r\n            \"blacklisted\": false\r\n        },\r\n        {\r\n            \"delay\": \"PT1S\",\r\n            \"from\": null,\r\n            \"by\": \"2002:a05:6520:28c6:b0:211:6cad:6caf\",\r\n            \"with\": \"SMTP\",\r\n            \"dateTime\": \"2022-08-31T22:45:41.000+00:00\",\r\n            \"ipAnalysisResponse\": null,\r\n            \"blacklisted\": false\r\n        }\r\n    ]");

    this.hops.forEach(hop => hop.delay = moment.duration(hop.delay).asSeconds());
  }

  ngOnInit(): void {
    this.dataSource.data = this.hops;
  }

 
}
