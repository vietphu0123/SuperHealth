import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  baseApiUrl: string = 'https://localhost:7000';
  constructor(private http: HttpClient) { }
  // GetAllSpecialty(search: string, page: number, pageSize: number): Observable<any> {
  //   const queryParams = `?page=${page}`
  //   return this.http.get(this.baseApiUrl + '/api/Specialty/' + queryParams)
  // }
  Get(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + '/api/Specialty/Get', { params })
  }
  GetAllSpecialty(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + '/api/Specialty', { params })
  }
  AddSpecialty(specialtyRequest: any): Observable<any> {
    // specialtyRequest.Id = '00000000-0000-0000-0000-000000000000';
    return this.http.post(this.baseApiUrl + '/api/Specialty', specialtyRequest)
  }
  UpdateSpecialty(specialtyRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + '/api/Specialty', specialtyRequest)
  }
  UpdateIsDeleteSpecialty(specialtyRequest: any): Observable<any> {
    return this.http.put(this.baseApiUrl + '/api/Specialty/IsDeleteSpecialty', specialtyRequest)
  }

  CreateSpecialtyIntoDoctor(specialtyRequest: any): Observable<any> {
    return this.http.post(this.baseApiUrl + '/api/Specialty/CreateSpecialtyIntoDoctor', specialtyRequest)
  }
  GetAllSpecialtyList(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/Specialty/GetAllSpecialty')
  }
}
