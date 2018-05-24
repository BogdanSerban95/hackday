import { Component, OnInit } from '@angular/core';
import { OctopusEnergyService } from './../services/octopus-energy.service';
import * as moment from 'moment';
import { Tarrif } from './../models/tarrif.model';
import { ZParams } from './../models/z-params';
import { Color } from '../models/color';
import { BulbService } from './../services/bulb.service';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  products = {};
  tariffs = {};
  resCount = 0;
  handledRes = 0;
  bulbColor = undefined;
  mockConsumption = [0.053,0.043,0.425,0.025,0.11,0.35,0.084,0.099,0.048,0.074,0.094,0.089,0.103,0.372,0.123,0.088,0.028,0.076,0.141,0.077,0.503,0.103,0.024,0.159,0.081,0.038,0.366,0.195,0.135,0.151,0.054,0.069,0.914,0.06,0.078,0.087,0.023,0.022,0.334,0.178,0.153,0.073,0.161,0.129,0.023,0.196,0.047,0.105
  ];
  view: any[] = [1500, 500];
  barView: any[] = [800, 500];
  values: any[] = [];
  barValues: any[] = [];
  constructor(
    public energyService: OctopusEnergyService
  ) {
  }

  ngOnInit() {
    this.energyService.getProducts()
      .subscribe((res) => {
        this.resCount = res.count;
        let results = res.results;
        let startDate = moment(new Date()).subtract(1, 'days').toDate();
        let endDate = moment(new Date()).toDate();
        for (let i = 0; i < this.resCount; i++) {
          this.energyService.getProductDetails(results[i].code).subscribe((response) => {
            this.products[results[i].code] = {
              product: response
            };
            this.energyService.getTarrifs(response.code, response.single_register_electricity_tariffs._C.direct_debit_monthly.code, startDate, endDate)
              .subscribe((res) => {
                this.handleResults(results[i].code, res);
              });
          })
        }
      });
  }

  handleResults(code, res) {
    this.products[code].tariff = res.results;
    this.handledRes ++;
    if (this.handledRes == this.resCount) {
      this.computeChartValues();
    }
  }

  computeChartValues() {
    let chartVals = [];
    let barChartVals = [];
    let idx = 0;
    let dateLabels = [];
    let first = null;

    for (let key in this.products) {
      let product = this.products[key];
      chartVals[idx] = {
        name: product.product.full_name,
        series: []
      }

      barChartVals[idx] = {
        name: product.product.full_name,
        value: 0
      };

      let tariff = product.tariff.reverse();
      if (idx === 0) {
        dateLabels = tariff.map (e => e.valid_to);
        first = tariff;
      }
      let mockLength = this.mockConsumption.length;

      console.log(chartVals);
      for (let i = 0; i < mockLength; i++) {
        let val = tariff[i % tariff.length].value_inc_vat * this.mockConsumption[i];
        barChartVals[idx].value += val;
        chartVals[idx].series.push({
          name: moment(dateLabels[i]).format('HH:mm').toString(),
          value: val
        });
      }
      idx++;
    }
    
    this.barValues = barChartVals;
    this.values = chartVals;
    this.updateColor(first);
  }

  updateColor(tariff: Tarrif[]) {
    let min = tariff[0].value_inc_vat;
    let max = tariff[0].value_inc_vat;
    for (let i = 0; i < tariff.length; i++) {
      if (min > tariff[i].value_inc_vat) {
        min = tariff[i].value_inc_vat;
      }
      if (max < tariff[i].value_inc_vat) {
        max = tariff[i].value_inc_vat;
      }
    }
    let currentVal = tariff[tariff.length - 1].value_inc_vat;
    let amplitude = max - min;
    let dif = currentVal - min;
    let ratio = dif / amplitude;
    
    let zParam = new ZParams();
    zParam.instance_id = 0;
    zParam.turned_on = true;
    zParam.color = new Color();
    if (ratio < 0.25) {
      // green
      zParam.color.blue = 0;
      zParam.color.red = 0;
      zParam.color.green = 255;
      this.bulbColor = 'Green';
    } else if (ratio < 0.5) {
      //yellow
      zParam.color.blue = 0;
      zParam.color.red = 239;
      zParam.color.green = 205;
      this.bulbColor = 'Yellow';
    } else if (ratio < 0.75) {
      //orange
      zParam.color.blue = 0;
      zParam.color.red = 239;
      zParam.color.green = 91;
      this.bulbColor = 'Orange';
    } else {
      //red
      zParam.color.blue = 0;
      zParam.color.red = 255;
      zParam.color.green = 0;
      this.bulbColor = 'Red'
    }

    console.log('here');
    
    this.energyService.setColor(zParam).subscribe((res) => {console.log("done");
    });
  }
}
