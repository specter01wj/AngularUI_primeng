import { Component, OnInit } from '@angular/core';
import { AutoCompleteCompleteEvent } from '../common/models/autocomplete';
import { CountryService } from '../service/country-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
  items: any[] | undefined;
  selectedItem: any;
  suggestions: any[] | undefined;
  countries: any[] | undefined;

  formGroup: FormGroup | undefined;
  selectedCountry: any;
  filteredCountries: any[] | undefined;

  constructor(private _countryService: CountryService) {}

  ngOnInit() {
      this._countryService.getCountries().then((countries) => {
          this.countries = countries;
      });

      this.formGroup = new FormGroup({
          selectedCountry: new FormControl<object | null>(null)
      });
  }

  search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
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

}
