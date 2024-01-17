import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private url = 'http://localhost/api/alumnos/';
  constructor(
    public http:HttpClient
  ) { }

  public getAlumnos(){
    return this.http.get<Alumno[]>(this.url);
  }

  public guardar(alumno: Alumno){
    const formData=new FormData();
    formData.append('id', alumno.id.toString());
    formData.append('nombres',alumno.nombres);
    formData.append('direccion',alumno.direccion);
    formData.append('sexo',alumno.sexo);
    formData.append('edad',alumno.edad.toString());
    return this.http.post(this.url,formData);
  }

  public getAlumnoById(id){
    return this.http.get(`${this.url}?id=${id}`);
  }

  public deleteAlumno(id){
    return this.http.delete(`${this.url}?id=${id}`);
  }
}
