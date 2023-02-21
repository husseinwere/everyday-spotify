import { Component, OnInit } from '@angular/core';
import { AuthToken } from './search/domain/entities/token';
import { SearchService } from './search/domain/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getAuthToken().subscribe((res: AuthToken) => {
      this.searchService.authToken = res['access_token']
    })
  }

}
