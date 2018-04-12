$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
    // anchors:['logo','portfolio','contacts'],
    anchors: ['page1', 'page2', 'page3'],
    navigationTooltips: ['Обо мне','Портфолио','Контакты'],
    slidesNavigation: true
  });
});
