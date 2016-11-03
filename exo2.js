// Créer un formulaire de Création de produit avec les validations suivantes:
//
//   + Titre du produit (uniquement caractères alpha avec tiret minimum 5 caractères)
//   + Code Barre: 11 caractères numérque au format XXXXX XXXXX X
//   + Description: 10 mots avec des caractres alpha numérique avec espace et baslises HTML <b>
//   + Prix: AU format: XX.XX€ avec X un nombre
//   + Disponibilité: date au format dd/mm/YYYY . Verifier que cette date est dans le future avec la        fonction Date()
//   + Image: image que de type jpg ou jpeg provenant de Amazon S3. L'image apparait en miniature juste en dessous quand je quitte mon champs
//   + Quantité minimum: nombre < 10000
//   + Quantité maximum: nombre < 10000 et inférieur au maximum
//   + Mot clefs: textarea avec la saisie de mot séparé par des virgule (on mettre un petit compteur de mot a coté)
//   + Couleur: forma text au format hexadecimal #FFEE88 ou rgba(255,255,255,0.8)
//   + Type de vente: liste déroulante avec pour items "Neuf" , "Occasion", "Dematerielisé", "Autre". Quand je selection Autre (change())
//   cela me fait apparaitre un champs en dessous
//   + Boutons "Créer cette fiche produit"
//
//
//   Bonus: Utiliser le plugin Summernote en Jquery pour la description du Produit
//
//
  //  Bonus 2: Ajouter le champs "Heure de disponibilité" et verifier que le format soit XX:XX et que ce soit une heure valide (comprise entre 00 et 23 pour les heures et 00 à 60 minutes)
  //
  //
  //  *** Les plugins Jquery ***
  //
  //  Bonus: Utiliser le plugin Summernote en Jquery pour la description du Produit
  //  Bonus 2: Intégrer le plugin Bootstrap SLider pour le prix https://github.com/seiyria/bootstrap-slider
  //  Bonus 3: Intégrer le plugin Jquery Mask piur le codebarre https://igorescobar.github.io/jQuery-Mask-Plugin/
  //  Bonus 3 : Intégrer le plugin Jquery Datepicker https://eonasdan.github.io/bootstrap-datetimepicker/
  //  Bonus 4: Intégrer le COlor picker http://www.eyecon.ro/colorpicker/



$(document).ready(function(){

    $('#summer .note-editor.note-frame').css('border', '1px solid #a94442');

    $('#description').summernote({
        toolbar: [
          ['color', ['color']],
          ['font', ['bold', 'italic', 'underline']]
        ]
    });

  var regProd = /^[a-zA-Z\-]{5,}$/;
  var regCodeBar = /^(([0-9]){5}(\ )){2}([0-9])$/;
  var regDesc = /^((?:([\w\ ]))*(?:(<\/?b>))*){0,}$/i;
  var regPrix = /^([0-9]){2}([\.\,])([0-9]){2}(\€)$/;
  var regDispo = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
  var regImage = /^(https?:\/\/s3.amazonaws\.com\/)([a-z0-9\-\_\.\/]+)(.jpg|.jpeg)$/i;
  var regQte = /^[0-9]{1,4}$/;
  var regMotclef = /^([a-z0-9]+[\,])+([a-z0-9]+[\,]?)$/i;
  var regCouleur = /^(([A-Fa-f0-9]{6})|(rgba\(((00[0-9]|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])\,){3}((0\.[0-9])|1))\)|(rgb\((((00[0-9]|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])\,){2})((00[0-9]|[0-1][0-9]{2}|2[0-4][0-9]|25[0-5])))\))$/;
  var regheure = /^(([0-1][0-9])|(2[0-4]))\:(([0-5][0-9])|60)$/;

  var now = new Date();
  now.setHours(0,0,0,0);


  $('#codeBar').mask('00000 00000 0');

  function error (id){
    $('div.form-group:has(' + id + ')').removeClass("has-success").addClass("has-error");
  }

  function success (id){
    $('div.form-group:has(' + id + ')').removeClass("has-error").addClass("has-success");
  }

  function check (id, reg){
    if(reg.test($(id).val()) === false){
      error(id);
    }else{
      success(id);
    }
    testButton();
  }



$('#produit').keyup(function(){
  check('#produit',regProd);
});

$('#codeBar').keyup(function(){

  check('#codeBar',regCodeBar);
});

