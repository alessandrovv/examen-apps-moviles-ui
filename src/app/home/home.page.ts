import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Alumno } from '../models/alumno';
import { ClienteService } from '../services/cliente.service';
import { AlumnoService } from '../services/alumno.service';
import { ModalController } from '@ionic/angular';
import { AgregarPage } from '../agregar/agregar.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alumnos:Alumno[] = [];

  constructor(
    private sCliente:ClienteService,
    private sAlumno:AlumnoService,
    private modal:ModalController,
  ) {}

  ngOnInit(){
    this.getAlumnos();
  }

  getAlumnos(){
    this.sAlumno.getAlumnos().subscribe(
      (data:any)=>{
        this.alumnos = data;
        console.log(this.alumnos);
      },(error)=>{
        console.log(error);
      }
    );
  }

  async agregar(id = 0){
    const modal = await this.modal.create({
      component:AgregarPage,
      componentProps:{id:id}
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(data == 'success'){
      this.getAlumnos();
    }
  }

  delete(id){
    this.sAlumno.deleteAlumno(id).subscribe(
      (data:any)=>{
        console.log(data);
        this.getAlumnos();
      },(error)=>{
        console.log(error);
      }
    )
  }
}
