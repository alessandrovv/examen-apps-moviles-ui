import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost/api/clientes/';
  constructor(
    public http:HttpClient
  ) { }

  public getClientes(){
    return this.http.get<Cliente[]>(this.url);
  }

  public guardar(cliente: Cliente){
    const formData=new FormData();
    formData.append('cliente_id', cliente.cliente_id.toString());
    formData.append('nombres',cliente.nombres);
    formData.append('apellidos',cliente.apellidos);
    formData.append('ruc_dni',cliente.ruc_dni);
    formData.append('direccion',cliente.direccion);
    formData.append('email',cliente.email);
    formData.append('profile_picture', cliente.profile_picture);
    return this.http.post(this.url,formData);
  }

  public getClienteById(id){
    return this.http.get(`${this.url}?cliente_id=${id}`);
  }

  public deleteCliente(id){
    return this.http.delete(`${this.url}?cliente_id=${id}`);
  }
    
}
