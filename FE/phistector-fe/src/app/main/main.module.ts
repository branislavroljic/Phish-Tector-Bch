import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DmarcComponent } from './dmarc/dmarc.component';
import { SpfComponent } from './spf/spf.component';
import { DkimComponent } from './dkim/dkim.component';
import { UrlsComponent } from './urls/urls.component';
import { HopsComponent } from './hops/hops.component';
import { ContainerComponent } from './container/container.component';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
  declarations: [
    DmarcComponent,
    SpfComponent,
    DkimComponent,
    UrlsComponent,
    HopsComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppMaterialModule
  ]
})
export class MainModule { }
