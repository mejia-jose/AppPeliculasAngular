import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css','../home/home.component.css']
})
export class DetailComponent implements OnInit 
{
  public   id  = 0;
  public type : string | null = null;
  public getDetail : any; //Sirve para almanecer la collección del detalle de las peliculas
  public getReparto : any[] = []; //Sirve para almacenar las colleciones del reparto principal
  public movieTopFive : any; //Sirve para almacenar el top five de las peliculas más vistas
  public messageError : string = ''; //Sirve para almacenar el error
  public urlImage : string = ''; //Permite almacenar la url para las mostrar las imagenes de las peliculas y series
  public statusBtnElencoAll = true;
  public statusBtnElencoPart = false;

  //Contructor de la clase
  constructor
  (
    private route: ActivatedRoute,
    private requestService : RequestService,
  )
  {}
  ngOnInit(): void 
  {
    this.route.params.subscribe(params => 
    {
      this.id = params['id'];
      this.type = params['type'];
    });
    this.urlImage = environment.urlImage;
    this.obtenerDetalle();
    this.obtenerReparto(6);
    this.obtenerPeliculasMasVistas();
  }

  //Funcion que permite obtener el detalle de las peliculas y las series
  obtenerDetalle(): void 
  {
    const params  = { top : false, type : this.type, id: this.id, reparto: false }
    this.requestService.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          this.getDetail = response;
          //console.log(this.getDetail);
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

  //Funciónn que me permite obtener el reparto de la producción
  obtenerReparto(cant:number = 6):void
  {
    const params  = { top : false, type : this.type, id: this.id, reparto:'credits' }
    this.requestService.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          if(cant === 0)
          {
            this.getReparto =  response.cast;
            this.statusBtnElencoPart = true;
            this.statusBtnElencoAll = false;
          }else
          {
            this.getReparto =  response.cast.slice(0, cant);
            this.statusBtnElencoAll = true;
            this.statusBtnElencoPart = false;
          }
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

  //Función para darle el color a los valores al proceso de puntuación de los usuarios
  getCircleBackgroundColor(match: number): string
  {
    if (match <= 25) {
      return '#edb709'; // Color rojo
    }else if (match <= 40) {
      return '#edb709 '; // Color amarillo rojizo
    } else if (match <= 50) {
      return 'orange'; // Color naranja
    } else if (match <= 75) {
      return '#0000FF'; // Color Azul
    } else if (match <= 86) {
      return '#008080'; // Color morado suave
    }else if (match <= 92) {
      return '#A659A9 '; // Color morado
    }else if (match <= 97) {
      return '#780096'; // Color morado
    } else {
      return '#FF0082'; // Color fucsia
    }
  }

  //Función que permite obtener el año de las peliculas y las series
  getYear(fecha:string)
  {
      const partes = fecha.split("-");
      const year = partes[0];
      return year;
  }

  //función que permite devolver el formato de la duracion de las peliculas
  convertirHoraMinuto(runtime:number)
  {
    const hora = Math.floor(runtime / 60);
    const minuto = runtime % 60;
    return hora+'h'+' '+minuto+'m';
  }

  //Función que permite retornar el texto del idioma
  retornarLenguaje(text:string)
  {
    const languages: any = 
    {
      'es': 'Español',
      'en': 'Inglés',
      'zh': 'Chino',
      'hi': 'Hindi',
      'ar': 'Árabe',
      'pt': 'Portugués',
      'bn': 'Bengalí',
      'ru': 'Ruso',
      'ja': 'Japonés',
      'pa': 'Panyabí'
    };

    return languages[text];
  }

  //Esta obtener el nombre cortado a solo 20 letras si es mayor a 20
  acortarName(name: string): string 
  {
    return this.requestService.acortarName(name);
  }

  //Función para obtener el top five de las peliculas
  obtenerPeliculasMasVistas():void
  {
    const params  = { top : 'popular', type : 'movie', }
    this.requestService.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          this.movieTopFive = response.results.slice(0, 2); // Obtener solo las primeras 3 películas
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

}
