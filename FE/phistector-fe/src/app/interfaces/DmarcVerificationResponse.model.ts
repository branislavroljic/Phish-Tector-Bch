export interface DmarcVerificationResponse {
    domain:string;
    dmarcRecord: string;
    recordPublished: boolean;
    validSyntax: boolean;
    tagValueMap: { [name: string]: string };
    externalValidationSucceeded: boolean;
    policyRecordType: string;
    multipleRecordsFound : boolean;
    exceptionMessage?: any;
}