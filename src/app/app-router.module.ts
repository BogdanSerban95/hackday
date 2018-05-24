import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { IndividualStatsComponent } from './individual-stats/individual-stats.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: OverviewComponent
      }
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
