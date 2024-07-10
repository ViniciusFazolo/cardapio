import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { DefaultLayoutPagesComponent } from './components/default-layout-pages/default-layout-pages.component';

export const routes: Routes = [
    {
        path: '',
        component: UserlayoutComponent,
    },
    {
        path: 'adm',
        component: DefaultLayoutPagesComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
