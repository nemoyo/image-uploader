export async function callApi() {
		try {
					const response = await window.fetch('https://workers-market.com/api/v1/categories');
					const categories = await response.json();
					const currentDiv = document.getElementById('list');
					let myList = document.createElement('ul');
					for (let i = 0; i < categories.length; i++) {
									let listCategoryName = document.createElement('li');
									listCategoryName.textContent = categories[i].categoryName;
									myList.appendChild(listCategoryName);
								}
					document.body.insertBefore(myList,currentDiv)
				}
			catch(err) {
						console.log(err);
					}

};
