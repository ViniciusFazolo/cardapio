import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { ListProductComponent } from './pages/product/list-product/list-product.component';
import { NewProductComponent } from './pages/product/new-product/new-product.component';
import { ListCategoryComponent } from './pages/product-category/list-category/list-category.component';
import { NewCategoryComponent } from './pages/product-category/new-category/new-category.component';
import { AuthguardService } from './services/authguard.service';
import { AuthguardInverseService } from './services/authguard-inverse.service';
import { HomeUserComponent } from './pages/home-user/home-user.component';
import { FormQuestionsComponent } from './pages/questions-product/form-questions/form-questions.component';
import { ListQuestionsComponent } from './pages/questions-product/list-questions/list-questions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeUserComponent,
  },
  {
    path: 'adm',
    canActivate: [AuthguardService],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user',
        component: ListUserComponent,
      },
      {
        path: 'user/create',
        component: NewUserComponent,
      },
      {
        path: 'user/:id',
        component: NewUserComponent,
      },
      {
        path: 'product',
        component: ListProductComponent,
      },
      {
        path: 'product/create',
        component: NewProductComponent,
      },
      {
        path: 'product/:id',
        component: NewProductComponent,
      },
      {
        path: 'category',
        component: ListCategoryComponent,
      },
      {
        path: 'category/create',
        component: NewCategoryComponent,
      },
      {
        path: 'category/:id',
        component: NewCategoryComponent,
      },
      {
        path: 'productOption',
        component: ListQuestionsComponent
      },
      {
        path: 'productOption/create',
        component: FormQuestionsComponent
      },
      {
        path: 'productOption/:id',
        component: FormQuestionsComponent
      },

    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthguardInverseService]
  },
  {
    path: '**',
    component: UserlayoutComponent
  }
];
