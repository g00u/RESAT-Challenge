// JavaScript (scripts6.js)
document.addEventListener('DOMContentLoaded', function () {
    // HTML 요소 가져오기
    const slidesContainer = document.getElementById('slides');

    // 초기 슬라이드 인덱스
    let currentIndex = 0;

    // 현재 슬라이드 인덱스 받아와서 보여주는 함수
    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
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

    // 이전 버튼 생성 및 이벤트 리스너 추가
    const prevButton = document.createElement('div');
    prevButton.id = 'prev';
    prevButton.innerHTML = '&lt;';
    prevButton.addEventListener('click', prevSlide);
    document.getElementById('slider-container').appendChild(prevButton);

    // 다음 버튼 생성 및 이벤트 리스너 추가
    const nextButton = document.createElement('div');
    nextButton.id = 'next';
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', nextSlide);
    document.getElementById('slider-container').appendChild(nextButton);

    // 초기 슬라이드 표시
    showSlide(currentIndex);

    //자동 슬라이드 설정 (2초 간격)
    function startAutoSlide(){
      setInterval(nextSlide, 2000);
    }

    startAutoSlide();
    
});
