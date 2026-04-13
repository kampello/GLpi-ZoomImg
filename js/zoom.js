$(document).ready(function() {
    // Detecta clique em imagens na timeline ou no corpo do ticket
    $(document).on('click', '.timeline-content img, .rich_text_container img', function(e) {
        
        // Bloqueia a abertura padrão da imagem
        e.preventDefault();

        let imgSrc = $(this).attr('src');

        // Cria a estrutura visual do zoom
        let zoomHtml = `
            <div id="zoomimg-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:99999; display:flex; align-items:center; justify-content:center; cursor:zoom-out;">
                <img src="${imgSrc}" style="max-width:95%; max-height:95%; border:4px solid #fff; border-radius:5px; box-shadow:0 0 20px #000;">
                <span style="position:absolute; top:20px; right:30px; color:#fff; font-size:40px; cursor:pointer;">&times;</span>
            </div>
        `;

        $('body').append(zoomHtml);
    });

    // Remove o zoom ao clicar em qualquer lugar do fundo escuro
    $(document).on('click', '#zoomimg-overlay', function() {
        $(this).remove();
    });
});