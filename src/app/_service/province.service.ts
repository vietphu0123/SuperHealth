import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http:HttpClient) { }

   getProvince():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>('https://provinces.open-api.vn/api/p/',{headers});
  }

}
