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
  
};


document.addEventListener("DOMContentLoaded", getUser);
document.addEventListener("DOMContentLoaded", loadComments);


function getCurrentUser(){
  return currentUser;
}


// ___________________________________________________________________получение данных из текстовго поля



let comments = [];


document.getElementById('comment-add').onclick = Event => {
  Event.preventDefault();
  
  let idParrent = Event.target.dataset.parid;
  
  let commentBody = document.getElementById('comment-body');

  let comment = {
    id: Math.floor(Math.random() * 1000) + 1,
    parrentId: idParrent,
    body : commentBody.value,
    date : Math.floor(Date.now() / 1000),
    user: getCurrentUser(),
    rating: 0,
    childComments: [],
    

  }
  commentBody.value = '';
  

  saveComments(comment);
  loadComments();
}

// ________________________________________________________кнопка ответ



document.onclick = Event => {
  
  if (Event.target.classList.value == 'answer'){
  
    showDivInputComment(Event.target.dataset.id, Event.target.dataset.name);
   

  };
};

function showDivInputComment (id, parName){

  const answerTo = document.getElementById('answer_to');

  const answerNane = `<h4 class="answer_for">${parName}</h4><button class="not_answer">&#9587</button>`;

 answerTo.innerHTML = answerNane;

 const btnSend = document.getElementById('comment-add');
 btnSend.dataset.parid = `${id}`;

 document.onclick = Event => {
  
  if (Event.target.classList.value == 'not_answer'){
  
    delete btnSend.dataset.parid;

  };

 
};
}


// ______________________________________________________________сохраняем в localStorage

function saveComments(comment){
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  comments.push(comment);
 
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
  if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify(comment_old));
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));

let commentsAll = '';
parseCommentList(comments).forEach(element => {
    document.querySelector('.old_comment').classList.add('active');
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
        <button class="user_fav">
            <div class="user_fav_not">
                <img src="/PJ-03/img/in_fav.svg" class="fav_arrow">
                <span class="user_fav_name">В избранное</span>
            </div>
            <div class="user_fav_in">
                <img src="/PJ-03/img/in_heart.svg" class="fav_arrow">
                <span class="user_fav_name">В избранном</span>
            </div>
        </button>
        <div class="rating">
            <button class="minus"> <img src="/PJ-03/img/btn_minuse.svg" alt="minus"> </button>
            <span class="com_rating">0</span>
            <button class="pluse"> <img src="/PJ-03/img/btn_pluse.svg" alt="pluse"> </button>
        </div>
      </div>`;
      
// _____________________________________________________добавление ответа
      let childComment = '';
      element.childComments.forEach(answer => {
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
                                    <button class="user_fav">
                                        <span class="user_fav_not">
                                            <img src="/PJ-03/img/in_fav.svg" class="fav_arrow">
                                            <span class="user_fav_name">В избранное</span>
                                        </span>
                                        <span class="user_fav_in">
                                            <img src="/PJ-03/img/in_heart.svg" class="fav_arrow">
                                            <span class="user_fav_name">В избранном</span>
                                        </span>
                                    </button>
                                    <div class="rating">
                                        <button class="minus"> <img src="/PJ-03/img/btn_minuse.svg" alt="minus"> </button>
                                        <span class="com_rating">0</span>
                                        <button class="pluse"> <img src="/PJ-03/img/btn_pluse.svg" alt="pluse"> </button>
                                    </div>
                                </div>
                            </div> `;
        b += answerField;
      });
  commentsAll += commentField + childComment;
});

// ________________________________________________________кол-во комментариев
commentOld.innerHTML = a;

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
return mainComments;
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