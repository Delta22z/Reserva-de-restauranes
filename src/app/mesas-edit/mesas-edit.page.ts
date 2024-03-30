import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mesas-edit',
  templateUrl: './mesas-edit.page.html',
  styleUrls: ['./mesas-edit.page.scss'],
})
export class MesasEditPage {
  mesa: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.mesa = this.navParams.get('mesa');
  }

  async guardarCambios() {
    // Aquí puedes implementar la lógica para guardar los cambios en la mesa
    this.mostrarToast('Cambios guardados correctamente.', 'success');
    this.modalCtrl.dismiss(this.mesa);
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
