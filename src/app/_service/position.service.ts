import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class positionService {
  // baseApiUrl: string = 'https://localhost:7000';
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }
  // GetAllSpecialty(search: string, page: number, pageSize: number): Observable<any> {
  //   const queryParams = `?page=${page}`
  //   return this.http.get(this.baseApiUrl + '/api/Specialty/' + queryParams)
  // }
  GetAllPosition(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Position', { params })
  }
  AddPosition(positionRequest: any): Observable<any> {
    // specialtyRequest.Id = '00000000-0000-0000-0000-000000000000';
    return this.http.post(this.baseApiUrl + 'Position', positionRequest)
  }
  UpdatePosition(positionRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Position', positionRequest)
  }
  UpdateIsDeletePosition(positionRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Position/IsDeletePosition', positionRequest)
  }
  //Đức
  GetAll(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Position/GetAllPositon')
  }
}
