// 배지 스크롤 
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {  // throttle는 lodash에서 제공하는 기능
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기!
    gsap.to(toTopEl, .2, {  // gsap.to('#to-top', .2 이렇게 클래스 이름을 바로 넣을수도 있음
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간)


// 화살표 누르면 최상단으로 이동
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0          // ScrollToPlugin이 연결되어 있어야지만 사용가능함
  });
});


// 메인이미지 delay 애니메이션 효과
const fadesIE = document.querySelectorAll('.visual .fade-in');
fadesIE.forEach(function (fadeIE, index) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeIE, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  });
  
});


// 슬라이드 이미지
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,  // 반복
  autoplay: {   // 객체데이터로 할당해주면 추가적인 옵션을 넣을 수 있음
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});



// 간단히 숨기고 보이는 경우 아래처럼 클래스만 추가해서 CSS에서 제어해주는게 좋음
// 디테일할땐 gsap 라이브러리 사용
const promotionEl = document.querySelector('.promotion');  // promotion 클래스를 찾아서 promotionEl 변수에 할당(요소)
const promotionToggleBtn = document.querySelector('.toggle-promotion');  // toggle-promotion 클래스를 찾아서 promotionToggleBtn 변수에 할당(요소)
let isHidePromotion = false;  // Promotion라는 요소가 숨겨졌니? = 안숨겨져 있다
promotionToggleBtn.addEventListener('click', function () {  // promotionToggleBtn을 클릭하면 어떤 함수가 실행됨
  isHidePromotion = !isHidePromotion // 그 함수에서 isHidePromotion를 체크해서 그 반대값을 다시 할당하는 것 (느낌표가 붙으면 그 반대라는 의미, false의 반대는 true)
  if (isHidePromotion) { // 위에서 isHidePromotion을 재할당 했기 때문에 false에서 true가 되어 if안에 코드가 실행됨
    // 숨김 처리!
    promotionEl.classList.add('hide'); // true가 되어 promotion에 hide라는 클래스가 생성됨
  } else {  // promotionToggleBtn을 다시 클릭하게 되면 true에서 다시 할당되어 false가되어 else안에 코드가 실행됨
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  // gasp.to(요소, 시간, 옵션) ;
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5),  // 애니메이션 동작 시간
    { // 옵션
      y: size,  // 세로 높이
      repeat: -1,  // -1은 무한반복 (gasp에서 제공)
      yoyo: true,  // 애니메이션이 한번 진행이 되고 다시 돌아오게 함
      ease: Power1.easeInOut, // 속도 관련 gsap easing에서 제공 
      delay: random(0, delay) // random은 (최소시간, 최대시간) 사이에서 랜덤으로 입력됨
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// 각각의 콘텐츠가 자연스럽게 생성
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8  // 최상단은 0 이며, 최하단은 1 이라서 거의 끝나는 지점인 0.8을 지정함
    })
    .setClassToggle(spyEl, 'show')  // .scroll-spy라는 클래스에 0.8 이상 스크롤을 내리면 show라는 클래스가 추가됨
    .addTo(new ScrollMagic.Controller()); 
});