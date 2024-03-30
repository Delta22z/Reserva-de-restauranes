import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar2',
  templateUrl: './editar2.page.html',
  styleUrls: ['./editar2.page.scss'],
})
export class Editar2Page {
  usuario: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.usuario = this.navParams.get('usuario');
  }

  async guardarCambios() {
    // Aquí podrías implementar la lógica para guardar los cambios en el usuario
    this.mostrarToast('Cambios guardados correctamente.', 'success');
    this.modalCtrl.dismiss(this.usuario);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