$('#summer div .note-editable').keyup(function(){
  var abc = $('#description').summernote('code').replace(/<\/?(br|p)\/?>/g,'');
  var bcd = abc.split(/[^\ ]+/).length-1;
  console.log(abc,bcd);
  console.log(regDesc.test(abc));
  if(regDesc.test(abc) === true && bcd > 10){
    success('#summer');
    $('#summer .note-editor.note-frame').css('border', '1px solid #3c763d');

  }else{
    error('#summer');
    $('#summer .note-editor.note-frame').css('border', '1px solid #a94442');
  }
});

$("#prix").slider({
    ticks: [0, 100, 200, 300, 400, 500],
    ticks_labels: ['0 €', '100 €', '200 €', '300 €', '400 €', '500 €'],
    ticks_snap_bounds: 20,
    formatter:function(value){
      return value + '.00€';
    }
});

$('#prix').change(function(){
  var price = $('#prix').val() + ".00€";
  $('#price').fadeIn().text("prix : " + price);
});


$(function () {
    $('#datetimepicker1').datetimepicker({
      format: 'DD/MM/YYYY'
    });
});

$('#disponibilite').blur(function(){
check('#disponibilite',regDispo);
var dd=$('#disponibilite').val(),
thedate = dd.split("/");
var da = thedate[0];
var mo = thedate[1];
var an = thedate[2];
var dd_objet = new Date(an, mo-1, da);
if(dd_objet < now ){
  error('#disponibilite');
}else{
  success('#disponibilite');
}
  testButton();
});


//ajout d'un commentaire



$('#image').keyup(function(){
check('#image',regImage);
});

$('#image').blur(function(){
  check('#image',regImage);
  console.log($('#image').parent().has('#divimg').length);
  // test vrai et pas d'image
  if($('#image').parent().has('#divimg').length > 0){
    $('#divimg').remove();
  }

  if(regImage.test($('#image').val()) === true){
    $(this).parent().append($('<div id="divimg"style="text-align:center"> <img src="' + $(this).val() + '" style="width:200px ; margin:10px auto"/> </div>'));
  }
});

$('#quantitemin').blur(function(){
check('#quantitemin', regQte);
});

$('#quantitemax').blur(function(){
  var qtemax = $('#quantitemax').val();
  var qtemin = $('#quantitemin').val();

  if(qtemax < qtemin || regQte.test($('#quantitemax').val()) === '' ){
    error('#quantitemax');
  }else {
    success('#quantitemax');
  }
  testButton();
});

$('#motclef').keyup(function(){

  check('#motclef',regMotclef);
  var nbrmots = $(this).val().match(/[^,]+/g).length;
  $(this).val($(this).val().replace(" ",","));
  var msg = nbrmots + " mot(s)" ;
  $("#compteur").text(msg);
  testButton();
});

$('div.form-group input#couleur').ColorPicker({
  onSubmit: function(hsb, hex, rgb, el) {
		$(el).val(hex);
    var realColor = '#' + hex;
    if(regCouleur.test($('div.form-group input#couleur').val()) === true ){
      $(el).css('background-color', realColor);
      success('input#couleur');
      console.log("oui");
    }
    else{
      error('input#couleur');
      $(el).css('background-color', '#ffffff');
      console.log("non");
    }
      testButton();
      $(el).ColorPickerHide();
	},
	onBeforeShow: function () {
		$(this).ColorPickerSetColor(this.value);
	}
})
.bind('keyup', function(){
	$(this).ColorPickerSetColor(this.value);
});



$('#typeVente').change(function(){
  //block textarea

  if($('#typeVente option:selected').val() == "Autre" ){
    $('#typeArea').fadeIn();
  }else{
    $('#typeArea').fadeOut();
  }
  // condition error or success
  if($('#typeVente option:selected').val() == "..." || $('#typeVente option:selected').val() == "Autre" ){
    error('#typeVente');
  }else{
    success('#typeVente');
  }
  testButton();
});

$('#typeArea').keyup(function(){
console.log($('#typeArea').val().length);
  if($('#typeVente option:selected').val() == "Autre" && $('#typeArea').val().length > 0){
    success('#typeVente');
  }else{
    error('#typeVente');
  }
});


function testButton(){
  if($('form .has-error').length > 0){
    $('form #btn').removeClass('btn-success').addClass('btn-danger').attr('disabled', 'disabled');
  }else{
    $('form #btn').removeClass('btn-danger').addClass('btn-success').removeAttr('disabled');
  }
}


});
