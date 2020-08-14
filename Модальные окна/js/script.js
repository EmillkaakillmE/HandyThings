// Выцепляем все ссылки, при нажатии на которых будет появляться попап
const popupLinks = document.querySelectorAll('.popup-link');
// Берём боди, чтобы залочить скрол
const body = document.querySelector('body');

//Переменная, которая собирает класс lock-padding у всех элементов, которые съезжают, во время скрытия скролбара. Это как правило статичные элементы, типа хэдэра
const lockPadding = document.querySelectorAll('.lock-padding');

//
let unlock = true;
//800мс, то же значение, что и в транзишн
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			//Отнимает # у ссылки, в которой href="#popupName". Получаем href="popupName"
			const popupName = popupLink.getAttribute('href').replace('#', '');
			//Находим элемент с айди таким же, как и popupName
			const curentPopup = document.getElementById(popupName);
			//Функция для открытия попапа
			popupOpen(curentPopup);
			//Отменяем дефолтное действие ссылки
			e.preventDefault();
		});
	}
}

//Выискиваем все элементы в попапе, при нажатие на который должен быть закрыт попап. Таких может быть несколько
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		cosnt el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			//Находим ближайший попап, который обычно и является открытым, чтобы его закрыть
			popupClose(el.closest('.popup'));
			//Снова отмена дефолтного действия ссылки
			e.preventDefault();
		});
	}
}


function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		//Если ссылка на наш попап находится в другом попапе, то нужно этот другой попап сначала закрыть
		if (popupActive) {
			popupClose(popupActive, false);
		}
		//Если такого попапа нет, то мы просто блочим body
		else {
			bodyLock();
		}
		//Добавляем класс опен к нашему попапу, в css этот класс уже описан
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}


//Второй параметр нужен для того, чтобы проверять, нынешний попап будет закрыт тем, что открывается другой попап (который лежит в нынешнем) или нет. Если это так, то убирать блок скрола не нужно. Если попап просто закрывается, не открывая другой попап, то убирать блок скрола нужно.
function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		//Убираем у активного попапа класс опен, чтобы его закрыть
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyUnlock() {
	//Высчитываем разницу ширин окна браузера и контенрта. Ширина браузера включая скрол минус ширина контента = ширина скрола
	const lockPadding = window.innertWidth - document.querySelector('wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for(let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	//Добавляем паддинг справа для боди, чтоб не было сдвига контента при убирании скролбара
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');
	
	//Анлок будет фолс в течении времени указанного в переменной timeout. Это нужно, чтобы в момент закрытия попапа нельзя было повторно нажать на ссылку попапа и открыть его до того, как наш попап ещё не успел закрыться
	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

//В этой функции возвращается скрол для боди и убираются присвоенные ранее падинги. Но делается это по таймауту, только после того, как попап закроется до конца
function bldyUnlock() {
	//Таймаутим, чтобы скрол появлялся не так резко, а только при полном завершении закрытия попапа
	setTimeout(function() {
		if (lockPadding.length ) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el. = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
	
	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

//Закрытие попапа по ESC
document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	} 
});



//Кроссбраузерность
(function() {
	//проверяем поддержку
	if (!Element.prototype.closest) {
		//реализуем
		Element.prototype.closest = function(css) {
			var node = this;
			while(node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		}
	}
})();

(function() {
	//проверяем поддержку
	if (!Element.prototype.matches) {
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitmatchesSelector ||
		Element.prototype.mozmatchesSelector ||
		Element.prototype.msmatchesSelector;
	}
})();

