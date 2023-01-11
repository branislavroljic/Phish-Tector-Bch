import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DKIM_A_TAG, DKIM_BH_TAG, DKIM_BODY_HASH_VERIFIED_FAIL, DKIM_BODY_HASH_VERIFIED_SUCCESS, DKIM_B_TAG, DKIM_C_TAG, DKIM_DUPLICATE_TAGS_FAIL, DKIM_DUPLICATE_TAGS_SUCCESS, DKIM_D_TAG, DKIM_H_TAG, DKIM_I_TAG, DKIM_L_TAG, DKIM_PR_G_TAG, DKIM_PR_H_TAG, DKIM_PR_K_TAG, DKIM_PR_N_TAG, DKIM_PR_P_TAG, DKIM_PR_S_TAG, DKIM_PR_T_TAG, DKIM_PR_V_TAG, DKIM_PUBLIC_KEY_PRESENT_FAIL, DKIM_PUBLIC_KEY_PRESENT_SUCCESS, DKIM_Q_TAG, DKIM_SIGNATURE_ALIGNED_FAIL, DKIM_SIGNATURE_ALIGNED_SUCCESS, DKIM_SIGNATURE_NOT_EXPIRED_FAIL, DKIM_SIGNATURE_NOT_EXPIRED_SUCCESS, DKIM_S_TAG, DKIM_T_TAG, DKIM_VALID_SIGNATURE_SYNTAX_FAIL, DKIM_VALID_SIGNATURE_SYNTAX_SUCCESS, DKIM_V_TAG, DKIM_X_TAG, DKIM_Z_TAG, DMARC_SYNTAX_CHECK_FAIL, DMARC_SYNTAX_CHECK_SUCCESS } from 'src/app/constants/Constants.model';
import { DkimVerificationResponse, SignatureRecord } from 'src/app/interfaces/DkimVerificationResponse.model';
import { PhishTectorResponse } from 'src/app/interfaces/PhishTectorResponse.model';
import { TagValue } from 'src/app/interfaces/TagValue.model';
import { TagValueDesc } from 'src/app/interfaces/TagValueDesc.model';
import { MailService } from 'src/app/services/mail.service';
import { Common } from '../Common';

@Component({
  selector: 'app-dkim',
  templateUrl: './dkim.component.html',
  styleUrls: ['./dkim.component.css']
})
export class DkimComponent implements OnInit {

  public dkimResponse!: DkimVerificationResponse;

  public tagValueArray: TagValueDesc[][] = [];
  public defaultsArray: TagValueDesc[][] = [];
  public publicRecordArray: TagValueDesc[][] = [];
  public testResultArray: TagValue[][] = [];

  public exceptionTagValueArray: TagValueDesc[][] = [];
  public exceptionDefaultsArray: TagValueDesc[][] = [];
  public exceptionPublicRecordArray: TagValueDesc[][] = [];
  public exceptionTestResultArray: TagValue[][] = [];


  public tagValueDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public defaultsDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public publicRecordDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public testResultDataSource: MatTableDataSource<TagValue>[] = [];

  public exceptionTagValueDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public exceptionDefaultsDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public exceptionPublicRecordDataSource: MatTableDataSource<TagValueDesc>[] = [];
  public exceptionTestResultDataSource: MatTableDataSource<TagValue>[] = [];

  public tagValueDisplayedColumns: string[] = ['tag', 'value', 'description'];
  public testResultDisplayedColumns: string[] = ['tag', 'value'];


