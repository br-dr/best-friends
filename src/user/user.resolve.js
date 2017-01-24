export function currentUser(UserService, $state) {
    'ngInject';

    return UserService.getCurrentUser()
        .catch(function() {
            $state.go('guest');
        });
}
