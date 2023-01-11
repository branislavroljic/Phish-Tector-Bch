import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DMARC_ADKIM_TAG, DMARC_ASPF_TAG, DMARC_EXTERNAL_VALIDATION_FAIL, DMARC_EXTERNAL_VALIDATION_SUCCESS, DMARC_FO_TAG, DMARC_MULTIPLE_RECORDS_FAIL, DMARC_MULTIPLE_RECORDS_SUCCESS, DMARC_PCT_TAG, DMARC_POLICY_ENABLED_FAIL, DMARC_POLICY_ENABLED_SUCCESS, DMARC_P_TAG, DMARC_RECORD_PUBLISHED_FAIL, DMARC_RECORD_PUBLISHED_SUCCESS, DMARC_RF_TAG, DMARC_RI_TAG, DMARC_RUA_TAG, DMARC_RUF_TAG, DMARC_SP_TAG, DMARC_SYNTAX_CHECK_FAIL, DMARC_SYNTAX_CHECK_SUCCESS } from 'src/app/constants/Constants.model';
import { HomeComponent } from 'src/app/home/home.component';
import { DmarcVerificationResponse } from 'src/app/interfaces/DmarcVerificationResponse.model';
import { TagValue } from 'src/app/interfaces/TagValue.model';
import { TagValueDesc } from 'src/app/interfaces/TagValueDesc.model';
import { MailService } from 'src/app/services/mail.service';
import { Common } from '../Common';

@Component({
  selector: 'app-dmarc',
  templateUrl: './dmarc.component.html',
  styleUrls: ['./dmarc.component.css']
})
export class DmarcComponent extends Common implements OnInit{

  public dmarcResponse: DmarcVerificationResponse | undefined;
  panelOpenState = false;
  
  constructor(private mailService: MailService) {
    super();
    mailService.phishTectorResponse$.subscribe(phishTectorResponse => this.dmarcResponse = phishTectorResponse.dmarcVerificationResponse);
    //this.dmarcResponse = JSON.parse("{\r\n        \"domain\": \"gmail.com\",\r\n        \"dmarcRecord\": \"v=DMARC1; p=none; sp=quarantine; rua=mailto:mailauth-reports@google.com\",\r\n        \"recordPublished\": true,\r\n        \"validSyntax\": true,\r\n        \"tagValueMap\": {\r\n            \"p\": \"none\",\r\n            \"sp\": \"quarantine\",\r\n            \"rua\": \"mailto:mailauth-reports@google.com\"\r\n        },\r\n        \"externalValidationSucceeded\": true,\r\n        \"policyRecordType\": \"none\",\r\n        \"exceptionMessage\": null\r\n    }");

    const tagValueMap = this.dmarcResponse?.tagValueMap;
    for (let t in tagValueMap) {
      const tagValue: TagValueDesc = {
        tag: t,
        value: tagValueMap[t],
        description: this.getTagDesc(t)
      }
      this.tagValueArray.push(tagValue);
    }

    if (this.dmarcResponse?.exceptionMessage) {
      this.exceptionMessage = this.dmarcResponse.exceptionMessage;
    } else {
      this.initTestResultArray();
    }
  }

  ngOnInit(): void {
    if (this.dmarcResponse?.tagValueMap)
      this.tagValueDataSource.data = this.tagValueArray;
    if(!this.exceptionMessage)
      this.testResultDataSource.data = this.testResultArray;
  }

  private getTagDesc(tag: string): string {
    switch (tag) {
      case "p":
        return DMARC_P_TAG;
      case "pct":
        return DMARC_PCT_TAG;
      case "rua":
        return DMARC_RUA_TAG;
      case "ruf":
        return DMARC_RUF_TAG;
      case "fo":
        return DMARC_FO_TAG;
      case "aspf":
        return DMARC_ASPF_TAG;
      case "adkim":
        return DMARC_ADKIM_TAG;
      case "rf":
        return DMARC_RF_TAG;
      case "ri":
        return DMARC_RI_TAG;
      case "sp":
        return DMARC_SP_TAG;
      default:
        return "";
    }
  }

  private initTestResultArray() {
    this.testResultArray.push({
      tag: "Record published",
      value: this.dmarcResponse?.recordPublished ? DMARC_RECORD_PUBLISHED_SUCCESS : DMARC_RECORD_PUBLISHED_FAIL
    });

    this.testResultArray.push({
      tag: "Syntax Check",
      value: this.dmarcResponse?.validSyntax ? DMARC_SYNTAX_CHECK_SUCCESS : DMARC_SYNTAX_CHECK_FAIL
    });

    this.testResultArray.push({
      tag: "External Validation",
      value: this.dmarcResponse?.externalValidationSucceeded ? DMARC_EXTERNAL_VALIDATION_SUCCESS : DMARC_EXTERNAL_VALIDATION_FAIL
    });

    this.testResultArray.push({
      tag: "Multiple Records",
      value: this.dmarcResponse?.multipleRecordsFound ? DMARC_MULTIPLE_RECORDS_SUCCESS : DMARC_MULTIPLE_RECORDS_FAIL
    });

    this.testResultArray.push({
      tag: "Policy Enabled",
      value: this.dmarcResponse?.policyRecordType != "none" ? DMARC_POLICY_ENABLED_SUCCESS : DMARC_POLICY_ENABLED_FAIL
    });
  }

}
