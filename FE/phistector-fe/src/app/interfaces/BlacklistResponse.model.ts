export interface BlacklistResponse {
    threatType: string;
    platformType: string;
    threat : Threat;
}

export interface Threat {
    url : string;
}