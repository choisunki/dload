# $.fn.dload
특정 섹션 내의 **모든 이미지가 로드된 후 콜백을 실행**하는 유틸리티.  
**jQuery가 있으면 플러그인으로, 없으면 바닐라 방식으로 동작**.

---

## 배경

몰 운영 시, 콘텐츠 구조상 **모든 이미지가 로드된 후**에야 스크립트 실행이 필요한 경우가 많습니다.

특히 요즘은 담당자들이 콘텐츠를 슬라이싱해 여러 개의 이미지로 분할하고,  
그걸 조합하여 움직이는 방식으로 효과를 주길 원합니다.

하지만:
- 이미지가 **로드되기 전에 스크립트가 실행**되어 이상한 동작이 생기거나,
- 또는 이미지가 **다 로딩된 후 이미 스크립트가 끝난 상태**가 되어 효과가 보이지 않는 경우가 생깁니다.

그래서 **첫 번째 섹션 이미지들이 모두 로드된 후에 콜백으로 기능을 실행**하는 구조를 만들었습니다.

---

## 사용 방법

### CDN 연결

```html
<script src="https://cdn.jsdelivr.net/gh/choisunki/dload/v1.0.2/jquery.dload.min.js"></script>
```

### jQuery
```javascript
$('.sect-0').dload({
    cb: function () {
        // 여기에 효과를 준다
    }
});
```

### 바닐라
```javascript
dload(document.querySelector('.sect-0'), {
    cb: function () {
        // 여기에 효과를 준다
    }
});
```

### 기타
몇 개의 이미지가 로드됐는지 로그를 보고 싶다면:
```javascript
$('.sect-0').dload({
    cmessage: true,
    cb: function () {
        console.log('완료 후 실행되는 기능');
    }
});
```

바닐라:
```javascript
dload(document.querySelector('.sect-0'), {
    cmessage: true,
    cb: function () {
        console.log('완료 후 실행되는 기능');
    }
});
```

![스크린샷 2021-11-23 오후 12 14 57](https://user-images.githubusercontent.com/6572449/142966303-9dcbf9f8-3f17-440f-9d7f-e8729eae7d3a.png)


