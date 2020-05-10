import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Client } from '../models/clientModel.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;

  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = db.collection('Clients', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const info = action.payload.doc.data() as Client;
          info.id = action.payload.doc.id;
          return info;
        });
      })
    );
    return this.clients;
  }
  addNewClkient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string) {
    this.clientDoc = this.db.doc<Client>(`Clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const dataFetch = action.payload.data() as Client;
          dataFetch.id = action.payload.id;
          return dataFetch;
        }
      })
    );
    return this.client;
  }

  modifyClient(value: Client) {
    this.clientDoc = this.db.doc(`Clients/${value.id}`);
    this.clientDoc.update(value);
  }
  eliminateClient(client: Client) {
    this.clientDoc = this.db.doc(`Clients/${client.id}`);
    this.clientDoc.delete();
  }
}
