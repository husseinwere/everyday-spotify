import { Route } from "@angular/router";
import { SearchComponent } from "./search/search.component";

export const appRoutes: Route[] = [
    {
        path: '',
        component: SearchComponent
    }
]