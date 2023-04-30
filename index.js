let Name ;
let photo ;
let commentOld = document.querySelector('#comment_old');
let commentsAmount = document.querySelector('.comments_amount');
let commentWindow ;


// ____________________________________________________________вывод инфы авторизованного пользователя

function getUser(){
  Name = document.querySelector('.form_text');
  photo = document.querySelector('.photo');
       const cardBlockName = `<div class="all_name"><h3 class="name">${getCurrentUser().name}</h3><div id="answer_to"></div></div>`;
      const cardBlockPhoto = `<img src="${getCurrentUser().src}" class="photo_avatar" alt="avatar">`;

    Name.innerHTML = cardBlockName;
    photo.innerHTML = cardBlockPhoto;
}


// _______________________________________________________________подсчет кол-ка символов в поле ввода



function countLetters() {
  const txt = document.getElementById('comment-body').value;
  let textLenght = txt.length;
  document.getElementById('max').innerText = `${textLenght}/1000`;
  document.querySelector('.btn').classList.add('active');
 
  if(textLenght > 1000){
    document.getElementById('error_max').innerText = `Слишком длинное сообщение`;
    document.querySelector('.btn').classList.remove('active');
    const count = document.getElementById('max');
    count.style.setProperty("color", "#FF0000"); 
    count.style.setProperty("opacity", "1");
  } else {
    document.getElementById('error_max').innerText = ``;
    document.querySelector('.btn').classList.add('active');
    const count = document.getElementById('max');
    count.style.setProperty("color", "#000000"); 
    count.style.setProperty("opacity", "0.4");
  }
 
}


// _________________________________________________________________mock данные

let comment_old = [{
  id: 123,
  parrentId: 0,
  user: {
          name : 'Алексей_1994b',
          src : '/PJ-03/img/Алексей_1994b.png',
        },
 
  body : "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
  date : Math.floor(Date.now() / 1000),
  rating: 0,
  childComments: [],

},
{
  id: 124,
  parrentId: 123,
  user: {
          name : 'Джунбокс3000',
          src : '/PJ-03/img/Джунбокс3000.png',
        },
 
  body : "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
  date : Math.floor(Date.now() / 1000),
  rating: 0,
  childComments: [],

}];




let currentUser = {
  name : 'Вася',
  src : '/PJ-03/img/6498_animal_cobra_snake_icon.png',
  favorites: [],
};



document.addEventListener("DOMContentLoaded", getUser);
document.addEventListener("DOMContentLoaded", loadComments);



function getCurrentUser(){
  // console.log(currentUser);
  if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', JSON.stringify(currentUser));
  if (localStorage.getItem('currentUser')) return  JSON.parse(localStorage.getItem('currentUser'));
  
}

function updateCurrentUser(favorites){
 let user = JSON.parse(localStorage.getItem('currentUser'));
 user.favorites = favorites;
 localStorage.removeItem('currentUser');
 localStorage.setItem('currentUser', JSON.stringify(user));
}


// ___________________________________________________________________получение данных из текстовго поля



let comments = [];


document.getElementById('comment-add').onclick = Event => {
  Event.preventDefault();
  
  let idParrent = Event.target.dataset.parid;
  
  let commentBody = document.getElementById('comment-body');

  let comment = {
    id: Math.floor(Math.random() * 1000) + 1,
    parrentId: idParrent != undefined ? idParrent : 0,
    body : commentBody.value,
    date : Math.floor(Date.now() / 1000),
    user: getCurrentUser(),
    rating: 0,
    childComments: [],
    

  }
  commentBody.value = '';
// console.log(addFav);

  saveComments(comment);
  loadComments();
}


// ________________________________________________________кнопка избранное

function addFavorite (id){
 
 
  let favorites = getCurrentUser().favorites;
  if(favorites.includes(id)){
    let favoritesTemp = [];

    favorites.forEach(item =>{
     
      if(item != id){
        favoritesTemp.push(id);
      }
    }); 
    favorites = favoritesTemp;
  } else {
    console.log("test")

    favorites.push(id);

  } 
  // console.log(getCurrentUser().favorites)

  updateCurrentUser(favorites);
  // console.log(getCurrentUser())

}

 
// ________________________________________________________кнопка ответ



document.onclick = Event => {
  console.log(Event)
  if (Event.target.classList.value == 'answer'){
  
    showDivInputComment(Event.target.dataset.id, Event.target.dataset.name);
  };
  if (Event.target.classList.value == 'user_fav'){
    addFavorite(Event.target.dataset.id);
  };
  if (Event.target.classList.value == 'all_fav'){
  
    showFavorites();
  };
};


const btnSend = document.getElementById('comment-add');

function removeElement(){
  delete btnSend.dataset.parid;
  document.getElementById('nameWho').remove();
  

};

