import { Component, OnInit } from '@angular/core';
import { Product, Column } from '../common/models/table';
import { ProductServiceService } from '../service/product-service.service';

@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrl: './dynamic-columns.component.scss'
})
export class DynamicColumnsComponent implements OnInit {
    products!: Product[];

    cols!: Column[];

    constructor(private _productServiceService: ProductServiceService) {}

    ngOnInit() {
        this._productServiceService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
}
