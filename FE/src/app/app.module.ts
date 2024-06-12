import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { CustomerhomeComponent } from './components/customer/customerhome/customerhome.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { ManageproductComponent } from './components/admin/manageproduct/manageproduct.component';
import { ManagecategoryComponent } from './components/admin/managecategory/managecategory.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
import { ManagecustomerComponent } from './components/admin/managecustomer/managecustomer.component';
import { ManageaadminComponent } from './components/admin/manageaadmin/manageaadmin.component';
import { ManagavoucherComponent } from './components/admin/managavoucher/managavoucher.component';
import { CustomerdetailComponent } from './components/admin/customerdetail/customerdetail.component';
import { CreatecustomerComponent } from './components/admin/createcustomer/createcustomer.component';
import { AdmindetailComponent } from './components/admin/admindetail/admindetail.component';
import { CreateadminComponent } from './components/admin/createadmin/createadmin.component';
import { ClothesdetailComponent } from './components/customer/clothesdetail/clothesdetail.component';
import { ProductdetailComponent } from './components/admin/productdetail/productdetail.component';
import { CreateproductComponent } from './components/admin/createproduct/createproduct.component';
import { EditproductComponent } from './components/admin/editproduct/editproduct.component';
import { EditpropertyComponent } from './components/admin/editproperty/editproperty.component';
import { EditsizeComponent } from './components/admin/editsize/editsize.component';
import { CreatepropertyComponent } from './components/admin/createproperty/createproperty.component';
import { CreatesizeComponent } from './components/admin/createsize/createsize.component';
import { CustomerclothesdetailComponent } from './components/customer/customerclothesdetail/customerclothesdetail.component';
import { CustomerinfoComponent } from './components/customer/customerinfo/customerinfo.component';
import { ChangepassComponent } from './components/customer/changepass/changepass.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CustomerhomeComponent,
    CartComponent,
    AdminhomeComponent,
    ManageproductComponent,
    ManagecategoryComponent,
    StatisticComponent,
    ManagecustomerComponent,
    ManageaadminComponent,
    ManagavoucherComponent,
    CustomerdetailComponent,
    CreatecustomerComponent,
    AdmindetailComponent,
    CreateadminComponent,
    ClothesdetailComponent,
    ProductdetailComponent,
    CreateproductComponent,
    EditproductComponent,
    EditpropertyComponent,
    EditsizeComponent,
    CreatepropertyComponent,
    CreatesizeComponent,
    CustomerclothesdetailComponent,
    CustomerinfoComponent,
    ChangepassComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
