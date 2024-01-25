// script.js

function toggleMenu() {
  var sidebarMenu = document.querySelector('.sidebar-menu');
  sidebarMenu.style.display = (sidebarMenu.style.display === 'none' || sidebarMenu.style.display === '') ? 'flex' : 'none';
}

function showContent(page) {
  var contents = document.querySelectorAll('.content');
  
  // 모든 컨텐츠를 숨김
  contents.forEach(function(content) {
    content.style.display = 'none';
  });

  // 클릭한 메뉴에 해당하는 컨텐츠만 보여줌
  var contentId = page + '-content';
  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = 'block';

    // 화면이 작을 때(햄버거 메뉴가 표시 중일 때) 메뉴를 숨김
    var sidebarMenu = document.querySelector('.sidebar-menu');
    sidebarMenu.style.display = 'none';
  }
}
