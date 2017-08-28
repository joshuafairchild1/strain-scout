import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StrainSearchComponent } from './strain-search/strain-search.component';
import { StrainDetailsComponent } from './strain-details/strain-details.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StrainSearchComponent
  },
  {
    path: 'strains/:ucpc',
    component: StrainDetailsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
