import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerhomeComponent } from './components/customer/customerhome/customerhome.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { ManageproductComponent } from './components/admin/manageproduct/manageproduct.component';
import { ManagecategoryComponent } from './components/admin/managecategory/managecategory.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
import { ManagecustomerComponent } from './components/admin/managecustomer/managecustomer.component';
import { ManageaadminComponent } from './components/admin/manageaadmin/manageaadmin.component';
import { CartComponent } from './components/customer/cart/cart.component';
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

const routes: Routes = [
  {path: '',redirectTo: 'home', pathMatch:'full'},
  {path:'home' ,component:HomeComponent},
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'customerhome' ,component:CustomerhomeComponent},
  {path:'adminhome' ,component:AdminhomeComponent},
  {path:'managecustomer' ,component:ManagecustomerComponent},
  {path:'manageadmin' ,component:ManageaadminComponent},
  {path:'manageproduct' ,component:ManageproductComponent},
  {path:'managecategory' ,component:ManagecategoryComponent},
  {path:'managevoucher' ,component:ManagavoucherComponent},
  {path:'statistic' ,component:StatisticComponent},
  {path:'cart' ,component:CartComponent},
  {path:'customerinfo/:username' ,component:CustomerinfoComponent},
  {path:'changepass/:username' ,component:ChangepassComponent},
  {path:'managecustomer/details/:id' ,component:CustomerdetailComponent},
  {path:'managecustomer/create' ,component:CreatecustomerComponent},
  {path:'manageadmin/details/:id' ,component:AdmindetailComponent},
  {path:'manageadmin/create' ,component:CreateadminComponent},
  {path:'home/details/:nameClothes' ,component:ClothesdetailComponent},
  {path:'details/:nameClothes' ,component:CustomerclothesdetailComponent},
  {path:'manageproduct/details/:id' ,component:ProductdetailComponent},
  {path:'manageproduct/details/editproduct/:id' ,component:EditproductComponent},
  {path:'manageproduct/details/editproperty/:idClothes/:idColor' ,component:EditpropertyComponent},
  {path:'manageproduct/details/editsize/:idClothes/:idSize' ,component:EditsizeComponent},
  {path:'manageproduct/createproduct' ,component:CreateproductComponent},
  {path:'manageproduct/createproperty/:idClothes' ,component:CreatepropertyComponent},
  {path:'manageproduct/createsize/:idClothes' ,component:CreatesizeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
