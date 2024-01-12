(()=>{"use strict";var e="4d4af040351ef3fedcc56ba9",t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"2f4cbd38-3be1-44cb-bef2-5713f6020638","Content-Type":"application/json"}},n=fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка загрузки данных пользователя. Ошибка ".concat(e.status))})),r=fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка загрузки карточек. Ошибка ".concat(e.status))})),o=function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?"Успешное удаление":Promise.reject("Ошибка при удалении карточки с сервера. Ошибка ".concat(e.status))}))},c=function(e,n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:n,headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка при обработке лайка карточки. Ошибка ".concat(e.status))}))},a=document.querySelector("#card-template").content,i=document.querySelector(".places__list");function u(e,t){return e.likes.some((function(e){return e._id===t}))}function s(e,t,n,r){var o=function(e,t,n,r,o){var c=a.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),s=c.querySelector(".card__title"),l=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count"),f=c.querySelector(".card__delete-button");return i.src=e.link,i.alt=e.name,s.textContent=e.name,d.textContent=e.likes.length,u(e,o)&&l.classList.add("card__like-button_is-active"),function(e,t,n){return e!==n&&t.classList.add("card__delete-button_inactive"),!0}(e.owner._id,f,o)&&f.addEventListener("click",(function(t){n(t,e._id)})),l.addEventListener("click",(function(n){t(n,e,d,o)})),i.addEventListener("click",r),c}(e,d,l,t,n);"start"===r?i.prepend(o):i.append(o)}function l(e,t){o(t).then((function(){return e.target.closest(".card").remove()})).catch((function(e){return console.log(e)}))}function d(e,t,n,r){switch(u(t,r)){case!0:c(t._id,"DELETE").then((function(r){var o=r.likes;e.target.classList.remove("card__like-button_is-active"),t.likes=o,n.textContent=o.length})).catch((function(e){return console.log(e)}));break;case!1:c(t._id,"PUT").then((function(r){var o=r.likes;e.target.classList.add("card__like-button_is-active"),t.likes=o,n.textContent=o.length})).catch((function(e){return console.log(e)}))}}function f(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",m),document.addEventListener("mousedown",v)}function p(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",m),document.removeEventListener("mousedown",v)}function m(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))}function v(e){e.target.classList.contains("popup_is-opened")&&p(e.target)}function _(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){h(t,e,n),y(t,e,n)})),b(t,n,r)}function h(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?y(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.classList.add(e.errorClass),o.textContent=r}(e,t,n,n.validationMessage)}function y(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""}function b(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g,k=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),j=document.querySelector(".popup_type_edit-avatar"),A=C.querySelector(".popup__image"),w=C.querySelector(".popup__caption"),x=document.querySelectorAll(".popup__close"),P=document.forms["edit-profile"],U=document.querySelector(".profile__image"),O=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),B=P.elements.name,D=P.elements.description,M=document.forms["new-place"],N=M.elements["place-name"],I=M.elements.link,J=document.forms["edit-avatar"],H=J.elements.link,V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},z=function(e,t){O.textContent=e,T.textContent=t},$=function(e){U.style["background-image"]='url("'.concat(e,'")')};function F(e){A.src=e.target.src,A.alt=e.target.alt,w.textContent=e.target.alt,f(C)}U.addEventListener("click",(function(){H.value="",_(J,V),f(j)})),k.addEventListener("click",(function(){B.value=O.textContent,D.value=T.textContent,_(P,V),f(L)})),E.addEventListener("click",(function(){N.value="",I.value="",_(M,V),f(q)})),x.forEach((function(e){e.addEventListener("click",(function(e){p(e.target.closest(".popup"))}))})),P.addEventListener("submit",(function(e){var n,r;e.preventDefault(),(n=B.value,r=D.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления данных профиля на сервере. Ошибка ".concat(e.status))}))).then((function(e){z(e.name,e.about),p(L)})).catch((function(e){return console.log(e)}))})),M.addEventListener("submit",(function(n){var r,o;n.preventDefault(),(r=N.value,o=I.value,fetch("".concat(t.baseUrl,"/cards "),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка при добавлении карточки на сервер. Ошибка ".concat(e.status))}))).then((function(t){s(t,F,e,"start"),p(q),M.reset()})).catch((function(e){return console.log(e)}))})),J.addEventListener("submit",(function(e){var n;e.preventDefault(),(n=H.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка при смене аватара. Ошибка ".concat(e.status))}))).then((function(e){var t=e.avatar;$(t),p(j),J.reset()})).catch((function(e){return console.log(e)}))})),(g=[n,r],Promise.all(g)).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];z(c.name,c.about),$(c.avatar),function(t){t.forEach((function(t){s(t,F,e)}))}(a)})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);b(e,n,r),n.forEach((function(o){o.addEventListener("input",(function(){h(e,t,o),b(e,n,r)}))}))}(e,t)}))}(V)})();