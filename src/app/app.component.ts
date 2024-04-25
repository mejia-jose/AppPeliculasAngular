import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  constructor(private router : Router){}
  title = 'prueba_tecnica';
  public movie : string = 'movie';
  public series : string = 'tv';

  //Función que permite redireccionar a la vista de las peliculas y series y actualiza el contenido del DOM
  goAll(type:string)
  {
    this.router.navigate(['/all', type]).then(() => 
    {
      window.location.reload();
    });
  }
  //Función que redirecciona a la vista del home
  goHome()
  {
    this.router.navigate(['/home']);
  }
}
