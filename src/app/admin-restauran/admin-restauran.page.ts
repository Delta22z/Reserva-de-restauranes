import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsuarioRestaurante } from '../registro-restauran/registro-restauran.page';
import { MesasEditPage } from '../mesas-edit/mesas-edit.page';
import { LoginRestauranPage } from '../login-restauran/login-restauran.page'; // Importar la página de login

@Component({
  selector: 'app-admin-restauran',
  templateUrl: './admin-restauran.page.html',
  styleUrls: ['./admin-restauran.page.scss'],
})
export class AdminRestauranPage {
  usuario: UsuarioRestaurante | null = null; // Datos del restaurante

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    const usuario = await this.storage.get('usuario');
    if (usuario) {
      this.usuario = usuario;
    }
  }

  async salir() {
    await this.storage.remove('usuario'); // Eliminar los datos de usuario almacenados
    this.navCtrl.navigateRoot('/login-restauran'); // Redirigir al usuario a la página de login
  }

  async editarMesa(index: number) {
    const modal = await this.modalCtrl.create({
      component: MesasEditPage,
      componentProps: {
        mesa: this.usuario ? this.usuario.mesas[index] : null // Usa el operador de opción segura para acceder a mesas
      }
    });

    modal.onDidDismiss().then((data) => {
      const mesaEditada = data?.data;
      if (mesaEditada && this.usuario) {
        this.usuario.mesas[index] = mesaEditada; // Usa el operador de opción segura para actualizar la mesa
        this.guardarDatosUsuario(); // Guarda los cambios en el almacenamiento
      }
    });

    return await modal.present();
  }

  async eliminarMesa(index: number) {
    if (this.usuario) {
      this.usuario.mesas.splice(index, 1);
      this.guardarDatosUsuario(); // Guarda los cambios en el almacenamiento
    }
  }

  async agregarMesa() {
    if (this.usuario) {
      const numeroMesa = this.usuario.mesas.length + 1;
      this.usuario.mesas.push({
        nombre: `Mesa ${numeroMesa}`,
        sillas: 4,
        reservada: 'disponible'
      });
      this.guardarDatosUsuario(); // Guarda los cambios en el almacenamiento
    }
  }

  async guardarDatosUsuario() {
    await this.storage.set('usuario', this.usuario);
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
