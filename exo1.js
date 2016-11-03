/**
* Crée un formulaire d'Inscription Utilisateur
*
*/
/*
	1/
  Création de formulaire de création de compte utilisateur avec verifications.
  Quand le champs n'est pas correcte mettre une bordure orange dans le champs
  sinon mettre une bordure grise

  * + Nom (minimum 2 caractères alphas avec tiret compris)
  * + Prénom (minimum 3 caractères alphas avec tiret et espace compris)
  * + Age (Nombre entier compris entre 18 et 99)
  * + Ville (minimum 3 caractères alphas avec tiret compris)
  * + Email (Format Valide et Obligatoire)
  * + Mot de passe (Minimum 8 caractères alpha ou numérque avec @, #, _ et - compris)
  * + Confirmer le mot de passe
  * + Boutton "Créer son compte"

  La validation se fera au clique du bouton "Créer son compte"

   2/ Vérifier quand je tape la confirmation du mot de passe (keyup()) qu'il soit à l'identique du mot de passe
   3/ Ajouter un champs Code Postal, vérifier qu'il ne sont pas vide et qu'il y ait 5 caractères numérique
   4/ Quand je quitte le champs Code Postal (blur()),
   si le code postal appartient à Lyon, Paris ou Marseille cela me complete le champs ville (val())
   5/ Ajouter le champs Avatar dans le formulaire et verifier quand il saisie une url de photo
   que se soit bien une image distante et provenant de FB ou Twitter
   6/ Ajouter un champs zone de saisie (textarea) "Biographie" et vérifier qu'il y ait au moins 10 mots
   		et que des caractères alphas avec espace compros
   7/ Ajouter un compteur de caractères (comme Twitter) en dessous de la zone de saisie
      ce compteur se mettre a jour au fur et à mesure que je tape des caractères
   8/ Ajouter un bouton "+" et un bouton "-" a coté de la biographie permettant de grossir ou degrossir la police de la description
   9/ Ajouter une checkbox "J'ai lu les Conditions Générales d'Utilisations"
  et verifié quand je clique sur mon boutton "Créer son compte" que la case soit bien coché, $
  sinon mettre en rouge le label de la checkbox
  10/ Ajouter une checkbox qui permet de révéler le mot de passe saisi au clique

  Bonus: Ajouter une classe has-error quand le champs email comporte une erreur
  ou has-success quand le champs n'a pas d'erreur

  Bonus 2: Ajouter 5 boutons checkbox pour le choix de Sport Favoris
  et une case Autre. Puis vérifier que l'utilisateur lors de la soumission du formulaire
  a au moins coché une case. Quand je clique sur Autre: un champs texte apparait en dessous
  permettant de saisir un autre sport.

  Bonus 3: Ajouter une progressBar Bootsrapp http://getbootstrap.com/components/#progress
  en fonction de la longeur du mot de passe et s'il comporte une lettre, un chiffre, un caractère spécial

  Bonus4: Quand le mot de passe n'est pas le même en confirmation,
  ajouter la classe "shake" en animation avec la librairie animate.css

*/


$(document).ready(function(){


var regex = {

  nom : /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\_]{2,}$/i,
  prenom : /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\_\ ]{3,}$/i,
  age : /^[0-9]{2}$/,
  ville : /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\_]{3,}$/i,
  email : /^[a-z0-9\-\.\_]+\@[a-z]+(.com|.fr|.net)$/,
  password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
  progress : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{1,}$/,
  codePostal : /^[0-9]{5}$/,
  avatar : /^(https?:\/\/)[a-z0-9\-\.\/\_]+(fbcdn.net|twimg.com)[a-z0-9\-\.\/\_]+(.jpg)$/i,
  textarea : /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\ ]+$/i,
  lyon : /^((690)[0-9]{2})$/,
  paris : /^((750)[0-2][0-9])|(75116)$/,
  marseille: /^((130)[0-9]{2})$/

};

function error (id){
  $(id).parent().parent().removeClass("has-success").addClass("has-error");
}

function success (id){
  $(id).parent().parent().removeClass("has-error").addClass("has-success");
}

function check (id, reg){
  if(reg.test($(id).val()) === false){
    error(id);
  }else{
    success(id);
  }
  testButton(); console.log($('form .has').length,$('form .has-success').length);
}


  $('input#nom').keyup(function(){
check('input#nom', regex.nom);
  });

  $('input#prenom').keyup(function(){
check('input#prenom', regex.prenom);
  });

  $('input#age').keyup(function(){
check('input#age', regex.age);
  });

  $('input#codePostal').keyup(function(){
check('input#codePostal', regex.codePostal);
  });

  $('input#ville').keyup(function(){
check('input#ville', regex.ville);
  });

  $('input#avatar').keyup(function(){
check('input#avatar', regex.avatar);
  });

  $('input#email').keyup(function(){
check('input#email', regex.email);
  });

  $('input#password').keyup(function(){
check('input#password', regex.password);
  });

  if($('input#cgu').is(":checked")){
    console.log($('input#cgu').is(":checked"));
    $('#cgudiv').removeClass("has-error").addClass("has-success");
  }else{
      $('#cgudiv').removeClass("has-success").addClass("has-error");
  }

