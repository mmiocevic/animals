(function () {
    function drawer(container) {
        var GLOBAL_PREFIX = 'comp__accordion';
        var PANEL_CLASS = GLOBAL_PREFIX + '__item__nested__panel';
        var TOGGLER_CLASS = GLOBAL_PREFIX + '__item__nested__toggler';
        var TOGGLER_SELECTED_CLASS = GLOBAL_PREFIX + '__item__nested__toggler--selected';
        var LEAF_CLASS = GLOBAL_PREFIX + '__item__leaf';
        var PANEL_PADDING_LEFT = 1;

        function init() {
            var togglers = container.getElementsByClassName(TOGGLER_CLASS);

            for (var i = 0; i < togglers.length; i++) {
                _setupToggler(togglers[i]);
            }

            var leaves = container.getElementsByClassName(LEAF_CLASS);

            for (var i = 0; i < leaves.length; i++) {
                _setupLeaf(leaves[i]);
            }
        }

        function _setupToggler(toggler) {
            toggler.addEventListener('click', function (e) {
                var thisToggler = e.currentTarget;
                var panel = thisToggler.nextElementSibling;

                _toggleOrSetTogglerSelectedClass(thisToggler);

                var togglerSelected = thisToggler.classList.contains(TOGGLER_SELECTED_CLASS);

                if (togglerSelected) {
                    _showPanel(panel);
                    _hideOtherPanelsOnTogglerContainerLevel(thisToggler.parentElement)
                } else {
                    _hidePanelSubpanels(panel);
                    _hidePanel(panel);
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

        function _showPanel(panel) {
            panel.style.display = 'block';

            _setPanelPaddingBasedOnLevel(panel);
        }

        function _setPanelPaddingBasedOnLevel(panel) {
            if (panel.style.paddingLeft) {
                return;
            }

            var isAtRoot = false;
            var level = 1;
            var element = panel.parentElement;

            while (isAtRoot === false) {
                if (element.classList.contains(GLOBAL_PREFIX)) {
                    isAtRoot = true;
                    break;
                }

                if (element.classList.contains(PANEL_CLASS)) {
                    level++;
                }

                element = element.parentElement;
            }

            panel.style.paddingLeft = level * PANEL_PADDING_LEFT + 'rem';
        }

        function _hideOtherPanelsOnTogglerContainerLevel(togglerContainer) {
            var togglerContainerMenu = togglerContainer.parentElement;
            var togglerContainerMenuChild = togglerContainerMenu.firstElementChild;
            var currentToggler;

            for (var i = 0; i < togglerContainerMenu.childElementCount; i++) {
                currentToggler = togglerContainerMenuChild.firstElementChild;

                if (togglerContainerMenuChild.isEqualNode(togglerContainer) === false) {
                    if (currentToggler.classList.contains(TOGGLER_SELECTED_CLASS)) {
                        _toggleOrSetTogglerSelectedClass(currentToggler);
                        _hidePanelSubpanels(currentToggler.nextElementSibling);
                        _hidePanel(currentToggler.nextElementSibling);
                    }
                }

                togglerContainerMenuChild = togglerContainerMenuChild.nextElementSibling;
            }
        }

        function _hidePanelSubpanels(panel) {
            var subpanels = panel.getElementsByClassName(PANEL_CLASS);
            var subpanel;

            for (var i = 0; i < subpanels.length; i++) {
                subpanel = subpanels[i];

                _toggleOrSetTogglerSelectedClass(subpanel.previousElementSibling, false);
                _hidePanel(subpanel);
            }
        }

        function _hidePanel(panel) {
            panel.style.display = 'none';
        }

        function _setupLeaf(leaf) {
            leaf.addEventListener('click', function (e) {
                var thisLeaf = e.currentTarget;

                _hideOtherPanelsOnTogglerContainerLevel(thisLeaf);
            });
        }

        init();
    }

    drawer(document.getElementById('app__menu__mobile'));
})();