import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage {
  usuarios: UsuarioRestaurante[] = [];

  constructor(private storage: Storage) {}

  ionViewWillEnter() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    const usuarios = await this.storage.get('restaurantes');
    if (usuarios) {
      this.usuarios = usuarios;
    }
  }
}

export interface UsuarioRestaurante {
  nombreRestaurante: string;
  direccion: string;
  telefono: string;
  mesas: Mesa[];
}

interface Mesa {
  nombre: string;
  sillas: number;
  reservada: 'disponible' | 'reservada';
  fechaReserva?: string;
  horaReserva?: string;
}
