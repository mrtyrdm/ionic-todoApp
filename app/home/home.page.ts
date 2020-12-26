import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos = [];
  constructor(private databaseProvider: DatabaseService, private toast:ToastController,private router: Router) {}
  ngOnInit() {  } 
  ionViewWillEnter(){
    this.loadTodos();
  }

  loadTodos(){
    this.databaseProvider.getAllTodo().then(todos=>{
      this.todos = todos;
    });
  }
  

  deleteTodo(id){
    //alert(id);
    this.databaseProvider.deleteTodo(id);
    this.loadTodos();
  }


  updateTodo(id){
    //alert(id);
    this.router.navigate(['/addtodo/'+id]);

  }

}
 