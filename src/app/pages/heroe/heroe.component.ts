import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( 
    private heroesServices: HeroesService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.heroesServices.getHeroe( id )
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) { 
      console.log('Formulario no valido');
      return; 
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    }); 
    Swal.showLoading();

    if ( this.heroe.id ) {

      this.heroesServices.actualizarHeroe( this.heroe )
      .subscribe( resp => {
        
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Actualizado correctamente',
          icon: 'success'
        });        
      });

    } else {

      this.heroesServices.crearHeroe( this.heroe )
      .subscribe( resp => {
        
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Guardado correctamente',
          icon: 'success'
        });
      });      
    }
  }

}
