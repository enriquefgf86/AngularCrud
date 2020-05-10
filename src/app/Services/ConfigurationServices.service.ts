import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configurationModel.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  configurationDoc: AngularFirestoreDocument<Configuration>;
  configuration: Observable<Configuration>;

  id = '1'; //id referente al unico id de configracion en la base de dtaos de firebase

  constructor(private db: AngularFirestore) {}

  getConfiguration(): Observable<Configuration> {
    this.configurationDoc = this.db.doc<Configuration>(
      `Configuration/${this.id}`
    );
    this.configuration = this.configurationDoc.valueChanges();
    return this.configuration;
  }

  modifyConfiguration(configuration: Configuration) {
    this.configurationDoc = this.db.doc<Configuration>(
      `Configuration/${this.id}`
    );
    this.configurationDoc.update(configuration);
  }
}
