import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css'],
})
export class ListClientesComponent implements OnInit {
  clientes: any[] = [];
  constructor(private _clienteService: ClientesService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getCliente().subscribe((data) => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.clientes);
    });
  }

  deleteCliente(id: string) {
    this._clienteService
      .deleteCliente(id)
      .then(() => {
        console.log('Cliente eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
