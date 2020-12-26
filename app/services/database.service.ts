import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database:SQLiteObject;
  constructor(private sqlite:SQLite) {
    // Veritabanı oluşturma
    this.sqlite.create({
      name: 'todo.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table IF NOT EXISTS todo(ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT)', []);    
        this.database = db;
      
      })
      .catch(e => console.log(e));
  }
  //CRUD - Create, Read, Update, Delete
  addTodo(title,desc){
    this.database.executeSql("insert into todo (title, desc) values ('"+title+"', '"+desc+"')");
  }
  getAllTodo(){
    return this.database.executeSql('select * from todo',[]).then((data)=>{
      let todos = [];
      if(data.rows.length>0){
        for(let i=0;i<data.rows.length;i++){
          todos.push({ID:data.rows.item(i).ID, title:data.rows.item(i).title,desc:data.rows.item(i).desc});    
        }
      }
      return todos;
    });
  }
  updateTodo(id){
    
  }
  deleteTodo(id){
    this.database.executeSql('delete from todo where ID='+id);
  }

  

}
