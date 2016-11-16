import template from 'raw!./app.component.html';

export const AppComponent = {
    template,
    controller: function AppController() {
        this.isNavCollapsed = true;
    }
};
