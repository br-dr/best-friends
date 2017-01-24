import * as angular from 'angular';
import template from './profile.component.html';

export const ProfileComponent = {
    template,
    bindings: {
        posts: '<',
        followers: '<',
        currentUser: '<'
    },
    controller: class ProfileComponent {
        constructor($http) {
            'ngInject';

            this.$http = $http;

            Object.assign(this, {
                shouldShowInput: false,
                errorUrl: false,
                input: {
                    url: ''
                },
            });
        }

        changeAvatarByKeypress($event) {
            if ($event.keyCode === 13) {
                this.changeAvatar();
            }
        }

        changeAvatar() {
            this.$http.post('/api/profile/change-avatar', this.input)
                .then((response) => {
                    angular.copy(response.data, this.currentUser);
                    this.errorUrl = false;
                    this.input.url = '';
                    this.shouldShowInput = false;
                })
                .catch(() => {
                    this.errorUrl = true;
                });
        }

        cancelUrlInput() {
            this.shouldShowInput = false;
            this.input.url = '';
            this.errorUrl = false;
        }
    }
};

// class ProfileComponent {} === function ProfileComponent() {}
