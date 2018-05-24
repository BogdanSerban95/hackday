import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { ZParams } from './../models/z-params';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class OctopusEnergyService {
    apiEndpoint: String = 'https://api.octopus.energy/v1/';
    headers: Headers;
    options: RequestOptions;

    constructor(
        private http: Http
    ) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
        this.headers.append('Access-Control-Allow-Methods', 'PUT');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.options = new RequestOptions({ headers: this.headers });
     }

    getUser() {
        return this.http.get(`https://conduit.productionready.io/api/profiles/eric`)
            .map((res: Response) => res.json());
    }

    getTarrifs(product_code: String, tarrif_code: String, from?: Date, to?: Date) {
        let dateFormat = 'YYYY-MM-DDThh:mm:ss';
        let apiString = this.apiEndpoint + 'products/' + product_code + '/electricity-tariffs/' + tarrif_code + '/standard-unit-rates/';
        if (from && to) {
            apiString += '?period_from=' + moment(from).format(dateFormat) + '&period_to=' + moment(to).format(dateFormat);
        }

        return this.http.get(apiString).map((res: Response) => res.json());
    }

    getProducts() {
        return this.http.get(this.apiEndpoint + 'products/')
            .map((res: Response) => res.json());
    }

    getProductDetails(product_code) {
        return this.http.get(this.apiEndpoint + 'products/' + product_code + '/')
            .map((res: Response) => res.json());
    }

    setColor(params: ZParams) {
        console.log(params);
        let body = new HttpParams();
        body.set('z_params[instance_id]', params.instance_id.toString());
        body.set('z_params[color][red]', params.color.red.toString());
        body.set('z_params[color][blue]', params.color.blue.toString());
        body.set('z_params[color][green]', params.color.green.toString());
        body.set('z_params[turned_on]', params.turned_on.toString());
        console.log(JSON.stringify(body));
        
        // let body = 'z_params%5Binstance_id%5D='+ params.instance_id +'&z_params%5Bcolor%5D%5Bred%5D='+ params.color.red + '&z_params%5Bcolor%5D%5Bgreen%5D='+ params.color.green +'&z_params%5Bcolor%5D%5Bblue%5D=' + params.color.blue + '&z_params%5Bturned_on%5D=' + params.turned_on;
        return this.http.put('http://192.168.168.9/api/v2/devices/71', params, this.options).map((res: Response) => res.json());
    }
}