$(document).ready(function () {
    ecran = $('.ordi-ecran-navigateur');
    supprime = $('.trash');
    nbEllement = ecran.children().length;
    ajouter = $('.ajouter');
    sidebar = $('.sidebar');
    colorPicker = $('.html5colorpicker');
    var divNumber = 3;

    ajouter.on('click', function () {
        if (sidebar.children().length==0){
        sidebar.append('<div class="grid-stack-item"><div class="card text-white bg-primary grid-stack-item-content base div' + divNumber + '" data-gs-width="3" data-gs-height="3" style="overflow-x: hidden; overflow-y: hidden;"><div class="card-header"><h4>Article</h4></div><div  class="card-body"><input type="color" class="html5colorpicker"><img src="assets/css/images/colorwheel.png" alt="color" class="color-change"></div><button class="trash far fa-trash-alt"></button></div></div>');
        $('.sidebar .grid-stack-item').draggable({
            revert: 'invalid',
            handle: '.grid-stack-item-content',
            scroll: false,
            appendTo: 'body',
        });
        divNumber++;
        }
    })
    ecran.on('click', "button", function (event) {
        if (nbEllement > 1) {

                var cible = $(event.target).parent().parent();
                console.log(cible);
    
                cible.remove();
            
        } else {
            alert('il doit rester un ellement au minimum.');
        }
    })

    ecran.on('click', ".card-header", function (ev) {
        var temp = $(ev.target).children().context.textContent;
        $(ev.target).empty();
        $(ev.target).append('<input type="text" name="titre" class="titre-input" value="' + temp + '">');
    })

    ecran.on('keyup',".titre-input", function (e) {
        if (e.keyCode == 13) {
            console.log();
            var temp = $(e.target).val();
            var headerParent = $(e.target).parent().parent();
            console.log(headerParent);
            headerParent.empty();
            headerParent.append('<h4>' + temp + '</h4>');
        }
    });

    ecran.on("change", colorPicker,function(event){
        $(event.target).parent().parent().css("background-color",event.target.value);
    });

    ecran.hover(function(){
        nbEllement = ecran.children().length;
    })

    });