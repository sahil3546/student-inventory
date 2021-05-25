import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateInventoryComponent } from "./pages/create-inventory/create-inventory.component";
import { ListInventoryComponent } from "./pages/list-inventory/list-inventory.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "inventory-list",
    pathMatch: "full",
  },
  {
    path: "inventory-list",
    component: ListInventoryComponent,
  },
  {
    path: "inventory-create",
    component: CreateInventoryComponent,
  },
  {
    path: "inventory-create/:id",
    component: CreateInventoryComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
