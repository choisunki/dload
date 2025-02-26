;(function($){

    /**
        * $.fn.dload
        * @memberOf jQuery.fn
        * @param {Function} opts.cb - callback function
        * @param {boolean} opts.debug - 확인 메시지 노출 여부
        * @author Choi Sunki <iru@nate.com>
        * @description 해당 섹션 이미지 로드 후 콜백 주기
    */
    $.fn.dload = function(opts) {

        return this.each(function() {
            var defaults = {
                cmessage: 0
            };
            var options = $.extend({}, defaults, opts); // 원본 오염 방지

            var $section = $(this),
                $imgs = $section.find('img'),
                imgCounts = 0; // 전역 변수가 되지 않도록 명확하게 선언

            var loaded = function() {
                imgCounts++;
                if (options.cmessage) {
                    console.log(`%c => Loading ${imgCounts}ea`, 'background: #111; color: green; border-radius: 2px;');
                }
                if (imgCounts === $imgs.length) {
                    if (options.cmessage) {
                        console.log(`%c Load Complete ${imgCounts}ea`, 'background: green; color: #111; border-radius: 2px; padding: 5px 10px;');
                    }
                    if (typeof options.cb === 'function') {
                        options.cb();
                    }
                }
            };

            $imgs.each(function() {
                var img = new Image();
                img.onload = loaded;
                img.onerror = loaded; // 오류 발생 시에도 카운트 증가 (무한 대기 방지)
                img.src = $(this).attr('src');

                // 이미 캐싱된 이미지 처리
                if (img.complete) {
                    loaded();
                }
            });

        });

    };

})(jQuery);
