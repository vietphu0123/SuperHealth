import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/Component/doctorPage/models/Position';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class listRecyclePositionService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  GetRecycleBinPosition(params: any): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Position/GetRecycleBinPosition/', { params })
  }

  RestorePosition(id: any) : Observable<any> {
    return this.http.put(this.baseApiUrl + 'Position/Restore/' + id, null);
  }

}
