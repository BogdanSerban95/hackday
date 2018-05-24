import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { ZParams } from './../models/z-params';

@Injectable()
export class BulbService {
    apiEndpoint: string = 'http://192.168.168.9/api/v2/devices/71';
    constructor(
        private http: Http
    ) { }

    setColor(params: ZParams) {
        console.log(params);
        
        return this.http.get(this.apiEndpoint).map((res: Response) => res.json());
    }

}