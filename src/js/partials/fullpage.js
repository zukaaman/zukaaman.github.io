$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
    // anchors:['logo','portfolio','contacts'],
    navigation: true,
    navigationTooltips: ['Обо мне','Портфолио','Контакты'],
    slidesNavigation: true,
    loopHorizontal: true
  });
});
