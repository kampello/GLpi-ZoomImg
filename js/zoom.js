$(document).ready(function() {
    // Detecta clique em imagens na timeline ou no corpo do ticket
    $(document).on('click', '.timeline-content img, .rich_text_container img', function(e) {
        
        // Bloqueia a abertura padrão da imagem
        e.preventDefault();

        let imgSrc = $(this).attr('src');
        // novo sistema overlay
        let zoomOverlay = $(`
            <div id="glpi-zoom-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; cursor:zoom-out;">
                <img src="${imgSrc}" style="max-width:90%; max-height:90%; border:3px solid white; border-radius:5px;">
            </div>
        `);

        $('body').append(zoomOverlay);

        $('body').append(zoomHtml);
    });

    // Remove o zoom ao clicar em qualquer lugar do fundo escuro
   $(document).on('click', '#glpi-zoom-overlay', function() {
        $(this).remove();
    });
});