;(function($){

    /**
     * @version v1.0.1
     * @author Choi Sunki <iru@nate.com>
     * @description 특정 섹션 내의 이미지들이 모두 로드된 후 콜백을 실행하는 jQuery 플러그인
     *
     * @param {Object} opts - 옵션 객체
     * @param {Function} [opts.cb] - 모든 이미지 로드 후 실행할 콜백 함수
     * @param {boolean} [opts.cmessage=false] - 콘솔 메시지 출력 여부
     * 
     * @example
     * $('.image-section').dload({
     *     cb: function() {
     *         console.log('모든 이미지가 로드되었습니다.');
     *     },
     *     cmessage: true
     * });
     *
     * @since v1.0.0 - 초기 버전 작성
     * @since v1.0.1 - 변수 스코프 문제 해결, 이미지 캐싱 처리 추가, 로드 실패 시 예외 처리 추가
     */
    $.fn.dload = function(opts) {

        return this.each(function() {
            var defaults = {
                cmessage: false
            };
            var options = $.extend({}, defaults, opts); // 원본 오염 방지

            var $section = $(this),
                $imgs = $section.find('img'),
                imgCounts = 0; // 전역 변수가 되지 않도록 명확하게 선언

            /**
             * 개별 이미지 로드 후 실행되는 콜백 함수
             * @private
             */
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
