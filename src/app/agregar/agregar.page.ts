import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormControl, Form } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { AlumnoService } from '../services/alumno.service';
import { Cliente } from '../models/cliente';
import { Alumno } from '../models/alumno';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @Input() id:number = 0;
  registrarForm: FormGroup = new FormGroup({});
  edit = false;
  urlImage = "https://ionicframework.com/docs/img/demos/thumbnail.svg";
  base64Image:string = null;
  datos = {
    nombres: '',
    apellidos: '',
    ruc_dni: '',
    direccion: '',
    email: ''
  }

  constructor(
    private service: AlumnoService,
    private modal: ModalController,
    public fb: FormBuilder
  ) {
    
    console.log(this.registrarForm);
  }

  ngOnInit() {
    this.initForm();
    if(this.id != 0){
      console.log(this.id);
      this.edit = true;
      this.service.getAlumnoById(this.id).subscribe(
        (data:Alumno)=>{
          console.log(data);
          this.registrarForm.controls['nombres'].setValue(data.nombres);
          this.registrarForm.controls['sexo'].setValue(data.sexo);
          this.registrarForm.controls['edad'].setValue(data.edad);
          this.registrarForm.controls['direccion'].setValue(data.direccion);
        },(error)=>{
          console.log(error);
        }
      )
    }
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  save(){
    const data = this.registrarForm.value;
    const alumno:Alumno = {
      id:this.id,
      nombres: data['nombres'],
      sexo:data['sexo'],
      edad: data['edad'],
      direccion: data['direccion'],
    }

    console.log(alumno);
    
    this.service.guardar(alumno).subscribe(
      (data:any)=>{
        console.log(data);
        this.modal.dismiss('success');
      },(error)=>{
        console.log(error);
      }
    )

    
  }

  handleImage(event:any){
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
      this.urlImage = reader.result.toString();
      this.base64Image = reader.result.toString().split(',')[1];
      console.log(reader.result.toString().split(',')[1]);
    }

    if(file){
      reader.readAsDataURL(file);
    }
  }

  initForm() {
    this.registrarForm = this.fb.group({
      nombres: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      direccion: [null, [Validators.required, Validators.maxLength(120)]],
      sexo: [null, [Validators.required, Validators.maxLength(1)]],
      edad: [null, [Validators.required]],
    });
  }

  validation_messages = {
    'nombres': [
      { type: 'required', message: 'Escriba Nombre.' },
      { type: 'minlength', message: 'Nombre maximo de 5 caracteres' }
    ],
    'apellidos': [
      { type: 'required', message: 'Escriba Apellido.' },
      { type: 'minlength', message: 'Apellido maximo de 5 caracteres' }
    ],
    'ruc_dni': [
      { type: 'required', message: 'Escriba RUC/DNI' },
      { type: 'maxlength', message: 'RUC/DNI es de 8 caracteres' }
    ],
    'direccion': [
      { type: 'required', message: 'Escriba direccion' },
      { type: 'maxlength', message: 'No puede escribir mas de 100 caracteres' }
    ],
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' }
    ],
  }

  get nombres() {
    return this.registrarForm.get('nombres');
  }
  get sexo() {
    return this.registrarForm.get('sexo');
  }
  get edad() {
    return this.registrarForm.get('edad');
  }
  get direccion() {
    return this.registrarForm.get('direccion');
  }
}
