import { Component, OnInit } from '@angular/core';
import { Product, Column } from '../../common/models/table';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {
  products!: Product[];

  constructor(private _productServiceService: ProductServiceService) {}

  ngOnInit() {
      this._productServiceService.getProductsMini().then((data) => {
          this.products = data;
      });
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
              return null;
      }
  }

}
