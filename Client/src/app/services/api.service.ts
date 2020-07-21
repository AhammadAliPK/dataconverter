import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public get value(): string {
    return
  }

  getData(): Observable<any> {


    return this.httpClient.get("http://localhost:3000/getData");


  }

  postData(data: any) {

    return this.httpClient.post("http://localhost:3000/downloadfile", { features: data });
  }
  downloadFile() {

    return this.httpClient.get("http://localhost:3000/download", { responseType: 'blob' });


  }

}
