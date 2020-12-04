const loaderWrap = document.getElementById('loader-wrap');
const loader = document.getElementById('loader');
	
export const unCreateLoading = () =>{
	loaderWrap.classList.remove('loader-wrap');
	loader.classList.remove('loader');
}
export const createLoading = () => {
	loaderWrap.classList.add('loader-wrap');
	loader.classList.add('loader');
}

// エラーメッセージを表示する関数
export const displayMessage = (msg) => {
	const popup = document.getElementById('js-popup');
	if(!popup) return;
	popup.classList.add('is-show');
  
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

document.getElementById('result').style.display = "none";

// ページ読込完了後にLoaderを非表示にする
unCreateLoading();
