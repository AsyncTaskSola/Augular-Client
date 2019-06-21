import { Injectable } from '@angular/core';
import { UserManager, User } from "oidc-client";
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class OpenIdConnectService {
  private userManager = new UserManager(environment.openIdConnectSettings);

  private currentUser: User;

  get userAvailable(): boolean {
    return !!this.currentUser;
  }


  get user(): User {
    return this.currentUser
  }

  userLoaded$ = new ReplaySubject<boolean>(1);

  constructor() {
    this.userManager.clearStaleState();
    this.userManager.getUser().then(user => {
      if (user) {
        this.currentUser = user;
        this.userLoaded$.next(true);
      } else {
        this.currentUser = null;
        this.userLoaded$.next(false);
      }

    }).catch(err => {
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
    /*登入*/
    this.userManager.events.addUserLoaded(user => {
      console.log("userloaded",user);
      this.currentUser = null;
      this.userLoaded$.next(true);/*发布一个通知*/
    })
    /*登出*/
    this.userManager.events.addUserUnloaded(user => {
      console.log("user Unloaded");
      this.currentUser = null;
      this.userLoaded$.next(false);/*发布一个通知*/
    })
  }
  //登陆的动作
  triggerSignIn(){
    this.userManager.signinRedirect().then(()=>{
      console.log("triggerSignIn");
    });
  }

  handlecallback(){
    this.userManager.signinRedirectCallback().then(user=>{
      this.currentUser=user;
      console.log("handlecallback");
    })
  }

  handleSilentcallback(){
    this.userManager.signinSilentCallback().then(user=>{
      this.currentUser=user;
      console.log("handleSilentcallback");
    })
  }
  //登出
  triggerSignOut(){
    this.userManager.signoutRedirect().then(res=>{
      console.log("triggerSignOut");
    })
  }
}
