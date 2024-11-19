import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Check if the user is logged in (token is present in localStorage)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Store the token in localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);  // Save only the token itself
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');  // Retrieve the token directly
  }

  // Remove the token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  }
}
