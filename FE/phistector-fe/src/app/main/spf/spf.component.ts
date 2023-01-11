import { Component, OnInit } from '@angular/core';
import { MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';
import { SPF_ALL_TAG, SPF_AUTHENTICAION_FAIL, SPF_AUTHENTICAION_SUCCESS, SPF_A_TAG, SPF_DOMAIN_ALIGNED_FAIL, SPF_DOMAIN_ALIGNED_SUCCESS, SPF_EXISTS_TAG, SPF_EXP_TAG, SPF_INCLUDE_TAG, SPF_IP4_TAG, SPF_IP6_TAG, SPF_MX_TAG, SPF_PTR_TAG, SPF_RECORD_PUBLISHED_FAIL, SPF_RECORD_PUBLISHED_SUCCESS, SPF_REDIRECT_TAG, SPF_VALID_LENGTH_FAIL, SPF_VALID_LENGTH_SUCCESS, SPF_VALID_NO_ANY_PASS_MECHANISM_FAIL, SPF_VALID_NO_ANY_PASS_MECHANISM_SUCCESS, SPF_VALID_NO_CHARS_AFTER_ALL_FAIL, SPF_VALID_NO_CHARS_AFTER_ALL_SUCCESS, SPF_VALID_SYNTAX_FAIL, SPF_VALID_SYNTAX_SUCCESS } from 'src/app/constants/Constants.model';
import { SpfVerificationResponse } from 'src/app/interfaces/SpfVerificationResponse.model';
import { MailService } from 'src/app/services/mail.service';
import { Common } from '../Common';

@Component({
  selector: 'app-spf',
  templateUrl: './spf.component.html',
  styleUrls: ['./spf.component.css']
})
export class SpfComponent extends Common implements OnInit {

  public spfResponse: SpfVerificationResponse | undefined;


  constructor(private mailService: MailService) {
    super();
    mailService.phishTectorResponse$.subscribe(phishTectorResponse => this.spfResponse = phishTectorResponse.spfVerificationResponse);
    //this.spfResponse = JSON.parse("{\r\n        \"domain\": \"gmail.com\",\r\n        \"ipAddress\": \"209.85.220.41\",\r\n        \"record\": \"v=spf1 redirect=_spf.google.com\",\r\n        \"directives\": [],\r\n        \"modifiers\": [\r\n            {\r\n                \"qualifier\": \"+\",\r\n                \"value\": \"redirect=_spf.google.com\"\r\n            }\r\n        ],\r\n        \"signatureDomainAligned\": true,\r\n        \"authenticationResult\": \"pass\",\r\n        \"onlyOneRecord\": true,\r\n        \"validSyntax\": true,\r\n        \"noCharsAfterALL\": true,\r\n        \"numOfLookups\": 2,\r\n        \"validLength\": true,\r\n        \"noPTRFound\": true,\r\n        \"noAnyPassMechanism\": true,\r\n        \"deprecated\": false,\r\n        \"exceptionMessage\": null\r\n    }");

    this.spfResponse?.directives.forEach(directive => {
      this.tagValueArray.push({
        tag: directive.qualifier,
        value: directive.value,
        description: this.getTagDesc(directive.value.split(":")[0])
      });
    });

    this.spfResponse?.modifiers.forEach(modifier => {
      this.tagValueArray.push({
        tag: modifier.qualifier,
        value: modifier.value,
        description: this.getTagDesc(modifier.value.split("=")[0])
      });
    })

    if (this.spfResponse?.exceptionMessage) {
      this.exceptionMessage = this.spfResponse.exceptionMessage;
    } else {
      this.initTestResultArray();
    }
  }

  ngOnInit(): void {
    this.tagValueDataSource.data = this.tagValueArray;
    if(!this.exceptionMessage)
      this.testResultDataSource.data = this.testResultArray;
  }


  private getTagDesc(tag: string): string {
    switch (tag) {
      case "all":
        return SPF_ALL_TAG;
      case "mx":
        return SPF_MX_TAG;
      case "a":
        return SPF_A_TAG;
      case "ptr":
        return SPF_PTR_TAG;
      case "ip4":
        return SPF_IP4_TAG;
      case "ip6":
        return SPF_IP6_TAG;
      case "include":
        return SPF_INCLUDE_TAG;
      case "exists":
        return SPF_EXISTS_TAG;
      case "redirect":
        return SPF_REDIRECT_TAG;
      case "exp":
        return SPF_EXP_TAG;
      default:
        return "";
    }
  }

  private initTestResultArray() {
    this.testResultArray.push({
      tag: "SPF Record Published",
      value: this.spfResponse?.record ? SPF_RECORD_PUBLISHED_SUCCESS : SPF_RECORD_PUBLISHED_FAIL
    });

    this.testResultArray.push({
      tag: "SPF Authentication",
      value: this.spfResponse?.authenticationResult == "pass" ? SPF_AUTHENTICAION_SUCCESS : SPF_AUTHENTICAION_FAIL
    });
    this.testResultArray.push({
      tag: "SPF Alignment",
      value: this.spfResponse?.signatureDomainAligned ? SPF_DOMAIN_ALIGNED_SUCCESS : SPF_DOMAIN_ALIGNED_FAIL
    });
    this.testResultArray.push({
      tag: "SPF Syntax Check",
      value: this.spfResponse?.validSyntax ? SPF_VALID_SYNTAX_SUCCESS : SPF_VALID_SYNTAX_FAIL
    });

    this.testResultArray.push({
      tag: "SPF Contains characters after ALL",
      value: this.spfResponse?.noCharsAfterALL ? SPF_VALID_NO_CHARS_AFTER_ALL_SUCCESS : SPF_VALID_NO_CHARS_AFTER_ALL_FAIL
    });

    this.testResultArray.push({
      tag: "SPF Included Lookups",
      value: this.spfResponse?.numOfLookups && this.spfResponse.numOfLookups < 11 ? SPF_RECORD_PUBLISHED_SUCCESS : SPF_RECORD_PUBLISHED_FAIL
    });

    this.testResultArray.push({
      tag: "SPF Valid record length",
      value: this.spfResponse?.validLength ? SPF_VALID_LENGTH_SUCCESS : SPF_VALID_LENGTH_FAIL
    });

    this.testResultArray.push({
      tag: "SPF Any pass mechanism",
      value: this.spfResponse?.noAnyPassMechanism ? SPF_VALID_NO_ANY_PASS_MECHANISM_SUCCESS : SPF_VALID_NO_ANY_PASS_MECHANISM_FAIL
    });
  }


}

