// biblioteca de terceiro =https://day.js.org/docs/en/durations/format

const formatador = (data) => {

  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      },

    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm'),
  }
}

// object = {}
const atividade = {
  nome: "NLW journey",
  data: new Date("2024-07-08 19:00"),
  finalizada: true
}
// lista array vetor = []
let atividades = [
  atividade, {
    nome: "Discord comunidade rocketseat",
    data: new Date("2024-07-09 8:00"),
    finalizada: false
  },
  {
    nome: "Nlw Journey fechando",
    data: new Date("2024-07-11 19:00"),
    finalizada: true
  },

]

// atividades = []

// arrow function = () => {}
// a ${} da para acessar a funcao e abri o dado que quer
const criarItemDeAtividade = (atividade) => {
  let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `
  // vai entende que esta como verdadeiro ja na função If(boolean)
  if (atividade.finalizada) {
    input += 'checked'
  }

  input = input + '>'

  const formatar = formatador(atividade.data)

  return `
            <div class="card-bg">
            ${input}
            <div>
                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>



              <span>${atividade.nome}</span>

            </div>

                <time class="short">${formatar.dia.semana.curto}. 
                    ${formatar.dia.numerico} <br> 
                    ${formatar.hora}
                 </time>


                <time class="full">${formatar.dia.semana.longo} 
                    dia ${formatar.dia.numerico} 
                    de ${formatar.mes} 
                    às ${formatar.hora}h
                 </time>
            </div>
    `
}

const atualizarListaDeAtividades = () => {

  const section = document.querySelector('section')
  // limpar 
  section.innerHTML = ''

  // verificar se a minha lista esta vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
    return
  }
  // loop ou reetição
  for (let atividade of atividades)
    // forma mais cursa de fazer section.innerHTML = section.innerHTML + criarItemDeAtividade(atividade) simplificando por +=
    section.innerHTML += criarItemDeAtividade(atividade)
}


atualizarListaDeAtividades()

const salvaAtividade = (event) => {
  event.preventDefault()
  const dadosDosFormulario = new FormData(event.target)

  const nome = dadosDosFormulario.get('atividade')
  const dia = dadosDosFormulario.get('dia')
  const hora = dadosDosFormulario.get('hora')
  const data = `${dia} ${hora}`
  // alert(data)

  const novaAtividade = {
    nome: nome,
    data: data,
    finalizada: false
  }

  const atividadeExistente = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if (atividadeExistente) {
    return alert("Dia/hora não disponivel")
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtividades()

}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]
  let diasSelecao = ''

  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de
    ${formatar.mes}
    `
    diasSelecao += `
    <option value="${dia}">
    ${diaFormatado}</option>
     `

  }
  document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}


criarDiasSelecao()


const criarhorasSelecao = () => {

  let horasDiposniveis = ''

  for (let i = 6; i < 23; i++) {
    const hora =String(i).padStart(2,'0')
    horasDiposniveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDiposniveis += `<option value="${hora}:30">${hora}:30</option>`
  }
  document.querySelector('select[name="hora"]').innerHTML = horasDiposniveis
}

criarhorasSelecao()


const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) =>{
    return atividade.data == dataDesteInput
  })
  if(!atividade){
    return
  }

  atividade.finalizada = !atividade.finalizada
}

concluirAtividade()
