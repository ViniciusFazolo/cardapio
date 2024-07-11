import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';

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
            },
            {
                path: 'user',
                component: ListUserComponent,
            },
            {
                path: 'user/create',
                component: NewUserComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
