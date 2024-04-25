import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  public topFiveMovies: any[] = []; //Variable que me permite almacenar las 5 mejores peliculas
  public topFiveSeries: any[] = [];//Variable que me permite almacenar las 5 mejores series
  public messageError: string | null = null;
  public searchTerm: string = ''; //Para almacenar el parametro de busquedad
  public urlImage : string = ''; //Permite almacenar la url para las mostrar las imagenes de las peliculas y series
  public movie : string = 'movie';
  public series : string = 'tv';

  constructor
  (
    private requestService: RequestService,
    private router : Router,
  )
  {}

  ngOnInit(): void 
  {
    this.urlImage = environment.urlImage;
    this.obtenerTopPeliculas();
    this.obtenerTopSeries();
  }

  
  //Función que permite obtener el top 5 de las peliculas
  obtenerTopPeliculas(): void 
  {
    const params  = { top : 'popular', type : 'movie', }
    this.requestService.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          this.topFiveMovies = response.results.slice(0, 5); // Obtener solo las primeras 5 películas
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

  //Función que permite obtener el top 5 de las series
  obtenerTopSeries(): void 
  {
    const params = { top : 'popular', type : 'tv', }
    this.requestService.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          this.topFiveSeries = response.results.slice(0, 5); // Obtener solo las primeras 5 series
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

  //Esta obtener el nombre cortado a solo 20 letras si es mayor a 20
  acortarName(name: string): string 
  {
    return this.requestService.acortarName(name);
  }

  //Funciónn que permite redirecciona a la vista de los detalles de las peliculas
  viewDetail(id:number,type:string)
  {
    this.router.navigate(['/detail', id, type]);
  }

  //Funcion que permite redireccionar a la vista de todas las peliculas
  goAll(type:string)
  {
    this.router.navigate(['/all',type]);
  }

}
