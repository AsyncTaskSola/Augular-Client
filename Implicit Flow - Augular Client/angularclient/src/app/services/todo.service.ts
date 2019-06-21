import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../Models/Todo';
import { ITodoAdd } from '../Models/todo-add';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient:HttpClient) { }

  // getAllTodos():Observable<any[]>{
  //   return this.httpClient.get<any[]>("http://localhost:5001/api/todo");
  // }
   getAllTodos():Observable<ITodo[]>{
    return this.httpClient.get<ITodo[]>("https://localhost:5001/api/todo");
  }

  addTodo(todo:ITodoAdd)
  {
       return this.httpClient.post<ITodo>("https://localhost:5001/api/todo",todo);
  }
}
