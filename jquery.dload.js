;(function($){

    /**
        * $.fn.dload
        * @memberOf jQuery.fn
        * @param {Function} opts.cb - callback function
        * @param {boolean} opts.debug - 확인 메시지 노출 여부
        * @author Choi Sunki <iru@nate.com>
        * @description 해당 섹션 이미지 로드 후 콜백 주기
    */
    $.fn.dload = function( opts ){

        return this.each(function(){

            var defaults = {
                cmessage: 0
            },
            options = $.extend(defaults, opts);

            var $section = $(this),
            $imgs        = $section.find('img');
            imgCounts    = 0,
            loaded       = function(){
                imgCounts++;
                options.cmessage&&console.log('%c => Loading '+imgCounts+'ea','background: #111; color: green; border-radius: 2px;');
                if( imgCounts == $imgs.length ) {
                    options.cmessage&&console.log('%c Load Complete '+imgCounts+'ea','background: green; color: #111; border-radius: 2px; padding: 5px 10px;');
                    if( typeof options.cb === 'function' ) {
                        options.cb();
                    }
                }
            };

            $.each($imgs,function(){
                var img = new Image();
                img.onload = loaded;
                img.src = $(this).attr('src');
            })

        })

    }

})(jQuery);
