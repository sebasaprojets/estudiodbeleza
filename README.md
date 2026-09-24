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
- **Agendamento pelo WhatsApp:** todos os botões "Agendar horário", os "Conhecer" dos serviços, o "Entrar em contato"
  e o botão flutuante abrem o WhatsApp com mensagem pronta. O número e os textos ficam no início de `js/main.js`
  (objeto `WHATSAPP`), no formato `55` + DDD + número.
- **Instagram:** atualize o `href="#"` do ícone no rodapé.
- **Serviços e preços:** cada card fica em `<article class="service">`, basta duplicar ou editar.
- **Horário de funcionamento:** item "Horário" na seção Contato.

Design orientado pela skill UI UX Pro Max (`.claude/skills/ui-ux-pro-max`), com a tipografia
Cormorant + Montserrat e o checklist de acessibilidade (contraste, foco visível, movimento reduzido).
