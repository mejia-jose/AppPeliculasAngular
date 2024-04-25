import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-series',
  templateUrl: './movie-series.component.html',
  styleUrls: ['./movie-series.component.css','../detail/detail.component.css']
})
export class MovieSeriesComponent implements OnInit
{   
  public messageError : string = ''; //Permite capturar el error 
  public allContent : any [] = []; //Variab le para almacenar todos los registros
  //variables para la paginación
  public currentPage : number = 1;
  public totalItems: number = 0;
  public pageSize : number = 20;
  public urlImage : string = ''; //Permite almacenar la url para las mostrar las imagenes de las peliculas y series
  public searchTerm: string = '';
  public formFilter: FormGroup;
  public typeContent : string = '';
  
  constructor(

    private requestServices: RequestService,
    private route: ActivatedRoute,
    private router : Router,
    public fb: FormBuilder, 
  )
  {
    //Definicion y validaciones del formulario de busquedas
    this.formFilter = this.fb.group(
    {
      search: [null, [Validators.required]],
    });
  }

  ngOnInit(): void 
  {
    this.route.params.subscribe(params => 
    {
      this.typeContent = params['type'];
    });
    this.urlImage = environment.urlImage;
    this.getAllContent();
  }

  //Función que permite obtener el array de peliculas o series de acuerdo a la busquedad que se estipule
  getAllContent()
  {
    const params  = { discover:'discover', type : this.typeContent, page:this.currentPage, search:this.searchTerm }
    this.requestServices.obtenerPeliculasSeries(params)
      .subscribe(
        (response: any) => 
        {
          const {results,total_pages} = response;
          this.allContent = results; 
          this.totalItems = total_pages;
        },
        (error: any) => 
        {
          this.messageError = error;
        }
      );
  }

  //funcion para obtener el total de paginas
  get totalPages(): number 
  {
    return (this.totalItems / this.pageSize);
  }

  //Función para paginar hacia adelante
  nextPagination(page:number)
  {
     this.currentPage = page + 1;
     this.getAllContent();
  }

  //Función para paginar hacia atras
  formerPagination(page:number)
  {
    if(this.currentPage > 1)
    {
      this.currentPage = page - 1;
    }
    this.getAllContent();
  }

  viewDetail(id:number,type:string)
  {
    this.router.navigate(['/detail', id, type]);
  }

  //función para realizar la busqueda de peliculas
  validForm()
  {
    if(this.formFilter.valid)
    {
      const formValues = this.formFilter.value;
      this.searchTerm = formValues.search;
      this.getAllContent();
    }else
    {
      this.searchTerm = '';
      this.getAllContent();
    }
  }

}
