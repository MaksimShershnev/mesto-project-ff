(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"2f4cbd38-3be1-44cb-bef2-5713f6020638"}},t=function(t,o,r){var c={method:t,headers:e.headers};return r&&(c.body=JSON.stringify(r),c.headers["Content-Type"]="application/json"),fetch("".concat(e.baseUrl).concat(o),c).then(n)},n=function(e){return e.ok?e.json():Promise.reject("Ошибка при получении данных с сервера. Ошибка ".concat(e.status))},o=t("GET","/users/me"),r=t("GET","/cards"),c=function(e,n){return t(n,"/cards/likes/".concat(e))},u=function(e){return fetch("https://corsproxy.org/?".concat(e),{method:"HEAD"}).then((function(e){return e.ok?e.headers.get("Content-Type").startsWith("image"):Promise.reject("Ссылка на изображение недействительна. Ошибка ".concat(e.status))}))},i=document.querySelector(".popup-error"),a=i.querySelector(".popup-error__description");function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d),document.addEventListener("mousedown",p)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),document.removeEventListener("mousedown",p)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e){e.target.classList.contains("popup_is-opened")&&s(e.target)}function f(e){a.textContent=e,setTimeout((function(){return i.classList.add("popup-error_is-opened")}),400),setTimeout((function(){return i.classList.remove("popup-error_is-opened")}),4e3)}var m,_,v,y=document.querySelector("#card-template").content,h=document.querySelector(".places__list"),S=document.querySelector(".popup_type_сonfirm-delete");function b(e,t){return e.likes.some((function(e){return e._id===t}))}function g(e,t,n,o){switch(b(t,o)){case!0:c(t._id,"DELETE").then((function(o){var r=o.likes;e.target.classList.remove("card__like-button_is-active"),t.likes=r,n.textContent=r.length})).catch((function(e){return console.log(e)}));break;case!1:c(t._id,"PUT").then((function(o){var r=o.likes;e.target.classList.add("card__like-button_is-active"),t.likes=r,n.textContent=r.length})).catch((function(e){f(e),console.log(e)}))}}function E(e,t,n,o){var r=function(e,t,n,o){var r=y.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),u=r.querySelector(".card__title"),i=r.querySelector(".card__like-button"),a=r.querySelector(".card__like-count"),s=r.querySelector(".card__delete-button");return c.src=e.link,c.alt=e.name,u.textContent=e.name,a.textContent=e.likes.length,b(e,o)&&i.classList.add("card__like-button_is-active"),function(e,t,n){if(e===n)return t.classList.add("card__delete-button_active"),!0}(e.owner._id,s,o)&&s.addEventListener("click",(function(t){m=e._id,_=t.target.closest(".card"),l(S)})),i.addEventListener("click",(function(n){t(n,e,a,o)})),c.addEventListener("click",n),r}(e,g,t,n);"start"===o?h.prepend(r):h.append(r)}function q(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){L(t,e,n),k(t,e,n)})),C(t,n,o)}function L(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?k(e,t,n):function(e,t,n,o){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),r.classList.add(e.errorClass),r.textContent=o}(e,t,n,n.validationMessage)}function k(e,t,n){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass),o.textContent=""}function C(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}S.querySelector(".popup__button").addEventListener("click",(function(){var e;(e=m,t("DELETE","/cards/".concat(e))).then((function(){_.remove(),s(S)})).catch((function(e){f(e),console.log(e)}))}));var A,T=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),j=document.querySelector(".popup_type_edit"),D=document.querySelector(".popup_type_new-card"),P=document.querySelector(".popup_type_image"),B=document.querySelector(".popup_type_edit-avatar"),O=P.querySelector(".popup__image"),M=P.querySelector(".popup__caption"),U=document.querySelectorAll(".popup__close"),H=document.forms["edit-profile"],I=document.querySelector(".profile__image"),G=document.querySelector(".profile__title"),N=document.querySelector(".profile__description"),V=H.elements.name,z=H.elements.description,J=document.forms["new-place"],W=J.elements["place-name"],$=J.elements.link,F=document.forms["edit-avatar"],K=F.elements.link,Q=F.querySelector(".popup__button"),R=H.querySelector(".popup__button"),X=J.querySelector(".popup__button"),Y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function Z(e,t){G.textContent=e,N.textContent=t}function ee(e){I.style["background-image"]='url("'.concat(e,'")')}function te(e){O.src=e.target.src,O.alt=e.target.alt,M.textContent=e.target.alt,l(P)}function ne(e){"Сохранение..."===e.textContent?setTimeout((function(){e.textContent="Сохранить"}),500):e.textContent="Сохранение..."}I.addEventListener("click",(function(){F.reset(),q(F,Y),l(B)})),T.addEventListener("click",(function(){V.value=G.textContent,z.value=N.textContent,q(H,Y),l(j)})),w.addEventListener("click",(function(){J.reset(),q(J,Y),l(D)})),U.forEach((function(e){e.addEventListener("click",(function(e){s(e.target.closest(".popup"))}))})),H.addEventListener("submit",(function(e){var n,o;e.preventDefault(),ne(R),(n=V.value,o=z.value,t("PATCH","/users/me",{name:n,about:o})).then((function(e){Z(e.name,e.about),s(j),ne(R)})).catch((function(e){ne(R),f(e),console.log(e)}))})),J.addEventListener("submit",(function(e){e.preventDefault(),ne(X),u($.value).then((function(){var e,n;(e=W.value,n=$.value,t("POST","/cards",{name:e,link:n})).then((function(e){E(e,te,v,"start"),s(D),ne(X),J.reset()})).catch((function(e){ne(X),f(e),console.log(e)}))})).catch((function(e){ne(X),f(e),console.log(e)}))})),F.addEventListener("submit",(function(e){e.preventDefault(),ne(Q),u(K.value).then((function(){var e;(e=K.value,t("PATCH","/users/me/avatar",{avatar:e})).then((function(e){ee(e.avatar),s(B),ne(Q),F.reset()})).catch((function(e){ne(Q),f(e),console.log(e)}))})).catch((function(e){ne(Q),f(e),console.log(e)}))})),(A=[o,r],Promise.all(A)).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);a=!0);}catch(e){l=!0,r=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];v=r._id,Z(r.name,r.about),ee(r.avatar),function(e){e.forEach((function(e){E(e,te,v)}))}(c)})).catch((function(e){f(e),console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);C(e,n,o),n.forEach((function(r){r.addEventListener("input",(function(){L(e,t,r),C(e,n,o)}))}))}(e,t)}))}(Y)})();