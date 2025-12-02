# Explorador de Países

Aplicação web interativa para explorar informações sobre países do mundo usando a REST Countries API.

##  Descrição

Projeto desenvolvido como trabalho da disciplina de Programação Web. A aplicação permite 
navegar, buscar e favoritar países, visualizando informações detalhadas como população, 
área, idiomas, moedas e localização geográfica.

##  Funcionalidades

-  Listagem de todos os países do mundo
-  Busca de países por nome
-  Filtro por continente/região
-  Paginação inteligente (12 países por página)
-  Sistema de favoritos usando localStorage
-  Página de detalhes com:
  - Bandeira do país
  - Informações gerais (capital, população, área)
  - Idiomas e moedas
  - Mapa interativo (OpenStreetMap)
-  Design responsivo (mobile, tablet, desktop)
-  Tema escuro moderno

##  Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis CSS e media queries
- **JavaScript ES6+** - Lógica e interatividade (modules, async/await, localStorage)
- **REST Countries API** - Fonte de dados
- **OpenStreetMap** - Mapas interativos
- **Git/GitHub** - Controle de versão

##  Estrutura do Projeto

```
explorador-paises/
├── index.html          # Página principal (catálogo)
├── country.html        # Página de detalhes do país
├── favoritos.html      # Página de favoritos
├── sobre.html          # Página sobre o projeto
├── css/
│   ├── styles.css      # Estilos globais
├── js/
│   ├── api.js          # Integração com REST Countries API
│   ├── main.js         # Lógica do catálogo principal
│   ├── country.js      # Lógica da página de detalhes
│   ├── favoritos.js    # Lógica da página de favoritos
│   └── pagination.js   # Sistema de paginação
└── README.md
```

##  Como Usar

### Opção 1: Abrir diretamente

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/explorador-paises.git
cd explorador-paises
```

2. Abra o arquivo `index.html` no navegador

### Opção 2: Usar servidor local (recomendado)

1. Clone o repositório (comando acima)

2. Inicie um servidor local:

**Com Python 3:**
```bash
python -m http.server 8000
```

**Com Node.js (http-server):**
```bash
npx http-server
```

3. Acesse `http://localhost:8000` no navegador

##  Equipe

- **Wellyson dos Santos Silva** - Backend / Integração com API / Lógica
- **Olimpio de Carvalho** - Frontend / UI/UX / Design

##  Funcionalidades Técnicas

### Sistema de Favoritos
Utiliza localStorage para persistir os países favoritos do usuário entre sessões. 
Os favoritos são salvos como um array de códigos de países (cca3).

### Paginação Inteligente
Sistema de paginação que adapta a exibição de botões baseado na página atual, 
mostrando sempre primeira página, última página, páginas adjacentes e usando "..." 
para indicar saltos.

### Filtros Dinâmicos
- **Busca por nome**: Filtra em tempo real enquanto o usuário digita
- **Filtro por região**: Africa, Asia, Europe, Oceania, Americas

### Detalhes do País
Página dedicada com:
- Algumas informações do país
- Mapa interativo incorporado via iframe do OpenStreetMap
- Botão de favoritar/desfavoritar

##  API Utilizada

**REST Countries API v3.1**
- Endpoint lista: `https://restcountries.com/v3.1/all`
- Endpoint detalhes: `https://restcountries.com/v3.1/alpha/{code}`


##  Responsividade

- **Mobile** (< 600px): Layout em coluna única
- **Tablet** (≥ 600px): Grid de 2 colunas
- **Desktop** (≥ 900px): Grid dinâmico com auto-fill

##  Links Úteis

- [REST Countries API](https://restcountries.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)


---

**Desenvolvido por Wellyson dos Santos Silva e Olimpio de Carvalho**
