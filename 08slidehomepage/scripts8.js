// JavaScript (scripts6.js)
document.addEventListener('DOMContentLoaded', function () {
    // HTML 요소 가져오기
    const slidesContainer = document.getElementById('slides');
    const dotNavigation = document.getElementById('dot-navigation');
    // 초기 슬라이드 인덱스
    let currentIndex = 0;

    // 현재 슬라이드 인덱스 받아와서 보여주는 함수
    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // 현재 페이지에 해당하는 dot에 active 클래스 추가
    dots.forEach((dot, dotIndex) => {
        if (dotIndex === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
    });
    }

    // 다음 슬라이드로 이동하는 함수
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slidesContainer.children.length;
        showSlide(currentIndex);
    }

    // 이전 슬라이드로 이동하는 함수
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slidesContainer.children.length) % slidesContainer.children.length;
        showSlide(currentIndex);
    }
  
    function goToSlide(index) {
        currentIndex = index;
        updateDotNavigation();
        showSlide(currentIndex);
    }

    function updateDotNavigation() {
        Array.from(dotNavigation.children).forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
        });
    }
    Array.from(dotNavigation.children).forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

   setInterval(nextSlide, 3000);


  

});
