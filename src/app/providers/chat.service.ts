import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  public chat: any[] = [];

  private itemsCollection: AngularFirestoreCollection<any>;

  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<any>("chat");
    return this.itemsCollection.valueChanges();
  }
}
