var $: any;
$(function () {
    $('#main-nav').on('click', (e: any) => {
        var currentLi = e.target.closest('li');
        $(currentLi).siblings().removeClass('--active');
        $(currentLi).addClass('--active');
    });
});