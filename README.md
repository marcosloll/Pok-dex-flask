<div align="center">

# Pokédex com Flask

Pokédex interativa desenvolvida com Flask e JavaScript, consumindo dados em tempo real da PokéAPI.

![Prévia da Pokédex](static/pokedex.png)

</div>

## Funcionalidades

- Pesquisa de Pokémon por nome ou número.
- Navegação entre o Pokémon anterior e o próximo.
- Atalhos pelas setas esquerda e direita do teclado.
- Exibição de imagem, número, tipos, altura, peso e habilidades.
- Barras visuais para HP, ataque, defesa, ataque especial, defesa especial e velocidade.
- Tratamento para Pokémon não encontrados.

## Tecnologias

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask_3-000000?style=flat-square&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## Executar localmente

1. Clone o repositório.
2. Crie e ative um ambiente virtual.
3. Instale as dependências com `pip install -r requirements.txt`.
4. Execute `python app.py`.
5. Abra o endereço exibido pelo Flask no navegador.

## Estrutura

```text
Pok-dex-flask/
├── static/
│   ├── main.js
│   ├── pokedex.png
│   └── style.css
├── templates/
│   └── index.html
├── app.py
└── requirements.txt
```

## Fonte dos dados

Os dados dos Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/).

## Autor

Desenvolvido por [Marcos Davy](https://github.com/marcosloll).
