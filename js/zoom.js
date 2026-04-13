$(document).ready(function() {
    let scale = 1;
    // Detecta clique em imagens na timeline ou no corpo do ticket
    $(document).on('click', '.timeline-content img, .rich_text_container img', function(e) {
        
        // Bloqueia a abertura padrão da imagem
        e.preventDefault();
        scale = 1;
        let imgSrc = $(this).attr('src');
        // novo sistema overlay
        let zoomOverlay = $(`
            <div id="glpi-zoom-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; cursor:zoom-out;">
                <div id="zoom-container" style="transition: transform 0.1s ease-out;">
                    <img src="${imgSrc}" style="max-width:90vw; max-height:90vh; border:3px solid white; border-radius:5px; pointer-events:none;">
                </div>
            </div>
        `);
        $('body').append(zoomOverlay);
    });
    // Função para o Scroll (Wheel)
    $(document).on('wheel', '#glpi-zoom-overlay', function(e) {
        e.preventDefault();
        
        const delta = e.originalEvent.deltaY;
        const zoomStep = 0.15;
        // Define a nova escala
        if (delta > 0) {
            scale = Math.max(0.5, scale - zoomStep); // Zoom Out
        } else {
            scale = Math.min(5, scale + zoomStep);  // Zoom In (máximo 5x)
        }

        // Aplica o transform no container
        $('#zoom-container').css('transform', 'scale(' + scale + ')');
    });
    // Remove o zoom ao clicar em qualquer lugar do fundo escuro
   $(document).on('click', '#glpi-zoom-overlay', function(e) {
       if (e.target.id === 'glpi-zoom-overlay') {
            $(this).remove();
            scale = 1;
        }
    });
});