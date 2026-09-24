// Movendo o objeto 'pages' para o escopo global para que todas as funções o vejam
const data = {

  alunos: [
    { id: "001", nome: "Ana Silva", cpf: "111.222.333-44", turma: "3º A", status: "Ativo" },
    { id: "002", nome: "Bruno Costa", cpf: "555.666.777-88", turma: "3º B", status: "Ativo" }
  ],
  professores: [
    { id: "101", nome: "Carlos Souza", formacao: "Matemática", disciplina: "Álgebra" },
    { id: "102", nome: "Diana Lima", formacao: "História", disciplina: "História do Brasil" }
  ],
  disciplinas: [
    { codigo: "MAT01", nome: "Álgebra", carga: "60h", professor: "Carlos Souza" },
    { codigo: "HIS01", nome: "História do Brasil", carga: "40h", professor: "Diana Lima" }
  ],
  avisos: [
    { titulo: "Rematrícula 2026", texto: "Fique atento aos prazos no portal.", data: "15/01/2026" },
    { titulo: "Feira de Ciências", texto: "Inscrições abertas para novos projetos.", data: "10/01/2026" }
  ]

};

const pages = {

  inicio:             { title: "Visão geral", sub: "Acompanhe as principais informações acadêmicas." },
  alunos:             { title: "Alunos", sub: "Cadastro e gerenciamento dos estudantes." },
  professores:        { title: "Professores", sub: "Cadastro e gerenciamento do corpo docente." },
  disciplinas:        { title: "Disciplinas", sub: "Organize as disciplinas e seus responsáveis." },
  notas:              { title: "Lançamento de notas", sub: "Registre e consulte as notas dos alunos." },
  frequencia:         { title: "Controle de frequência", sub: "Registre presença e ausência dos alunos." },
  matriculas:         { title: "Matrículas", sub: "Gerencie matrículas e vínculos acadêmicos." },
  atividades:         { title: "Atividades acadêmicas", sub: "Acompanhe tarefas, prazos e entregas." },
  avisos:             { title: "Avisos e notificações", sub: "Comunique informações aos alunos." },
  relatorios:         { title: "Relatórios", sub: "Consulte informações acadêmicas consolidadas." },
  config:             { title: "Configurações", sub: "Preferências do sistema em modo demonstração." }

};

// Seletor dinâmico para evitar erros se a função da view não estiver criada ainda
const views = {

  inicio:           typeof viewInicio === "function" ? viewInicio : () => "<h2>Início</h2>",
  alunos:           typeof viewAlunos === "function" ? viewAlunos : () => "<h2>Alunos</h2>",
  professores:      typeof viewProfessores === "function" ? viewProfessores : () => "<h2>Professores</h2>",
  disciplinas:      typeof viewDisciplinas === "function" ? viewDisciplinas : () => "<h2>Disciplinas</h2>",
  notas:            typeof viewNotas === "function" ? viewNotas : () => "<h2>Notas</h2>",
  frequencia:       typeof viewFrequencia === "function" ? viewFrequencia : () => "<h2>Frequência</h2>",
  matriculas:       typeof viewMatriculas === "function" ? viewMatriculas : () => "<h2>Matrículas</h2>",
  atividades:       typeof viewAtividades === "function" ? viewAtividades : () => "<h2>Atividades</h2>",
  avisos:           typeof viewAvisos === "function" ? viewAvisos : () => "<h2>Avisos</h2>",
  relatorios:       typeof viewRelatorios === "function" ? viewRelatorios : () => "<h2>Relatórios</h2>",
  config:           typeof viewConfig === "function" ? viewConfig : () => "<h2>Configurações</h2>"

};


