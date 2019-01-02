import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConnectFourGameResult} from '../games/connect-four/connect-four-game.result';

@Injectable({
  providedIn: 'root'
})
export class MatthewyknowlesRestService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'https://7lbn6iw045.execute-api.us-east-2.amazonaws.com/prod/';
  }

  recordConnectFourResult(connectFourGameResult: ConnectFourGameResult): Observable<any> {
    console.log('in service');
    const url = this.url + 'connectFourMatch';
    return this.httpClient.post(url, connectFourGameResult);
  }
}
