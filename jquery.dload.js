;(function($){

    /**
        * $.fn.dload
        * @memberOf jQuery.fn
        * @param {Function} opts.cb - callback function
        * @param {boolean} opts.debug - 확인 메시지 노출 여부
        * @version 1.0.3
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
            $imgs        = $section.find('img'),
            imgCounts    = 0,
            imgLength    = $imgs.length,
            getSources   = function( $img ){
                return {
                    src: $img.attr('src') || $img.attr('data-src') || $img.attr('data-original') || $img.attr('data-lazy') || '',
                    srcset: $img.attr('srcset') || $img.attr('data-srcset') || ''
                };
            },
            loaded       = function(){
                imgCounts++;
                options.cmessage&&console.log('%c => Loading '+imgCounts+'ea','background: #111; color: green; border-radius: 2px;');
                if( imgCounts == imgLength ) {
                    options.cmessage&&console.log('%c Load Complete '+imgCounts+'ea','background: green; color: #111; border-radius: 2px; padding: 5px 10px;');
                    if( typeof options.cb === 'function' ) {
                        options.cb();
                    }
                }
            };

            if( !imgLength ) {
                options.cmessage&&console.log('%c Load Complete 0ea','background: green; color: #111; border-radius: 2px; padding: 5px 10px;');
                if( typeof options.cb === 'function' ) {
                    options.cb();
                }
                return;
            }

            $.each($imgs,function(){
                var $img = $(this),
                sources = getSources($img),
                img = new Image(),
                isDone  = false,
                complete = function(){
                    if( isDone ) return;
                    isDone = true;
                    loaded();
                };

                img.onload = complete;
                img.onerror = complete;
                if( sources.srcset ) {
                    img.srcset = sources.srcset;
                }
                img.src = sources.src;

                if( !sources.src && !sources.srcset ) {
                    complete();
                }
            })

        })

    }
    $.fn.dload.VERSION = '1.0.3';

})(jQuery);
