import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Student } from "../model/student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private URL: string = environment.url;

  constructor(private http: HttpClient) {}

  studentList(): Observable<any> {
    return this.http.get(this.URL + "/student");
  }

  addStudent(params: Student): Observable<any> {
    return this.http.post(this.URL + "/student", params);
  }

  deleteStudent(id): Observable<any> {
    return this.http.delete(this.URL + "/student/" + id);
  }

  singleValue(id): Observable<any> {
    return this.http.get(this.URL + "/student/" + id);
  }
}