document.addEventListener('DOMContentLoaded', () => {

  const navButtons        = document.querySelectorAll('.nav-item[data-page]');
  const mainContent       = document.getElementById('conteudo-principal');
  const app               = document.getElementById('app');
  const pageTitle         = document.getElementById('pageTitle'); 
  const pageSubtitle      = document.getElementById('pageSubtitle'); 

  function navigateTo(pageKey) {

    const pageData = pages[pageKey];

    if (!pageData) return;

    if (mainContent) mainContent.classList.remove('active');

    setTimeout(() => {

      if (pageTitle) pageTitle.textContent        = pageData.title;
      if (pageSubtitle) pageSubtitle.textContent  = pageData.sub; 
      
      if (app && views[pageKey]) {

        app.innerHTML = views[pageKey]();

      }

      if (window.innerWidth <= 900) {

        const sidebar = document.querySelector(".sidebar");
        if (sidebar) sidebar.classList.remove("open");

      }

      if (pageKey === "alunos" && typeof bindSearch === "function")       bindSearch("alunosTable", "alunoSearch");
      if (pageKey === "professores" && typeof bindSearch === "function")  bindSearch("profTable", "profSearch");
      if (pageKey === "disciplinas" && typeof bindSearch === "function")  bindSearch("discTable", "discSearch");

      if (mainContent) mainContent.classList.add('active');

    }, 300); 
  }

  navButtons.forEach(button => {

    button.addEventListener('click', () => {

      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      navigateTo(button.getAttribute('data-page'));

    });

  });

  navigateTo('inicio');
  
  // Disponibiliza a função globalmente caso seus botões inline (como o "Ver todos") precisem dela
  window.render = navigateTo;
});

// --- SUAS FUNÇÕES DE VIEW (Mantidas intactas) ---

function viewInicio(){

  return `<div class="stats">
    ${stat("♙","Alunos",data.alunos.length,"estudantes cadastrados")}
    ${stat("♟","Professores",data.professores.length,"professores cadastrados")}
    ${stat("▣","Disciplinas",data.disciplinas.length,"disciplinas cadastradas")}
    ${stat("✓","Matrículas","128","vínculos ativos")}
  </div>
  <div class="grid2">
    <div class="card"><div class="section-title"><h2>Resumo acadêmico</h2><span class="muted">2026</span></div>
      <div class="table-wrap"><table class="table"><thead><tr><th>Indicador</th><th>Quantidade</th><th>Status</th></tr></thead><tbody>
        <tr><td>Alunos ativos</td><td>${data.alunos.length}</td><td><span class="badge ok">Ativo</span></td></tr>
        <tr><td>Disciplinas ofertadas</td><td>${data.disciplinas.length}</td><td><span class="badge ok">Ativo</span></td></tr>
        <tr><td>Atividades pendentes</td><td>12</td><td><span class="badge warn">Acompanhar</span></td></tr>
        <tr><td>Frequência média</td><td>91%</td><td><span class="badge ok">Regular</span></td></tr>
      </tbody></table></div>
    </div>
    <div class="card"><div class="section-title"><h2>Últimos avisos</h2><button class="btn secondary" onclick="render('avisos')">Ver todos</button></div>
      ${data.avisos.map(a => `
        <div style="padding:13px 0; border-bottom:1px solid var(--border)">
          <strong>${a.titulo}</strong>
          <p class="muted">${a.texto}</p>
          <small class="muted">${a.data}</small>
        </div>
      `).join("")}
    </div>
  </div>
  <div class="card" style="margin-top:20px"><div class="section-title"><h2>Acesso rápido</h2></div>
  <div class="page-grid">
   ${feature("♙","Cadastrar aluno","Registrar novos estudantes.", "openModal('aluno')")}
   ${feature("♟","Cadastrar professor","Registrar integrantes do corpo docente.", "openModal('professor')")}
   ${feature("▣","Nova disciplina","Adicionar uma disciplina ao sistema.", "openModal('disciplina')")}
  </div></div>`;

}

// Nota: Certifique-se de manter as funções stat(), feature(), viewAlunos(), viewProfessores(), viewDisciplinas() e as restantes abaixo no seu arquivo de script.

function stat(i,t,n,s){return `<div class="card stat"><div><p>${t}</p><div class="num">${n}</div><p>${s}</p></div><div class="icon">${i}</div></div>`}

function feature(i,t,p,fn){return `<div class="card feature"><div class="icon">${i}</div><h3>${t}</h3><p>${p}</p><button class="btn" onclick="${fn.toString().replace(/.*=>|}$/g,"")}">Abrir</button></div>`}

