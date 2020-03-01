(function () {
    var GLOBAL_PREFIX = 'comp__dropdown';
    var MENU_CLASS = GLOBAL_PREFIX + '__menu';
    var TOGGLER_CLASS = GLOBAL_PREFIX + '__toggle';
    var TOGGLER_SELECTED_CLASS = TOGGLER_CLASS + '--selected';
    var ROOT_ITEM_CLASS = GLOBAL_PREFIX + '__item__root';
    var LEAF_ITEM_CLASS = GLOBAL_PREFIX + '__item__leaf';

    function dropdown(container) {
        document.addEventListener('click', function (e) {
            if (container.contains(e.target) !== true) {
                var rootItems = container.getElementsByClassName('comp__dropdown__item__root');

                for (var i = 0; i < rootItems.length; i++) {
                    if (rootItems[i].firstElementChild.classList.contains(TOGGLER_SELECTED_CLASS)) {
                        rootItems[i].firstElementChild.click();

                        break;
                    }
                }
            }
        });

        function init() {
            var togglers = container.getElementsByClassName(TOGGLER_CLASS);

            for (var i = 0; i < togglers.length; i++) {
                _setupToggler(togglers[i]);
            }

            var leaves = container.getElementsByClassName(LEAF_ITEM_CLASS);

            for (var i = 0; i < leaves.length; i++) {
                _setupLeaf(leaves[i]);
            }
        }

        function _setupToggler(toggler) {
            toggler.addEventListener('click', function (e) {
                var thisToggler = e.currentTarget;
                var menu = thisToggler.nextElementSibling;

                _toggleOrSetTogglerSelectedClass(thisToggler);

                var togglerSelected = thisToggler.classList.contains(TOGGLER_SELECTED_CLASS);

                if (togglerSelected) {
                    _showMenu(menu);
                    _hideOtherMenusOnTogglerContainerLevel(thisToggler.parentElement);
                } else {
                    _hideMenuSubmenus(menu);
                    _hideMenu(menu);
                }
            });
        }

        function _toggleOrSetTogglerSelectedClass(toggler, selected) {
            if (typeof selected !== 'boolean') {
                toggler.classList.toggle(TOGGLER_SELECTED_CLASS);

                return;
            }

            if (selected) {
                toggler.classList.add(TOGGLER_SELECTED_CLASS);
            } else {
                toggler.classList.remove(TOGGLER_SELECTED_CLASS);
            }
        }

        function _showMenu(menu) {
            menu.style.display = 'block';
        }

        function _hideOtherMenusOnTogglerContainerLevel(togglerContainer) {
            if (togglerContainer.classList.contains(ROOT_ITEM_CLASS)) {
                return;
            }

            var togglerContainerMenu = togglerContainer.parentElement;
            var togglerContainerMenuChild = togglerContainerMenu.firstElementChild;
            var currentToggler;

            for (var i = 0; i < togglerContainerMenu.childElementCount; i++) {
                currentToggler = togglerContainerMenuChild.firstElementChild;

                if (togglerContainerMenuChild.isEqualNode(togglerContainer) === false) {
                    if (currentToggler.classList.contains(TOGGLER_SELECTED_CLASS)) {
                        _toggleOrSetTogglerSelectedClass(currentToggler);
                        _hideMenuSubmenus(currentToggler.nextElementSibling);
                        _hideMenu(currentToggler.nextElementSibling);
                    }
                }

                togglerContainerMenuChild = togglerContainerMenuChild.nextElementSibling;
            }
        }

        function _hideMenuSubmenus(menu) {
            var submenus = menu.getElementsByClassName(MENU_CLASS);
            var submenu;

            for (var i = 0; i < submenus.length; i++) {
                submenu = submenus[i];

                _toggleOrSetTogglerSelectedClass(submenu.previousElementSibling, false);
                _hideMenu(submenu);
            }
        }

        function _hideMenu(menu) {
            menu.style.display = 'none';
        }

        function _setupLeaf(leaf) {
            leaf.addEventListener('click', function (e) {
                var thisLeaf = e.currentTarget;

                _hideOtherMenusOnTogglerContainerLevel(thisLeaf);
            });
        }

        init();
    }

    dropdown(document.getElementById('app__navigation__desktop'));
})();
