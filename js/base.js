// エラーメッセージを表示する関数
export const displayMessage = (msg) => {
	const popup = document.getElementById('js-popup');
	if(!popup) return;
	popup.classList.add('is-show');
	popup.style.display="block";
	
	const blackBg = document.getElementById('js-black-bg');
	const closeBtn = document.getElementById('js-close-btn');
  
	closePopUp(blackBg);
	closePopUp(closeBtn);

	const errormsg = document.getElementById('errormsg');
	errormsg.textContent = msg;
  
	function closePopUp(elem) {
	  if(!elem) return;
	  elem.addEventListener('click', function() {
		popup.classList.remove('is-show');
	  })
	}
}