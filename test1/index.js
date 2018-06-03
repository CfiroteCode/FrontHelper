$(document).ready(function () {
    ecran = $('.ordi-ecran-navigateur');
    supprime = $('.trash');
    nbEllement = ecran.children().length;
    ajouter = $('.ajouter');
    sidebar = $('.sidebar');

    ajouter.on('click', function () {
        sidebar.empty();
        sidebar.append('<div class="grid-stack-item"><div class="card text-white bg-primary grid-stack-item-content base" data-gs-width="3" data-gs-height="3" style="overflow-x: hidden; overflow-y: hidden;"><div class="card-header"><h4>Article</h4></div><div  class="card-body"><p class="card-text">Lorem ipsum dolor sit amet.</p></div><button class="trash far fa-trash-alt"></button></div></div>');
        $('.sidebar .grid-stack-item').draggable({
            revert: 'invalid',
            handle: '.grid-stack-item-content',
            scroll: false,
            appendTo: 'body',
        });
    })
    ecran.on('click', "button", function (event) {
        if (nbEllement > 1) {

                var cible = $(event.target).parent().parent();
                console.log(cible);
    
                cible.remove();
            
        } else {
            alert('impossible frere');
        }
    })

    ecran.hover(function(){
        nbEllement = ecran.children().length;
    })




});