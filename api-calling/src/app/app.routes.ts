import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Pagenotfound } from './pages/pagenotfound/pagenotfound';
import { TripsD } from './pages/trips-d/trips-d';
import { TripsC } from './pages/trips-c/trips-c';
import { TripsE } from './pages/trips-e/trips-e';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'add/trips', component: TripsC},
    {path: 'edit/trip/:id', component: TripsE},
    {path: 'get/trip/:id', component:TripsD},
    {path: '**', component:Pagenotfound}
];
