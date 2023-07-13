import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(private firestogare:AngularFireStorage){
      
    }
    ngOnInit(): void {
      
    }
    async onFileChange(event:any){
      const file = event.target.files[0];
      if(file){
        const path =`yt/${file.name}`;
        const uploadTask = this.firestogare.upload(file.name,file);
        const url=(await uploadTask).ref.getDownloadURL();
        console.log(url);
      }
    }
}
