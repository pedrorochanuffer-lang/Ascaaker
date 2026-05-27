import * as webllm from "https://unpkg.com/@mlc-ai/web-llm@latest/dist/webllm.min.js";

const promptInput = document.getElementById('prompt');
const gerarBtn = document.getElementById('gerar');
const resultado = document.getElementById('resultado');

// Inicialize WebLLM uma vez quando carregar:
let chat;
async function init() {
  chat = new webllm.ChatModule();
  await chat.reload("Llama-3-8B-Instruct-q4f32_1-MLC"); // ou outro modelo suportado no browser
}
init();

gerarBtn.onclick = async () => {
  const userPrompt = promptInput.value.trim();
  if (!userPrompt) return;
  gerarBtn.disabled = true;
  resultado.textContent = "Pensando com IA...";
  const prompt = `Gere apenas uma arte em ASCII para: "${userPrompt}". Não escreva mais nada além da arte.`;
  try {
    const reply = await chat.generate(prompt);
    resultado.textContent = reply.replace(/^\s+|\s+$/g, "");
  } catch (e) {
    resultado.textContent = "Erro ao gerar ASCII: " + e.message;
  }
  gerarBtn.disabled = false;
};
