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

export const resultPage = document.getElementById('result');
resultPage.classList.add('hide');

// ページ読込完了後にLoaderを非表示にする
unCreateLoading();
