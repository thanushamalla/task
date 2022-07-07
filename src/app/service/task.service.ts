import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable ,Task} from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  addTasURL : string;
  getTasURL : string;
  updateTasUrl : string;
  deleteTasUrl : string;

  constructor(private http:HttpClient) { 
    this.addTasURL = 'http://localhost:4200/tas/addTask';
    this.getTasURL = 'http://localhost:4200/tas/getAllTask';
    this.updateTasUrl = 'http://localhost:4200/tas/updateTask';
    this.deleteTasUrl = 'http://localhost:4200/tas/deleteTask';

   }

   addTask(tas : Task): Observable<Task> {
     return this.http.post<Task>(this.addTasURL,tas);
   }

   getAllTask(): Observable<Task[]>{
     return this.http.get<Task[]>(this.getTasURL);
   }

   updateTask(tas :Task) : Observable<Task>{
     return this.http.put<Task>(this.updateTasUrl, tas);
   }

   deleteTask(tas : Task) : Observable<Task>{
     return this.http.delete<Task>(this.deleteTasUrl, title);
   }

}
