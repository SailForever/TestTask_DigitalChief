const hamburger = document.querySelector('.hamburger');
const left_block = document.querySelector('.left_block_up_content');
const center_block = document.querySelector('.center_block_up');
const main_container = document.querySelector('.main-container_1');
const right_block = document.querySelector('.right_block_up');


function show() {
  const widthMon = window.innerWidth
  hamburger.style = 'position: absolute; display: flex; z-index: 1; flex-direction: column; background-color: rgb(255, 165, 1);';
  left_block.style.display = 'none';
  center_block.style = 'border: 0px; opacity: 0.5';
  right_block.style = 'opacity: 0.5';
  main_container.style = 'background-color: rgba(188, 229, 249, 0.6); background-image: url(../Images/backImageOpp.jpg);';
  if (widthMon <= 820) {
    main_container.style = 'background-image: url(../Images/backgroundMobOpp.png);'
  }
}
function closeSvg() {
  hamburger.style = '';
  left_block.style.display = '';
  center_block.style = '';
  right_block.style = '';
  main_container.style = '';
}