import { Component, OnInit } from '@angular/core';
import { AutoCompleteCompleteEvent } from '../common/models/autocomplete';
import { CountryService } from '../service/country-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
  items: any[] | undefined;
  selectedItem: any;
  filteredItems: any[] | undefined;
  selectedCity: any;
  suggestions: any[] | undefined;
  countries: any[] | undefined;
  selectedCountryAdvanced: any[] | undefined;

  selectedItems: any[] | undefined;
  items_multiple: any[] | undefined;

  formGroup: FormGroup | undefined;
  selectedCountry: any;
  filteredCountries: any[] | undefined;
  filteredGroups: any[] | undefined;
  groupedCities: SelectItemGroup[] | undefined;

  constructor(
    private _countryService: CountryService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
      this.InitGroupedCities();
      this._countryService.getCountries().then((countries) => {
          this.countries = countries;
      });

      this.formGroup = new FormGroup({
          selectedCountry: new FormControl<object | null>(null)
      });
      this.initFilterItems();
  }

  search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
      this.items_multiple = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.countries as any[]).length; i++) {
          let country = (this.countries as any[])[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }

      this.filteredCountries = filtered;
  }

  filterGroupedCity(event: AutoCompleteCompleteEvent) {
      let query = event.query;
      let filteredGroups = [];

      for (let optgroup of this.groupedCities) {
          let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
          if (filteredSubOptions && filteredSubOptions.length) {
              filteredGroups.push({
                  label: optgroup.label,
                  value: optgroup.value,
                  items: filteredSubOptions
              });
          }
      }

      this.filteredGroups = filteredGroups;
  }

  InitGroupedCities() {
    this.groupedCities = [
        {
            label: 'Germany', value: 'de',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA', value: 'us',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan', value: 'jp',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];
  }

  filterItems(event: AutoCompleteCompleteEvent) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.items as any[]).length; i++) {
          let item = (this.items as any[])[i];
          if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(item);
          }
      }

      this.filteredItems = filtered;
  }

  initFilterItems() {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
        this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }
  }

}
