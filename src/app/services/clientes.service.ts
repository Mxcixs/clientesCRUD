import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}

  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('cliente').add(cliente);
  }

  getCliente(): Observable<any> {
    return this.firestore.collection('cliente').snapshotChanges();
  }

  deleteCliente(id: string): Promise<any> {
    return this.firestore.collection('cliente').doc(id).delete();
  }

  getClientes(id: string): Observable<any> {
    return this.firestore.collection('cliente').doc(id).snapshotChanges();
  }

  updateCliente(id: string, data: any): Promise<any> {
    return this.firestore.collection('cliente').doc(id).update(data);
  }
}
