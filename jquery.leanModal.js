(function ($) {

    $.fn.extend({

        leanModal: function (options) {

            var defaults = {
                top: null,
                opacity: 0.5,
                overlayClassName: 'lean_overlay',
                closeButton: null,
                type: null
            }

            var o = $.extend(defaults, options);

            var overlay = $('<div id="' + o.overlayClassName + '"></div>');

            $('body').append(overlay);

            return this.each(function () {

                $(this).click(function (e) {

                    e.preventDefault();

                    var modalTarget = $(this).attr('href');

                    if (o.type == 'ajax') {

                        $.get(modalTarget, function(data) {

                            modalTarget = Math.random().toString().substr(2);

                            $('<div id="' + modalTarget + '"></div>').html(data).appendTo('body');

                            modalTarget = '#' + modalTarget;

                            openModal(modalTarget);

                        });

                    } else {

                        openModal(modalTarget);

                    }

                });

            });

            function openModal(modalTarget) {

                $(overlay).click(function () {
                    closeModal(modalTarget);
                });

                $(o.closeButton).click(function () {
                    closeModal(modalTarget);
                });

                $(modalTarget).css({
                    'float': 'left',
                    'position': 'fixed',
                    'z-index': 9999
                });

                var modalHeight = $(modalTarget).outerHeight();
                var modalWidth  = $(modalTarget).outerWidth();
                
                var marginTop   = '0px';
                var posTop      = o.top + 'px';

                if (o.top === null) {

                    marginTop = -(modalHeight / 2) + 'px';
                    posTop    = '50%';

                }

                $(overlay).css({
                    'display': 'block',
                    opacity: 0
                })
                .fadeTo(200, o.opacity);

                $(modalTarget).css({
                    'display': 'block',
                    'left':  '50%',
                    'margin-left': -(modalWidth / 2) + 'px',
                    'margin-top': marginTop,
                    'opacity': 0,
                    'top': posTop
                })
                .fadeTo(200, 1);

            }

            function closeModal(modalTarget) {

                overlay.fadeOut(200);

                $(modalTarget).css('display', 'none');

                if (o.type == 'ajax') {

                    $(modalTarget).remove();

                }

            }

        }

    });

})(jQuery);