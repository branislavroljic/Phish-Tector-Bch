import { DkimVerificationResponse } from "./DkimVerificationResponse.model";
import { DmarcVerificationResponse } from "./DmarcVerificationResponse.model";
import { Hop } from "./Hop.model";
import { SpfVerificationResponse } from "./SpfVerificationResponse.model";
import { UrlResponse } from "./UrlResponse.model";


export interface PhishTectorResponse {
    hops: Hop[];
    dmarcVerificationResponse: DmarcVerificationResponse;
    spfVerificationResponse: SpfVerificationResponse;
    dkimVerificationResponse: DkimVerificationResponse;
    urlResponse: UrlResponse;
}



