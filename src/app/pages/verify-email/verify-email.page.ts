import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {

  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService ) { }

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.authSvc.logout();
  }

}