  constructor(private mailService: MailService) {
    mailService.phishTectorResponse$.subscribe(phishTectorResponse => this.dkimResponse = phishTectorResponse.dkimVerificationResponse);
//    this.dkimResponse = JSON.parse("{\r\n        \"signatureRecords\": [\r\n            {\r\n                \"tagValues\": {\r\n                    \"a\": \"rsa-sha256\",\r\n                    \"b\": \"bGDeKmmUjXl4cIfki14eocFlMVic35+kqXaUM2Ig9dSK9zmfLKw6\/DyF1L01HkjWu\/\\r\\n         \/m6oR79+AFdrt+F0KR\/hrjGbMwZ6pQyGvMJqMHco5fQCNkSkNJgvV7NYVBE1ToUvKNbb\\r\\n         2vQSRWJjFwAn9sG2zGMZB3B4GgCmn4XbWsknfHh3o3PRS2pbBEcFNO0i3995gyYy460Q\\r\\n         3rn1aA4tec6gXQvU5KZ132two1lb+24juVcYb0\/yqwrF50CikRHMGmI7oYB+6ioKlrQP\\r\\n         jXs4V07BqEz46U+8+n2SeMev0KfEGqTGfX1DPFhzGpF1ghcze\/Ok0HudQ56FZNGIbfLp\\r\\n         +tAw==\",\r\n                    \"c\": \"relaxed\/relaxed\",\r\n                    \"s\": \"20210112\",\r\n                    \"d\": \"etf-unibl-org.20210112.gappssmtp.com\",\r\n                    \"v\": \"1\",\r\n                    \"bh\": \"1xJfLfffECjYpxvJLffhLLjlW7DNBPHFR7f1mB+f++Q=\",\r\n                    \"h\": \"to:subject:message-id:date:from:in-reply-to:references:mime-version\\r\\n         :from:to:cc:subject:date\"\r\n                },\r\n                \"defaults\": {\r\n                    \"q\": \"dns\/txt\",\r\n                    \"c\": \"simple\/simple\",\r\n                    \"l\": \";all;\"\r\n                },\r\n                \"publicRecordTagValue\": {\r\n                    \"p\": \"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8XlwdG7GKz3E2ynrLRPzb3iP\/vNCfrMdcN1Akhrj1Snu5pQi3gSnI6U5KWM56An4eC+c+BHq5ujk9HEdk04HYRIT0CjW9fIqeFQmahOivtPBAN6oOg\/VQ2Y2L5IE4gHHjLOQzPXC4H5soG8PNWPK00NEQ5Y6lUGWubuMJnQtrVyHMCcDeXh0So1n5DAgtO1UvhyvZ82hrx7hhiMuTZ8yQ+f8AzxcjYL9x\/+M7hmrUDnA8Np7j1\/OU\/wiKWvsllKSFElGQpFd8VFYYv+qt4sUAzqfkYqvWKLGXhWbpm1uY1ce1qSQiEFMd7ycz754lMhc15lZfU3TdiGhQjgps+gQIwIDAQAB\",\r\n                    \"v\": \"DKIM1\",\r\n                    \"k\": \"rsa\"\r\n                },\r\n                \"validRecordSyntax\": true,\r\n                \"publicKeyPresent\": true,\r\n                \"validSignatureSyntax\": true,\r\n                \"noDuplicateTags\": true,\r\n                \"signatureNotExpired\": true,\r\n                \"bodyHashVerified\": true,\r\n                \"stringRepresentation\": \" v=1; a=rsa-sha256; c=relaxed\/relaxed; \\r\\n        d=etf-unibl-org.20210112.gappssmtp.com; s=20210112; \\r\\n        h=to:subject:message-id:date:from:in-reply-to:references:mime-version\\r\\n         :from:to:cc:subject:date;\\r\\n        bh=1xJfLfffECjYpxvJLffhLLjlW7DNBPHFR7f1mB+f++Q=;\\r\\n        b=bGDeKmmUjXl4cIfki14eocFlMVic35+kqXaUM2Ig9dSK9zmfLKw6\/DyF1L01HkjWu\/\\r\\n         \/m6oR79+AFdrt+F0KR\/hrjGbMwZ6pQyGvMJqMHco5fQCNkSkNJgvV7NYVBE1ToUvKNbb\\r\\n         2vQSRWJjFwAn9sG2zGMZB3B4GgCmn4XbWsknfHh3o3PRS2pbBEcFNO0i3995gyYy460Q\\r\\n         3rn1aA4tec6gXQvU5KZ132two1lb+24juVcYb0\/yqwrF50CikRHMGmI7oYB+6ioKlrQP\\r\\n         jXs4V07BqEz46U+8+n2SeMev0KfEGqTGfX1DPFhzGpF1ghcze\/Ok0HudQ56FZNGIbfLp\\r\\n         +tAw==\\t\\t \",\r\n                \"signatureTimestamp\": null,\r\n                \"dkimSignatureAligned\": false\r\n            },\r\n\t\t\t{\r\n                \"tagValues\": {\r\n                    \"a\": \"rsa-sha256\",\r\n                    \"b\": \"bGDeKmmUjXl4cIfki14eocFlMVic35+kqXaUM2Ig9dSK9zmfLKw6\/DyF1L01HkjWu\/\\r\\n         \/m6oR79+AFdrt+F0KR\/hrjGbMwZ6pQyGvMJqMHco5fQCNkSkNJgvV7NYVBE1ToUvKNbb\\r\\n         2vQSRWJjFwAn9sG2zGMZB3B4GgCmn4XbWsknfHh3o3PRS2pbBEcFNO0i3995gyYy460Q\\r\\n         3rn1aA4tec6gXQvU5KZ132two1lb+24juVcYb0\/yqwrF50CikRHMGmI7oYB+6ioKlrQP\\r\\n         jXs4V07BqEz46U+8+n2SeMev0KfEGqTGfX1DPFhzGpF1ghcze\/Ok0HudQ56FZNGIbfLp\\r\\n         +tAw==\",\r\n                    \"c\": \"relaxed\/relaxed\",\r\n                    \"s\": \"20210112\",\r\n                    \"d\": \"etf-unibl-org.20210112.gappssmtp.com\",\r\n                    \"v\": \"1\",\r\n                    \"bh\": \"1xJfLfffECjYpxvJLffhLLjlW7DNBPHFR7f1mB+f++Q=\",\r\n                    \"h\": \"to:subject:message-id:date:from:in-reply-to:references:mime-version\\r\\n         :from:to:cc:subject:date\"\r\n                },\r\n                \"defaults\": {\r\n                    \"q\": \"dns\/txt\",\r\n                    \"c\": \"simple\/simple\",\r\n                    \"l\": \";all;\"\r\n                },\r\n                \"publicRecordTagValue\": {\r\n                    \"p\": \"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8XlwdG7GKz3E2ynrLRPzb3iP\/vNCfrMdcN1Akhrj1Snu5pQi3gSnI6U5KWM56An4eC+c+BHq5ujk9HEdk04HYRIT0CjW9fIqeFQmahOivtPBAN6oOg\/VQ2Y2L5IE4gHHjLOQzPXC4H5soG8PNWPK00NEQ5Y6lUGWubuMJnQtrVyHMCcDeXh0So1n5DAgtO1UvhyvZ82hrx7hhiMuTZ8yQ+f8AzxcjYL9x\/+M7hmrUDnA8Np7j1\/OU\/wiKWvsllKSFElGQpFd8VFYYv+qt4sUAzqfkYqvWKLGXhWbpm1uY1ce1qSQiEFMd7ycz754lMhc15lZfU3TdiGhQjgps+gQIwIDAQAB\",\r\n                    \"v\": \"DKIM1\",\r\n                    \"k\": \"rsa\"\r\n                },\r\n                \"validRecordSyntax\": true,\r\n                \"publicKeyPresent\": true,\r\n                \"validSignatureSyntax\": true,\r\n                \"noDuplicateTags\": true,\r\n                \"signatureNotExpired\": true,\r\n                \"bodyHashVerified\": true,\r\n                \"stringRepresentation\": \" v=1; a=rsa-sha256; c=relaxed\/relaxed; \\r\\n        d=etf-unibl-org.20210112.gappssmtp.com; s=20210112; \\r\\n        h=to:subject:message-id:date:from:in-reply-to:references:mime-version\\r\\n         :from:to:cc:subject:date;\\r\\n        bh=1xJfLfffECjYpxvJLffhLLjlW7DNBPHFR7f1mB+f++Q=;\\r\\n        b=bGDeKmmUjXl4cIfki14eocFlMVic35+kqXaUM2Ig9dSK9zmfLKw6\/DyF1L01HkjWu\/\\r\\n         \/m6oR79+AFdrt+F0KR\/hrjGbMwZ6pQyGvMJqMHco5fQCNkSkNJgvV7NYVBE1ToUvKNbb\\r\\n         2vQSRWJjFwAn9sG2zGMZB3B4GgCmn4XbWsknfHh3o3PRS2pbBEcFNO0i3995gyYy460Q\\r\\n         3rn1aA4tec6gXQvU5KZ132two1lb+24juVcYb0\/yqwrF50CikRHMGmI7oYB+6ioKlrQP\\r\\n         jXs4V07BqEz46U+8+n2SeMev0KfEGqTGfX1DPFhzGpF1ghcze\/Ok0HudQ56FZNGIbfLp\\r\\n         +tAw==\\t\\t \",\r\n                \"signatureTimestamp\": null,\r\n                \"dkimSignatureAligned\": false\r\n            }\r\n        ],\r\n        \"exceptionResponses\": [\r\n            {\r\n                \"signatureRecord\": {\r\n                    \"tagValues\": {\r\n                        \"a\": \"rsa-sha256\",\r\n                        \"b\": \"lIqcgzHaP5qg7FOMrRBOs2D3YTtBUmnJSJV0OrjYEDEGo\/NTEu23AlVpE7lgy87hb5\\r\\n         Tc9\/vVtZ9Yl8kJlNF7QIEbiis3rFWN0uhZpcrimNHp0oB3EBhU8AO5ejAkLeioHs1FUS\\r\\n         x++wWNAR8FwhtbJZ6dM8KI6uzCbY5L1sjrh8LN6znkO0P7SCt9+Eyz6vuYwA\/wTgHCws\\r\\n         b5+bSdrkZDTwpVTIpv0Hh4vOUTU4imaVVApmIvrw+Mv\/77IXAIAx2M4ujN8OI\/o0v+KI\\r\\n         GqRujI0\/uzu82zCKZpJ3GfEe2YZL\/EWsSCrlvnoEANtgxXsYc5ShVpk2yN0tfHmfOfSM\\r\\n         PKSg==\",\r\n                        \"c\": \"relaxed\/relaxed\",\r\n                        \"s\": \"google\",\r\n                        \"d\": \"jadranmoon.com\",\r\n                        \"v\": \"1\",\r\n                        \"bh\": \"f6A\/cN\/yu0ba4Fy3L3rVlQbJ8XlZRWGXaPr2TtU52aY=\",\r\n                        \"h\": \"mime-version:date:subject:to:from:message-id:from:to:cc:subject\\r\\n         :date\"\r\n                    },\r\n                    \"defaults\": {\r\n                        \"q\": \"dns\/txt\",\r\n                        \"c\": \"simple\/simple\",\r\n                        \"l\": \";all;\"\r\n                    },\r\n                    \"publicRecordTagValue\": {\r\n                        \"p\": \"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq\/CYY95gFsbET7vjdKNP9e5nxFePKOwcWuc3+HVZNStDCfc7tj4GaiLjO6GurbK+v3BrmiHjU+k6xDRFPmQlcGHJn3Y3ZX9xnzUNrXc4oHPg5j6uLjHTC6Y18vjEQUB\/sQSg6+nhzb5rlRClN4KFN781aLdwOD5QklfXk26d9JBf1kUW2yWP2JPCiJy2d4p3hJmDEA+joyEQOseExSnHdvcJboM+hjN9AsMRflXcQDcA1vpqBsiH5xxuKms0Y6PW0G\/v0a3FJGXqTZaJ0gJeEsAZ6Gwd7iX4eWsb1WL3LF5650MJT1mjUZxn\/Q0MbNPlJ3cL7OwgFBKfTIl60p4YoQIDAQAB\",\r\n                        \"v\": \"DKIM1\",\r\n                        \"k\": \"rsa\"\r\n                    },\r\n                    \"validRecordSyntax\": true,\r\n                    \"publicKeyPresent\": true,\r\n                    \"validSignatureSyntax\": true,\r\n                    \"noDuplicateTags\": true,\r\n                    \"signatureNotExpired\": true,\r\n                    \"bodyHashVerified\": false,\r\n                    \"stringRepresentation\": \" v=1; a=rsa-sha256; c=relaxed\/relaxed;\\r\\n        d=jadranmoon.com; s=google;\\r\\n        h=mime-version:date:subject:to:from:message-id:from:to:cc:subject\\r\\n         :date;\\r\\n        bh=f6A\/cN\/yu0ba4Fy3L3rVlQbJ8XlZRWGXaPr2TtU52aY=;\\r\\n        b=lIqcgzHaP5qg7FOMrRBOs2D3YTtBUmnJSJV0OrjYEDEGo\/NTEu23AlVpE7lgy87hb5\\r\\n         Tc9\/vVtZ9Yl8kJlNF7QIEbiis3rFWN0uhZpcrimNHp0oB3EBhU8AO5ejAkLeioHs1FUS\\r\\n         x++wWNAR8FwhtbJZ6dM8KI6uzCbY5L1sjrh8LN6znkO0P7SCt9+Eyz6vuYwA\/wTgHCws\\r\\n         b5+bSdrkZDTwpVTIpv0Hh4vOUTU4imaVVApmIvrw+Mv\/77IXAIAx2M4ujN8OI\/o0v+KI\\r\\n         GqRujI0\/uzu82zCKZpJ3GfEe2YZL\/EWsSCrlvnoEANtgxXsYc5ShVpk2yN0tfHmfOfSM\\r\\n         PKSg==\",\r\n                    \"signatureTimestamp\": null,\r\n                    \"dkimSignatureAligned\": false\r\n                },\r\n                \"message\": \"Header signature does not verify\"\r\n            }\r\n        ],\r\n        \"exceptionMessage\": null\r\n    }");

    this.dkimResponse.signatureRecords.forEach((rec, index) => {
      this.tagValueArray[index] = [];
      let tagValueMap = rec.tagValues;
      for (let t in rec.tagValues) {
        this.tagValueArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getTagDesc(t)
        });
      }

      tagValueMap = rec.defaults;
      this.defaultsArray[index] = [];
      for (let t in rec.defaults) {
        this.defaultsArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getTagDesc(t)
        });
      }

      tagValueMap = rec.publicRecordTagValue;
      this.publicRecordArray[index] = [];
      for (let t in rec.publicRecordTagValue) {
        this.publicRecordArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getPublicRecordTagDesc(t)
        });
      }

      this.initTestResultArray(rec, index, false);
    });

    this.dkimResponse.exceptionResponses.forEach((rec, index) => {
      this.exceptionTagValueArray[index] = [];
      let tagValueMap = rec.signatureRecord.tagValues;
      for (let t in rec.signatureRecord.tagValues) {
        this.exceptionTagValueArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getTagDesc(t)
        });
      }

      tagValueMap = rec.signatureRecord.defaults;
      this.exceptionDefaultsArray[index] = [];
      for (let t in rec.signatureRecord.defaults) {
        this.exceptionDefaultsArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getTagDesc(t)
        });
      }

      tagValueMap = rec.signatureRecord.publicRecordTagValue;
      this.exceptionPublicRecordArray[index] = [];
      for (let t in rec.signatureRecord.publicRecordTagValue) {
        this.exceptionPublicRecordArray[index].push({
          tag: t,
          value: tagValueMap[t],
          description: this.getPublicRecordTagDesc(t)
        });
      }

      this.initTestResultArray(rec.signatureRecord, index, true);

    });

  }

  private initTestResultArray(rec: SignatureRecord, index: number, isException: boolean) {
    let tempArr = [];
    if (isException) {
      this.exceptionTestResultArray[index] = [];
      tempArr = this.exceptionTestResultArray;
    } else {
      this.testResultArray[index] = [];
      tempArr = this.testResultArray;
    }
    tempArr[index].push({
      tag: "DKIM Signature Alignment",
      value: rec.dkimSignatureAligned ? DKIM_SIGNATURE_ALIGNED_SUCCESS : DKIM_SIGNATURE_ALIGNED_FAIL
    });
    tempArr[index].push({
      tag: "DKIM Signature Body Hash Verified",
      value: rec.bodyHashVerified ? DKIM_BODY_HASH_VERIFIED_SUCCESS : DKIM_BODY_HASH_VERIFIED_FAIL
    });
   tempArr[index].push({
      tag: "DKIM Syntax Check",
      value: rec.validRecordSyntax ? DMARC_SYNTAX_CHECK_SUCCESS : DMARC_SYNTAX_CHECK_FAIL
    });
    tempArr[index].push({
      tag: "DKIM Public Key Check",
      value: rec.publicKeyPresent ? DKIM_PUBLIC_KEY_PRESENT_SUCCESS : DKIM_PUBLIC_KEY_PRESENT_FAIL
    });
    tempArr[index].push({
      tag: "DKIM Signature Syntax Check",
      value: rec.validSignatureSyntax ? DKIM_VALID_SIGNATURE_SYNTAX_SUCCESS : DKIM_VALID_SIGNATURE_SYNTAX_FAIL
    });
    tempArr[index].push({
      tag: "DKIM Signature Duplicate Tags",
      value: rec.noDuplicateTags ? DKIM_DUPLICATE_TAGS_SUCCESS : DKIM_DUPLICATE_TAGS_FAIL
    });
    tempArr[index].push({
      tag: "DKIM Signature Expiration",
      value: rec.signatureNotExpired ? DKIM_SIGNATURE_NOT_EXPIRED_SUCCESS : DKIM_SIGNATURE_NOT_EXPIRED_FAIL
    });
  }

  // private initExceptionTestResultArray(rec: SignatureRecord, index: number) {
  //   this.exceptionTestResultArray[index] = [];
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Signature Alignment",
  //     value: rec.dkimSignatureAligned ? DKIM_SIGNATURE_ALIGNED_SUCCESS : DKIM_SIGNATURE_ALIGNED_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Signature Body Hash Verified",
  //     value: rec.bodyHashVerified ? DKIM_BODY_HASH_VERIFIED_SUCCESS : DKIM_BODY_HASH_VERIFIED_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Syntax Check",
  //     value: rec.validRecordSyntax ? DMARC_SYNTAX_CHECK_SUCCESS : DMARC_SYNTAX_CHECK_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Public Key Check",
  //     value: rec.publicKeyPresent ? DKIM_PUBLIC_KEY_PRESENT_SUCCESS : DKIM_PUBLIC_KEY_PRESENT_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Signature Syntax Check",
  //     value: rec.validSignatureSyntax ? DKIM_VALID_SIGNATURE_SYNTAX_SUCCESS : DKIM_VALID_SIGNATURE_SYNTAX_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Signature Duplicate Tags",
  //     value: rec.noDuplicateTags ? DKIM_DUPLICATE_TAGS_SUCCESS : DKIM_DUPLICATE_TAGS_FAIL
  //   });
  //   this.exceptionTestResultArray[index].push({
  //     tag: "DKIM Signature Expiration",
  //     value: rec.signatureNotExpired ? DKIM_SIGNATURE_NOT_EXPIRED_SUCCESS : DKIM_SIGNATURE_NOT_EXPIRED_FAIL
  //   });
  // }

  ngOnInit(): void {
    for (let index = 0; index < this.dkimResponse.signatureRecords.length; index++) {
      this.tagValueDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.defaultsDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.publicRecordDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.testResultDataSource[index] = new MatTableDataSource<TagValue>();

      this.tagValueDataSource[index].data = this.tagValueArray[index];
      this.defaultsDataSource[index].data = this.defaultsArray[index];
      this.publicRecordDataSource[index].data = this.publicRecordArray[index];
      this.testResultDataSource[index].data = this.testResultArray[index];
    }

    for (let index = 0; index < this.dkimResponse.exceptionResponses.length; index++) {
      this.exceptionTagValueDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.exceptionDefaultsDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.exceptionPublicRecordDataSource[index] = new MatTableDataSource<TagValueDesc>();
      this.exceptionTestResultDataSource[index] = new MatTableDataSource<TagValue>();

      this.exceptionTagValueDataSource[index].data = this.exceptionTagValueArray[index];
      this.exceptionDefaultsDataSource[index].data = this.exceptionDefaultsArray[index];
      this.exceptionPublicRecordDataSource[index].data = this.exceptionPublicRecordArray[index];
      this.exceptionTestResultDataSource[index].data = this.exceptionTestResultArray[index];
    }
  }

  private getTagDesc(tag: string): string {
    switch (tag) {
      case "a":
        return DKIM_A_TAG;
      case "v":
        return DKIM_V_TAG;
      case "q":
        return DKIM_Q_TAG;
      case "d":
        return DKIM_D_TAG;
      case "s":
        return DKIM_S_TAG;
      case "h":
        return DKIM_H_TAG;
      case "bh":
        return DKIM_BH_TAG;
      case "b":
        return DKIM_B_TAG;
      case "t":
        return DKIM_T_TAG;
      case "x":
        return DKIM_X_TAG;
      case "c":
        return DKIM_C_TAG;
      case "i":
        return DKIM_I_TAG;
      case "l":
        return DKIM_L_TAG;
      case "z":
        return DKIM_Z_TAG;
      default:
        return "";
    }
  }

  private getPublicRecordTagDesc(tag: string): string {
    switch (tag) {
      case "p":
        return DKIM_PR_P_TAG;
      case "k":
        return DKIM_PR_K_TAG;
      case "v":
        return DKIM_PR_V_TAG;
      case "t":
        return DKIM_PR_T_TAG;
      case "g":
        return DKIM_PR_G_TAG;
      case "h":
        return DKIM_PR_H_TAG;
      case "n":
        return DKIM_PR_N_TAG;
      case "s":
        return DKIM_PR_S_TAG;
      default:
        return "";
    }
  }

}
