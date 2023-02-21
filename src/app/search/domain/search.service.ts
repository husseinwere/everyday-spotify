import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpotifyAuth } from "./entities/auth-keys";
import { Buffer } from 'buffer';
import { Observable } from "rxjs";
import { AuthToken } from "./entities/token";

@Injectable()

export class SearchService {

    BASE_URL = "https://api.spotify.com/v1"
    authToken!: string

    constructor(private http: HttpClient) {}
    
    getAuthToken(): Observable<AuthToken> {

        const headers = new HttpHeaders({
            'Authorization': `Basic ${Buffer.from(SpotifyAuth.CLIENT_ID + ':' + SpotifyAuth.CLIENT_SECRET, ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        let body = new URLSearchParams();
        body.set('grant_type', 'client_credentials')

        return this.http.post<AuthToken>('https://accounts.spotify.com/api/token', body.toString(), { headers })

    }

    searchAll(q: string): Observable<any> {

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
        })
        const params = {
            q,
            type: 'track,album,artist'
        }

        return this.http.get<any>(`${this.BASE_URL}/search`, { headers, params })
    }

}