import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { AdminlayoutComponent } from './components/adminlayout/adminlayout.component';

export const routes: Routes = [
    {
        path: '',
        component: UserlayoutComponent,
    },
    {
        path: 'adm',
        component: AdminlayoutComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
