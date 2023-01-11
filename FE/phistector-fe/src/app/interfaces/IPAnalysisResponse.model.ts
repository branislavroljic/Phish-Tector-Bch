export interface IpAnalysisResponse {
    status: string
    continent: string
    country: string
    countryCode: string
    regionName: string
    city: string
    zip: string
    lat: number
    lon: number
    timezone: string
    currency: string
    reverse: string
    mobile: boolean
    proxy: boolean
    ip: string
    cached: boolean
    cacheTimestamp: number
}