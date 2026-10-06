import { transition } from '$components/transition';
import { loadComponent } from '$utils/loadComponent';
import { initSmoothScroll } from '$utils/smoothScroll';

const initOnce = () => {
  // Global initialization that should only run once
  initSmoothScroll();
  transition();
};

export const initPage = () => {
  // Page-specific initialization
  loadComponent('.section_test', () => import('$components/test'));
};

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('/// mainJS ///');

  initOnce();
  initPage();

  // initSmoothScroll();
});
