# Espaço Vip Studio de Beleza — site

Site institucional em HTML, CSS e JavaScript puros (sem build). Abra `index.html` no navegador
ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

## Estrutura

- `index.html`: todas as seções (Hero, Sobre, Serviços, Diferencial, Galeria, Experiência, Avaliações, Chamada final, Localização, Rodapé)
- `css/style.css`: design system (cores e fontes nas variáveis de `:root`) e responsivo
- `js/main.js`: menu mobile, animações de entrada, contadores, parallax e galeria com ampliação

## Personalização

- **Fotos:** as imagens atuais são fotos de banco de imagens (Unsplash). Para usar as fotos reais, troque o `src`
  de cada `<img>` (e o `data-full` dos itens da galeria) pelos arquivos do cliente, por exemplo `img/interior.jpg`.
- **Agendamento:** os botões "Agendar horário" ligam para (41) 3203-7293. Para usar o WhatsApp, troque
  `tel:+554132037293` por `https://wa.me/55DDDNUMERO`.
- **Instagram:** atualize o `href="#"` do ícone no rodapé.
- **Serviços e preços:** cada card fica em `<article class="service">`, basta duplicar ou editar.
- **Horário de funcionamento:** item "Horário" na seção Contato.

Design orientado pela skill UI UX Pro Max (`.claude/skills/ui-ux-pro-max`), com a tipografia
Cormorant + Montserrat e o checklist de acessibilidade (contraste, foco visível, movimento reduzido).
