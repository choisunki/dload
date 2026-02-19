# $.fn.dload
해당 섹션 이미지 로드 후 콜백 주기

유지운영하는 몰에서, 콘텐츠 부분이 모두 로드되어야 스크립트가 실행이 된다.
요즘은, 기획전의 담당자가 (무슨 일인지) 이미지를 (정말)많이 슬라이싱 한 후 그 아이들을 움직여주길 원한다.
그런데, 여기서 문제가 내가 작성한 영역을 제외한(레이아웃, 그리고 그외의 썸네일등) 부분이 모두 로드 되어야, 내가 정의한 기능이 실행 된다.

제일 처음 노출되는 섹션의 슬라이싱하여 노출시킨 아이들(이미지들)을 움직이게 하는데 문제가 생겼다.
이미지가 로드되면서 움직인다던지, 아니면 이미 기능이 다 완료된 후 이미지가 노출된다던지 하는(이 경우는, 보는사람 입장에서는 아무것도 안한것과 다름 없다).

그래서, 첫 번째 섹션의 이미지들이 다 로드되면, 콜백으로 기능을 실행 하도록 만들어서 써봄.

----
## 사용법
문서에 `jQuery.dload`를 심자.
```javascript
//cdn.jsdelivr.net/gh/choisunki/dload@1.0.3/jquery.dload.js
```

그리고 사용하자.
```javascript
$('.sect-0').dload({
    cb: function(){
        // 여기에 효과를 준다.
    }
});
```

## 1.0.3 변경사항

- 섹션 내 이미지가 0개여도 `cb`가 즉시 실행됨
- `lazy` 속성 이미지도 로드 대상으로 처리함
  - `src`, `data-src`, `data-origin`, `data-original`, `data-lazy`
  - `srcset`, `data-srcset`
- 이미지 로드 실패(`error`)도 완료로 처리하여 콜백이 멈추지 않음

### lazy 이미지 예시

```html
<section class="sect-0">
    <img data-src="https://example.com/a.jpg" alt="">
    <img data-original="https://example.com/b.jpg" alt="">
    <img data-srcset="https://example.com/c-640.jpg 640w, https://example.com/c-1280.jpg 1280w" data-src="https://example.com/c-640.jpg" alt="">
</section>
```

```javascript
$('.sect-0').dload({
    cb: function(){
        // lazy 소스까지 로드 카운트가 끝난 뒤 실행
    }
});
```

## 기타

이미지 몇 개 로드되었는지 살펴보고 싶으면

```javascript
$('.sect-0').dload({
    cmessage: true,
    cb: function(){
        // 여기에 효과를 준다.
    }
});
```
![스크린샷 2021-11-23 오후 12 14 57](https://user-images.githubusercontent.com/6572449/142966303-9dcbf9f8-3f17-440f-9d7f-e8729eae7d3a.png)
