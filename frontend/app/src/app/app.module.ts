import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatMenuModule } from '@angular/material/menu';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule} from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts'

import { AppComponent } from './app.component';
import { LoginComponent } from './pocetna/login/login.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { RegistracijaComponent } from './pocetna/registracija/registracija.component';
import { AppRoutingModule } from './app-routing.module';
import { KontaktComponent } from './kontakt/kontakt.component';
import { NekretninaTabelaComponent } from './nekretnine/nekretnina-tabela/nekretnina-tabela.component';
import { KorisniciTabelaComponent } from './korisnici-tabela/korisnici-tabela.component';
import { KorisnikPocetnaComponent } from './korisnici/korisnik/korisnik-pocetna/korisnik-pocetna.component';
import { HeaderGostComponent } from './header/header-gost/header-gost.component';
import { HeaderKorisnikComponent } from './header/header-korisnik/header-korisnik.component';
import { NekretninaComponent } from './nekretnine/nekretnina/nekretnina.component';
import { ProfilComponent } from './korisnici/profil/profil.component';
import { NovaNekretninaComponent } from './nekretnine/nova-nekretnina/nova-nekretnina.component';
import { AdminPocetnaComponent } from './korisnici/admin/admin-pocetna/admin-pocetna.component';
import { AgentPocetnaComponent } from './korisnici/agent/agent-pocetna/agent-pocetna.component';
import { HeaderAgentComponent } from './header/header-agent/header-agent.component';
import { HeaderAdminComponent } from './header/header-admin/header-admin.component';
import { KorisnikComponent } from './korisnici/korisnik/korisnik/korisnik.component';
import { AdminComponent } from './korisnici/admin/admin/admin.component';
import { AgentComponent } from './korisnici/agent/agent/agent.component';
import { NekretninePregledComponent } from './nekretnine/nekretnine-pregled/nekretnine-pregled.component';
import { GalerijaComponent } from './nekretnine/galerija/galerija.component';
import { PromocijaComponent } from './nekretnine/promocija/promocija.component';
import { KorisniciComponent } from './korisnici/admin/korisnici/korisnici.component';
import { MojeNekretnineComponent } from './nekretnine/moje-nekretnine/moje-nekretnine.component';
import { GostComponent } from './korisnici/gost/gost/gost.component';
import { PocetnaComponent } from './pocetna/pocetna/pocetna.component';
import { IzmenaProfilaComponent } from './korisnici/izmena-profila/izmena-profila.component';
import { IzmeniSifruComponent } from './korisnici/izmeni-sifru/izmeni-sifru.component';
import { NekretninaIzmenaComponent } from './nekretnine/nekretnina-izmena/nekretnina-izmena.component';
import { PonudeComponent } from './nekretnine/ponude/ponude.component';
import { UgovoriComponent } from './nekretnine/ugovori/ugovori.component';
import { BrojNekretninaPoGraduComponent } from './grafici/broj-nekretnina-po-gradu/broj-nekretnina-po-gradu.component';
import { StanoviPitaComponent } from './grafici/stanovi-pita/stanovi-pita.component';
import { KucePitaComponent } from './grafici/kuce-pita/kuce-pita.component';
import { CenovniRangComponent } from './grafici/cenovni-rang/cenovni-rang.component';
import { GraficiComponent } from './grafici/grafici/grafici.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderMainComponent,
    RegistracijaComponent,
    KontaktComponent,
    NekretninaTabelaComponent,
    KorisniciTabelaComponent,
    KorisnikPocetnaComponent,
    HeaderGostComponent,
    HeaderKorisnikComponent,
    NekretninaComponent,
    ProfilComponent,
    NovaNekretninaComponent,
    AdminPocetnaComponent,
    AgentPocetnaComponent,
    HeaderAgentComponent,
    HeaderAdminComponent,
    KorisnikComponent,
    AdminComponent,
    AgentComponent,
    NekretninePregledComponent,
    GalerijaComponent,
    PromocijaComponent,
    KorisniciComponent,
    MojeNekretnineComponent,
    GostComponent,
    PocetnaComponent,
    IzmenaProfilaComponent,
    IzmeniSifruComponent,
    NekretninaIzmenaComponent,
    PonudeComponent,
    UgovoriComponent,
    BrojNekretninaPoGraduComponent,
    StanoviPitaComponent,
    KucePitaComponent,
    CenovniRangComponent,
    GraficiComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    AppRoutingModule,
    MatGridListModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    SwiperModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    ChartsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
