const inputCep = document.getElementById('cep');
const inputEndereco = document.getElementById('endereco');
const inputBairro = document.getElementById('bairro');
const inputCidade = document.getElementById('cidade');
const cepStatus = document.getElementById('cep-status');

inputCep.addEventListener('blur', async () => {
  const cep = inputCep.value.replace(/\D/g, '');
  
  if (cep.length !== 8) return;

  cepStatus.textContent = "Buscando...";
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      cepStatus.textContent = "CEP não encontrado.";
      return;
    }

    inputCidade.value = data.localidade ? `${data.localidade} / ${data.uf}` : "";
    
    cepStatus.textContent = "";
  } catch (error) {
    cepStatus.textContent = "Erro na busca.";
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const form = document.getElementById('form-contato');
const camposForm = document.getElementById('campos-form');
const msgConfirmacao = document.getElementById('msg-agradecimento');
const nomeConfirmado = document.getElementById('nome-confirmado');
const btnNovo = document.getElementById('btn-novo-agendamento');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  nomeConfirmado.textContent = document.getElementById('nome').value;
  
  camposForm.style.display = 'none';
  msgConfirmacao.style.display = 'flex';
  msgConfirmacao.hidden = false;
});

btnNovo.addEventListener('click', () => {
  form.reset();
  camposForm.style.display = 'block';
  msgConfirmacao.style.display = 'none';
  msgConfirmacao.hidden = true;
});