$('#checkTest').click(function(){
  if($('#checkTest input:checked').length < 1){
    $('#checkTest').removeClass("has-success").addClass("has-error");
  }else{
    $('#checkTest').removeClass("has-error").addClass("has-success");
  }
});


//progress Bar
$('input#password').keyup(function(){

  $("#progress").css("width", $('#password').val().length*100/8+"%");

  if(regex.progress.test($("#password").val()) === false && regex.password.test($("#password").val()) === false){

   $("#progress").removeClass("progress-bar-success").removeClass("progress-bar-warning").addClass("progress-bar-danger");

  }else if(regex.progress.test($("#password").val()) === true && regex.password.test($("#password").val()) === false){
    $("#progress").removeClass("progress-bar-danger").removeClass("progress-bar-success").addClass("progress-bar-warning");
  }else{
    $("#progress").removeClass("progress-bar-warning").removeClass("progress-bar-danger").addClass("progress-bar-success");
  }
  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


$('form #btn').click(function(){

  check('input#nom', regex.nom);
  check('input#prenom', regex.prenom);
  check('input#age', regex.age);
  check('input#codePostal', regex.codePostal);
  check('input#ville', regex.ville);
  check('input#avatar', regex.avatar);
  check('input#email', regex.email);
  check('input#password', regex.password);

  if($('input#cgu').is(":checked")){
    $('input#cgu').parent().parent().parent().removeClass("has-error").addClass("has-success");
  }else{
      $('input#cgu').parent().parent().parent().removeClass("has-success").addClass("has-error");
  }

  testButton(); console.log($('form .has').length,$('form .has-success').length);

});


$('#sportAutre').click(function(){

  if ($('#sportAutre input').is(":checked")) {
    $('#sportText').fadeIn();
  }else{
    $('#sportText').fadeOut();
  }
  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


$('form #codePostal').blur(function(){
  var villeInput = $('input#ville').val();
  var codePostalInput = parseInt($('input#codePostal').val());

  console.log(codePostalInput);

  if( 69000 <= codePostalInput && codePostalInput <= 69009 ){
    $('input#ville').val('Lyon');

  }else if (75000 <= codePostalInput && codePostalInput <= 75020 || codePostalInput == 75116) {
    $('input#ville').val('Paris');

  }else if (13001 <= codePostalInput && codePostalInput <= 13016) {
    $('input#ville').val('Marseille');
  }

  testButton(); console.log($('form .has').length,$('form .has-success').length);
});



$('form #confirmPassword').blur(function(){
  var passwordInput = $('input#password').val();
  var confirmPasswordInput = $('input#confirmPassword').val();

  if (confirmPasswordInput !== passwordInput) {
      error('input#confirmPassword');
      $('input#confirmPassword').parent().addClass('shake animated');
  }else{
      success('input#confirmPassword');
      $('input#confirmPassword').parent().removeClass('shake animated');
  }
  testButton(); console.log($('form .has').length,$('form .has-success').length);

});


$('form #textDescription').keyup(function(){
  var descriptionInput = $('#textDescription').val();

  var nombreCaractere = $(this).val().length;
  var nombreMots = $(this).val().split(' ').length;

  var msg = nombreCaractere + ' caractère(s) || ' + nombreMots + ' mot(s)';
  $('#compteur').text(msg);

  if(regex.textarea.test(descriptionInput) === false || descriptionInput.split(' ').length<10){
    error('#textDescription');
  }else{
    success('#textDescription');
  }
  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


$('form #btnPlus').click(function(){
  var fontSizeCss = $('#textDescription').css('font-size');
  var fontSizeNbr = parseInt(fontSizeCss.substr(0,fontSizeCss.length-2));

  fontSizeNbr++;
    console.log(fontSizeNbr);

  $('#textDescription').css('font-size', fontSizeNbr + 'px');

  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


$('form #btnMoins').click(function(){
  var fontSizeCss = $('#textDescription').css('font-size');
  var fontSizeNbr = parseInt(fontSizeCss.substr(0,fontSizeCss.length-2));

  fontSizeNbr--;
    console.log(fontSizeNbr);

  $('#textDescription').css('font-size', fontSizeNbr + 'px');

  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


$('input#cgu').click(function(){
  if($('input#cgu').is(":checked")){
    $('#cgudiv').removeClass("has-error").addClass("has-success");
  }else{
      $('#cgudiv').removeClass("has-success").addClass("has-error");
  }
  testButton();

});


$('input#rvlPwd').click(function(){
  if($('input#rvlPwd').is(":checked")){

    $('input#password').attr('type', 'text');
    $('input#confirmPassword').attr('type', 'text');

  }else{
    $('input#password').attr('type', 'password');
    $('input#confirmPassword').attr('type', 'password');
  }

  testButton(); console.log($('form .has').length,$('form .has-success').length);
});


function testButton(){
  if($('form .has-error').length > 0){
    $('form #btn').removeClass('btn-success').addClass('btn-danger').attr('disabled', 'disabled');
  }else{
    $('form #btn').removeClass('btn-danger').addClass('btn-success').removeAttr('disabled');
  }
}



});
