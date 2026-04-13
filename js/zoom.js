$(document).ready(function() {
    let scale = 1;
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
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
        applyTransform();
    });

    // Início do Arrastar (Drag)
    $(document).on('mousedown', '#zoom-container', function(e) {
        if (scale > 1) { // Só arrasta se tiver zoom
            isDragging = true;
            $(this).css('cursor', 'grabbing');
            startX = e.pageX - translateX;
            startY = e.pageY - translateY;
            e.preventDefault();
        }
        
    });

    // Movimentação
    $(document).on('mousemove', function(e) {
        if (isDragging) {
            translateX = e.pageX - startX;
            translateY = e.pageY - startY;
            applyTransform();
        }
    });

    // Soltar
    $(document).on('mouseup', function() {
        isDragging = false;
        $('#zoom-container').css('cursor', 'grab');
    });

    // Função para aplicar as transformações combinadas
    function applyTransform() {
        $('#zoom-container').css('transform', `translate(${translateX}px, ${translateY}px) scale(${scale})`);
    }

    // Remove o zoom ao clicar em qualquer lugar do fundo escuro
   $(document).on('click', '#glpi-zoom-overlay', function(e) {
       if (e.target.id === 'glpi-zoom-overlay') {
            $(this).remove();
            isDragging = false;
        }
    });
});