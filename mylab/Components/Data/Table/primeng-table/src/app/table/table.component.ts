import { Component, OnInit } from '@angular/core';
import { Product } from '../common/models/table';
import { ProductServiceService } from '../service/product-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  products!: Product[];

  constructor(private _productServiceService: ProductServiceService) {}

  ngOnInit() {
      this._productServiceService.getProductsMini().then((data) => {
          this.products = data;
      });
  }






}
