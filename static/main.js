let pokemonAtual = 1;

const nomesStats = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SPA",
  "special-defense": "SPD",
  speed: "SPE",
};

const coresStats = {
  HP: "bar-hp",
  ATK: "bar-atk",
  DEF: "bar-def",
  SPA: "bar-spa",
  SPD: "bar-spd",
  SPE: "bar-spe",
};

async function buscarPokemon(termo) {
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
    if (!resposta.ok) throw new Error("Pokémon não encontrado");
    const dados = await resposta.json();

    // ===== IMAGEM (com fallback) =====
    const animadoGenV =
      dados.sprites.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default;
    const animadoShowdown = dados.sprites.other?.showdown?.front_default;
    const estatico = dados.sprites.front_default;
    const artwork = dados.sprites.other?.["official-artwork"]?.front_default;

    document.getElementById("pokemon-img").src =
      animadoGenV || animadoShowdown || estatico || artwork || "";

    // ===== NOME E NUMERO =====
    document.getElementById("pokemon-nome").textContent = dados.name;
    document.getElementById("pokemon-numero").textContent =
      `#${String(dados.id).padStart(3, "0")}`;

    // ===== TIPOS =====
    const tiposDiv = document.getElementById("pokemon-tipos");
    tiposDiv.innerHTML = "";
    dados.types.forEach((t) => {
      const tipoNome = t.type.name;
      const span = document.createElement("span");
      span.className = `tipo tipo-${tipoNome}`;
      span.textContent = tipoNome;
      tiposDiv.appendChild(span);
    });

    // ===== STATS =====
    const statsDiv = document.getElementById("pokemon-stats");
    statsDiv.innerHTML = "";
    dados.stats.forEach((s) => {
      const nome = nomesStats[s.stat.name] || s.stat.name;
      const valor = s.base_stat;
      const porcentagem = Math.min((valor / 255) * 100, 100);
      const corClasse = coresStats[nome] || "bar-hp";

      const item = document.createElement("div");
      item.className = "stat-item";
      item.innerHTML = `
        <span class="stat-label">${nome}</span>
        <div class="stat-barra-fundo">
          <div class="stat-barra ${corClasse}" style="width: ${porcentagem}%"></div>
        </div>
        <span class="stat-valor">${valor}</span>
      `;
      statsDiv.appendChild(item);
    });

    // ===== INFOS EXTRAS =====
    const extrasDiv = document.getElementById("pokemon-extras");
    const alturaM = (dados.height / 10).toFixed(1);
    const pesoKg = (dados.weight / 10).toFixed(1);
    const habilidades = dados.abilities.map((a) => a.ability.name);
    const habTags = habilidades
      .map((h) => `<span class="hab-tag">${h}</span>`)
      .join("");

    extrasDiv.innerHTML = `
      <div class="extra-item">
        <i class="fa-solid fa-ruler-vertical"></i>
        <span class="extra-label">Altura</span>
        <span class="extra-valor">${alturaM} m</span>
      </div>
      <div class="extra-item">
        <i class="fa-solid fa-weight-hanging"></i>
        <span class="extra-label">Peso</span>
        <span class="extra-valor">${pesoKg} kg</span>
      </div>
      <div class="extra-item">
        <i class="fa-solid fa-bolt"></i>
        <span class="extra-label">Hab.</span>
        <div class="habilidades-lista">${habTags}</div>
      </div>
    `;

    pokemonAtual = dados.id;
  } catch (err) {
    document.getElementById("pokemon-nome").textContent = "not found";
    document.getElementById("pokemon-numero").textContent = "";
    document.getElementById("pokemon-img").src = "";
    document.getElementById("pokemon-tipos").innerHTML = "";
    document.getElementById("pokemon-stats").innerHTML = "";
    document.getElementById("pokemon-extras").innerHTML = "";
    console.error(err);
  }
}

document.getElementById("btn-buscar").addEventListener("click", () => {
  const termo = document.getElementById("input-busca").value.toLowerCase();
  if (termo) buscarPokemon(termo);
});

document.getElementById("btn-prev").addEventListener("click", () => {
  if (pokemonAtual > 1) buscarPokemon(pokemonAtual - 1);
});

document.getElementById("btn-next").addEventListener("click", () => {
  buscarPokemon(pokemonAtual + 1);
});

document.getElementById("input-busca").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const termo = document.getElementById("input-busca").value.toLowerCase();
    if (termo) buscarPokemon(termo);
  }
});

document.addEventListener("keydown", (e) => {
  const focoNoInput = document.activeElement.id === "input-busca";
  if (!focoNoInput) {
    if (e.key === "ArrowLeft" && pokemonAtual > 1) buscarPokemon(pokemonAtual - 1);
    if (e.key === "ArrowRight") buscarPokemon(pokemonAtual + 1);
  }
});

buscarPokemon(1);