import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { SearchService } from './domain/search.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  searchQuery = new FormControl()
  isSearching = false

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    
    this.searchQuery.valueChanges.subscribe((value) => {
      this.searchAll(value)
    })

  }

  searchAll(query: string) {

    this.isSearching = true;

    this.searchService.searchAll(query).pipe(startWith(''), debounceTime(600)).subscribe({
        next: (res: any) => {
            this.isSearching = false;
            
            console.log(res);
        }/*,
        error: (err: HttpErrorResponse) => {
            this.isSearching = false;
            this.snackbar.openFromComponent(SnackbarComponent, {
                data: "An error has occurred. Please try again.",
                panelClass: 'error-snackbar'
            });
        }*/
    });

  }
  
}
