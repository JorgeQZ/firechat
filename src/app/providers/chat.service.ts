import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Mensaje } from "../interfaces/mensaje.interface";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  public chats: Mensaje[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>("chat", ref =>
      ref.orderBy("fecha", "asc")
    );
    return this.itemsCollection
      .valueChanges()
      .subscribe((mensajes: Mensaje[]) => {
        console.log(mensajes);
        // this.chats = mensajes;
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        return mensajes;
      });
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: "JorgeQz",
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
