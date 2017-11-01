import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 import { ReactiveFormsModule,FormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { StockManageComponent } from './stock/stock-manage/stock-manage.component';
import { StarsComponent } from './stars/stars.component';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';

import { StockService } from './stock/stock.service';
import { StockFilterPipe } from './stock/stock-filter.pipe';
const routers: Routes = [
  {
    path:'stock',
    component:StockManageComponent
  },{
    path:'dashboard',
    component:DashboardComponent
  },{
    path:'stock/:id',
    component: StockFormComponent
  },{
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    StockManageComponent,
    StarsComponent,
    DashboardComponent,
    StockFormComponent,
    StockFilterPipe

  ],
  imports: [
    BrowserModule,
     ReactiveFormsModule,
     FormsModule,
    RouterModule.forRoot(routers)
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
