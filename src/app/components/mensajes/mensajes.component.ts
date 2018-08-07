import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../services/chats.service';
import { FirebaseService } from '../../services/firebase.service';

import {Conversacion} from '../../model/conversacion.component'
import { clearOverrides } from '../../../../node_modules/@angular/core/src/view';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensajes: any[];
  mensaje: string;
  conversacionList:Array<Conversacion>;
  constructor(private chatservice: ChatsService,private firebase: FirebaseService) {}

  
  ngOnInit() {
    this.firebase.getConvesrsaciones().snapshotChanges().subscribe(item =>{
    this.conversacionList=item
    .map(element =>{
      console.log(element.prevKey)
      return{
        llave:element.prevKey,
        valor:element.payload['node_'].value_
      }as Conversacion;
      
    })
  })

 
}

  getListaDeMensajes() {
    this.mensajes = this.chatservice.ListaMensajes();
    return this.mensajes;
  }
  sendMessage() {
    this.chatservice.addMessage(this.mensaje);
    this.mensaje = '';
  }
}
