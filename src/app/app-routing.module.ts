import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  { path: 'home', component: LandingComponent},
  { path: 'comments', component: CommentsComponent},
  { path: 'charts', component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
