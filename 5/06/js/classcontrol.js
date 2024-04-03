const wrap = document.querySelector('#wrap');
const box = wrap.querySelector('article');

wrap.addEventListener('click', () => {
    // let isOn = wrap.classList.contains('on');
    // if (isOn) {
    //     wrap.classList.remove('on')
    // } else {
    //     wrap.classList.add('on')
    // }
    // wrap.classList.contains('on') ? wrap.classList.remove('on') : wrap.classList.add('on') // 3항연산자
    wrap.classList.toggle('on')
})