//find form
const formFirstF = document.forms.firstF;

//firstName
const firstNameJs = formFirstF.elements.firstName;
const firstNameJsValue = firstNameJs.value;
firstNameJs.addEventListener('blur', (eo) => firstNameBlur(false));
function firstNameBlur(focusError) {
  const formFirstF = document.forms.firstF;
  const firstNameJs = formFirstF.elements.firstName;
  const firstNameJsValue = firstNameJs.value;
  const NameFail = document.getElementById('NameFail')
  let errors = 0;
  if ((firstNameJsValue.length > 40) || (firstNameJsValue.length < 2)) {
    NameFail.innerHTML = 'Укажите Ваше имя (от 2-х символов)';
    errors++;
    if (focusError)
      firstNameJs.focus();
  }
  else {
    NameFail.innerHTML = '';
  }
  return errors;
}

//email
const emailName = formFirstF.elements.email;
const emailValue = emailName.value;
emailName.addEventListener('blur', (eo) => emailBlur(false));
function emailBlur(focusError) {
  const formFirstF = document.forms.firstF;
  const emailName = formFirstF.elements.email;
  const emValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const EmailFail = document.getElementById('EmailFail')
  let errors = 0;
  if (!(isEmailValid(emailName.value))) {
    EmailFail.innerHTML = 'Укажите Ваш e-mail';
    errors++;
    if (focusError)
      emailName.focus();
  }
  else {
    EmailFail.innerHTML = '';
  }
  function isEmailValid(value) {
    return emValid.test(value);
  }
  return errors;
}

//Textarea
const bigTextName = formFirstF.elements.bigText;
const bigTextValue = bigTextName.value;
bigTextName.addEventListener('blur', (eo) => bigTextBlur(false));
function bigTextBlur(focusError) {
  const formFirstF = document.forms.firstF;
  const bigTextName = formFirstF.elements.bigText;
  const bigTextValue = bigTextName.value;
  const TextareaFail = document.getElementById('TextareaFail');
  let errors = 0;
  if ((bigTextValue.length > 5000) || (bigTextValue.length < 10)) {
    TextareaFail.innerHTML = 'Укажите Ваше сообщение (от 10 символов)';
    errors++;
    if (focusError)
      bigTextName.focus();
  }
  else {
    TextareaFail.innerHTML = '';
  }
  return errors;
}


//submit
formFirstF.addEventListener('submit', validateFirstF, false);

function validateFirstF(eo) {
  eo = eo || window.event;
  let errorsAll = 0;
  errorsAll += firstNameBlur(!errorsAll);
  errorsAll += emailBlur(!errorsAll);
  errorsAll += bigTextBlur(!errorsAll);
  if (errorsAll) {
    eo.preventDefault();
  }
  if (!errorsAll) {
    const formFirstF = document.forms.firstF;
    ajaxForm();
    let firstNameClear = formFirstF.elements.firstName;
    firstNameClear.value = '';
    let emailNameClear = formFirstF.elements.email;
    emailNameClear.value = '';
    let bigTextClear = formFirstF.elements.bigText;
    bigTextClear.value = '';
    eo.preventDefault();
  }
}

function ajaxForm() {

  const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  var nameEr = 'ERMOLOVICH_T5';

  const firstNameJsValue = firstNameJs.value;
  const emailValue = emailName.value;
  const bigTextValue = bigTextName.value;

  let password;
  let resultEr;

  password = Math.random();
  $.ajax({
    url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
    data: { f: 'LOCKGET', n: nameEr, p: password },
    success: resultFunc, error: errorHandler
  }
  );

  function resultFunc(resultFull) {
    resultEr = [];
    resultEr = JSON.parse(resultFull.result)
    resultEr.push({
      firstName: firstNameJsValue, email: emailValue,
      message: bigTextValue
    })
    $.ajax({
      url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'UPDATE', n: nameEr, v: JSON.stringify(resultEr), p: password },
      success: update_resultReady, error: errorHandler
    }
    );
  }
  function update_resultReady(ready) {
    console.log(ready.result)
  }

  function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
  }
}