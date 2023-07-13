import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/Component/doctorPage/models/Schedule';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  baseApiUrl = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }

  GetAllScheduleOfDoctor(id: any, params: any):Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.baseApiUrl+'Schedule/allSchedule/'+id, { params });
  }

  GetCurrentSchedule(id : any):Observable<Schedule>{
    return this.http.get<Schedule>(this.baseApiUrl+'Schedule/GetCurrentSchedule/'+id)
  }
  addSchedule(addScheduleRequest: Schedule): Observable<Schedule>{
    addScheduleRequest.id  = '00000000-0000-0000-0000-000000000000'
    // addScheduleRequest.doctorId = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Schedule>(this.baseApiUrl+'schedule', addScheduleRequest);
  }
  UpdateScheduleReqInfor(updateScheduleRequest: Schedule): Observable<Schedule>{
    return this.http.put<Schedule>(this.baseApiUrl+'schedule/update',updateScheduleRequest)
  }

  GetInforSchedule(id: any): Observable<Schedule> {
    return this.http.get<Schedule>(this.baseApiUrl + 'Schedule/'+id);
  }

  DeleteScheduleReqInfor(id: any): Observable<Schedule>{
    return this.http.delete<Schedule>(this.baseApiUrl+'schedule/'+id)
  }
}
