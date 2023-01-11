export interface Directive {
    qualifier: string;
    value: string;
}
export interface Modifier {
    qualifier: string;
    value: string;
}

export interface SpfVerificationResponse {
    domain: String;
    ipAddress : String;
    record: string;
    directives: Directive[];
    modifiers: Modifier[];
    signatureDomainAligned: boolean;
    authenticationResult: string;
    onlyOneRecord: boolean;
    validSyntax: boolean;
    noCharsAfterALL: boolean;
    numOfLookups: number;
    validLength: boolean;
    noPTRFound: boolean;
    noAnyPassMechanism: boolean;
    exceptionMessage?: any;
}