import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Appointment } from '../Component/admin/models/appointment';

@Injectable({
  providedIn: 'root'
})
export class appointmentService {
  // baseApiUrl: string = 'https://localhost:7000';
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }


  GetAllAppointment(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Appointment', { params })
  }

  getAppointmentById(id: any): Observable<Appointment> {
    return this.http.get<Appointment>(this.baseApiUrl + 'Appointment/GetAppointmentBookingSuccessById/' + id);
  }
  CreateAppointment(data: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Appointment', data);
  }
  PatientCancelledAppoitment(value:string):Observable<any>{
    const data = {idAppoitment:value}; 
    return this.http.post<any>(this.baseApiUrl + 'Appointment/PatientCancelledAppoitment', data);
  }
}