function viewAlunos(){return `<div class="toolbar"><input id="alunoSearch" class="search" placeholder="Pesquisar aluno..."><button class="btn" onclick="openModal('aluno')">+ Novo aluno</button></div><div class="card"><div class="table-wrap"><table class="table" id="alunosTable"><thead><tr><th>Matrícula</th><th>Nome</th><th>CPF</th><th>Turma</th><th>Status</th><th>Ações</th></tr></thead><tbody>${data.alunos.map((a,i)=>`<tr><td>${a.id}</td><td><strong>${a.nome}</strong></td><td>${a.cpf}</td><td>${a.turma}</td><td><span class="badge ok">${a.status}</span></td><td><button class="btn danger" onclick="removeItem('alunos',${i})">Excluir</button></td></tr>`).join("")}</tbody></table></div></div>`}

function viewProfessores(){return `<div class="toolbar"><input id="profSearch" class="search" placeholder="Pesquisar professor..."><button class="btn" onclick="openModal('professor')">+ Novo professor</button></div><div class="card"><table class="table" id="profTable"><thead><tr><th>ID</th><th>Nome</th><th>Formação</th><th>Disciplina</th><th>Ações</th></tr></thead><tbody>${data.professores.map((p,i)=>`<tr><td>${p.id}</td><td>${p.nome}</td><td>${p.formacao}</td><td>${p.disciplina}</td><td><button class="btn danger" onclick="removeItem('professores',${i})">Excluir</button></td></tr>`).join("")}</tbody></table></div>`}

function viewDisciplinas(){return `<div class="toolbar"><input id="discSearch" class="search" placeholder="Pesquisar disciplina..."><button class="btn" onclick="openModal('disciplina')">+ Nova disciplina</button></div><div class="card"><table class="table" id="discTable"><thead><tr><th>Código</th><th>Disciplina</th><th>Carga horária</th><th>Professor</th><th>Ações</th></tr></thead><tbody>${data.disciplinas.map((d,i)=>`<tr><td>${d.codigo}</td><td><strong>${d.nome}</strong></td><td>${d.carga}</td><td>${d.professor}</td><td><button class="btn danger" onclick="removeItem('disciplinas',${i})">Excluir</button></td></tr>`).join("")}</tbody></table></div>`}

function viewNotas(){return `<div class="card"><div class="section-title"><h2>Registrar notas</h2></div><div class="form-grid"><div class="field"><label>Disciplina</label><select id="notaDisc"><option>Programação</option><option>Matemática</option><option>Banco de Dados</option></select></div><div class="field"><label>Aluno</label><select id="notaAluno">${data.alunos.map(a=>`<option>${a.nome}</option>`).join("")}</select></div><div class="field"><label>Nota</label><input id="notaValor" type="number" min="0" max="10" step=".1" placeholder="0 a 10"></div><div class="field"><label>Período</label><select><option>1º Bimestre</option><option>2º Bimestre</option><option>3º Bimestre</option><option>4º Bimestre</option></select></div></div><div class="form-actions"><button class="btn" onclick="saveNota()">Salvar nota</button></div></div><div class="card" style="margin-top:20px"><div class="section-title"><h2>Exemplo de lançamento</h2></div><table class="table"><tr><th>Aluno</th><th>Disciplina</th><th>Nota</th><th>Situação</th></tr><tr><td>Ana Beatriz Silva</td><td>Programação</td><td>8,5</td><td><span class="badge ok">Aprovável</span></td></tr></table></div>`}

function viewFrequencia(){return `<div class="card"><div class="section-title"><h2>Registro de frequência</h2><button class="btn" onclick="saveFrequency()">Salvar frequência</button></div><p class="muted">Marque a presença dos alunos da turma selecionada.</p><div class="form-grid"><div class="field"><label>Disciplina</label><select><option>Programação</option><option>Matemática</option></select></div><div class="field"><label>Data</label><input id="freqData" type="date" value="2026-09-16"></div></div><table class="table" style="margin-top:18px"><thead><tr><th>Aluno</th><th>Matrícula</th><th>Presença</th></tr></thead><tbody>${data.alunos.map((a,i)=>`<tr><td>${a.nome}</td><td>${a.id}</td><td><label><input type="checkbox" class="freq" ${i<2?"checked":""}> Presente</label></td></tr>`).join("")}</tbody></table></div>`}

