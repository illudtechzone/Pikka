import { CurrentUserService } from './../../services/current-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isEdit: Boolean = false;
  user: any={};
  readonly: Boolean = true;
  edit() {
    this.readonly = !this.readonly;
    console.log('readonly = ',this.user.firstName);
  }

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {

    this.currentUserService.getCurrentUser(true).then(result => {
      console.log('sucessful geting the user', result);
      this.user = result;

    },
    error => {
      console.log('error geting the user', error);

    });

  }



}
