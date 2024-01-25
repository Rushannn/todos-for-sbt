import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './core/services/auth.guard';
import { UserService } from './core/services/user.service';
import { map } from 'rxjs';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: AuthComponent,
    // canActivate: [
    //   () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    // ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      name: 'Страница не найдена'
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
