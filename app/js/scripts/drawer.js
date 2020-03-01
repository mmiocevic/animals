(function () {
    function drawer(container) {
        var GLOBAL_PREFIX = 'comp__drawer';
        var DRAWER_BACKDROP_CLASS = GLOBAL_PREFIX + '__backdrop';
        var DRAWER_VISIBLE_CLASS = DRAWER_BACKDROP_CLASS + '--visible';
        var DRAWER_OPEN_ICON_CLASS = GLOBAL_PREFIX + '__icon--open';
        var DRAWER_CLOSE_ICON_CLASS = GLOBAL_PREFIX + '__icon--close';

        function init() {
            var drawerBackdrop = container.getElementsByClassName(DRAWER_BACKDROP_CLASS)[0];
            var drawerOpenIcon = container.getElementsByClassName(DRAWER_OPEN_ICON_CLASS)[0];
            var drawerCloseIcon = container.getElementsByClassName(DRAWER_CLOSE_ICON_CLASS)[0];

            _createDrawerIcons(drawerOpenIcon, drawerCloseIcon);
            _addOpenActionToDrawerOpenIcon(drawerBackdrop, drawerOpenIcon);
            _addCloseActionToDrawerCloseIcon(drawerBackdrop, drawerCloseIcon);
        }

        function _createDrawerIcons(openIcon, closeIcon) {
            openIcon.innerHTML = '<div></div><div></div><div></div>';
            closeIcon.innerHTML = '<div></div><div></div><div></div>';
        }

        function _addOpenActionToDrawerOpenIcon(drawerBackdrop, icon) {
            icon.addEventListener('click', function () {
                drawerBackdrop.classList.add(DRAWER_VISIBLE_CLASS);
            });
        }

        function _addCloseActionToDrawerCloseIcon(drawerBackdrop, icon) {
            icon.addEventListener('click', function () {
                drawerBackdrop.classList.remove(DRAWER_VISIBLE_CLASS);
            });
        }

        init();
    }

    drawer(document.getElementById('app__navigation__mobile'));
})();