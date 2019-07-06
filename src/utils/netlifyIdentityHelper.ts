import VueRouter from 'vue-router';
import netlifyIdentity, { User } from 'netlify-identity-widget';

export interface LoginComponent {
  setUser: (user: User|null) => void;
  $router: VueRouter;
}

export const CallNetlifyIdentityWidget = (component: LoginComponent, action: string) => {
  if (action === 'login' || action === 'signup') {
    netlifyIdentity.open(action);
    netlifyIdentity.on('login', (user) => {
      component.setUser(user);
      netlifyIdentity.close();
    });
  } else if (action === 'logout') {
    component.setUser(null);
    netlifyIdentity.logout();
    component.$router.push({name: 'home'});
  }
};
