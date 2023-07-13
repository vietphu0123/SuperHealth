import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorInforDetail } from 'src/app/Component/doctorPage/models/DoctorInforDetail';
import { DoctorSpecialty } from 'src/app/Component/doctorPage/models/DoctorSpecialty';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseApiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  CreateDoctor(doctorRequest: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Doctor', doctorRequest)
  }

  GetAllDoctor(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Doctor', { params })
  }
  GetDoctorDetail(): Observable<DoctorInforDetail> {
    return this.http.get<DoctorInforDetail>(this.baseApiUrl + 'Doctor/GetDoctorDetail');
  }
  GetInforDoctorSpecialty(): Observable<DoctorSpecialty[]> {
    return this.http.get<DoctorSpecialty[]>(this.baseApiUrl + 'Doctor/GetDoctorSpecialty');
  }

  //Đức
  UpdateDoctor(specialtyRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Doctor', specialtyRequest)
  }

  UpdateDoctorInfor(updateDoctorRequest: DoctorInforDetail, id: any): Observable<DoctorInforDetail> {
    return this.http.put<DoctorInforDetail>(this.baseApiUrl + 'doctor/update/' + id, updateDoctorRequest)
  }
  UpdateScheduleInfor(updateDoctorRequest: DoctorInforDetail, id: any): Observable<DoctorInforDetail> {
    return this.http.put<DoctorInforDetail>(this.baseApiUrl + 'schedule/update/' + id, updateDoctorRequest)
  }

  UpdatePositionInfor(updateDoctorRequest: DoctorInforDetail, id: any): Observable<DoctorInforDetail> {
    return this.http.put<DoctorInforDetail>(this.baseApiUrl + 'position/update/' + id, updateDoctorRequest)
  }

  GetInforPosition(): Observable<DoctorInforDetail[]> {
    return this.http.get<DoctorInforDetail[]>(this.baseApiUrl + 'Position');
  }

  UpdateIsDeleteDoctor(doctorRequest: any): Observable<any> {
    return this.http.delete(this.baseApiUrl + 'Doctor/' + doctorRequest)
  }

  // Get 4 doctor
  GetTopDoctors(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Doctor/GetTopDoctors', { params })
  }
  ResetPassword(dataRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Doctor/ResetPassword', dataRequest);
  }

  GetDoctorInfoDetail(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Doctor/GetDoctorDetail/' + params);
  }

  DoctorApproved(params: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Appointment/Approved', params);
  }
  DoctorCancelled(params: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'Appointment/Rejected', params);
  }

  GetInfoByTimeFrame(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Doctor/GetInfoByTimeFrame/' + params);
  }

  ChangePassword(changPassword:object):Observable<any>{
    return this.http.put(this.baseApiUrl+'ChangPassword',changPassword);
  }
}

