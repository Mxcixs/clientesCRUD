import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css'],
})
export class CreateClientesComponent implements OnInit {
  createCliente: FormGroup;
  submitted = false;
  id: string | null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _clientService: ClientesService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.createCliente = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      vigencia: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.update();
  }
  agregar() {
    this.submitted = true;
    if (this.createCliente.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editCliente(this.id);
    }
  }

  agregarCliente() {
    const cliente: any = {
      codigo: this.createCliente.value.codigo,
      nombre: this.createCliente.value.nombre,
      fechaNacimiento: this.createCliente.value.fechaNacimiento,
      estadoCivil: this.createCliente.value.estadoCivil,
      vigencia: this.createCliente.value.vigencia,
    };
    this.loading = true;
    this._clientService
      .agregarCliente(cliente)
      .then(() => {
        this.toastr.success(
          '¡Cliente agregado con éxito!',
          'Cliente Registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        this.router.navigate(['/list-clientes']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editCliente(id: string) {
    const cliente: any = {
      codigo: this.createCliente.value.codigo,
      nombre: this.createCliente.value.nombre,
      fechaNacimiento: this.createCliente.value.fechaNacimiento,
      estadoCivil: this.createCliente.value.estadoCivil,
      vigencia: this.createCliente.value.vigencia,
    };
    this._clientService.updateCliente(id, cliente).then(() => {});
    this.router.navigate(['/list-clientes']);
  }

  update() {
    if (this.id !== null) {
      this._clientService.getClientes(this.id).subscribe((data) => {
        console.log(data.payload.data()['codigo']);
        this.createCliente.setValue({
          codigo: data.payload.data()['codigo'],
          nombre: data.payload.data()['nombre'],
          fechaNacimiento: data.payload.data()['fechaNacimiento'],
          estadoCivil: data.payload.data()['estadoCivil'],
          vigencia: data.payload.data()['vigencia'],
        });
      });
    }
  }
}
