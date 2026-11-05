document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Filtro dos Artigos Científicos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.article-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe ativo dos outros botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      articles.forEach(article => {
        if (filterValue === 'all' || article.getAttribute('data-category') === filterValue) {
          article.style.display = 'block';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });

  // 3. Calculadora de Pegada de Carbono
  const calcForm = document.getElementById('calcForm');
  const calcResult = document.getElementById('calcResult');
  const resultText = document.getElementById('resultText');

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const km = parseFloat(document.getElementById('km').value) || 0;
      const energia = parseFloat(document.getElementById('energia').value) || 0;
      const carne = parseFloat(document.getElementById('carne').value) || 0;

      // Estimativa simplificada (em kg de CO2 por mês)
      const emissaoKm = km * 4 * 0.19; // 0.19kg CO2 por km de carro em média
      const emissaoEnergia = energia * 0.08; 
      const emissaoCarne = carne * 4 * 2.5;

      const totalCO2 = (emissaoKm + emissaoEnergia + emissaoCarne).toFixed(2);

      let mensagem = `Sua estimativa mensal de emissões é de aproximadamente <strong>${totalCO2} kg de CO₂</strong>.`;
      
      if (totalCO2 < 100) {
        mensagem += " Excelente! Sua pegada de carbono está abaixo da média.";
      } else if (totalCO2 <= 300) {
        mensagem += " Moderada. Considere adotar transporte público ou reduzir o consumo de carne para diminuir seu impacto.";
      } else {
        mensagem += " Alta. Que tal implementar práticas de economia circular e otimização energética no seu dia a dia?";
      }

      resultText.innerHTML = mensagem;
      calcResult.classList.remove('hidden');
    });
  }
});
