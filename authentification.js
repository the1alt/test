


// une fois css et html chargés
// 1ère ligne à écrire pour identifier du JQuery
$(document).ready(function(){

  $('form #btn').click(function(){
    var emailInput = $('input#email').val();
    var regEmail = /^[a-z0-9\-\.\_]+\@[a-z]+(.com|.fr|.net)$/g;
    var regPassword = /^[0-9a-z\@\-\_]{6,20}$/ig;

    if(emailInput.length < 3){
      $('input#email').css('border', '1px solid red');

    }else if (regEmail.test(emailInput) === false) {
      $('input#email').css('border', '1px solid orange');

    }else{
      $('input#email').css('border', '1px solid green');
    }

    var passwordInput = $('input#password').val();
    console.log(passwordInput);

    if(passwordInput.length < 6){
      $('input#password').css('border', '1px solid red');
    }
    else if (regPassword.test(passwordInput) === false || passwordInput == emailInput) {
      $('input#password').css('border', '1px solid orange');


    }else{
      $('input#password').css('border', '1px solid green');
    }
  });






});   //fermeture de JQuery
