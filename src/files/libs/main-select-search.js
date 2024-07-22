
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

document.querySelectorAll('.dropdown-search').forEach(function (dropDownWrapper) {
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown-search__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown-search__holder');
	const dropDownBody= dropDownList.querySelector('.dropdown-search__body');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown-search__item');
	const dropDownInput = dropDownWrapper.querySelector('.dropdown-search__input-hidden');
	const search = dropDownWrapper.querySelector('.dropdown-search__search-field');        
	// const listItems = dropDownWrapper.querySelectorAll('.dropdown-search__item');
	

		

	// Клик по кнопке. Открыть/Закрыть select
	dropDownBtn.addEventListener('click', function (e) {           
		dropDownList.classList.toggle('dropdown__list--visible');
		this.classList.toggle('dropdown__button--active'); 
		let dropDownBtnHeight = dropDownBtn.offsetHeight;
		dropDownList.style.top = `${dropDownBtnHeight}px`;
	});

	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {                
			e.stopPropagation();             
			dropDownBtn.innerText = this.innerText;
			console.log('dropDownBtn.innerText:',dropDownBtn.innerText);
			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;    
			console.log('dropDownInput.value:',dropDownInput.value);      
			if(e.target !== search){
				dropDownList.classList.remove('dropdown__list--visible'); 
				dropDownBtn.classList.remove('dropdown__button--active');  
			};
		});
	});

	// Клик снаружи дропдауна. Закрыть дропдаун
	document.addEventListener('click', function (e) {
		if (e.target !== dropDownBtn && e.target !== search) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
			
		}
	});

	// Нажатие на Tab или Escape. Закрыть дропдаун
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});       

	search ? search.addEventListener('keyup', searchText) : null;

	// поиск 
	function searchText(){
		let searchText = search.value.trim().toLowerCase();
		dropDownListItems.forEach(item => {
			let text = item.textContent.toLowerCase();
			if(searchText !== ''){
				if(text.search(searchText) == -1){
					item.classList.add('hidden');
				} else {
					item.classList.remove('hidden');
				}
			} else {
				item.classList.remove('hidden');
			}    
		});
	}
});
