$(document).ready(function(){


  var regex = {
       nom: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{2,}$/,
       prenom: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
       sport: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
       age: /^[0-9]{2}$/,
       cp: /^[0-9]{5}$/,
       ville: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
       email: /^[a-z0-9\.\-\_]+\@[a-z0-9\-]+\.[a-z]{2,5}$/,
       avatar: /^https?\:\/\/[a-z0-9\.\-\_]+(fbcdn\.net|twimg\.com)[a-z0-9\.\-\_\/]*/,
       bio1: /^[0-9a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\-\'\. ]+$/m,
       bio2: /^(?:\w+\W+){9,}(?:\w+[\. ]*)$/m,
       passwd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
  };

   function setToRed(idInput) {
         // Traversing
         // parent() => permet de récuperer l'element parent direct
         $(idInput).parent().addClass('has-error');
       }

  function setToGreen(idInput) {
    $(idInput).parent().addClass('has-success');
  }

  function setToNormal(idInput) {
    $(idInput).parent().removeClass('has-error').removeClass('has-success');
  }

  function checkRegex(idInput, regex){

         if(regex.test($(idInput).val())) // On verifie si l'input entrée valide la regex en paramètre
         {
           console.log('Regex validée ' + idInput);
           // si oui on enleve ou laisse vide la classe
           setToNormal(idInput);
         }
         else {
           console.log('Regex non validée ' + idInput);
           // si non on met la classe has-error
           setToRed(idInput);
         }

  }


    var nombreCarac = 0;

      $("textarea#biographie").keyup(function() {
        var tableauCarac = $(this).val(),
            nombre = tableauCarac.length;

        var phrase="Il y a " + nombre + " caractères.";
          $("div#prev").html(phrase);

          // create element : append() prepend() before() after()

      });



    $("button#plus").click(function() {

    $("textarea#biographie").css("font-size", "+=1");
  });

  // Grossir
  $("button#moins").click(function() {

    $("textarea#biographie").css("font-size", "-=1");

  });






  $('#postal').blur(function(){
    checkRegex('#postal', regex.cp);

        var cpSaisi = $('input#postal').val();
        var codeVille = cpSaisi.substr(0, 3);
            //  console.log(cpSaisi);
            //  console.log(codeVille);
            switch (codeVille) {
              case "750":
                // console.log("Paris");
                $('input#ville').val("Paris").attr("disabled", "disabled"); // modifie la valeur de l'attribut disabled
                break;
              case "690":
                $('input#ville').val("Lyon").attr("disabled", "disabled");
                break;
              case "130":
                $('input#ville').val("Marseille").attr("disabled", "disabled");
                break;
              default:
                $('input#ville').val("").removeAttr("disabled"); // removeAttr() supprime un attribut
                break;
            }

  });




  console.log('Ready...');

  $('button#btn-confirm').click(function() {

     // is() permet de retourner tru ou false selon une condition jquery
     // :checked, :selected, :visible, :hide => pseudo selecteurs   // checkbox cochées :checkbox:checked
    if($(':checkbox#checkbox-1').is(':checked')){
        // parent() permet de récupérer le parent direct d'un element
        $(':checkbox#checkbox-1').parent().css('color',"green");
      }
      else{
        $(':checkbox#checkbox-1').parent().css('color',"red");
      }
  });


  $('#revealPw').click(function () {
    console.log($(this).prev(':password'));

    if ($(this).is(':checked')) {
      $('#pw').attr('type', 'text');
    } else {
      $('#pw').attr('type', 'password');
    }
  });



    $('input#password').keyup(function(){

      var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

       if(regex.test($(this).val()) === false){
        color = 'red';
       }
       else{
          color = 'green';
       }

      $(this).css('border', '1px solid '+color);


    });


  //ciblage par attribut
  $('input#confirm').keyup(function(){
    //$(this) => l'objet HTMKL courant sur lequel l'evenement se propage
    var color  = "";
    if($(this).val() != $('input#password').val()){
      color = 'red';
    }

    else{
      color = 'green';
    }

    $(this).css('border', '1px solid '+color);

  });



});
