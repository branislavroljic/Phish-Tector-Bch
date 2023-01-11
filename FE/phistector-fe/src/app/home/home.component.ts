import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhishTectorResponse } from '../interfaces/PhishTectorResponse.model';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mailForm: FormGroup = new FormGroup({});
  isFileSelected: boolean = false;
  @ViewChild('mailFileInput', { static: true })
  mailFileInput!: ElementRef;
  displayText = 'Choose file';
  public errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private mailService: MailService, private router: Router) { }

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      mailFile: [null, Validators.required]
    });
  }

  uploadFileEvent(mailFile: any) {
    if (mailFile.target.files) {
      this.displayText = mailFile.target.files[0].name
      this.isFileSelected = true;
    }
    else {
      this.displayText = 'Choose file';
      this.isFileSelected = false;
    }
  }

  uploadMailFileClick() {
    if (this.isFileSelected) {
      this.mailService.uploadMailFile(this.mailFileInput.nativeElement.files[0]).subscribe((phishTectorResponse: PhishTectorResponse) => {
        this.mailService.setPhishTectorResponse(phishTectorResponse);
        this.router.navigate(['/analysis']);
      },
        error => {
          this.errorMessage = error.error;
        });
    }
    // this.mailService.setPhishTectorResponse(JSON.parse("{\r\n    \"hops\": [\r\n        {\r\n            \"delay\": null,\r\n            \"from\": \"mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])\",\r\n            \"by\": \"mx.google.com\",\r\n            \"with\": \"SMTPS\",\r\n            \"dateTime\": \"2022-07-03T14:39:28.000+00:00\"\r\n        },\r\n        {\r\n            \"delay\": \"PT1S\",\r\n            \"from\": null,\r\n            \"by\": \"2002:a4a:6f5e:0:0:0:0:0\",\r\n            \"with\": \"SMTP\",\r\n            \"dateTime\": \"2022-07-03T14:39:29.000+00:00\"\r\n        }\r\n    ],\r\n    \"dmarcVerificationResponse\": {\r\n        \"domain\": \"gmail.com\",\r\n        \"dmarcRecord\": \"v=DMARC1; p=none; sp=quarantine; rua=mailto:mailauth-reports@google.com\",\r\n        \"recordPublished\": true,\r\n        \"validSyntax\": true,\r\n        \"tagValueMap\": {\r\n            \"p\": \"none\",\r\n            \"sp\": \"quarantine\",\r\n            \"rua\": \"mailto:mailauth-reports@google.com\"\r\n        },\r\n        \"externalValidationSucceeded\": true,\r\n        \"policyRecordType\": \"none\",\r\n        \"exceptionMessage\": null\r\n    },\r\n    \"spfVerificationResponse\": {\r\n        \"record\": \"v=spf1 redirect=_spf.google.com\",\r\n        \"directives\": [],\r\n        \"modifiers\": [\r\n            {\r\n                \"qualifier\": \"+\",\r\n                \"value\": \"redirect=_spf.google.com\"\r\n            }\r\n        ],\r\n        \"signatureDomainAligned\": true,\r\n        \"authenticationResult\": \"pass\",\r\n        \"onlyOneRecord\": true,\r\n        \"validSyntax\": true,\r\n        \"noCharsAfterALL\": true,\r\n        \"numOfLookups\": 2,\r\n        \"validLength\": true,\r\n        \"noPTRFound\": true,\r\n        \"noAnyPassMechanism\": true,\r\n        \"deprecated\": false,\r\n        \"exceptionMessage\": null\r\n    },\r\n    \"dkimVerificationResponse\": {\r\n        \"publicRecordTagValue\": {\r\n            \"v\": \"DKIM1\",\r\n            \"k\": \"rsa\",\r\n            \"p\": \"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq8JxVBMLHZRj1WvIMSHApRY3DraE\/EiFiR6IMAlDq9GAnrVy0tDQyBND1G8+1fy5RwssQ9DgfNe7rImwxabWfWxJ1LSmo\/DzEdOHOJNQiP\/nw7MdmGu+R9hEvBeGRQAmn1jkO46KIw\/p2lGvmPSe3+AVD+XyaXZ4vJGTZKFUCnoctAVUyHjSDT7KnEsaiND2rVsDvyisJUAH+EyRfmHSBwfJVHAdJ9oD8cn9NjIun\/EHLSIwhCxXmLJlaJeNAFtcGeD2aRGbHaS7M6aTFP+qk4f2ucRx31cyCxbu50CDVfU+d4JkIDNBFDiV+MIpaDFXIf11bGoS08oBBQiyPXgX0wIDAQAB\"\r\n        },\r\n        \"signatureRecords\": [\r\n            {\r\n                \"tagValues\": {\r\n                    \"a\": \"rsa-sha256\",\r\n                    \"b\": \"kvP8kC+7yKVlAAgaF5qB6zCNbUdY8rz\/l63iwLzBO7EL8RR+aDIc0feB3HWimTdkfr\\r\\n         mEAltYu7TXE5eJysrRpYLG81sh3AoB+BrIXi\/bX9\/1\/TiNkMGtAlpT5WIidzjsOry5Wt\\r\\n         L2I6CUzvRoyZPYUUX3Jm61b51zTaYarIh4v\/YgaF2a+As7KaGiNFe8XNlqIReFJfH5hY\\r\\n         2zo5u2yRx5z6DDf82IIOlHDCpmkm1rI47cVpiwz+Dh4T2cwfFuPzkjEFlkCUr4cOyt1G\\r\\n         gIt2mqb2daT9BlIg6KIXVugySstEEp+2OElIKys1w41Uuvbf3YQUkgMSEDIWXr5MvE9p\\r\\n         NXCw==\",\r\n                    \"c\": \"relaxed\/relaxed\",\r\n                    \"s\": \"20210112\",\r\n                    \"d\": \"gmail.com\",\r\n                    \"v\": \"1\",\r\n                    \"bh\": \"my7yRzhiyzs6NG4rWk7QR9B02RLd5wBL3jcpujCu+nI=\",\r\n                    \"h\": \"mime-version:from:date:message-id:subject:to\"\r\n                },\r\n                \"defaults\": {\r\n                    \"q\": \"dns\/txt\",\r\n                    \"c\": \"simple\/simple\",\r\n                    \"l\": \";all;\"\r\n                },\r\n                \"recordPublished\": true,\r\n                \"publicKeyPresent\": true,\r\n                \"duplicateTags\": false,\r\n                \"signatureExpired\": false,\r\n                \"stringRepresentation\": \" v=1; a=rsa-sha256; c=relaxed\/relaxed;\\r\\n        d=gmail.com; s=20210112;\\r\\n        h=mime-version:from:date:message-id:subject:to;\\r\\n        bh=my7yRzhiyzs6NG4rWk7QR9B02RLd5wBL3jcpujCu+nI=;\\r\\n        b=kvP8kC+7yKVlAAgaF5qB6zCNbUdY8rz\/l63iwLzBO7EL8RR+aDIc0feB3HWimTdkfr\\r\\n         mEAltYu7TXE5eJysrRpYLG81sh3AoB+BrIXi\/bX9\/1\/TiNkMGtAlpT5WIidzjsOry5Wt\\r\\n         L2I6CUzvRoyZPYUUX3Jm61b51zTaYarIh4v\/YgaF2a+As7KaGiNFe8XNlqIReFJfH5hY\\r\\n         2zo5u2yRx5z6DDf82IIOlHDCpmkm1rI47cVpiwz+Dh4T2cwfFuPzkjEFlkCUr4cOyt1G\\r\\n         gIt2mqb2daT9BlIg6KIXVugySstEEp+2OElIKys1w41Uuvbf3YQUkgMSEDIWXr5MvE9p\\r\\n         NXCw==\",\r\n                \"signatureTimestamp\": null,\r\n                \"dkimSignatureAligned\": true\r\n            }\r\n        ],\r\n        \"exceptionResponses\": [],\r\n        \"exceptionMessage\": null\r\n    },\r\n    \"urlResponse\": {\r\n        \"validUrls\": [],\r\n        \"blacklistedUrls\": null\r\n    }\r\n}"));

  }

}

