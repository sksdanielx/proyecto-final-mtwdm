import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModelos } from '../models/models';
import { Observable } from 'rxjs';
//siempre buscar un solo punto de control
//const URL_PRODUCTS = 'https://angular-products-lopez.firebaseio.com/productos.json';
const URL_PRODUCTS = 'http://localhost:5000';
const URL_Paises = 'https://apipettde.azurewebsites.net/api/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }
  getall() {
    return this.http.get(URL_Paises);
  }

  getAll() {
    return this.http.get(URL_PRODUCTS + "/products");
  }
  // getCategory(category: string) {
  //   return new Observable(observer => {
  //     this.http.get(URL_PRODUCTS + '/products/category/').subscribe((data: ProductoModelos[]) => {
  //       const filter = data.filter(item => item.categoria == category || item.categoria.indexOf(category) >= 0);
  //       observer.next(filter);
  //     });
  //   });
  // }

  getCategory(category: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/products/category/" + category).subscribe((data: ProductoModelos[]) => {
        const filter = data['result']['products'];
        observer.next(filter);
        console.log(URL_PRODUCTS + "/products/category/" + category)
      });
    });
  }

  getByCode(code: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/product/").subscribe((data: ProductoModelos[]) => {
        const filter = data.filter(item => item.codigo == code);
        observer.next(filter[0]);
      });
    });
  }
  getSearch(description: string) {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTS + "/products/descripcion/").subscribe((data: ProductoModelos[]) => {
        const filter = data.filter(item =>
          item.descripcion.toLowerCase() == description.toLowerCase() || item.descripcion.toLowerCase().indexOf(description.toLowerCase()) >= 0);
        observer.next(filter);
      });
    });
  }
  getPaises() {
    return this.http.get(URL_Paises);
  }

}