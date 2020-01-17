import { IdeasShowMainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaPageComponent } from './idea-page/idea-page.component';

const routes: Routes = [{ path: '', component: IdeasShowMainComponent },
{
  path: 'speceficIdea/:id', component: IdeaPageComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class IdeasShowRoutingModule { }
