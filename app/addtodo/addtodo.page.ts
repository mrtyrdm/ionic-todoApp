import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.page.html',
  styleUrls: ['./addtodo.page.scss'],
})
export class AddtodoPage implements OnInit {
  todo = {}
  constructor(private databaseProvider:DatabaseService, private router:Router) { }

  ngOnInit() {
  }

  addTodo() {
    this.databaseProvider.addTodo(this.todo['title'], this.todo['desc']);
    this.router.navigate(['/']);
  }


}


