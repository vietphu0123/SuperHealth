import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class listRecycleSpecialtyService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  GetRecycleBinSpecialty(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Specialty/GetRecycleBinSpecialty/', { params })
  }

  RestoreSpecialty(id: any) : Observable<any> {
    return this.http.put(this.baseApiUrl + 'Specialty/Restore/' + id, null);
  }

}