function viewMatriculas(){return `<div class="card"><div class="section-title"><h2>Renovação / matrículas</h2><button class="btn" onclick="showToast('Matrícula renovada com sucesso!')">Renovar matrícula</button></div><table class="table"><thead><tr><th>Aluno</th><th>Período</th><th>Status</th><th>Disciplinas</th></tr></thead><tbody>${data.alunos.map(a=>`<tr><td>${a.nome}</td><td>2026.2</td><td><span class="badge ok">Ativa</span></td><td>${data.disciplinas.length}</td></tr>`).join("")}</tbody></table></div>`}

function viewAtividades(){return `<div class="page-grid">${feature("☑","Trabalhos","Acompanhe tarefas e prazos acadêmicos.",()=>showToast("Área de trabalhos aberta."))}${feature("⌛","Prazos","Consulte atividades próximas do vencimento.",()=>showToast("Nenhuma atividade vencendo hoje."))}${feature("✓","Entregas","Consulte o acompanhamento das entregas.",()=>showToast("Entregas carregadas."))}</div>`}

function viewAvisos(){return `<div class="toolbar"><span></span><button class="btn" onclick="openModal('aviso')">+ Novo aviso</button></div><div class="page-grid">${data.avisos.map((a,i)=>`<div class="card"><span class="badge warn">${a.data}</span><h3>${a.titulo}</h3><p class="muted">${a.texto}</p><button class="btn danger" onclick="removeItem('avisos',${i})">Excluir</button></div>`).join("")}</div>`}

function viewRelatorios(){return `<div class="page-grid">${["Relatório de alunos","Relatório de notas","Relatório de frequência","Relatório de matrículas","Histórico acadêmico","Boletim escolar"].map((x,i)=>`<div class="card feature"><div class="icon">▤</div><h3>${x}</h3><p>Visualize os dados consolidados e prepare a impressão.</p><button class="btn" onclick="generateReport('${x}')">Gerar relatório</button></div>`).join("")}</div>`}

function viewConfig(){return `<div class="card"><h2>Configurações</h2><p class="muted">Esta versão é um protótipo funcional sem banco de dados. Os dados criados durante a sessão ficam apenas na memória do navegador.</p><div class="form-grid"><div class="field"><label>Nome da instituição</label><input value="Instituição de Ensino"></div><div class="field"><label>Ano letivo</label><input value="2026"></div><div class="field full"><label>Logo</label><input type="file" accept="image/*" onchange="showToast('Logo selecionada para demonstração.')"></div></div></div>`}

function openModal(type){

 const labels={aluno:"Novo aluno",professor:"Novo professor",disciplina:"Nova disciplina",aviso:"Novo aviso"};

 const forms={
 aluno:`<div class="field"><label>Matrícula</label><input id="f1"></div><div class="field"><label>Nome</label><input id="f2"></div><div class="field"><label>CPF</label><input id="f3"></div><div class="field"><label>Turma</label><input id="f4"></div>`,
 professor:`<div class="field"><label>ID</label><input id="f1"></div><div class="field"><label>Nome</label><input id="f2"></div><div class="field"><label>Formação</label><input id="f3"></div><div class="field"><label>Disciplina</label><input id="f4"></div>`,
 disciplina:`<div class="field"><label>Código</label><input id="f1"></div><div class="field"><label>Nome</label><input id="f2"></div><div class="field"><label>Carga horária</label><input id="f3" placeholder="80h"></div><div class="field"><label>Professor</label><input id="f4"></div>`,
 aviso:`<div class="field full"><label>Título</label><input id="f1"></div><div class="field full"><label>Mensagem</label><textarea id="f2" rows="4"></textarea></div>`
 };

 document.body.insertAdjacentHTML("beforeend",`<div class="modal-bg" id="modal"><div class="modal"><div class="section-title"><h2>${labels[type]}</h2><button class="btn secondary" onclick="closeModal()">✕</button></div><div class="form-grid">${forms[type]}</div><div class="form-actions"><button class="btn secondary" onclick="closeModal()">Cancelar</button><button class="btn" onclick="saveForm('${type}')">Salvar</button></div></div></div>`);
}

