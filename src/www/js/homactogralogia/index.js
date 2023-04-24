(() => {

    const importar_homactogralogia = function(url) {
        const script_tag = document.createElement("script");
        script_tag.src = url;
        document.body.appendChild(script_tag);
    };

    const homactologias = [
        
    ];

    for(let i = 0; i < homactologias.length; i++) {
        const homactologia = homactologias[i];
        console.log("Importando homactología desde: " + homactologia);
        importar_homactogralogia(homactologia);
    }

})();