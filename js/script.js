// Funções da Fase 2 - Pets & Cia Petshop

// Atualiza o ano exibido no rodapé e mostra data/hora de acesso.
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".ano-atual").forEach(function (elemento) {
        elemento.textContent = new Date().getFullYear();
    });

    const relogio = document.getElementById("relogio");
    if (relogio) {
        function atualizarRelogio() {
            const agora = new Date();
            relogio.textContent = agora.toLocaleString("pt-BR");
        }
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);
    }

    const campoData = document.getElementById("data");
    if (campoData) {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        campoData.min = `${ano}-${mes}-${dia}`;
    }
});

// Alterna um modo simples de alto contraste para auxiliar a leitura.
function alternarContraste() {
    document.body.classList.toggle("alto-contraste");
}

// Máscara simples para CPF no formato 000.000.000-00.
function formatarCPF(campo) {
    let valor = campo.value.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    campo.value = valor;
}

// Máscara simples de telefone brasileiro.
function formatarTelefone(campo) {
    let valor = campo.value.replace(/\D/g, "").slice(0, 11);
    if (valor.length > 10) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d+)/, "($1) $2");
    }
    campo.value = valor;
}

// Exibe ou oculta o endereço de tele-busca conforme o método escolhido.
function atualizarMetodo() {
    const metodo = document.querySelector('input[name="metodo"]:checked');
    const blocoTeleBusca = document.getElementById("dadosTeleBusca");
    const enderecoBusca = document.getElementById("enderecoBusca");

    if (!blocoTeleBusca || !enderecoBusca) return;

    const usarTeleBusca = metodo && metodo.value === "Tele-busca";
    blocoTeleBusca.classList.toggle("d-none", !usarTeleBusca);
    enderecoBusca.required = usarTeleBusca;
}

// Monta um resumo do agendamento antes de simular o envio do formulário.
function confirmarAgendamento(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
    }

    const dados = new FormData(formulario);
    const servicos = dados.getAll("servico").join(" e ");
    const data = dados.get("data");
    const dataFormatada = data ? data.split("-").reverse().join("/") : "";

    const resumo = document.getElementById("resumoAgendamento");
    resumo.innerHTML = `
        <strong>Agendamento registrado para demonstração.</strong><br>
        Cliente: ${dados.get("nomeCliente")}<br>
        Pet: ${dados.get("nomePet")}<br>
        Serviço: ${servicos}<br>
        Método: ${dados.get("metodo")}<br>
        Data e horário: ${dataFormatada} às ${dados.get("horario")}
    `;
    resumo.classList.remove("d-none");
    resumo.scrollIntoView({ behavior: "smooth", block: "center" });
}