function closeModal(){document.getElementById("modal")?.remove()}

function saveForm(type){

 const v=[1,2,3,4].map(i=>document.getElementById("f"+i)?.value.trim());
 if(type==="aluno"){if(!v[0]||!v[1])return showToast("Preencha matrícula e nome.");data.alunos.push({id:v[0],nome:v[1],cpf:v[2]||"-",turma:v[3]||"-",status:"Ativo"});render("alunos")}
 if(type==="professor"){if(!v[0]||!v[1])return showToast("Preencha ID e nome.");data.professores.push({id:v[0],nome:v[1],formacao:v[2]||"-",disciplina:v[3]||"-"});render("professores")}
 if(type==="disciplina"){if(!v[0]||!v[1])return showToast("Preencha código e nome.");data.disciplinas.push({codigo:v[0],nome:v[1],carga:v[2]||"-",professor:v[3]||"-"});render("disciplinas")}
 if(type==="aviso"){if(!v[0]||!v[1])return showToast("Preencha título e mensagem.");data.avisos.unshift({titulo:v[0],texto:v[1],data:new Date().toLocaleDateString("pt-BR")});render("avisos")}
 closeModal();showToast("Registro salvo com sucesso.");

}
function removeItem(key,i) {

  if(confirm("Deseja excluir este registro?")) {

    data[key].splice(i, 1);
    render(key==="alunos"?"alunos":key==="professores"?"professores":key==="disciplinas"?"disciplinas":"avisos");
    showToast("Registro excluído.")

  }
}

function bindSearch(tableId, inputId) {

  document.getElementById(inputId)?.addEventListener("input",e=>{const q=e.target.value.toLowerCase();
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?"":"none")

  }
)}

function saveNota() {

  let n = Number(document.getElementById("notaValor").value);
  if(n<0||n>10||Number.isNaN(n))return showToast("Informe uma nota entre 0 e 10.");
  showToast("Nota registrada com sucesso!")

}

function saveFrequency() {

  showToast("Frequência salva com sucesso!")

}

function generateReport(name) {
  const w=window.open("","_blank");w.document.write(
  `

  <html>
    <head>
      <title>${name}</title>
        <style>

          body { 

          font-family: Arial; 
          padding:40px

          }

          h1 {
        
          color: #315c4b

          } 
            
          table {

            width: 100%;
            border-collapse:collapse

          }
              
          td,th {

            padding: 10px;
            border: 1px solid #ddd;
            text-align: left

          }

        </style>
    </head>
    <body>
    
      <h1> SAA — ${name} </h1>

      <p>Relatório gerado em ${new Date().toLocaleString("pt-BR")}</p>

      <table>

        <tr>

          <th>Informação</th>
          <th>Valor</th>

        </tr>

        <tr>

          <td>Alunos cadastrados</td>
          <td>${data.alunos.length}</td>

        </tr>
        <tr>

          <td>Professores cadastrados</td>
          <td>${data.professores.length}</td>

        </tr>
        <tr>

          <td>Disciplinas cadastradas</td>
          <td>${data.disciplinas.length}</td>

        </tr>
      </table>

      <script>

        window.print()

      <\/script>

    </body>
  </html>`);

w.document.close();
}

function showToast(msg) {

  const t                 = document.getElementById("toast");
  t.textContent           = msg;
  t.classList.add("show");
  clearTimeout(window.tt);
  window.tt               = setTimeout(() => t.classList.remove("show"), 2600);

}

function toggleSidebar() {

  document.querySelector(".sidebar").classList.toggle("open");

}

const style = document.createElement("style");

style.textContent = `
  .modal-bg {

    position:     fixed;
    inset:        0;
    background:   rgba(20,30,25,.45);
    display:      grid;
    place-items:  center;
    z-index:      80;
    padding:      20px;

  }

  .modal {

    background:       #fff;
    width:            min(650px,100%);
    border-radius:    14px;
    padding:          24px;
    box-shadow:       0 20px 60px rgba(0,0,0,.2);

  }
`;

document.head.appendChild(style);
