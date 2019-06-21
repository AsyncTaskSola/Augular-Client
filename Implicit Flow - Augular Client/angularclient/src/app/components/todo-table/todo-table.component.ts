import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/Models/Todo';

@Component({
  selector: 'ac-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

todos:ITodo[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title','completed'];

 constructor(private todoService:TodoService){

 }
  ngOnInit() {
   this.todoService.getAllTodos().subscribe(todos=>{
     this.todos=todos;
     console.log(this.todos);
   })
  }

}
