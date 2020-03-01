(function () {
    var GLOBAL_PREFIX = 'comp__carousel';
    var CAROUSEL_LEFT_BUTTON_CLASS = GLOBAL_PREFIX + '__button-left';
    var CAROUSEL_RIGHT_BUTTON_CLASS = GLOBAL_PREFIX + '__button-right';
    var IMAGE_CLASS = GLOBAL_PREFIX + '__image';
    var IMAGE_VISIBLE_CLASS = IMAGE_CLASS + '--visible';
    var LEFT_DIRECTION = 'left';
    var RIGHT_DIRECTION = 'right';

    function carousel(container) {
        var selectedImageIndex = 0;

        function init() {
            if (!container) {
                return;
            }

            container.style.display = 'none';

            var images = container.getElementsByClassName(IMAGE_CLASS);

            _appendNavigationButtons(container, images);

            _setImageVisibleBasedOnIndex(container, images, selectedImageIndex);

            container.style.display = 'block';
        }

        function _appendNavigationButtons(container, images) {
            var leftButton = container.getElementsByClassName(CAROUSEL_LEFT_BUTTON_CLASS)[0];
            var rightButton = container.getElementsByClassName(CAROUSEL_RIGHT_BUTTON_CLASS)[0];

            if (!leftButton || !rightButton) {
                leftButton = _createNavigationButtonWithClass(container, images, LEFT_DIRECTION, CAROUSEL_LEFT_BUTTON_CLASS);
                rightButton = _createNavigationButtonWithClass(container, images, RIGHT_DIRECTION, CAROUSEL_RIGHT_BUTTON_CLASS);

                container.appendChild(leftButton);
                container.appendChild(rightButton);
            }
        }

        function _createNavigationButtonWithClass(container, images, direction, cssClass) {
            var button = document.createElement('div');
            button.classList.add(cssClass);
            button.addEventListener('click', function () {
                _setImageVisibleBasedOnIndex(container,
                    images,
                    _getImageIndexBasedOnDirection(images && images.length || 0, direction))
            });

            return button;
        }

        function _setImageVisibleBasedOnIndex(container, images, index) {
            var image;

            for (var i = 0; i < images.length; i++) {
                image = images[i];

                if (index === i) {
                    image.classList.add(IMAGE_VISIBLE_CLASS);
                } else {
                    image.classList.remove(IMAGE_VISIBLE_CLASS);
                }
            }
        }

        function _getImageIndexBasedOnDirection(imagesNumber, direction) {
            if (imagesNumber === 0) {
                return 0;
            }

            if (direction === LEFT_DIRECTION) {
                var newSelectedImageIndex = selectedImageIndex - 1;

                if (newSelectedImageIndex < 0) {
                    newSelectedImageIndex = imagesNumber - 1;
                }

                selectedImageIndex = newSelectedImageIndex;

                return newSelectedImageIndex;
            }

            var newSelectedImageIndex = selectedImageIndex + 1;

            if (newSelectedImageIndex >= imagesNumber) {
                newSelectedImageIndex = 0;
            }

            selectedImageIndex = newSelectedImageIndex;

            return newSelectedImageIndex;
        }

        init();
    }

    carousel(document.getElementById('app__birds-carousel'));
    carousel(document.getElementById('app__wild-cats-carousel'));
})();