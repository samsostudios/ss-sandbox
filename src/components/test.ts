class Test {
  //   private component: HTMLElement;

  constructor() {
    // this.component = document.querySelector('.component_test') as HTMLElement;
    console.log('some component');
  }
}

export const basicComponent = () => {
  new Test();
};

export default basicComponent;
