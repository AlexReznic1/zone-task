import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";


const routes: Routes = [
  {path: '', component: AppComponent, children: [
      {path: '', redirectTo: 'zones', pathMatch: 'full'},
      {path: 'zones', loadChildren: () => import('./zones/zones.module').then(m => m.ZonesModule)},
      {path: '**', redirectTo: 'zones', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
