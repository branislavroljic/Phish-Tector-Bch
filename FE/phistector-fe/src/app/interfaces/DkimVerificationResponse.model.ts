export interface SignatureRecord {
    tagValues: { [name: string]: string };
    defaults: { [name: string]: string };
    publicRecordTagValue: { [name: string]: string };
    bodyHashVerified: boolean;
    dkimSignatureAligned: boolean;
    validRecordSyntax: boolean;
    publicKeyPresent: boolean;
    validSignatureSyntax: boolean;
    noDuplicateTags: boolean;
    signatureNotExpired: boolean;
    stringRepresentation: string;
    signatureTimestamp?: any;
}

export interface ExceptionResponse {
    signatureRecord: SignatureRecord;
    message: string;
}

export interface DkimVerificationResponse {
    signatureRecords: SignatureRecord[];
    exceptionResponses: ExceptionResponse[];
    exceptionMessage?: any;
}