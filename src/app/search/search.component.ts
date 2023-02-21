import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, startWith } from 'rxjs';
import { SearchService } from './domain/search.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  searchQuery = new FormControl()
  isSearching = false
  displayedColumns: string[] = ['type', 'image', 'name']
  dataSource = new MatTableDataSource()
  page: { offset: number, limit: number } = { offset: 0, limit: 5 }
  resultTotal = 0
  response: any
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  chipOptions = ["tracks", "albums", "artists"]
  selectedType = this.chipOptions[0]

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    
    this.searchQuery.valueChanges.pipe(startWith(''), debounceTime(600)).subscribe((value) => {
      this.searchAll(value, this.page)
    })

  }

  searchAll(query: string, page: any) {

    if(query) {
      this.isSearching = true;

      this.searchService.searchAll(query, page).subscribe({
          next: (res: any) => {
              this.isSearching = false;

              this.response = res
              this.dataSource.data = this.getGridImage(res[this.selectedType].items)
              this.resultTotal = res[this.selectedType].total
          }
      });
    }

  }

  onPaginateChange() {

    const page = {
        offset: this.paginator.pageIndex * this.paginator.pageSize,
        limit: this.paginator.pageSize
    }
    
    this.searchAll(this.searchQuery.value, page);

  }

  getGridImage(items: any) {

    for(let item of items) {

      if(item.type === "track") {

        item.image = item.album.images[2].url
      }
      else {

        item.image = item.images[2].url
      }
    }
    return items
  }

  typeChanged(type: string) {

    this.selectedType = type

    if(this.response) {

      this.dataSource.data = this.getGridImage(this.response[this.selectedType].items)
      this.resultTotal = this.response[this.selectedType].total
    }
  }
  
}
