import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { doctorBooking } from '../Models/doctorBooking';

@Injectable({
  providedIn: 'root'
})
export class doctorBookingService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAppointmentBookingSuccessById(id: string): Observable<doctorBooking[]>{
   return this.http.get<doctorBooking[]>(this.baseApiUrl + 'Appointment/GetAppointmentBookingSuccessById/' + id);
  }
}
