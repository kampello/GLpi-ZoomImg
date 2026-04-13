# 🔍 GLPI ZoomImg

[![GLPI Version](https://img.shields.io/badge/GLPI-10.0%2B-orange.svg)](https://glpi-project.org/)
[![License](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://opensource.org/licenses/GPL-2.0)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/kampello/GLpi-ZoomImg/graphs/commit-activity)

**GLPI ZoomImg** é um plugin leve e intuitivo desenhado para melhorar a experiência de suporte no GLPI. Ele permite que técnicos e utilizadores visualizem imagens de tickets e artigos da base de conhecimento com zoom detalhado, sem sair da página atual.

---

## 🌟 Funcionalidades / Features

- **🔍 Zoom Dinâmico:** Use a roda do rato (scroll) para ampliar ou reduzir imagens instantaneamente.
- **🖐️ Arrastar e Mover (Pan):** Quando ampliada, clique e arraste a imagem para navegar por detalhes específicos.
- **🚀 Ultra Leve:** Feito em Vanilla JS/jQuery, sem dependências externas pesadas.
- **📱 Responsivo:** Ajusta-se ao tamanho do ecrã do navegador.
- **🛡️ Seguro:** Compatível com os tokens CSRF do GLPI.

---

## 📸 Demonstração / Screenshot

*(Suba uma imagem para a pasta 'screenshots' e substitua o caminho abaixo)*
![Screenshot](https://raw.githubusercontent.com/kampello/GLpi-ZoomImg/main/screenshots/preview.jpg)

---

## 🛠️ Instalação / Installation

### Método: Git (Recomendado)
Navegue até a pasta de plugins do seu GLPI e execute:
```bash
cd /caminho/para/glpi/plugins
git clone [https://github.com/kampello/GLpi-ZoomImg.git](https://github.com/kampello/GLpi-ZoomImg.git) zoomimg