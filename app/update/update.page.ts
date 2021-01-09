import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id : any;
  todo = {};
  constructor(private databaseProvider:DatabaseService, private thisRoute:ActivatedRoute, private toast:ToastController,private router:Router) { 
      this.id = this.thisRoute.snapshot.paramMap.get('id'); 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.databaseProvider.updateTodo(this.id).then(todos => {
        this.todo['title'] = todos[0].title;
        this.todo['desc'] = todos[0].desc;      
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Başarıyla Güncellendi.',
      duration: 2000
    });
    toast.present();
  }

  updateTodo(){
    
    this.databaseProvider.updateTodoSave(this.todo['title'],this.todo['desc'],this.id).then((data)=>{
      alert("Veriler Eklendi");
    }).catch(e=>console.log(JSON.stringify(e)));
    this.presentToast();
    this.todo = {};
    this.router.navigate(['/']);
  }
  

  
}
