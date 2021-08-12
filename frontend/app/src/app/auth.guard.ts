import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Korisnik } from "./modeli/korisnik";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log(route.url);
    let ulogovan:Korisnik = JSON.parse(localStorage.getItem("korisnik"));
    if (!ulogovan) this.router.navigate(['']);
    if (ulogovan.status !== route.url[0].path) this.router.navigate(['/' + ulogovan.status]);
    return true;
  }

}
