import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

export interface UsuarioRestaurante {
  correo: string;
  nombre: string;
  nombreRestaurante: string;
  telefono: string;
  direccion: string;
  contrasena: string;
  mesas: Mesa[];
}

interface Mesa {
  nombre: string;
  sillas: number;
  reservada: 'disponible' | 'reservada';
  fechaReserva?: string;
  horaReserva?: string;
}

@Component({
  selector: 'app-registro-restauran',
  templateUrl: './registro-restauran.page.html',
  styleUrls: ['./registro-restauran.page.scss'],
})
export class RegistroRestauranPage {
  registroRestauranData: UsuarioRestaurante = {
    correo: '',
    nombre: '',
    nombreRestaurante: '',
    telefono: '',
    direccion: '',
    contrasena: '',
    mesas: []
  };
  confirmarContrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  async registerRestauran() {
    if (this.registroRestauranData.contrasena !== this.confirmarContrasena) {
      this.presentToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    let restaurantes: UsuarioRestaurante[] = await this.storage.get('restaurantes') || [];
    restaurantes.push(this.registroRestauranData);
    await this.storage.set('restaurantes', restaurantes);
    this.presentToast('Registro exitoso', 'success');
    this.navCtrl.navigateForward('/login-restauran');
  }

  agregarMesa() {
    const numeroMesa = this.registroRestauranData.mesas.length + 1;
    this.registroRestauranData.mesas.push({
      nombre: `Mesa ${numeroMesa}`,
      sillas: 4,
      reservada: 'disponible'
    });
  }

  cancelarRegistro() {
    this.navCtrl.navigateBack('/login-restauran');
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  onSegmentChange(event: CustomEvent, mesa: Mesa) {
    if (event.detail.value === 'disponible') {
      mesa.reservada = 'disponible';
      mesa.fechaReserva = undefined;
      mesa.horaReserva = undefined;
    } else {
      mesa.reservada = 'reservada';
      mesa.fechaReserva = '';
      mesa.horaReserva = '';
    }    
  }
}
