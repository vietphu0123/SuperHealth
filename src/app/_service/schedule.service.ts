import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }
  GetScheduleByDoctorId(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Schedule/GetScheduleByDoctorId/' + params);
  }
}