function showDivInputComment (id, parName){

  const answerTo = document.getElementById('answer_to');
 
  const answerNane = `<div id="nameWho"><h4 class="answer_for">${parName}</h4><button id="deleteName" class="not_answer" > X </button></div>`;

 answerTo.innerHTML = answerNane;

 btnSend.dataset.parid = `${id}`;
 document.getElementById('deleteName').onclick = removeElement;


};



// ______________________________________________________________сохраняем в localStorage

function saveComments(comment){
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  comments.push(comment);
 
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
  if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify(comment_old));
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  // console.log(comments);
let commentsAll = '';

parseCommentList(comments).forEach(element => {

  
  
    document.querySelector('.old_comment').classList.add('active');
    console.log(getCurrentUser().favorites);
    let buttonFav = getCurrentUser().favorites.includes(String(element.id))
    ? ` <button id="add_fav" class="user_fav user_fav_in" data-id="${element.id}" ">
                В избранном
        </button>`
    : ` <button id="add_fav"  class="user_fav" data-id="${element.id}" >
              В избранное
        </button>`;

      const commentField = `
      <div id="comment-field">
        <img src="${element.user.src}" class="photo_avatar photo_user" alt="avatar">
          <div class="user_info">
            <h3 class="name name_user">${element.user.name}</h3>
            <p class="time-comment">${timeConverter(element.date)}</p>
            <div class="text-comment">${element.body}</div>
          </div>
      </div>
      
      <div class="user_actions">
        <a href="#answer_to" class="answer" id="answer-add" data-id="${element.id}" data-name="${element.user.name}">
            Ответить
        </a>
       ${buttonFav}
        <div class="rating">
            <button class="minus"> <img src="/PJ-03/img/btn_minuse.svg" alt="minus"> </button>
            <span class="com_rating">0</span>
            <button class="pluse"> <img src="/PJ-03/img/btn_pluse.svg" alt="pluse"> </button>
        </div>
      </div>`;
      
// _____________________________________________________добавление ответа

      let childComment = '';
     
      element.childComments.forEach(answer => {
        let buttonFavChild = getCurrentUser().favorites.includes(String(answer.id))
        ? ` <button class="user_fav user_fav_in" data-id="${answer.id}">
                  В избранном
            </button>`
        : ` <button class="user_fav" data-id="${answer.id}">
              В избранное
            </button>`;
        const answerField = `
        <div class="answer_comment">
                                <div id="answer-field comment-field" class="answer_comment_info">
                                <img src="${answer.user.src}" class="photo_avatar photo_user" alt="avatar">
                                <div class="user_info">
                                  <h3 class="name name_user">${answer.user.name}</h3>
                                  <h4 class="answer_for">${element.user.name}</h4>
                                  <p class="time-comment">${timeConverter(answer.date)}</p>
                                  <div class="text-comment">${answer.body}</div>
                                </div>
                                </div>
                                <div class="user_actions user_actions_answer">
                                    ${buttonFavChild}
                                    <div class="rating">
                                        <button class="minus"> <img src="/PJ-03/img/btn_minuse.svg" alt="minus"> </button>
                                        <span class="com_rating">0</span>
                                        <button class="pluse"> <img src="/PJ-03/img/btn_pluse.svg" alt="pluse"> </button>
                                    </div>
                                </div>
                            </div> `;
                            childComment += answerField;
                            
                           
      });
  commentsAll += commentField + childComment;
  

 
});




commentOld.innerHTML = commentsAll;






// ________________________________________________________кол-во комментариев

      const allCom = `(${comments.length})`;

      commentsAmount.innerHTML = allCom;

 
}

//___ __________________________________________________________ответ


function parseCommentList(comments){

  let mainComments = [];
  let childComments = [];
  
  comments.forEach(element => {
    if (element.parrentId != 0){
      childComments.push(element)
    } else { 
      mainComments.push(element)

    }
  });

  mainComments.forEach(element => {
    let comment = element;
    childComments.forEach(childElement => {
      if(childElement.parrentId == element.id){
        comment.childComments.push(childElement);
      }
    })
  })
  // console.log(mainComments);
return mainComments;
}

//____________________________________________________________ добавление в избранное




// ____________________________________________________________вывод избранного
// document.querySelector('.all_fav').onclick = Event  => {
    
//     showFavorites();
   
// };

function showFavorites(){

  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));

let commentsAll = '';

