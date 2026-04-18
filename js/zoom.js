$(document).ready(function() {
    let scale = 1;
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    // Função para aplicar as transformações combinadas
    function applyTransform(container) {
        $(container).css('transform', `translate(${translateX}px, ${translateY}px) scale(${scale})`);
    }

    // Detecta clique em imagens na timeline ou no corpo do ticket
    $(document).on('click', '.timeline-content img, .rich_text_container img', function(e) {
        // Verifica se o clique não é em um link ou botão dentro do container de imagem
        if ($(e.target).closest('a, button')) return;

        let imgSrc = $(this).attr('src');
        if (!imgSrc) return;

        // Bloqueia a abertura padrão da imagem
        e.preventDefault();
        e.stopPropagation();

        scale = 1;
        translateX = 0;
        translateY = 0;

        // Novo sistema overlay
        let zoomOverlay = $(`
            <div id="glpi-zoom-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; cursor:zoom-out;">
                <div id="zoom-container" style="transition: transform 0.1s ease-out; cursor: grab;">
                    <img src="${imgSrc}" style="max-width:90vw; max-height:90vh; border:3px solid white; border-radius:5px; pointer-events:none;">
                </div>
            </div>
        `);

        $('body').append(zoomOverlay);
    });

    // Eventos do Overlay (usando delegação para garantir que o preventDefault seja controlado)
    $(document).on('wheel', '#glpi-zoom-overlay', function(e) {
        // Só previne o scroll do sistema se estivermos sobre o overlay
        if (e.target.closest('#glpi-zoom-overlay')) {
            e.preventDefault();
        }

        const delta = e.originalEvent.deltaY;
        const zoomStep = 0.15;

        if (delta > 0) {
            scale = Math.max(0.5, scale - zoomStep);
        } else {
            scale = Math.min(5, scale + zoomStep);
        }

        applyTransform('#zoom-container');
    });

    $(document).on('mousedown', '#zoom-container', function(e) {
        if (scale > 1) {
            isDragging = true;
            $(this).css('cursor', 'grabbing');
            startX = e.pageX - translateX;
            startY = e.pageY - translateY;
            e.preventDefault();
        }
    });

    $(document).on('mousemove', function(e) {
        if (isDragging) {
            translateX = e.pageX - startX;
            translateY = e.pageY - startY;
            applyTransform('#zoom-container');
        }
    });

    $(document).on('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            $('#zoom-container').css('cursor', 'grab');
        }
    });

    $(document).on('click', '#glpi-zoom-overlay', function(e) {
        if (e.target.id === 'glpi-zoom-overlay') {
            $(this).remove();
            isDragging = false;
            scale = 1;
            translateX = 0;
            translateY = 0;
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === "Escape") {
            $('#glpi-zoom-overlay').remove();
            isDragging = false;
        }
    });
});