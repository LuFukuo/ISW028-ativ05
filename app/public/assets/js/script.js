
 // Atividade 5 – Requisição HTTP com ViaCEP

const formulario = document.getElementById('cep-form');
const campoCep = document.getElementById('cep');
const mensagem = document.getElementById('mensagem');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  // Esconde os dados da consulta anterior.
  resultado.hidden = true;

  const cep = campoCep.value.trim();

  if (!/^\d{5}-?\d{3}$/.test(cep)) {
    mensagem.textContent = 'CEP inválido. Digite 12328070 ou 12328-070.';
    campoCep.focus();
    return;
  }

  mensagem.textContent = 'Consultando...';
  campoCep.disabled = true;

  try {
    const cepNumerico = cep.replace('-', '');
    const resposta = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);

    if (!resposta.ok) {
      mensagem.textContent = 'Erro ao consultar o serviço ViaCEP.';
      return;
    }

    const dados = await resposta.json();

    if (dados.erro) {
      mensagem.textContent = 'CEP não encontrado.';
      return;
    }

    document.getElementById('valor-cep').textContent = dados.cep;
    document.getElementById('valor-logradouro').textContent = dados.logradouro || 'Não informado';
    document.getElementById('valor-bairro').textContent = dados.bairro || 'Não informado';
    document.getElementById('valor-cidade').textContent = dados.localidade;
    document.getElementById('valor-uf').textContent = dados.uf;
    document.getElementById('valor-ibge').textContent = dados.ibge;

    resultado.hidden = false;
    mensagem.textContent = 'Resposta do ViaCEP:';
  } catch (erro) {
    mensagem.textContent = 'Falha de conexão com o serviço ViaCEP.';
  } finally {
    campoCep.disabled = false;
    campoCep.focus();
  }
});
