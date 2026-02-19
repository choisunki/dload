;(function(global) {
    /**
     * @version v1.0.2
     * @author Choi Sunki <iru@nate.com>
     * @description 특정 섹션 내의 이미지들이 모두 로드된 후 콜백을 실행하는 유틸리티
     *              jQuery가 있으면 jQuery 플러그인으로 동작하고, 없으면 바닐라 JavaScript 방식으로 사용 가능
     *
     * @param {HTMLElement|NodeList} target - 이미지가 포함된 DOM 요소 또는 NodeList
     * @param {Object} opts - 옵션 객체
     * @param {Function} [opts.cb] - 모든 이미지 로드 후 실행할 콜백 함수
     * @param {boolean} [opts.cmessage=false] - 콘솔 메시지 출력 여부
     *
     * @example
     * // jQuery 사용 시
     * $('.image-section').dload({
     *     cb: function() {
     *         console.log('모든 이미지가 로드되었습니다.');
     *     },
     *     cmessage: true
     * });
     *
     * @example
     * // 바닐라 JS 사용 시
     * dload(document.querySelector('.image-section'), {
     *     cb: function() {
     *         console.log('모든 이미지가 로드되었습니다.');
     *     },
     *     cmessage: true
     * });
     *
     * @since v1.0.0 - 초기 버전 작성
     * @since v1.0.1 - 변수 스코프 문제 해결, 이미지 캐싱 처리 추가, 로드 실패 시 예외 처리 추가
     * @since v1.0.2 - jQuery 유무에 따라 자동 분기, 바닐라 방식으로도 사용 가능하도록 개선
     */
    function dload(target, opts) {
        var options = Object.assign({ cmessage: false }, opts || {});
        var sections = target instanceof NodeList || Array.isArray(target) ? target : [target];

        sections.forEach(function(section) {
            if (!section || typeof section.querySelectorAll !== 'function') return;
            var imgs = section.querySelectorAll('img');
            var loadedCount = 0;

            var handleLoaded = function() {
                loadedCount++;
                if (options.cmessage) {
                    console.log('%c => Loading ' + loadedCount + 'ea', 'background: #111; color: green; border-radius: 2px;');
                }
                if (loadedCount === imgs.length) {
                    if (options.cmessage) {
                        console.log('%c Load Complete ' + loadedCount + 'ea', 'background: green; color: #111; border-radius: 2px; padding: 5px 10px;');
                    }
                    if (typeof options.cb === 'function') {
                        options.cb();
                    }
                }
            };

            imgs.forEach(function(imgEl) {
                var img = new Image();
                img.onload = handleLoaded;
                img.onerror = handleLoaded;
                img.src = imgEl.getAttribute('src');

                if (img.complete) {
                    handleLoaded();
                }
            });
        });
    }

    if (typeof jQuery !== 'undefined' && typeof jQuery.fn === 'object') {
        jQuery.fn.dload = function(opts) {
            return this.each(function() {
                dload(this, opts);
            });
        };
    }

    global.dload = dload;
})(typeof window !== 'undefined' ? window : this);
