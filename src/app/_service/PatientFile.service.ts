import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root',
  })

export class PatientFileService{
  constructor(private http:HttpClient){
    
  }
  baseURL : string =environment.baseApiUrl;
  GetPatientFile():Observable<any>{
    return this.http.get<any>(this.baseURL+'PatientFile');
  }
  GetPatientFileDetail(id:string):Observable<any>{
    return this.http.get<any>(this.baseURL+'PatientFile/PatientFileDetail/'+ id);
  }
  CreatePatientFile(form:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseURL+'PatientFile',form,{headers})
  }
  CreatePatientDefaultFile(form:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseURL+'PatientFile/CreatePatientDefaultFile',form,{headers})
  }
  UpdatePatientFile(form:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.baseURL + 'PatientFile',form,{headers})
  }
  CheckInforDefault():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.baseURL + 'PatientFile/CheckInforDefault')
  }
}