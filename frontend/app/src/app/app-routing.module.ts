import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pocetna/login/login.component';
import { RegistracijaComponent } from './pocetna/registracija/registracija.component';
import { KorisnikPocetnaComponent } from './korisnici/korisnik/korisnik-pocetna/korisnik-pocetna.component';
import { NekretninaComponent } from './nekretnine/nekretnina/nekretnina.component';
import { ProfilComponent } from './korisnici/profil/profil.component';
import { NovaNekretninaComponent } from './nekretnine/nova-nekretnina/nova-nekretnina.component';
import { AdminPocetnaComponent } from './korisnici/admin/admin-pocetna/admin-pocetna.component';
import { AgentPocetnaComponent } from './korisnici/agent/agent-pocetna/agent-pocetna.component';
import { KorisnikComponent } from './korisnici/korisnik/korisnik/korisnik.component';
import { AdminComponent } from './korisnici/admin/admin/admin.component';
import { AgentComponent } from './korisnici/agent/agent/agent.component';
import { KorisniciTabelaComponent } from './korisnici-tabela/korisnici-tabela.component';
import { NekretninePregledComponent } from './nekretnine/nekretnine-pregled/nekretnine-pregled.component';
import { KorisniciComponent } from './korisnici/admin/korisnici/korisnici.component';
import { MojeNekretnineComponent } from './nekretnine/moje-nekretnine/moje-nekretnine.component';
import { GostComponent } from './korisnici/gost/gost/gost.component';
import { PocetnaComponent } from './pocetna/pocetna/pocetna.component';
import { IzmenaProfilaComponent } from './korisnici/izmena-profila/izmena-profila.component';
import { IzmeniSifruComponent } from './korisnici/izmeni-sifru/izmeni-sifru.component';
import { NekretninaIzmenaComponent } from './nekretnine/nekretnina-izmena/nekretnina-izmena.component';
import { PonudeComponent } from './nekretnine/ponude/ponude.component';
import { UgovoriComponent } from './nekretnine/ugovori/ugovori.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PocetnaComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registracija', component: RegistracijaComponent }
    ]
  },
  {
    path: 'korisnik',
    component: KorisnikComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: KorisnikPocetnaComponent,
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'moje-nekretnine',
        component: MojeNekretnineComponent,
      },
      {
        path: 'moje-nekretnine/nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'moje-nekretnine/nekretnina-izmena/:id',
        component: NekretninaIzmenaComponent
      },
      {
        path: 'profil/izmena-profila/:username',
        component: IzmenaProfilaComponent
      },
      {
        path: 'profil/izmena-sifre/:username',
        component: IzmeniSifruComponent
      }
    ],
  },
  {
    path: 'gost',
    component: GostComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: KorisnikPocetnaComponent
      }
    ]
  },
  { path: 'nova-nekretnina', component: NovaNekretninaComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminPocetnaComponent,
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'profil/:username',
        component: ProfilComponent,
      },
      {
        path: 'korisnici',
        component: KorisniciComponent,
      },
      {
        path: 'pregled-nekretnine',
        component: NekretninePregledComponent,
      },
      {
        path: 'pregled-ponude',
        component: PonudeComponent
      },
      {
        path: 'pregled-nekretnine/nekretnina/:id',
        component: NekretninaComponent,
      },
      {
        path: 'nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'moje-nekretnine',
        component: MojeNekretnineComponent
      },
      {
        path: 'moje-nekretnine/nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'moje-nekretnine/nekretnina-izmena/:id',
        component: NekretninaIzmenaComponent
      },
      {
        path: 'profil/:username/izmena-profila/:username',
        component: IzmenaProfilaComponent
      },
      {
        path: 'profil/:username/izmena-sifre/:username',
        component: IzmeniSifruComponent
      },
      {
        path: 'ugovori',
        component: UgovoriComponent
      }
    ]
  },
  {
    path: 'agent',
    component: AgentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AgentPocetnaComponent,
      },
      {
        path: 'pregled-nekretnine',
        component: NekretninePregledComponent,
      },
      {
        path: 'pregled-ponude',
        component: PonudeComponent
      },
      {
        path: 'pregled-nekretnine/nekretnina/:id',
        component: NekretninaComponent,
      },
      {
        path: 'moje-nekretnine',
        component: MojeNekretnineComponent
      },
      {
        path: 'moje-nekretnine/nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'moje-nekretnine/nekretnina-izmena/:id',
        component: NekretninaIzmenaComponent
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'nekretnina/:id',
        component: NekretninaComponent
      },
      {
        path: 'profil/izmena-profila/:username',
        component: IzmenaProfilaComponent
      },
      {
        path: 'profil/izmena-sifre/:username',
        component: IzmeniSifruComponent
      },
      {
        path: 'ugovori',
        component: UgovoriComponent
      }
    ]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
