import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Models/Patient';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


    baseURL : string =environment.baseApiUrl;

    constructor(private http:HttpClient) { }





    GetInforPatient():Observable<Patient>{
      return this.http.get<Patient>(this.baseURL+'Patient/infor');
    }

    ChangePassword(changPassword:object):Observable<any>{
      return this.http.put(this.baseURL+'ChangPassword',changPassword);
    }
    getAllPatientsAppointment(id: any, params: any) : Observable<Patient[]> {
      return this.http.get<Patient[]>(this.baseURL+'patient/PatientAppointmentDoctor/'+id, {params})
    }

    getPatient(id: any) : Observable<Patient> {
      return this.http.get<Patient>(this.baseURL+'patient/'+id);
    }
    GetAppoitmentOfPatientAsync():Observable<any>{
      return this.http.get<any>(this.baseURL+'Patient/GetAppoitmentOfPatientAsync');
    }
     

//admin
    GetAllPatient(params: any): Observable<any> {
      return this.http.get(this.baseURL + 'Patient/GetAll', { params })
    }

    getPatientById(id: any) : Observable<any> {
      return this.http.get<any>(this.baseURL+'Patient/GetPatientById/'+id);
    }

}
