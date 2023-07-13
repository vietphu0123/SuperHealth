import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { DoctorList } from '../Models/doctorList';

@Injectable({
  providedIn: 'root'
})
export class DoctorListService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllDoctor(params: any): Observable<any>{
   return this.http.get(this.baseApiUrl + 'Doctor/GetAllDoctorSpecialtyPosition', { params });
  }


}
