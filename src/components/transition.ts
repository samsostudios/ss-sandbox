import barba from '@barba/core';
import { gsap } from 'gsap';

class Transition {
  private component: HTMLElement;
  private transitionBG: HTMLElement;

  constructor() {
    this.component = document.querySelector('.component_transition') as HTMLElement;
    this.transitionBG = document.querySelector('.transition_bg') as HTMLElement;

    if (!this.component || !this.transitionBG) return;

    this.init();
  }

  private init() {
    barba.init({
      transitions: [
        {
          name: 'default',

          leave: ({ current }) => {
            return this.runLeaveAnimation(current.container);
          },

          afterLeave: ({ current }) => {
            console.log('after leave');
            gsap.set(current.container, { display: 'none' });
          },

          beforeEnter: ({ next }) => {
            console.log('before enter');
            gsap.set(next.container, { autoAlpha: 1 });
          },

          enter: ({ next }) => {
            return this.runEnterAnimation(next.container);
          },
        },
      ],
    });
  }

  private runLeaveAnimation(current: HTMLElement) {
    console.log('/// runLeaveAnimation ///', current);
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });
      tl.set(this.component, { autoAlpha: 1 });
      tl.fromTo(
        this.transitionBG,
        { yPercent: 50, borderRadius: '0vw 0vw 0vw 0vw' },
        {
          yPercent: -25,
          duration: 2,
          borderRadius: '100vw 100vw 100vw 100vw',
          ease: 'power2.inOut',
        },
      );
    });
  }

  private runEnterAnimation(next: HTMLElement) {
    console.log('/// runEnterAnimation ///', next);

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      tl.to(this.transitionBG, {
        yPercent: -150,
        borderRadius: '0vw 0vw 0vw 0vw',
        duration: 2,
        ease: 'power2.inOut',
      });

      tl.set(this.component, {
        autoAlpha: 0,
      });
    });
  }
}

export const transition = () => {
  new Transition();
};

export default transition;
