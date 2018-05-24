import {
  BrowserModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';

import { OverviewComponent } from './overview/overview.component';
import { IndividualStatsComponent } from './individual-stats/individual-stats.component';
import { OctopusEnergyService } from './services/octopus-energy.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BulbService } from './services/bulb.service';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    IndividualStatsComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    HttpModule,
    FormsModule,
    FlexLayoutModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxChartsModule,
    MatProgressSpinnerModule
    
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    OctopusEnergyService,
    BulbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
