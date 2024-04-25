import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestService 
{

  public currentPage : number = 1;

  constructor( private http : HttpClient,) {}

  //Función que permite consumir la api de themoviedb
  obtenerPeliculasSeries(data:any): Observable<any> 
  {
    const urlApi = this.obtenerUrlApi(data)
    return this.http.get(urlApi)
      .pipe(
        catchError(error => 
        {
          console.error('Error al obtener el contenido:', error);
          return throwError('Se produjo un error al obtener el contenido. Por favor, inténtalo de nuevo más tarde.');
        })
      );
  }

  //Función que permite armar la url de acuerdo a lo que se desea consultar
  obtenerUrlApi(data:any)
  {
    let url = '';
    if(data.top) //Para obtener la url de las peliculas o series mas populares
    {
      url = `${environment.apiUrl}/${data.type}/${data.top}?api_key=${environment.apiKey}&page=1`;
    }

    if(data.id && !data.reparto)//Para obtener la url que permite consultar el detalle de las peliculas y las series
    {
      url = `${environment.apiUrl}/${data.type}/${data.id}?api_key=${environment.apiKey}`;
    }

    if(data.reparto && data.id)//Permite obtener la url para consultar el reparto principal de las peliculas y series
    {
      url = `${environment.apiUrl}/${data.type}/${data.id}/${data.reparto}?api_key=${environment.apiKey}`;
    }

    if(data.discover && data.type && data.type == 'movie')//Para obtner la url de consultar todas las peliculas
    {
      url = `${environment.apiUrl}/${data.discover}/${data.type}?api_key=${environment.apiKey}&page=${data.page}`;
    }

    //Obtener la url para consultar y obtener todas las series
    if(data.discover && data.type && data.type == 'tv')
    {
      url = `${environment.apiUrl}/${data.discover}/${data.type}?api_key=${environment.apiKey}&page=${data.page}`;
    }

    if(data.discover && data.search && data.search != '')//Obtener url para realizar busuqedas de peliculas
    {
      url = `${environment.apiUrl}/search/${data.type}?api_key=${environment.apiKey}&query=${data.search}`;  
    }
    return url;
  }

   //Esta función permite cortar el titulo de las peliculas o series si es mayor a 25 y las completa con ...
  public acortarName(name: string): string 
  {
    return name.length > 15 ? name.substring(0, 20) + '...' : name;
  }
}