comments
  .filter(element => getCurrentUser().favorites.includes(String(element.id)))
  
  .forEach(element => {
 
    // document.querySelector('.old_comment').classList.add('active');
      const commentField = `
      <div id="comment-field">
        <img src="${element.user.src}" class="photo_avatar photo_user" alt="avatar">
          <div class="user_info">
            <h3 class="name name_user">${element.user.name}</h3>
            <p class="time-comment">${timeConverter(element.date)}</p>
            <div class="text-comment">${element.body}</div>
          </div>
      </div>
      
      <div class="user_actions">
        <a href="#comment-body" class="answer" id="answer-add" data-id="${element.id}" data-name="${element.user.name}">
            Ответить
        </a>
        <button id="add_fav"  class="user_fav user_fav_in" data-id="${element.id}" >
        В избранном
    </button>
        <div class="rating">
            <button class="minus"> <img src="/PJ-03/img/btn_minuse.svg" alt="minus"> </button>
            <span class="com_rating">0</span>
            <button class="pluse"> <img src="/PJ-03/img/btn_pluse.svg" alt="pluse"> </button>
        </div>
      </div>`;
      
  commentsAll += commentField;
  commentOld.innerHTML = commentsAll;
 
});

 
}




// _____________________________________________________________ф-ция преобразования времени


  function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + '.' + month + ' ' + hour + ':' + min ;
    return time;
  }

 
 //_____________________________________________________________ выпадающий список

 class ItcCustomSelect {
  static EL = 'itc-select';
  static EL_SHOW = 'itc-select_show';
  static EL_OPTION = 'itc-select__option';
  static EL_OPTION_SELECTED = 'itc-select__option_selected';
  static DATA = '[data-select]';
  static DATA_TOGGLE = '[data-select="toggle"]';

  static template(params) {
    const { name, options, targetValue } = params;
    const items = [];
    let selectedIndex = -1;
    let selectedValue = '';
    let selectedContent = 'Выберите из списка';
    options.forEach((option, index) => {
      let selectedClass = '';
      if (option[0] === targetValue) {
        selectedClass = ` ${this.EL_OPTION_SELECTED}`;
        selectedIndex = index;
        selectedValue = option[0];
        selectedContent = option[1];
      }
      items.push(`<li class="itc-select__option${selectedClass}" data-select="option"
        data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
    });
    return `<button type="button" class="itc-select__toggle" name="${name}"
      value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
      ${selectedContent}</button><div class="itc-select__dropdown">
      <ul class="itc-select__options">${items.join('')}</ul></div>`;
  }

  static hideOpenSelect() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`.${this.EL}`)) {
        const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
        elsActive.forEach((el) => {
          el.classList.remove(this.EL_SHOW);
        });
      }
    });
  }
  static create(target, params) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    if (this._el) {
      return new this(target, params);
    }
    return null;
  }
  constructor(target, params) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);
    if (this._params.options) {
      this._el.innerHTML = this.constructor.template(this._params);
      this._el.classList.add(this.constructor.EL);
    }
    this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
    this._el.addEventListener('click', this._onClickFn);
  }

  _onClick(e) {
    const { target } = e;
    const type = target.closest(this.constructor.DATA).dataset.select;
    if (type === 'toggle') {
      this.toggle();
    } else if (type === 'option') {
      this._changeValue(target);
    }
  }

  _updateOption(el) {
    const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
    const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
    if (elOptionSel) {
      elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
    }
    elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
    this._elToggle.textContent = elOption.textContent;
    this._elToggle.value = elOption.dataset.value;
    this._elToggle.dataset.index = elOption.dataset.index;
    this._el.dispatchEvent(new CustomEvent('itc.select.change'));
    this._params.onSelected ? this._params.onSelected(this, elOption) : null;
    return elOption.dataset.value;
  }

  _reset() {
    const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
    if (selected) {
      selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
    }
    this._elToggle.textContent = 'Выберите из списка';
    this._elToggle.value = '';
    this._elToggle.dataset.index = '-1';
    this._el.dispatchEvent(new CustomEvent('itc.select.change'));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return '';
  }

  _changeValue(el) {
    if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
      return;
    }
    this._updateOption(el);
    this.hide();
  }

  show() {
    document.querySelectorAll(this.constructor.EL_SHOW)
      .forEach((el) => {
        el.classList.remove(this.constructor.EL_SHOW);
      });
    this._el.classList.add(`${this.constructor.EL_SHOW}`);
  }

  hide() {
    this._el.classList.remove(this.constructor.EL_SHOW);
  }

  toggle() {
    this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
  }

  dispose() {
    this._el.removeEventListener('click', this._onClickFn);
  }

  get value() {
    return this._elToggle.value;
  }

  set value(value) {
    let isExists = false;
    this._el.querySelectorAll('.select__option')
      .forEach((option) => {
        if (option.dataset.value === value) {
          isExists = true;
          this._updateOption(option);
        }
      });
    if (!isExists) {
      this._reset();
    }
  }

  get selectedIndex() {
    return this._elToggle.dataset.index;
  }

  set selectedIndex(index) {
    const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
    if (option) {
      this._updateOption(option);
    }
    this._reset();
  }
}
const select1 = new ItcCustomSelect('#select-1');
ItcCustomSelect.hideOpenSelect();


