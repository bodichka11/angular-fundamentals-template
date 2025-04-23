import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    login(user: any) { // replace 'any' with the required interface
        // Add your code here
    }

    logout() {
        // Add your code here
    }

    register(user: any) { // replace 'any' with the required interface
        // Add your code here
    }

    private isAuthorized$$: boolean = false; 

    get isAuthorised() {
        return this.isAuthorized$$;
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
    }

    getLoginUrl() {
        // Add your code here
    }
}
