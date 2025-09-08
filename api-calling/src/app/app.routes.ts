import { Routes } from '@angular/router';
import { CallApi } from './pages/call-api/call-api';
import { HomePage } from './pages/home-page/home-page';
import { Pagenotfound } from './pages/pagenotfound/pagenotfound';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'create/trips', component: CallApi},
    {path: '**', component:Pagenotfound}
];
