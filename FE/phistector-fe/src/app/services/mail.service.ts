import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhishTectorResponse } from '../interfaces/PhishTectorResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private phishTectorResponse = new ReplaySubject<PhishTectorResponse>();
  public phishTectorResponse$ = this.phishTectorResponse.asObservable();

  constructor(private http: HttpClient) { }

  public uploadMailFile(file: File) {
    const formData = new FormData();
    formData.append('mailFile', file)
    return this.http.post<PhishTectorResponse>(environment.API_URL, formData);
  }

  public setPhishTectorResponse(phishTectorResponse: PhishTectorResponse) {
    this.phishTectorResponse.next(phishTectorResponse);
  }
}
