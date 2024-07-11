import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: UserlayoutComponent,
    },
    {
        path: 'adm',
        children: [
            {
                path: '',
                component: HomeComponent, 
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
