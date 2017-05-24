import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: Auth) {}

  canActivate() {
    return this.authService.authenticated();
  }
}