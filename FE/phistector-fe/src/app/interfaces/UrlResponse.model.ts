import { BlacklistResponse } from "./BlacklistResponse.model";

export interface UrlResponse {
    validUrls: string[];
    blacklistedUrls: BlacklistResponse[];
    еxceptionMessage?: string;
}