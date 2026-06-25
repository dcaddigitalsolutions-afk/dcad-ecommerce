import { useState, useMemo } from "react";

const C={red:"#E52229",dark:"#111",dark2:"#1A1A1A",dark3:"#2A2A2A",border:"rgba(255,255,255,0.08)",text:"#FFF",textSec:"#A0A0A0",textMut:"#444",green:"#22C55E",greenBg:"rgba(34,197,94,0.08)",yellow:"#EAB308",blue:"#6366F1"};
const fmt=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

const CATALOG=[
  {id:"implanto",name:"Implantodontia",color:"#E52229",icon:"ti-tooth",desc:"Cirurgia guiada de implantes",
   services:[
     {id:"unit",name:"Cirurgia Guiada Unitária",desc:"1 implante · planejamento + guia",fullDesc:"Guia cirúrgico para instalação de 1 implante com posicionamento tridimensional ideal. Desenvolvido a partir de tomografia e escaneamento intraoral, garantindo precisão submilimétrica.",exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Dados do implante e kit cirúrgico"],price:388.98,built:true,videoUrl:null,planOnly:{name:"Planejamento Cirurgia Guiada Unitária",desc:"1 implante · arquivo digital (STL do guia)",fullDesc:"Planejamento digital completo da cirurgia guiada de 1 implante. Entrega do arquivo STL do guia cirúrgico para impressão pelo cliente. Não inclui impressão física.",price:220.00,exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Dados do implante e kit cirúrgico"]}},
     {id:"parc",name:"Cirurgia Guiada Parcial",desc:"2 a 8 implantes",fullDesc:"Guia cirúrgico para instalação de 2 a 8 implantes em uma mesma sessão, com análise completa da anatomia óssea.",exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Dados dos implantes e kit cirúrgico"],price:464.92,built:false,videoUrl:null,planOnly:{name:"Planejamento Cirurgia Guiada Parcial",desc:"2 a 8 implantes · arquivo digital (STL do guia)",fullDesc:"Planejamento digital completo para 2 a 8 implantes. Entrega dos arquivos STL dos guias para impressão pelo cliente.",price:290.00,exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Dados dos implantes e kit cirúrgico"]}},
     {id:"proto",name:"Protocolo Total",desc:"Arcada completa",fullDesc:"Planejamento completo para reabilitação de arcada total com implantes.",exams:["STL das arcadas","DICOM — tomografia computadorizada da arcada de interesse","Dados dos implantes e kit cirúrgico"],price:904.23,built:false,videoUrl:null},
   ]},
  {id:"estetica",name:"Estética Dental",color:"#EA580C",icon:"ti-sparkles",desc:"Planejamento digital do sorriso",
   services:[
     {id:"dsd2d",name:"Simulação 2D",desc:"Apresentação motivacional",fullDesc:"Apresentação visual do novo sorriso a partir de fotografias clínicas.",exams:["Protocolo fotográfico (JPEG)"],price:250,built:false,videoUrl:null,planOnly:{name:"Simulação 2D — Arquivo Digital",desc:"Arquivo de apresentação · sem impressão",fullDesc:"Arquivo digital da simulação do sorriso 2D para uso em apresentações. Sem impressão ou mockup físico.",price:180,exams:["Protocolo fotográfico (JPEG)"]}},
     {id:"dsd3d",name:"DSD 3D — até 6 dentes",desc:"Enceramento + mockup",fullDesc:"Enceramento diagnóstico digital 3D com até 6 dentes anteriores.",exams:["Protocolo fotográfico (JPEG)","STL dos modelos"],price:466.27,built:false,videoUrl:null},
   ]},
  {id:"reab",name:"Reabilitação Oral",color:"#16A34A",icon:"ti-dental",desc:"Planejamento funcional 3D",
   services:[
     {id:"func3d",name:"Planejamento Funcional 3D",desc:"2 arcadas · articulador virtual",fullDesc:"Enceramento diagnóstico com análise oclusal e articulador virtual, até 28 dentes.",exams:["Protocolo fotográfico (JPEG)","STL dos modelos com registro em MIH e/ou RC"],price:1321.50,built:false,videoUrl:null,planOnly:{name:"Enceramento Digital Funcional 3D",desc:"2 arcadas · arquivo STL do enceramento",fullDesc:"Enceramento diagnóstico digital com articulador virtual. Entrega do arquivo STL do enceramento para impressão pelo cliente.",price:900,exams:["Protocolo fotográfico (JPEG)","STL dos modelos com registro em MIH e/ou RC"]}},
   ]},
  {id:"dtm",name:"DTM",color:"#CA8A04",icon:"ti-shield",desc:"Placa oclusal digital",
   services:[
     {id:"placa",name:"Placa Oclusal Impressa",desc:"Resina rígida biocompatível",fullDesc:"Placa rígida planejada em articulador virtual com contatos oclusais uniformes.",exams:["STL dos modelos com registro em RC (JIG)"],price:360.37,built:false,videoUrl:null,planOnly:{name:"Projeto Placa Oclusal Digital",desc:"Arquivo STL para impressão própria",fullDesc:"Projeto digital da placa oclusal em articulador virtual. Entrega do arquivo STL para impressão pelo cliente.",price:200,exams:["STL dos modelos com registro em RC (JIG)"]}},
   ]},
  {id:"perio",name:"Periodontia",color:"#A855F7",icon:"ti-plant",desc:"Perioguide",
   services:[
     {id:"perioguide",name:"Perioguide",desc:"Guia + planejamento periodontal",fullDesc:"Guia cirúrgico periodontal com definição milimétrica do nível de gengivectomia por dente.",exams:["Protocolo fotográfico (JPEG)","STL ou PLY dos modelos","DICOM — tomografia computadorizada da arcada de interesse (com afastador labial)"],price:650.88,built:false,videoUrl:null,planOnly:{name:"Projeto Perioguide Digital",desc:"Arquivo STL do guia periodontal",fullDesc:"Planejamento digital do guia periodontal com entrega do arquivo STL para impressão pelo cliente.",price:400,exams:["Protocolo fotográfico (JPEG)","STL ou PLY dos modelos","DICOM — tomografia computadorizada da arcada de interesse (com afastador labial)"]}},
   ]},
  {id:"endo",name:"Endodontia",color:"#2563EB",icon:"ti-microscope",desc:"Guia de acesso endodôntico",
   services:[
     {id:"endo_uni",name:"Endo Access Unirradicular",desc:"Canais calcificados",fullDesc:"Guia de acesso endodôntico para dentes unirradiculares com canais calcificados.",exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Kit Endo Access DSP"],price:599.57,built:false,videoUrl:null,planOnly:{name:"Projeto Endo Access Unirradicular Digital",desc:"Arquivo STL do guia endodôntico",fullDesc:"Planejamento digital do guia de acesso endodôntico. Entrega do arquivo STL para impressão pelo cliente.",price:350,exams:["STL da arcada","DICOM — tomografia computadorizada da arcada de interesse","Kit Endo Access DSP"]}},
   ]},
  {id:"imp3d",name:"Impressão 3D",color:"#0D9488",icon:"ti-3d-cube-sphere",desc:"Modelos e biomodelos",
   services:[
     {id:"mod_normal",name:"Modelo base normal",desc:"Adulto ou infantil",fullDesc:"Modelo de estudo para arcada adulto ou infantil, simples ou articulado.",exams:["STL dos modelos"],price:80,built:false,videoUrl:null},
   ]},
  {id:"consult",name:"Consultoria",color:"#DC2626",icon:"ti-bulb",desc:"Suporte especializado",
   services:[
     {id:"consult_online",name:"Consultoria Online",desc:"Por hora",fullDesc:"Suporte especializado por videoconferência para discussão de casos clínicos.",exams:["Imagens e exames do caso"],price:200,built:false,videoUrl:null},
   ]},
];

const IMPLANT_TABLE={
  NEODENT:[
    {model:"HELIX GM Ø 3.5 / Ø 3.75",kit:"EASYGUIDE ESTREITO"},
    {model:"HELIX GM Ø 4.0 / Ø 4.3 / Ø 5.0",kit:"EASYGUIDE REGULAR"},
    {model:"HELIX GM NARROW Ø 2.9",kit:"EASYGUIDE NARROW"},
    {model:"HELIX GM Ø 3.5 – Ø 6.0 (séries GM)",kit:"GRAND MORSE NGS"},
    {model:"DRIVE GM Ø 3.5 / Ø 4.3 / Ø 5.0",kit:"GRAND MORSE NGS"},
    {model:"TITAMAX CM Ø 3.5 – Ø 4.3",kit:"CONE MORSE NGS"},
    {model:"TITAMAX CM EX Ø 3.5 – Ø 4.3",kit:"CONE MORSE NGS"},
    {model:"ALVIM CM Ø 3.5 – Ø 4.3",kit:"CONE MORSE NGS"},
    {model:"DRIVE CM Ø 3.5 – Ø 4.3",kit:"CONE MORSE NGS"},
    {model:"FACILITY Ø 2.9",kit:"CONE MORSE NGS"},
  ],
  SIN:[
    {model:"STRONG SW CM Ø 3.5 / Ø 3.8 / Ø 4.5 / Ø 5.0",kit:"STRONG SW"},
    {model:"STRONG SW HE Ø 4.1 / Ø 4.5 / Ø 5.0",kit:"STRONG SW"},
    {model:"EPIKUT CM Ø 3.5 / Ø 3.8 / Ø 4.5",kit:"EPIKUT"},
    {model:"UNITITE PRIME CM Ø 3.5 / Ø 4.3 / Ø 5.0",kit:"UNITITE"},
    {model:"UNITITE COMPACT CM Ø 4.0 / Ø 5.0 / Ø 6.0",kit:"UNITITE"},
  ],
  PLENUM:[
    {model:"SLIM (SL) Ø 3.0",kit:"PLENUM GUIDE"},
    {model:"REGULAR (RE) Ø 3.5 – Ø 6.0",kit:"PLENUM GUIDE"},
  ],
  STRAUMANN:[
    {model:"BLC / BLX",kit:"STRAUMANN GUIDED SURGERY"},
    {model:"TLC / TLX",kit:"STRAUMANN GUIDED SURGERY"},
    {model:"BLC / BLX",kit:"STRAUMANN iExcel"},
    {model:"TLC / TLX",kit:"STRAUMANN iExcel"},
  ],
  "TITANIUM FIX":[{model:"B-fix Profile Ø 3.0 / Ø 3.5 / Ø 4.0",kit:"GUIDE FIX"}],
  INTRAOSS:[
    {model:"MAX CM ADVANCED Ø 3.5 / Ø 4.3",kit:"INTRAGUIDE"},
    {model:"GRAND OSS ADVANCED Ø 3.5 / Ø 4.3",kit:"INTRAGUIDE"},
  ],
  KOPP:[
    {model:"Cone Morse Screw Platinum Ø 3.5",kit:"SMART GUIDE"},
    {model:"Cone Morse Screw Slim Ø 3.0",kit:"SMART GUIDE"},
  ],
  IMPLACIL:[
    {model:"MAESTRO CM AR Ø 3.5 / Ø 4.0",kit:"IMPLAGUIDE"},
    {model:"DUE CONE CM AR Ø 3.5 / Ø 4.0",kit:"IMPLAGUIDE"},
  ],
};
const BRANDS=Object.keys(IMPLANT_TABLE);
const P={preplan:150,unit:388.98,strauAdd:110,provCaptura:100,provAdesiva:120,cicatriz:80};
const SUP=[[18,17,16,15,14,13,12,11],[21,22,23,24,25,26,27,28]];
const SUP_ALL=[...SUP[0],...SUP[1]];
const arcade=n=>SUP_ALL.includes(n)?"sup":"inf";
const WIZARD_STEPS_BASE=["Pré-planejamento","Dentes","Marca","Kit","Modelo","Complementares","Informações do Caso"];

const PREPLAN_RULES=`Consiste em realizar uma análise prévia dos exames para identificar a viabilidade de execução do serviço. Prazo: 7 dias corridos a contar do envio das informações.

• Positiva: o serviço segue para planejamento e o valor do pré-planejamento será abatido do(s) serviço(s) principal(is).

• Negativa: será cobrado somente o pré-planejamento e o caso será arquivado.

• Sem retorno: será cobrado somente o pré-planejamento. Em caso de resposta positiva após 7 dias, o serviço será cobrado em valor total sem abatimento.

Serviço opcional.`;

const SPECIALTIES_LIST=["Clínico Geral","Implantodontia","Dentística Restauradora","Endodontia","Periodontia","Ortodontia","Prótese Dentária","Cirurgia e Traumatologia","Odontopediatria","Radiologia","Outro"];

export default function App() {
  const [screen,setScreen]=useState("auth");
  const [authTab,setAuthTab]=useState("login");
  const [dentist,setDentist]=useState(null);
  const [profileComplete,setProfileComplete]=useState(false);
  const [profile,setProfile]=useState({docType:"cpf",cpf:"",cnpj:"",razaoSocial:"",rua:"",numero:"",bairro:"",complemento:"",cidade:"",estado:"",cep:"",entregaIgual:true,entRua:"",entNumero:"",entBairro:"",entComplemento:"",entCidade:"",entEstado:"",entCep:""});
  const [loginForm,setLoginForm]=useState({email:"",senha:""});
  const [regForm,setRegForm]=useState({tipo:"dentista",nome:"",cro:"",especialidade:"",clinica:"",whatsapp:"",email:"",senha:"",confirmaSenha:"",docType:"cnpj",cpf:"",cnpj:"",razaoSocial:"",rua:"",numero:"",bairro:"",complemento:"",cidade:"",estado:"",cep:"",entregaIgual:true,entRua:"",entNumero:"",entBairro:"",entComplemento:"",entCidade:"",entEstado:"",entCep:""});
  const [patient,setPatient]=useState(null);
  const [patForm,setPatForm]=useState({nome:"",idade:""});
  const [patSearch,setPatSearch]=useState("");
  const [cepLoading,setCepLoading]=useState(null); // field key being loaded
  const [savedPatients,setSavedPatients]=useState([
    {id:"p1",nome:"Maria das Graças Almeida",idade:"42 anos"},
    {id:"p2",nome:"José Carlos Alves",idade:"58 anos"},
    {id:"p3",nome:"Ana Paula Costa",idade:"35 anos"},
    {id:"p4",nome:"Roberto Ferreira Silva",idade:"61 anos"},
  ]);
  const [specialty,setSpecialty]=useState(null);
  const [serviceType,setServiceType]=useState(null);  // 'print' | 'planOnly'
  const [showDisclaimer,setShowDisclaimer]=useState(false);
  const [service,setService]=useState(null);
  const [showRules,setShowRules]=useState(false);
  const [videoModal,setVideoModal]=useState(null);
  const [toast,setToast]=useState("");
  const [A,setA]=useState({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});
  const [freight,setFreight]=useState({method:null,value:0,prazo:"",loading:false,simulated:false});
  const [freightOptions,setFreightOptions]=useState(null);
  const [cepDestino,setCepDestino]=useState("");
  const [services,setServices]=useState([]);
  const [mockOrders]=useState([
    {id:"001",patient:"Maria das Graças",service:"Cirurgia Guiada Unitária",specialty:"Implantodontia",total:388.98,status:"planning",date:"20/06/2026"},
    {id:"002",patient:"José Alves",service:"DSD 3D — até 6 dentes",specialty:"Estética Dental",total:466.27,status:"shipped",date:"18/06/2026"},
    {id:"003",patient:"Ana Costa",service:"Placa Oclusal Impressa",specialty:"DTM",total:360.37,status:"pending_payment",date:"24/06/2026"},
  ]);
  const set=(k,v)=>setA(a=>({...a,[k]:v}));

  function toggleTooth(n){
    const arc=arcade(n);
    setA(a=>{
      const rest=a.teeth.filter(t=>arcade(t)!==arc);
      return {...a,teeth:a.teeth.includes(n)?a.teeth.filter(t=>t!==n):[...rest,n]};
    });
  }
  const kitsFor=b=>b?[...new Set((IMPLANT_TABLE[b]||[]).map(r=>r.kit))]:[];
  const modelsFor=(b,k)=>b&&k?(IMPLANT_TABLE[b]||[]).filter(r=>r.kit===k).map(r=>r.model).filter(Boolean):[];

  // ── Discount: must be defined BEFORE calcTotal ─────────────────────────
  const accountType=dentist?.accountType||"dentista";
  const accountStatus=dentist?.accountStatus||"active";
  const discount=accountStatus==="active"&&(accountType==="clinica"||accountType==="cursos")?0.15:0;
  const applyDiscount=v=>parseFloat((v*(1-discount)).toFixed(2));

  function calcTotal(sv){
    let t=sv.teeth.length*P.unit;
    if(sv.brand==="STRAUMANN")t+=P.strauAdd;
    if(sv.comps.includes("captura"))t+=P.provCaptura*sv.teeth.length;
    if(sv.comps.includes("adesiva"))t+=P.provAdesiva*sv.teeth.length;
    if(sv.comps.includes("cicatriz"))t+=P.cicatriz*sv.teeth.length;
    return parseFloat((t*(1-discount)).toFixed(2));
  }
  /* ── Correios freight calculation ──────────────────────────────────────
     * In production: call Correios REST API (OAuth2 token required)
     * POST https://api.correios.com.br/preco/v1/nacional/{contrato}
     * Headers: Authorization: Bearer {token}
     * Body: { cepOrigem, cepDestino, peso, comprimento, altura, largura }
     * ─────────────────────────────────────────────────────────────────── */
  async function calcularFrete(cepInput) {
    setFreight(f=>({...f,loading:true,method:null,value:0}));
    setFreightOptions(null);
    await new Promise(r=>setTimeout(r,1200)); // simulate API latency
    // TODO: replace with real Correios API call
    const base=Math.random()*8+14; // PAC: R$14-22
    const options={
      pac:{prazo:"5 a 8 dias úteis",valor:parseFloat(base.toFixed(2)),codigo:"03298"},
      sedex:{prazo:"1 a 2 dias úteis",valor:parseFloat((base*2.1).toFixed(2)),codigo:"03220"},
    };
    setFreightOptions(options);
    setFreight(f=>({...f,loading:false,simulated:true}));
  }

  async function buscarCEP(cep, onSuccess, fieldKey){
    const nums = cep.replace(/\D/g,"");
    if(nums.length!==8){setToast("CEP inválido. Digite 8 dígitos.");return;}
    setCepLoading(fieldKey);
    try{
      const res = await fetch(`https://viacep.com.br/ws/${nums}/json/`);
      const data = await res.json();
      if(data.erro){setToast("CEP não encontrado. Verifique e tente novamente.");}
      else{onSuccess(data);setToast("");}
    }catch(e){
      setToast("Erro ao buscar CEP. Verifique sua conexão.");
    }finally{
      setCepLoading(null);
    }
  }

  function finalize(){
    const freightVal=serviceType==="print"?freight.value:0;
    const svc={id:Date.now(),specialty:specialty?.name,name:"Cirurgia Guiada Unitária"+(A.teeth.length>1?" (2 arcadas)":""),teeth:[...A.teeth],brand:A.brand,kit:A.kit,model:A.model||(A.modelText||"Não especificado"),comps:[...A.comps],observacoes:A.observacoes,serviceType,freight:freightVal>0?{...freight}:null,total:calcTotal(A)+freightVal};
    setServices(s=>[...s,svc]);
    setScreen("resumo");
  }
  function addNew(){
    setA({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});
    setFreight({method:null,value:0,prazo:"",loading:false,simulated:false});
    setFreightOptions(null);
    setCepDestino("");
    setSpecialty(null);setService(null);setScreen("dashboard");
  }
  function resetAll(){
    setDentist(null);setPatient(null);setServices([]);addNew();setScreen("auth");
  }

  const WIZARD_STEPS=serviceType==="print"?[...WIZARD_STEPS_BASE,"Frete"]:WIZARD_STEPS_BASE;
  const doubleGuide=A.teeth.length===2;
  const totalAll=services.reduce((s,sv)=>s+sv.total,0);
  const FRETE_GRATIS_MIN=1000;
  const deliveryCity=(profile?.entregaIgual===false?profile.entCidade:profile?.cidade)||"";
  const cepNums=cepDestino.replace(/\D/g,"");
  const isSaoLuisByCEP=cepNums.length>=3&&/^650/.test(cepNums);
  const isSaoLuisByCity=/s[aã]o[\s-]*lu[ií]s/i.test(deliveryCity);
  const isSaoLuis=isSaoLuisByCEP||isSaoLuisByCity;
  const freteGratis=calcTotal(A)>=FRETE_GRATIS_MIN||isSaoLuis;
  const stepNum=typeof screen==="number"?screen:-1;

  const W={maxWidth:600,margin:"0 auto",padding:"24px 16px"};

  return (
    <div style={{minHeight:"100vh",background:C.dark,fontFamily:"system-ui,sans-serif",color:C.text,position:"relative"}}>

      {/* ── DISCLAIMER MODAL — standalone ── */}
      {showDisclaimer&&(
        <div onClick={()=>setShowDisclaimer(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.85)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:20,minHeight:"100vh"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.dark2,border:"1px solid rgba(255,165,0,0.4)",borderRadius:14,padding:24,maxWidth:480,width:"100%"}}>
            <div style={{fontSize:26,marginBottom:12}}>⚠️</div>
            <div style={{fontSize:15,fontWeight:800,marginBottom:10}}>Atenção — Impressão pelo cliente</div>
            <div style={{fontSize:13,color:"#FCD34D",lineHeight:1.7,marginBottom:16}}>
              A D-CAD não se responsabiliza por falhas de impressão, erros de calibração ou quaisquer outros fatores relacionados ao processo de impressão 3D realizado pelo cliente.
            </div>
            <div style={{fontSize:12,color:C.textSec,lineHeight:1.6,marginBottom:20}}>
              Ao continuar, você confirma que está ciente desta condição e que a D-CAD entregará apenas os arquivos digitais do planejamento.
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowDisclaimer(false)} style={{flex:1,padding:"11px 0",background:C.dark3,border:`1px solid ${C.border}`,borderRadius:10,color:C.textSec,fontSize:13,cursor:"pointer"}}>
                Voltar
              </button>
              <button onClick={()=>{setShowDisclaimer(false);setServiceType("planOnly");setScreen("services");}} style={{flex:1,padding:"11px 0",background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",borderRadius:10,color:"#FCD34D",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Entendido — continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {(showRules||videoModal)&&(
        <div onClick={()=>{setShowRules(false);setVideoModal(null);}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.82)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:20,minHeight:"100vh"}}>
          {showRules&&(
            <div onClick={e=>e.stopPropagation()} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:14,padding:24,maxWidth:500,width:"100%",maxHeight:"70vh",overflowY:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontSize:15,fontWeight:800}}>Regras do Pré-planejamento</span>
                <button onClick={()=>setShowRules(false)} style={{background:"none",border:"none",color:C.textSec,fontSize:22,cursor:"pointer",padding:0,lineHeight:1}}>×</button>
              </div>
              <pre style={{fontSize:13,color:C.text,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"inherit",margin:0}}>{PREPLAN_RULES}</pre>
              <button onClick={()=>setShowRules(false)} style={{marginTop:16,width:"100%",padding:11,background:C.red,border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>Fechar</button>
            </div>
          )}
          {videoModal&&(
            <div onClick={e=>e.stopPropagation()} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:14,width:"100%",maxWidth:520,overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div><div style={{fontWeight:800,fontSize:14}}>{videoModal.title}</div><div style={{fontSize:11,color:C.textSec}}>Vídeo explicativo</div></div>
                <button onClick={()=>setVideoModal(null)} style={{background:"none",border:"none",color:C.textSec,fontSize:22,cursor:"pointer",padding:0}}>×</button>
              </div>
              <div style={{padding:"32px 20px",textAlign:"center"}}>
                <div style={{fontSize:38,marginBottom:10}}>🎬</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>Vídeo em breve</div>
                <div style={{fontSize:13,color:C.textSec,lineHeight:1.6}}>O vídeo explicativo deste serviço está sendo produzido.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TOAST ── */}
      {toast&&<div onClick={()=>setToast("")} style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",background:"#333",color:"#fff",padding:"10px 18px",borderRadius:10,fontSize:13,fontWeight:600,zIndex:40,cursor:"pointer",whiteSpace:"nowrap"}}>{toast} ×</div>}

      {/* ── HEADER ── */}
      <div style={{background:C.dark2,borderBottom:`1px solid ${C.border}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,background:C.red,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0}}>D</div>
          <span style={{fontWeight:800,fontSize:14}}>D-CAD <span style={{color:C.red}}>·</span> Portal</span>
        </div>
        {dentist&&(
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {patient&&<span style={{fontSize:12,color:C.textSec}}>Paciente: <b style={{color:C.text}}>{patient.nome}</b></span>}
            {discount>0&&<span style={{fontSize:10,fontWeight:700,background:"rgba(34,197,94,0.15)",color:C.green,padding:"3px 9px",borderRadius:20}}>15% desconto</span>}
            <div style={{width:28,height:28,borderRadius:"50%",background:C.dark3,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.red}}>
              {dentist.nome.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <button onClick={resetAll} style={{background:"none",border:`1px solid ${C.border}`,color:C.textSec,fontSize:11,padding:"4px 10px",borderRadius:6,cursor:"pointer"}}>Sair</button>
          </div>
        )}
      </div>

      {/* ── BREADCRUMB ── */}
      {dentist&&patient&&screen!=="auth"&&screen!=="patient"&&screen!=="pending"&&(
        <div style={{background:C.dark2,padding:"6px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.textSec}}>
          <span style={{cursor:"pointer"}} onClick={()=>{setScreen("specialties");setSpecialty(null);setService(null);}}>Especialidades</span>
          {specialty&&<><span>›</span><span style={{cursor:"pointer"}} onClick={()=>{setScreen("services");setService(null);}}>{specialty.name}</span></>}
          {service&&<><span>›</span><span style={{color:C.text}}>{service.name}</span></>}
        </div>
      )}

      {/* ── WIZARD PROGRESS ── */}
      {stepNum>=0&&(
        <div style={{background:C.dark2,padding:"8px 20px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{height:2,background:C.dark3,borderRadius:1,overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",width:(stepNum/(WIZARD_STEPS.length-1)*100)+"%",background:C.red,transition:"width .3s"}}/>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {WIZARD_STEPS.map((l,i)=>(
                <span key={i} style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:i===stepNum?C.red:i<stepNum?"rgba(229,34,41,0.15)":C.dark3,color:i===stepNum?"#fff":i<stepNum?C.red:C.textSec,fontWeight:i===stepNum?700:400}}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PROFILE INCOMPLETE BANNER ── */}
      {dentist&&!profileComplete&&screen!=="auth"&&screen!=="profile"&&screen!=="pending"&&(
        <div style={{background:"rgba(234,179,8,0.12)",borderBottom:"1px solid rgba(234,179,8,0.3)",padding:"9px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#FCD34D"}}>
            <span style={{fontSize:14}}>⚠️</span>
            <span><b>Cadastro incompleto.</b> Finalize seus dados de cobrança e entrega para poder concluir compras.</span>
          </div>
          <button onClick={()=>setScreen("profile")} style={{background:"rgba(234,179,8,0.2)",border:"1px solid rgba(234,179,8,0.4)",color:"#FCD34D",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:6,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
            Completar agora →
          </button>
        </div>
      )}

      <div style={W}>

        {/* ════════════════════════════════
            AUTH SCREEN
        ════════════════════════════════ */}
        {screen==="auth"&&(
          <div style={{maxWidth:420,margin:"0 auto",paddingTop:24}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{width:56,height:56,background:C.red,borderRadius:14,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff",marginBottom:14}}>D</div>
              <div style={{fontSize:22,fontWeight:800,marginBottom:4}}>D-CAD Portal</div>
              <div style={{fontSize:13,color:C.textSec}}>Acesso exclusivo para dentistas cadastrados</div>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",background:C.dark3,borderRadius:10,padding:3,marginBottom:20}}>
              {[["login","Entrar"],["reg","Criar conta"]].map(([t,l])=>(
                <button key={t} onClick={()=>setAuthTab(t)} style={{flex:1,padding:"9px 0",borderRadius:8,border:"none",background:authTab===t?C.dark2:"transparent",color:authTab===t?C.text:C.textSec,fontWeight:authTab===t?700:400,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
                  {l}
                </button>
              ))}
            </div>

            {authTab==="login"&&(
              <div>
                <Field label="E-mail" type="email" value={loginForm.email} onChange={v=>setLoginForm(f=>({...f,email:v}))} placeholder="seu@email.com"/>
                <Field label="Senha" type="password" value={loginForm.senha} onChange={v=>setLoginForm(f=>({...f,senha:v}))} placeholder="••••••••"/>
                <button onClick={()=>{if(!loginForm.email||!loginForm.senha){setToast("Preencha e-mail e senha.");return;}setDentist({nome:"Dr. João da Silva",cro:"12345",clinica:"Clínica D-CAD",email:loginForm.email});setScreen("dashboard");}} style={btnStyle(C.red)}>
                  Entrar
                </button>
                <div style={{textAlign:"center",marginTop:12}}>
                  <button onClick={()=>{}} style={{background:"none",border:"none",color:C.textSec,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Esqueci minha senha</button>
                </div>
              </div>
            )}

            {authTab==="reg"&&(
              <div>
                {/* Tipo de conta */}
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:8,letterSpacing:.5}}>TIPO DE CONTA *</label>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {[
                      {v:"dentista",icon:"🦷",label:"Dentista"},
                      {v:"clinica", icon:"🏥",label:"Clínica Radiológica"},
                      {v:"cursos",  icon:"🎓",label:"Cursos e Instituições"},
                    ].map(t=>(
                      <button key={t.v} onClick={()=>setRegForm(f=>({...f,tipo:t.v}))}
                        style={{display:"flex",alignItems:"center",gap:10,background:regForm.tipo===t.v?"rgba(229,34,41,0.08)":C.dark2,border:`1.5px solid ${regForm.tipo===t.v?C.red:C.border}`,borderRadius:10,padding:"11px 13px",cursor:"pointer",textAlign:"left",color:C.text}}>
                        <span style={{fontSize:18,flexShrink:0}}>{t.icon}</span>
                        <div style={{flex:1,fontSize:13,fontWeight:700,color:regForm.tipo===t.v?C.red:C.text}}>{t.label}</div>
                        <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${regForm.tipo===t.v?C.red:C.border}`,background:regForm.tipo===t.v?C.red:"transparent",flexShrink:0}}/>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dados básicos */}
                <Field label="Nome completo *" value={regForm.nome} onChange={v=>setRegForm(f=>({...f,nome:v}))} placeholder="Dr. João da Silva"/>
                <Field label="CRO *" value={regForm.cro} onChange={v=>setRegForm(f=>({...f,cro:v}))} placeholder="CRO-MA 12345"/>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>ESPECIALIDADE PRINCIPAL</label>
                  <select value={regForm.especialidade} onChange={e=>setRegForm(f=>({...f,especialidade:e.target.value}))}
                    style={{width:"100%",background:C.dark2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 12px",color:regForm.especialidade?C.text:C.textSec,fontSize:13,outline:"none",boxSizing:"border-box"}}>
                    <option value="">Selecione...</option>
                    {SPECIALTIES_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <Field label="Nome da clínica / instituição" value={regForm.clinica} onChange={v=>setRegForm(f=>({...f,clinica:v}))} placeholder="Clínica XYZ Odontologia"/>
                <Field label="WhatsApp *" value={regForm.whatsapp} onChange={v=>setRegForm(f=>({...f,whatsapp:v}))} placeholder="(98) 99999-9999"/>
                <Field label="E-mail *" type="email" value={regForm.email} onChange={v=>setRegForm(f=>({...f,email:v}))} placeholder="seu@email.com"/>
                <Field label="Senha *" type="password" value={regForm.senha} onChange={v=>setRegForm(f=>({...f,senha:v}))} placeholder="Mínimo 8 caracteres"/>
                <Field label="Confirmar senha *" type="password" value={regForm.confirmaSenha} onChange={v=>setRegForm(f=>({...f,confirmaSenha:v}))} placeholder="Repita a senha"/>

                {/* Dados adicionais para Clínica Radiológica e Cursos */}
                {["clinica","cursos"].includes(regForm.tipo)&&(
                  <div>
                    <div style={{borderTop:`1px solid ${C.border}`,margin:"16px 0 14px",paddingTop:14}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.yellow,letterSpacing:1,marginBottom:14,display:"flex",alignItems:"center",gap:6}}>
                        <span>⚠️</span> DADOS COMPLEMENTARES (obrigatórios para aprovação)
                      </div>

                      {/* CPF / CNPJ */}
                      <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:8,letterSpacing:.5}}>TIPO DE DOCUMENTO *</label>
                      <div style={{display:"flex",gap:8,marginBottom:12}}>
                        {[["cpf","CPF"],["cnpj","CNPJ"]].map(([v,l])=>(
                          <button key={v} onClick={()=>setRegForm(f=>({...f,docType:v}))}
                            style={{flex:1,padding:"9px 0",border:`1.5px solid ${regForm.docType===v?C.red:C.border}`,borderRadius:8,background:regForm.docType===v?"rgba(229,34,41,0.08)":C.dark2,color:regForm.docType===v?C.red:C.textSec,fontWeight:regForm.docType===v?700:400,fontSize:13,cursor:"pointer"}}>
                            {l}
                          </button>
                        ))}
                      </div>
                      {regForm.docType==="cpf"
                        ?<Field label="CPF *" value={regForm.cpf} onChange={v=>setRegForm(f=>({...f,cpf:v}))} placeholder="000.000.000-00"/>
                        :<div>
                          <Field label="CNPJ *" value={regForm.cnpj} onChange={v=>setRegForm(f=>({...f,cnpj:v}))} placeholder="00.000.000/0001-00"/>
                          <Field label="Razão Social *" value={regForm.razaoSocial} onChange={v=>setRegForm(f=>({...f,razaoSocial:v}))} placeholder="Nome conforme CNPJ"/>
                        </div>
                      }

                      {/* Endereço de cobrança */}
                      <div style={{fontSize:11,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:10,marginTop:4}}>ENDEREÇO DE COBRANÇA</div>
                      <div style={{marginBottom:12}}>
                        <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>CEP * <span style={{fontSize:10,color:C.blue,fontWeight:400}}>— Buscar preenche os campos automaticamente</span></label>
                        <div style={{display:"flex",gap:8}}>
                          <input value={regForm.cep} onChange={e=>setRegForm(f=>({...f,cep:e.target.value}))} placeholder="00000-000" maxLength={9}
                            style={{flex:1,background:C.dark2,border:`1px solid ${regForm.cep?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                          <button onClick={()=>buscarCEP(regForm.cep,(d)=>setRegForm(f=>({...f,rua:d.logradouro||f.rua,bairro:d.bairro||f.bairro,cidade:d.localidade||f.cidade,estado:d.uf||f.estado})),"reg_billing")}
                            disabled={cepLoading==="reg_billing"}
                            style={{padding:"0 14px",background:C.blue,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:cepLoading==="reg_billing"?0.6:1,whiteSpace:"nowrap"}}>
                            {cepLoading==="reg_billing"?"...":"Buscar"}
                          </button>
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8}}>
                        <Field label="Rua / Avenida *" value={regForm.rua} onChange={v=>setRegForm(f=>({...f,rua:v}))} placeholder="Preenchido automaticamente"/>
                        <Field label="Número *" value={regForm.numero} onChange={v=>setRegForm(f=>({...f,numero:v}))} placeholder="444"/>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <Field label="Bairro *" value={regForm.bairro} onChange={v=>setRegForm(f=>({...f,bairro:v}))} placeholder="Preenchido automaticamente"/>
                        <Field label="Complemento" value={regForm.complemento} onChange={v=>setRegForm(f=>({...f,complemento:v}))} placeholder="Sala, apto..."/>
                        <Field label="Cidade *" value={regForm.cidade} onChange={v=>setRegForm(f=>({...f,cidade:v}))} placeholder="Preenchido automaticamente"/>
                        <div style={{marginBottom:12}}>
                          <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>ESTADO *</label>
                          <select value={regForm.estado} onChange={e=>setRegForm(f=>({...f,estado:e.target.value}))}
                            style={{width:"100%",background:C.dark2,border:`1px solid ${regForm.estado?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 12px",color:regForm.estado?C.text:C.textSec,fontSize:13,outline:"none",boxSizing:"border-box"}}>
                            <option value="">UF</option>
                            {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Endereço de entrega */}
                      <div style={{fontSize:11,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:10,marginTop:4}}>ENDEREÇO DE ENTREGA</div>
                      <button onClick={()=>setRegForm(f=>({...f,entregaIgual:!f.entregaIgual}))}
                        style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:"0 0 12px 0",color:C.text}}>
                        <div style={{width:18,height:18,borderRadius:4,background:regForm.entregaIgual?C.green:C.dark3,border:`1.5px solid ${regForm.entregaIgual?C.green:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:regForm.entregaIgual?"#111":"transparent",fontWeight:800,flexShrink:0}}>
                          {regForm.entregaIgual?"✓":""}
                        </div>
                        <span style={{fontSize:13}}>Mesmo endereço de cobrança</span>
                      </button>
                      {!regForm.entregaIgual&&(
                        <div>
                          <div style={{marginBottom:12}}>
                            <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>CEP * <span style={{fontSize:10,color:C.blue,fontWeight:400}}>— Buscar preenche automaticamente</span></label>
                            <div style={{display:"flex",gap:8}}>
                              <input value={regForm.entCep} onChange={e=>setRegForm(f=>({...f,entCep:e.target.value}))} placeholder="00000-000" maxLength={9}
                                style={{flex:1,background:C.dark2,border:`1px solid ${regForm.entCep?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                              <button onClick={()=>buscarCEP(regForm.entCep,(d)=>setRegForm(f=>({...f,entRua:d.logradouro||f.entRua,entBairro:d.bairro||f.entBairro,entCidade:d.localidade||f.entCidade,entEstado:d.uf||f.entEstado})),"reg_delivery")}
                                disabled={cepLoading==="reg_delivery"}
                                style={{padding:"0 14px",background:C.blue,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:cepLoading==="reg_delivery"?0.6:1,whiteSpace:"nowrap"}}>
                                {cepLoading==="reg_delivery"?"...":"Buscar"}
                              </button>
                            </div>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8}}>
                            <Field label="Rua *" value={regForm.entRua} onChange={v=>setRegForm(f=>({...f,entRua:v}))} placeholder="Preenchido automaticamente"/>
                            <Field label="Número *" value={regForm.entNumero} onChange={v=>setRegForm(f=>({...f,entNumero:v}))} placeholder="100"/>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                            <Field label="Bairro *" value={regForm.entBairro} onChange={v=>setRegForm(f=>({...f,entBairro:v}))} placeholder="Preenchido automaticamente"/>
                            <Field label="Complemento" value={regForm.entComplemento} onChange={v=>setRegForm(f=>({...f,entComplemento:v}))} placeholder="Sala, apto..."/>
                            <Field label="Cidade *" value={regForm.entCidade} onChange={v=>setRegForm(f=>({...f,entCidade:v}))} placeholder="Preenchido automaticamente"/>
                            <div style={{marginBottom:12}}>
                              <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>ESTADO *</label>
                              <select value={regForm.entEstado} onChange={e=>setRegForm(f=>({...f,entEstado:e.target.value}))}
                                style={{width:"100%",background:C.dark2,border:`1px solid ${regForm.entEstado?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 12px",color:regForm.entEstado?C.text:C.textSec,fontSize:13,outline:"none",boxSizing:"border-box"}}>
                                <option value="">UF</option>
                                {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                )}

                <button onClick={()=>{
                  if(!regForm.nome||!regForm.cro||!regForm.whatsapp||!regForm.email||!regForm.senha){setToast("Preencha todos os campos obrigatórios.");return;}
                  if(regForm.senha!==regForm.confirmaSenha){setToast("As senhas não coincidem.");return;}
                  const needsApproval=["clinica","cursos"].includes(regForm.tipo);
                  if(needsApproval){
                    const doc=regForm.docType==="cpf"?regForm.cpf:regForm.cnpj;
                    const razao=regForm.docType==="cnpj"&&!regForm.razaoSocial;
                    const addr=!regForm.rua||!regForm.numero||!regForm.bairro||!regForm.cidade||!regForm.estado||!regForm.cep;
                    const ent=!regForm.entregaIgual&&(!regForm.entRua||!regForm.entNumero||!regForm.entCidade||!regForm.entEstado||!regForm.entCep);
                    if(!doc||razao||addr||ent){setToast("Preencha todos os campos obrigatórios para aprovação.");return;}
                    // Save profile from regForm
                    setProfile({docType:regForm.docType,cpf:regForm.cpf,cnpj:regForm.cnpj,razaoSocial:regForm.razaoSocial,rua:regForm.rua,numero:regForm.numero,bairro:regForm.bairro,complemento:regForm.complemento,cidade:regForm.cidade,estado:regForm.estado,cep:regForm.cep,entregaIgual:regForm.entregaIgual,entRua:regForm.entRua,entNumero:regForm.entNumero,entBairro:regForm.entBairro,entComplemento:regForm.entComplemento,entCidade:regForm.entCidade,entEstado:regForm.entEstado,entCep:regForm.entCep});
                    setProfileComplete(true);
                  }
                  setDentist({nome:regForm.nome,cro:regForm.cro,clinica:regForm.clinica,email:regForm.email,accountType:regForm.tipo,accountStatus:needsApproval?"pending":"active"});
                  setScreen(needsApproval?"pending":"profile");
                }} style={btnStyle(C.red)}>
                  {["clinica","cursos"].includes(regForm.tipo)?"Criar conta e aguardar aprovação":"Criar conta e continuar"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════
            PENDING APPROVAL SCREEN
        ════════════════════════════════ */}
        {screen==="pending"&&(
          <div style={{maxWidth:420,margin:"0 auto",paddingTop:16,textAlign:"center"}}>
            <div style={{fontSize:52,marginBottom:16}}>⏳</div>
            <div style={{fontSize:20,fontWeight:800,marginBottom:8}}>Cadastro em análise</div>
            <div style={{fontSize:13,color:C.textSec,lineHeight:1.7,marginBottom:24}}>
              Seu cadastro como <b style={{color:C.text}}>{dentist?.accountType==="clinica"?"Clínica Radiológica":"Curso / Instituição"}</b> foi recebido e está aguardando aprovação da equipe D-CAD.<br/><br/>
              Você receberá uma confirmação por e-mail em até <b style={{color:C.text}}>48 horas úteis</b>.
            </div>

            <div style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:14,padding:20,marginBottom:20,textAlign:"left"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.textSec,letterSpacing:1,marginBottom:12}}>APÓS A APROVAÇÃO VOCÊ TERÁ ACESSO A:</div>
              {[
                ["💰","Desconto fixo de 15% em todos os serviços"],
                ["🛒","Plataforma completa de contratação de serviços"],
                ["📊","Portal de acompanhamento de pedidos"],
                ["📁","Histórico de casos e planejamentos"],
              ].map(([icon,txt],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
                  <span style={{fontSize:16}}>{icon}</span>
                  <span style={{fontSize:13,color:C.textSec}}>{txt}</span>
                </div>
              ))}
            </div>

            <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:12,padding:16,marginBottom:20,textAlign:"left",fontSize:13,color:C.textSec,lineHeight:1.6}}>
              Dúvidas? Fale com a equipe D-CAD:<br/>
              <b style={{color:C.text}}>WhatsApp: (98) 98542-5982</b>
            </div>

            {/* Demo only: simulate approval */}
            <div style={{background:"rgba(234,179,8,0.06)",border:"1px solid rgba(234,179,8,0.2)",borderRadius:10,padding:14,marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.yellow,letterSpacing:1,marginBottom:8}}>MODO DE DEMONSTRAÇÃO</div>
              <button onClick={()=>{setDentist(d=>({...d,accountStatus:"active"}));setScreen("dashboard");}}
                style={{width:"100%",padding:"10px 0",background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:8,color:C.green,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                ✓ Simular aprovação pelo admin D-CAD
              </button>
            </div>
            <button onClick={resetAll} style={{background:"none",border:"none",color:C.textSec,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Voltar ao início</button>
          </div>
        )}

        {/* ════════════════════════════════
            PROFILE COMPLETION
        ════════════════════════════════ */}
        {screen==="profile"&&(
          <div style={{maxWidth:480,margin:"0 auto",paddingTop:8}}>
            <div style={{marginBottom:20}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(234,179,8,0.12)",border:"1px solid rgba(234,179,8,0.3)",borderRadius:20,padding:"4px 12px",marginBottom:12}}>
                <span style={{fontSize:12}}>⚠️</span>
                <span style={{fontSize:11,fontWeight:700,color:"#FCD34D"}}>Cadastro pendente</span>
              </div>
              <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Complete seu cadastro</div>
              <div style={{fontSize:13,color:C.textSec,lineHeight:1.6}}>Necessário para emissão de nota fiscal e envio dos produtos. Você pode navegar livremente, mas precisará completar antes de finalizar qualquer compra.</div>
            </div>

            {/* CPF / CNPJ */}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:8,letterSpacing:.5}}>TIPO DE DOCUMENTO</label>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {[["cpf","CPF"],["cnpj","CNPJ"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setProfile(p=>({...p,docType:v}))}
                    style={{flex:1,padding:"9px 0",border:`1.5px solid ${profile.docType===v?C.red:C.border}`,borderRadius:8,background:profile.docType===v?"rgba(229,34,41,0.08)":C.dark2,color:profile.docType===v?C.red:C.textSec,fontWeight:profile.docType===v?700:400,fontSize:13,cursor:"pointer"}}>
                    {l}
                  </button>
                ))}
              </div>
              {profile.docType==="cpf"&&(
                <Field label="CPF *" value={profile.cpf} onChange={v=>setProfile(p=>({...p,cpf:v}))} placeholder="000.000.000-00"/>
              )}
              {profile.docType==="cnpj"&&(<>
                <Field label="CNPJ *" value={profile.cnpj} onChange={v=>setProfile(p=>({...p,cnpj:v}))} placeholder="00.000.000/0001-00"/>
                <Field label="Razão Social *" value={profile.razaoSocial} onChange={v=>setProfile(p=>({...p,razaoSocial:v}))} placeholder="Nome da empresa conforme CNPJ"/>
              </>)}
            </div>

            {/* Endereço */}
            <div style={{padding:"12px 14px",background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:10,marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:12}}>ENDEREÇO DE COBRANÇA</div>
              <div style={{marginBottom:12}}>
                <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>CEP * <span style={{fontSize:10,color:C.blue,fontWeight:400}}>— Buscar preenche os campos automaticamente</span></label>
                <div style={{display:"flex",gap:8}}>
                  <input value={profile.cep} onChange={e=>setProfile(p=>({...p,cep:e.target.value}))} placeholder="00000-000" maxLength={9}
                    style={{flex:1,background:C.dark2,border:`1px solid ${profile.cep?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  <button onClick={()=>buscarCEP(profile.cep,(d)=>setProfile(p=>({...p,rua:d.logradouro||p.rua,bairro:d.bairro||p.bairro,cidade:d.localidade||p.cidade,estado:d.uf||p.estado})),"prof_billing")}
                    disabled={cepLoading==="prof_billing"}
                    style={{padding:"0 14px",background:C.blue,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:cepLoading==="prof_billing"?0.6:1,whiteSpace:"nowrap"}}>
                    {cepLoading==="prof_billing"?"...":"Buscar"}
                  </button>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8,marginBottom:0}}>
                <Field label="Rua / Avenida *" value={profile.rua} onChange={v=>setProfile(p=>({...p,rua:v}))} placeholder="Preenchido automaticamente"/>
                <Field label="Número *" value={profile.numero} onChange={v=>setProfile(p=>({...p,numero:v}))} placeholder="Ex: 444"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <Field label="Bairro *" value={profile.bairro} onChange={v=>setProfile(p=>({...p,bairro:v}))} placeholder="Preenchido automaticamente"/>
                <Field label="Complemento" value={profile.complemento} onChange={v=>setProfile(p=>({...p,complemento:v}))} placeholder="Sala, apto..."/>
                <Field label="Cidade *" value={profile.cidade} onChange={v=>setProfile(p=>({...p,cidade:v}))} placeholder="Preenchido automaticamente"/>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>ESTADO *</label>
                  <select value={profile.estado} onChange={e=>setProfile(p=>({...p,estado:e.target.value}))}
                    style={{width:"100%",background:C.dark2,border:`1px solid ${profile.estado?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 12px",color:profile.estado?C.text:C.textSec,fontSize:13,outline:"none",boxSizing:"border-box"}}>
                    <option value="">UF</option>
                    {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Endereço de entrega */}
            <div style={{padding:"12px 14px",background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:10,marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:12}}>ENDEREÇO DE ENTREGA</div>
              <button onClick={()=>setProfile(p=>({...p,entregaIgual:!p.entregaIgual}))}
                style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:"0 0 12px 0",color:C.text}}>
                <div style={{width:18,height:18,borderRadius:4,background:profile.entregaIgual?C.green:C.dark3,border:`1.5px solid ${profile.entregaIgual?C.green:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:profile.entregaIgual?"#111":"transparent",fontWeight:800,flexShrink:0}}>
                  {profile.entregaIgual?"✓":""}
                </div>
                <span style={{fontSize:13}}>Mesmo endereço de cobrança</span>
              </button>
              {!profile.entregaIgual&&(
                <div>
                  <div style={{marginBottom:12}}>
                    <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>CEP * <span style={{fontSize:10,color:C.blue,fontWeight:400}}>— Buscar preenche automaticamente</span></label>
                    <div style={{display:"flex",gap:8}}>
                      <input value={profile.entCep} onChange={e=>setProfile(p=>({...p,entCep:e.target.value}))} placeholder="00000-000" maxLength={9}
                        style={{flex:1,background:C.dark2,border:`1px solid ${profile.entCep?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                      <button onClick={()=>buscarCEP(profile.entCep,(d)=>setProfile(p=>({...p,entRua:d.logradouro||p.entRua,entBairro:d.bairro||p.entBairro,entCidade:d.localidade||p.entCidade,entEstado:d.uf||p.entEstado})),"prof_delivery")}
                        disabled={cepLoading==="prof_delivery"}
                        style={{padding:"0 14px",background:C.blue,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:cepLoading==="prof_delivery"?0.6:1,whiteSpace:"nowrap"}}>
                        {cepLoading==="prof_delivery"?"...":"Buscar"}
                      </button>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8}}>
                    <Field label="Rua / Avenida *" value={profile.entRua} onChange={v=>setProfile(p=>({...p,entRua:v}))} placeholder="Preenchido automaticamente"/>
                    <Field label="Número *" value={profile.entNumero} onChange={v=>setProfile(p=>({...p,entNumero:v}))} placeholder="Ex: 100"/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <Field label="Bairro *" value={profile.entBairro} onChange={v=>setProfile(p=>({...p,entBairro:v}))} placeholder="Preenchido automaticamente"/>
                    <Field label="Complemento" value={profile.entComplemento} onChange={v=>setProfile(p=>({...p,entComplemento:v}))} placeholder="Sala, apto..."/>
                    <Field label="Cidade *" value={profile.entCidade} onChange={v=>setProfile(p=>({...p,entCidade:v}))} placeholder="Preenchido automaticamente"/>
                    <div style={{marginBottom:12}}>
                      <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>ESTADO *</label>
                      <select value={profile.entEstado} onChange={e=>setProfile(p=>({...p,entEstado:e.target.value}))}
                        style={{width:"100%",background:C.dark2,border:`1px solid ${profile.entEstado?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 12px",color:profile.entEstado?C.text:C.textSec,fontSize:13,outline:"none",boxSizing:"border-box"}}>
                        <option value="">UF</option>
                        {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Btn onClick={()=>{
              const doc=profile.docType==="cpf"?profile.cpf:profile.cnpj;
              const razao=profile.docType==="cnpj"&&!profile.razaoSocial;
              const addr=!profile.rua||!profile.numero||!profile.bairro||!profile.cidade||!profile.estado||!profile.cep;
              const ent=!profile.entregaIgual&&(!profile.entRua||!profile.entNumero||!profile.entCidade||!profile.entEstado||!profile.entCep);
              if(!doc||razao||addr||ent){setToast("Preencha todos os campos obrigatórios.");return;}
              setProfileComplete(true);
              setScreen("dashboard");
            }}>Salvar cadastro e continuar →</Btn>
            {dentist&&screen==="profile"&&services.length>0&&(
              <button onClick={()=>setScreen("resumo")} style={{width:"100%",marginTop:10,padding:"11px 0",background:"none",border:`1px solid ${C.border}`,borderRadius:10,color:C.textSec,fontSize:13,cursor:"pointer"}}>
                Salvar e voltar ao pedido
              </button>
            )}
            <button onClick={()=>setScreen(dentist&&patient?"specialties":"patient")} style={{width:"100%",marginTop:8,padding:"8px 0",background:"none",border:"none",color:C.textSec,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>
              Preencher depois (não poderá finalizar compras)
            </button>
          </div>
        )}

        {/* ════════════════════════════════
            DASHBOARD
        ════════════════════════════════ */}
        {screen==="dashboard"&&(
          <div>
            {/* Boas-vindas */}
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:12}}>
              <div>
                <div style={{fontSize:13,color:C.textSec,marginBottom:4}}>Bem-vindo de volta 👋</div>
                <div style={{fontSize:22,fontWeight:800,lineHeight:1.2}}>{dentist?.nome}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                  {accountType==="clinica"&&<span style={{fontSize:10,fontWeight:700,background:"rgba(34,197,94,0.12)",color:C.green,padding:"3px 9px",borderRadius:20,border:"1px solid rgba(34,197,94,0.2)"}}>🏥 Clínica Radiológica · 15% desconto</span>}
                  {accountType==="cursos"&&<span style={{fontSize:10,fontWeight:700,background:"rgba(34,197,94,0.12)",color:C.green,padding:"3px 9px",borderRadius:20,border:"1px solid rgba(34,197,94,0.2)"}}>🎓 Cursos · 15% desconto</span>}
                  {accountType==="dentista"&&<span style={{fontSize:10,fontWeight:700,background:C.dark3,color:C.textSec,padding:"3px 9px",borderRadius:20}}>🦷 Dentista</span>}
                </div>
              </div>
              <button onClick={()=>{setA({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});setSpecialty(null);setService(null);setServiceType(null);setScreen("patient");}}
                style={{background:C.red,border:"none",borderRadius:10,padding:"11px 18px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                + Novo pedido
              </button>
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
              {[
                {label:"Total de pedidos",value:mockOrders.length,color:C.blue},
                {label:"Em andamento",value:mockOrders.filter(o=>o.status==="planning"||o.status==="printing").length,color:C.yellow},
                {label:"Entregues",value:mockOrders.filter(o=>o.status==="shipped"||o.status==="delivered").length,color:C.green},
              ].map((s,i)=>(
                <div key={i} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",textAlign:"center"}}>
                  <div style={{fontSize:26,fontWeight:900,color:s.color}}>{s.value}</div>
                  <div style={{fontSize:11,color:C.textSec,marginTop:3,lineHeight:1.3}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Ações rápidas */}
            <div style={{marginBottom:24}}>
              <div style={{fontSize:11,fontWeight:700,color:C.textSec,letterSpacing:1,marginBottom:10}}>ACESSO RÁPIDO</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  {icon:"🗂️",label:"Histórico completo",sub:"Todos os pedidos",action:()=>setToast("Histórico em breve")},
                  {icon:"👥",label:"Meus pacientes",sub:"Gerenciar pacientes",action:()=>setToast("Pacientes em breve")},
                  {icon:"📁",label:"Baixar arquivos",sub:"Resultados e planejamentos",action:()=>setToast("Arquivos em breve")},
                  {icon:"💬",label:"Falar com a D-CAD",sub:"WhatsApp (98) 98542-5982",action:()=>window.open("https://wa.me/5598985425982?text=Olá! Sou cliente D-CAD e preciso de suporte.","_blank")},
                ].map((a,i)=>(
                  <button key={i} onClick={a.action}
                    style={{display:"flex",alignItems:"center",gap:10,background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 14px",cursor:"pointer",textAlign:"left",color:C.text,transition:"border-color .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#555"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                    <span style={{fontSize:20,flexShrink:0}}>{a.icon}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700}}>{a.label}</div>
                      <div style={{fontSize:11,color:C.textSec,marginTop:1}}>{a.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pedidos recentes */}
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.textSec,letterSpacing:1,marginBottom:10}}>PEDIDOS RECENTES</div>
              {mockOrders.length===0&&services.length===0?(
                <div style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"32px 20px",textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:10}}>📋</div>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>Nenhum pedido ainda</div>
                  <div style={{fontSize:13,color:C.textSec,marginBottom:16}}>Clique em "Novo pedido" para começar</div>
                </div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {/* Pedidos da sessão atual */}
                  {services.map((sv,i)=>(
                    <div key={sv.id} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:38,height:38,borderRadius:10,background:"rgba(229,34,41,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🦷</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{sv.name}</div>
                        <div style={{fontSize:11,color:C.textSec}}>Paciente: {patient?.nome||"—"} · {sv.specialty}</div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.red}}>{fmt(sv.total)}</div>
                        <div style={{fontSize:10,background:"rgba(234,179,8,0.12)",color:C.yellow,padding:"2px 7px",borderRadius:20,marginTop:3,fontWeight:700}}>Aguard. pagamento</div>
                      </div>
                    </div>
                  ))}
                  {/* Mock de pedidos anteriores */}
                  {mockOrders.map(o=>{
                    const STATUS={
                      pending_payment:{label:"Aguard. pagamento",color:C.yellow,bg:"rgba(234,179,8,0.1)"},
                      planning:{label:"Em planejamento",color:C.blue,bg:"rgba(99,102,241,0.1)"},
                      printing:{label:"Em impressão",color:"#A855F7",bg:"rgba(168,85,247,0.1)"},
                      shipped:{label:"Enviado",color:C.green,bg:"rgba(34,197,94,0.1)"},
                      delivered:{label:"Entregue",color:C.green,bg:"rgba(34,197,94,0.1)"},
                    };
                    const s=STATUS[o.status]||STATUS.planning;
                    return(
                      <div key={o.id} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📋</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{o.service}</div>
                          <div style={{fontSize:11,color:C.textSec}}>Paciente: {o.patient} · {o.date}</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontWeight:800,fontSize:14,color:C.text}}>{fmt(o.total)}</div>
                          <div style={{fontSize:10,background:s.bg,color:s.color,padding:"2px 7px",borderRadius:20,marginTop:3,fontWeight:700}}>{s.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            PATIENT SCREEN
        ════════════════════════════════ */}
        {screen==="patient"&&(
          <div style={{maxWidth:480,margin:"0 auto",paddingTop:8}}>
            <button onClick={()=>setScreen("dashboard")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textSec,fontSize:13,cursor:"pointer",padding:"0 0 16px 0",fontFamily:"inherit"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>Voltar ao dashboard
            </button>

            <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Selecionar paciente</div>
            <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Busque um paciente existente ou cadastre um novo.</div>

            {/* Busca */}
            <div style={{position:"relative",marginBottom:16}}>
              <svg style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",opacity:.4,pointerEvents:"none"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={patSearch} onChange={e=>setPatSearch(e.target.value)}
                placeholder="Buscar paciente pelo nome..."
                style={{width:"100%",background:C.dark2,border:`1px solid ${patSearch?C.blue:C.border}`,borderRadius:10,padding:"11px 14px 11px 38px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}/>
              {patSearch&&<button onClick={()=>setPatSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.textSec,cursor:"pointer",fontSize:16,lineHeight:1}}>×</button>}
            </div>

            {/* Lista de pacientes */}
            {savedPatients.filter(p=>p.nome.toLowerCase().includes(patSearch.toLowerCase())).length>0&&(
              <div style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:C.textSec,letterSpacing:1,marginBottom:8}}>
                  {patSearch?"RESULTADO DA BUSCA":"PACIENTES RECENTES"}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {savedPatients
                    .filter(p=>p.nome.toLowerCase().includes(patSearch.toLowerCase()))
                    .map(p=>(
                    <button key={p.id} onClick={()=>{
                      setPatient(p);
                      setPatSearch("");
                      setA({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});
                      setSpecialty(null);setService(null);setServiceType(null);
                      setScreen("specialties");
                    }} style={{display:"flex",alignItems:"center",gap:12,background:C.dark2,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",textAlign:"left",color:C.text,transition:"border-color .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                      <div style={{width:36,height:36,borderRadius:10,background:"rgba(99,102,241,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:C.blue,flexShrink:0}}>
                        {p.nome.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:13}}>{p.nome}</div>
                        {p.idade&&<div style={{fontSize:11,color:C.textSec,marginTop:1}}>{p.idade}</div>}
                      </div>
                      <div style={{fontSize:12,color:C.blue,fontWeight:600,flexShrink:0}}>Selecionar →</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Divisor */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontSize:11,color:C.textSec,fontWeight:600,whiteSpace:"nowrap"}}>ou cadastrar novo paciente</span>
              <div style={{flex:1,height:1,background:C.border}}/>
            </div>

            {/* Novo paciente */}
            <Field label="Nome completo *" value={patForm.nome} onChange={v=>setPatForm(f=>({...f,nome:v}))} placeholder="Ex: Maria das Graças Almeida"/>
            <Field label="Idade" value={patForm.idade} onChange={v=>setPatForm(f=>({...f,idade:v}))} placeholder="Ex: 45 anos"/>
            <button disabled={!patForm.nome.trim()} onClick={()=>{
              const novo={id:"p"+Date.now(),nome:patForm.nome.trim(),idade:patForm.idade};
              setSavedPatients(list=>[novo,...list]);
              setPatient(novo);
              setPatForm({nome:"",idade:""});
              setA({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});
              setSpecialty(null);setService(null);setServiceType(null);
              setScreen("specialties");
            }} style={btnStyle(C.red,!patForm.nome.trim())}>
              Cadastrar e continuar →
            </button>
          </div>
        )}

        {/* ════════════════════════════════
            SPECIALTIES
        ════════════════════════════════ */}
        {screen==="specialties"&&(
          <div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Escolha a especialidade</div>
              <div style={{fontSize:13,color:C.textSec}}>Selecione a área para ver os serviços disponíveis.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {CATALOG.map(sp=>(
                <button key={sp.id} onClick={()=>{setSpecialty(sp);setServiceType(null);setA({preplan:null,teeth:[],brand:null,kit:null,model:null,modelText:"",comps:[],observacoes:""});setScreen(["imp3d","consult"].includes(sp.id)?0:"serviceType");}}
                  style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 14px",textAlign:"left",cursor:"pointer",color:C.text,transition:"border-color .2s",display:"flex",flexDirection:"column",gap:6,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:sp.color,borderRadius:"14px 14px 0 0"}}/>
                  <div style={{width:36,height:36,borderRadius:10,background:sp.color+"20",display:"flex",alignItems:"center",justifyContent:"center",marginTop:4}}>
                    <span style={{fontSize:18}}>{sp.id==="implanto"?"🦷":sp.id==="estetica"?"✨":sp.id==="reab"?"⚙️":sp.id==="dtm"?"🦴":sp.id==="perio"?"🌿":sp.id==="endo"?"🔬":sp.id==="imp3d"?"🖨️":sp.id==="consult"?"💡":"🔧"}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:13,lineHeight:1.2}}>{sp.name}</div>
                  <div style={{fontSize:11,color:C.textSec,lineHeight:1.3}}>{sp.desc}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{fontSize:10,color:sp.color,fontWeight:600}}>{sp.services.length} serviço(s)</div>
                    {discount>0&&<div style={{fontSize:9,fontWeight:700,background:"rgba(34,197,94,0.15)",color:C.green,padding:"2px 7px",borderRadius:20}}>-15%</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            SERVICES
        ════════════════════════════════ */}
        {screen==="services"&&specialty&&(
          <div>
            <BackBtn onClick={()=>["imp3d","consult"].includes(specialty.id)?setScreen("specialties"):setScreen("serviceType")}/>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:36,height:36,borderRadius:10,background:specialty.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                {specialty.id==="implanto"?"🦷":specialty.id==="estetica"?"✨":specialty.id==="reab"?"⚙️":specialty.id==="dtm"?"🦴":specialty.id==="perio"?"🌿":specialty.id==="endo"?"🔬":specialty.id==="imp3d"?"🖨️":specialty.id==="consult"?"💡":"🔧"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:18,fontWeight:800}}>{specialty.name}</div>
                <div style={{fontSize:12,color:C.textSec}}>{specialty.desc}</div>
              </div>
            </div>
            {/* Service type badge */}
            {serviceType&&(
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:serviceType==="print"?"rgba(34,197,94,0.06)":"rgba(234,179,8,0.06)",border:`1px solid ${serviceType==="print"?"rgba(34,197,94,0.2)":"rgba(234,179,8,0.2)"}`,borderRadius:10,padding:"8px 12px",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{fontSize:14}}>{serviceType==="print"?"🖨️":"📐"}</span>
                  <span style={{fontSize:12,fontWeight:700,color:serviceType==="print"?C.green:C.yellow}}>
                    {serviceType==="print"?"Planejamento + Impressão 3D":"Somente Planejamento (arquivos digitais)"}
                  </span>
                </div>
                <button onClick={()=>setScreen("serviceType")} style={{background:"none",border:"none",color:C.textSec,fontSize:11,cursor:"pointer",textDecoration:"underline"}}>alterar</button>
              </div>
            )}
            {specialty.services.map(sv=>{
              const isPlanned=serviceType==="planOnly"&&sv.planOnly;
              const disp=isPlanned?{...sv,...sv.planOnly}:sv;
              return(
              <div key={sv.id} style={{background:C.dark2,border:`1.5px solid ${C.border}`,borderRadius:14,marginBottom:12,overflow:"hidden",opacity:disp.built===false&&!isPlanned?0.6:1}}>
                <div style={{display:"flex",alignItems:"stretch",minHeight:160}}>
                  <div style={{width:148,flexShrink:0,position:"relative",background:specialty.color+"18",borderRadius:"12px 0 0 12px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}>
                    <div style={{fontSize:28}}>{specialty.id==="implanto"?"🦷":specialty.id==="estetica"?"✨":specialty.id==="reab"?"⚙️":specialty.id==="dtm"?"🦴":specialty.id==="perio"?"🌿":specialty.id==="endo"?"🔬":"🔧"}</div>
                    <div style={{fontSize:8,color:C.textSec}}>Imagem do serviço</div>
                    <div style={{position:"absolute",top:7,left:7}}>
                      {(isPlanned||sv.built)?<span style={{fontSize:8,fontWeight:700,background:C.green,color:"#fff",padding:"2px 6px",borderRadius:20}}>Disponível</span>:<span style={{fontSize:8,background:"rgba(0,0,0,0.7)",color:"#ccc",padding:"2px 6px",borderRadius:20}}>Em breve</span>}
                    </div>
                    <button onClick={e=>{e.stopPropagation();setVideoModal({url:sv.videoUrl,title:disp.name});}}
                      style={{position:"absolute",bottom:7,right:7,width:26,height:26,borderRadius:"50%",background:"rgba(0,0,0,0.5)",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:10}}>▶</button>
                  </div>
                  <div style={{flex:1,padding:"11px 14px",display:"flex",flexDirection:"column",gap:5,minWidth:0}}>
                    <div style={{fontWeight:800,fontSize:13,lineHeight:1.3}}>{disp.name}</div>
                    <div style={{fontSize:11,color:C.textSec,lineHeight:1.55,textAlign:"justify",flex:1}}>{disp.fullDesc}</div>
                    <div>
                      <div style={{fontSize:9,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",color:C.textSec,marginBottom:4}}>Exames necessários</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                        {(disp.exams||sv.exams).map((ex,i)=><span key={i} style={{fontSize:9,padding:"2px 6px",borderRadius:20,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.textSec}}>{ex}</span>)}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                      <div style={{display:"flex",alignItems:"baseline",gap:5}}>
                        {discount>0&&<span style={{fontSize:11,color:C.textSec,textDecoration:"line-through"}}>{fmt(disp.price)}</span>}
                        <span style={{fontWeight:900,fontSize:14,color:(isPlanned||sv.built)?specialty.color:C.textSec}}>{fmt(applyDiscount(disp.price))}</span>
                        {discount>0&&(isPlanned||sv.built)&&<span style={{fontSize:9,fontWeight:700,background:"rgba(34,197,94,0.15)",color:C.green,padding:"2px 6px",borderRadius:20}}>-15%</span>}
                      </div>
                      <button onClick={()=>{
                        if(!isPlanned&&!sv.built){setToast("Em breve!");return;}
                        setService({...sv,...(isPlanned?sv.planOnly:{}),serviceType});setScreen(1);
                      }} style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:(isPlanned||sv.built)?"pointer":"not-allowed",background:(isPlanned||sv.built)?specialty.color:"rgba(255,255,255,0.06)",color:(isPlanned||sv.built)?"#fff":C.textSec,fontSize:11,fontWeight:700}}>
                        {(isPlanned||sv.built)?"Contratar →":"Em breve"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );})}
          </div>
        )}

        {/* ════════════════════════════════
            SERVICE TYPE SELECTION
        ════════════════════════════════ */}
        {screen==="serviceType"&&specialty&&(
          <div>
            <BackBtn onClick={()=>{setScreen("specialties");setSpecialty(null);}}/>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <div style={{width:32,height:32,borderRadius:10,background:specialty.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                {specialty.id==="implanto"?"🦷":specialty.id==="estetica"?"✨":specialty.id==="reab"?"⚙️":specialty.id==="dtm"?"🦴":specialty.id==="perio"?"🌿":specialty.id==="endo"?"🔬":"🔧"}
              </div>
              <div style={{fontWeight:800,fontSize:16}}>{specialty.name}</div>
            </div>
            <div style={{fontSize:13,color:C.textSec,marginBottom:24,lineHeight:1.6}}>Como você deseja realizar a impressão 3D dos dispositivos planejados?</div>

            {/* Opção 1 — Com impressão */}
            <button onClick={()=>{setServiceType("print");setScreen(0);}}
              style={{width:"100%",display:"flex",gap:14,alignItems:"flex-start",background:C.dark2,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px 16px",cursor:"pointer",textAlign:"left",marginBottom:12,color:C.text,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=specialty.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{width:44,height:44,borderRadius:12,background:specialty.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🖨️</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>Planejamento + Impressão 3D</div>
                <div style={{fontSize:12,color:C.textSec,lineHeight:1.6}}>A D-CAD realiza o planejamento digital e entrega o dispositivo físico impresso em 3D (guias, placas, modelos etc) pronto para uso na sua clínica.</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:C.greenBg,border:"1px solid rgba(34,197,94,0.2)",borderRadius:20,padding:"3px 10px"}}>
                  <span style={{fontSize:10,fontWeight:700,color:C.green}}>Recomendado</span>
                </div>
              </div>
              <div style={{color:C.textSec,fontSize:18,flexShrink:0,marginTop:2}}>›</div>
            </button>

            {/* Opção 2 — Só planejamento */}
            <button onClick={()=>setShowDisclaimer(true)}
              style={{width:"100%",display:"flex",gap:14,alignItems:"flex-start",background:C.dark2,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px 16px",cursor:"pointer",textAlign:"left",color:C.text,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(234,179,8,0.5)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{width:44,height:44,borderRadius:12,background:"rgba(234,179,8,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📐</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>Somente Planejamento</div>
                <div style={{fontSize:12,color:C.textSec,lineHeight:1.6}}>A D-CAD entrega apenas os arquivos digitais do planejamento. Você realiza a impressão 3D na sua clínica ou laboratório.</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.2)",borderRadius:20,padding:"3px 10px"}}>
                  <span style={{fontSize:10,fontWeight:700,color:C.yellow}}>Requer impressora 3D própria</span>
                </div>
              </div>
              <div style={{color:C.textSec,fontSize:18,flexShrink:0,marginTop:2}}>›</div>
            </button>
          </div>
        )}

        {/* ════════════════════════════════
            STEP 0 — PRÉ-PLANEJAMENTO
        ════════════════════════════════ */}
        {screen===0&&(
          <Step title="Deseja realizar um pré-planejamento?" sub="Análise prévia de viabilidade antes do planejamento completo." badge="Opcional" badgeColor={C.yellow} onBack={()=>{if(["imp3d","consult"].includes(specialty?.id)){setScreen("specialties");setSpecialty(null);}else{setScreen("serviceType");}}}>
            <div style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.25)",borderRadius:10,padding:"11px 14px",marginBottom:16,fontSize:13,lineHeight:1.6}}>
              O pré-planejamento é cobrado à parte. Se o caso tiver viabilidade, o valor é integralmente descontado do serviço principal.{" "}
              <button onClick={()=>setShowRules(true)} style={{background:"none",border:"none",color:C.yellow,fontWeight:700,fontSize:13,cursor:"pointer",textDecoration:"underline",padding:0}}>Ver regras</button>
            </div>
            <button onClick={()=>{set("preplan","sim");setScreen(6);}} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,background:C.dark2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",textAlign:"left",marginBottom:7,color:C.text}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:16}}>🔍</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>Sim — contratar pré-planejamento</div>
                  <div style={{fontSize:11,color:C.textSec,marginTop:2}}>Análise prévia de viabilidade do caso clínico</div>
                </div>
              </div>
              <div style={{fontWeight:900,fontSize:15,color:C.red,flexShrink:0}}>{fmt(P.preplan)}</div>
            </button>
            <button onClick={()=>{set("preplan","nao");setScreen("services");}} style={{width:"100%",display:"flex",alignItems:"flex-start",gap:10,background:C.dark2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",textAlign:"left",color:C.text}}>
              <span style={{fontSize:16}}>⚡</span>
              <div><div style={{fontSize:14,fontWeight:700}}>Não — ir direto ao planejamento</div><div style={{fontSize:11,color:C.textSec,marginTop:2}}>Iniciar o planejamento sem análise prévia</div></div>
            </button>
          </Step>
        )}

        {/* PREPLAN CHECKOUT */}
        {screen==="preplanCO"&&(
          <div>
            <BackBtn onClick={()=>setScreen(6)}/>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:34,marginBottom:8}}>🔍</div>
              <div style={{fontSize:20,fontWeight:800}}>Pré-planejamento</div>
              <div style={{fontSize:13,color:C.textSec,marginTop:4}}>{specialty?.name}</div>
            </div>
            <div style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:14}}>
              <Row label="Serviço" val="Pré-planejamento"/>
              <Row label="Paciente" val={patient?.nome||"Não informado"}/>
              <Row label="Prazo" val="7 dias corridos"/>
              <div style={{borderTop:`1px solid ${C.border}`,margin:"8px 0"}}/>
              <Row label="Total" val={fmt(P.preplan)} bold red/>
            </div>
            <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.textSec,lineHeight:1.6}}>
              Após o pagamento, envie os arquivos pelo portal. Se o caso tiver viabilidade, {fmt(P.preplan)} será descontado.{" "}
              <button onClick={()=>setShowRules(true)} style={{background:"none",border:"none",color:C.blue,fontWeight:700,fontSize:12,cursor:"pointer",textDecoration:"underline",padding:0}}>Ver regras</button>
            </div>
            <InfinitePayCheckout amount={P.preplan} profileComplete={profileComplete} onProfileIncomplete={()=>setScreen("profile")}/>
          </div>
        )}

        {/* STEP 1 — ODONTOGRAMA */}
        {screen===1&&(
          <Step title="Selecione o(s) dente(s) no odontograma" sub="Até 1 dente por arcada. Ambas as arcadas = 2 guias (valor dobrado)." badge="Odontograma" badgeColor={C.blue} onBack={()=>setScreen("services")}>
            <Odontogram selected={A.teeth} onToggle={toggleTooth}/>
            {A.teeth.length>0&&(
              <div style={{background:doubleGuide?"rgba(234,179,8,0.08)":"rgba(34,197,94,0.08)",border:`1px solid ${doubleGuide?"rgba(234,179,8,0.25)":"rgba(34,197,94,0.25)"}`,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13}}>
                {doubleGuide?`Dentes ${A.teeth.join(" e ")} — 2 guias · ${fmt(P.unit*2)}`:`Dente ${A.teeth[0]} · ${fmt(P.unit)}`}
              </div>
            )}
            <Btn disabled={A.teeth.length===0} onClick={()=>setScreen(2)}>Continuar — Marca do implante</Btn>
          </Step>
        )}

        {/* STEP 2 — MARCA */}
        {screen===2&&(
          <Step title="Qual a marca do implante?" sub="O kit e o modelo serão filtrados pela marca." badge="Marca" badgeColor={C.blue} onBack={()=>setScreen(1)}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              {BRANDS.map(b=>(
                <button key={b} onClick={()=>setA(a=>({...a,brand:b,kit:null,model:null,modelText:""}))}
                  style={{background:A.brand===b?"rgba(229,34,41,0.12)":C.dark2,border:`1.5px solid ${A.brand===b?C.red:C.border}`,borderRadius:10,padding:"11px 13px",cursor:"pointer",textAlign:"left",color:A.brand===b?C.red:C.text,fontWeight:A.brand===b?700:400,fontSize:13}}>
                  {b}<div style={{fontSize:11,color:C.textSec,fontWeight:400,marginTop:2}}>{kitsFor(b).length} kit(s)</div>
                </button>
              ))}
            </div>
            <Btn disabled={!A.brand} onClick={()=>setScreen(3)}>Continuar — Kit cirúrgico</Btn>
          </Step>
        )}

        {/* STEP 3 — KIT */}
        {screen===3&&(
          <Step title={`Kit cirúrgico — ${A.brand}`} sub="Os modelos disponíveis serão filtrados pelo kit." badge="Kit" badgeColor={C.blue} onBack={()=>setScreen(2)}>
            {kitsFor(A.brand).map(kit=>(
              <button key={kit} onClick={()=>setA(a=>({...a,kit,model:null,modelText:""}))}
                style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:A.kit===kit?"rgba(229,34,41,0.12)":C.dark2,border:`1.5px solid ${A.kit===kit?C.red:C.border}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",textAlign:"left",marginBottom:7,color:C.text}}>
                <div><div style={{fontSize:14,fontWeight:700,color:A.kit===kit?C.red:C.text}}>{kit}</div><div style={{fontSize:11,color:C.textSec,marginTop:2}}>{modelsFor(A.brand,kit).length} modelo(s)</div></div>
                {A.kit===kit&&<span style={{color:C.red}}>✓</span>}
              </button>
            ))}
            {A.brand==="STRAUMANN"&&A.kit&&<div style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.25)",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13}}>Adicional Straumann: +{fmt(P.strauAdd)}</div>}
            <Btn disabled={!A.kit} onClick={()=>setScreen(4)}>Continuar — Modelo do implante</Btn>
          </Step>
        )}

        {/* STEP 4 — MODELO */}
        {screen===4&&(
          <Step title={`Modelo — ${A.kit}`} sub={`Modelos compatíveis com ${A.kit} · ${A.brand}.`} badge="Modelo" badgeColor={C.blue} onBack={()=>setScreen(3)}>
            {modelsFor(A.brand,A.kit).length>0
              ?modelsFor(A.brand,A.kit).map(model=>(
                <button key={model} onClick={()=>set("model",model)}
                  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:A.model===model?"rgba(229,34,41,0.12)":C.dark2,border:`1.5px solid ${A.model===model?C.red:C.border}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",textAlign:"left",marginBottom:7,color:A.model===model?C.red:C.text,fontWeight:A.model===model?700:400,fontSize:13}}>
                  {model}{A.model===model&&<span style={{color:C.red,flexShrink:0}}>✓</span>}
                </button>
              ))
              :<><div style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.25)",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13}}>Informe o modelo manualmente.</div>
              <input value={A.modelText} onChange={e=>set("modelText",e.target.value)} placeholder="Ex: BLT Ø 4.1 mm"
                style={{width:"100%",background:C.dark2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:14}}/></>
            }
            <Btn disabled={modelsFor(A.brand,A.kit).length>0?!A.model:!A.modelText.trim()} onClick={()=>setScreen(5)}>Continuar — Complementares</Btn>
          </Step>
        )}

        {/* STEP 5 — COMPLEMENTARES */}
        {screen===5&&(
          <Step title="Serviços complementares" sub={`Opcionais, cobrados por dente${doubleGuide?" (×2)":""}.`} badge="Complementares" badgeColor={C.green} onBack={()=>setScreen(4)}>
            {[{id:"captura",label:"Provisório para captura",price:P.provCaptura,desc:"Restauração provisória imediata. Por dente."},
              {id:"adesiva",label:"Provisório adesiva",price:P.provAdesiva,desc:"Apoio nos dentes adjacentes. Por dente."},
              {id:"cicatriz",label:"Cicatrizador personalizado",price:P.cicatriz,desc:"Perfil de emergência personalizado. Por dente."}
            ].map(c=>{
              const sel=A.comps.includes(c.id);
              return (
                <button key={c.id} onClick={()=>setA(a=>({...a,comps:sel?a.comps.filter(x=>x!==c.id):[...a.comps,c.id]}))}
                  style={{width:"100%",display:"flex",alignItems:"flex-start",gap:10,background:sel?"rgba(34,197,94,0.08)":C.dark2,border:`1.5px solid ${sel?C.green:C.border}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",textAlign:"left",marginBottom:7,color:C.text}}>
                  <div style={{width:18,height:18,borderRadius:4,background:sel?C.green:C.dark3,border:`1.5px solid ${sel?C.green:C.border}`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,marginTop:1,color:sel?"#111":"transparent"}}>{sel?"✓":""}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontSize:14,fontWeight:700,color:sel?C.green:C.text}}>{c.label}</div>
                      <div style={{fontSize:13,fontWeight:800,color:sel?C.green:C.textSec}}>{doubleGuide?fmt(c.price*A.teeth.length)+" (×2)":"+"+fmt(c.price)}</div>
                    </div>
                    <div style={{fontSize:11,color:C.textSec,marginTop:2}}>{c.desc}</div>
                  </div>
                </button>
              );
            })}
            <div style={{margin:"14px 0 10px",padding:"11px 14px",background:C.dark3,borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,color:C.textSec}}>Subtotal estimado</span>
              <span style={{fontSize:18,fontWeight:900,color:C.red}}>{fmt(calcTotal(A))}</span>
            </div>
            <Btn onClick={()=>setScreen(6)}>Continuar — Informações do Caso</Btn>
          </Step>
        )}

        {/* STEP 6 — INFORMAÇÕES DO CASO */}
        {screen===6&&(
          <div>
            <BackBtn onClick={()=>A.preplan==="sim"?setScreen(0):setScreen(5)}/>
            <span style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",background:"rgba(99,102,241,0.15)",color:C.blue,padding:"3px 10px",borderRadius:20,marginBottom:10}}>INFORMAÇÕES DO CASO</span>
            <div style={{fontSize:18,fontWeight:800,marginBottom:6}}>Observações para o planejamento</div>
            <div style={{fontSize:13,color:C.textSec,marginBottom:20,lineHeight:1.6}}>Campo opcional. Informe orientações relevantes para que a equipe D-CAD realize o melhor planejamento possível.</div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:6,letterSpacing:.5}}>OBSERVAÇÕES E ORIENTAÇÕES <span style={{color:C.textMut,fontWeight:400}}>(opcional)</span></label>
              <textarea value={A.observacoes} onChange={e=>set("observacoes",e.target.value)}
                placeholder="Condições sistêmicas, medicamentos em uso, restrições, preferências clínicas, histórico de tratamentos anteriores..."
                rows={7} style={{width:"100%",background:C.dark2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7,fontFamily:"inherit"}}/>
            </div>
            <Btn onClick={()=>{if(A.preplan==="sim"){setScreen("preplanCO");return;}if(serviceType==="print"){const _cep=(profile?.entregaIgual===false?profile.entCep:profile.cep)||"";setCepDestino(_cep);if(_cep.replace(/\D/g,"").length>=8)calcularFrete(_cep.replace(/\D/g,""));setScreen(7);}else{finalize();}}}>
              {A.preplan==="sim"?"Continuar para pagamento →":"Ver resumo e finalizar →"}
            </Btn>
          </div>
        )}

        {/* ════════════════════════════════
            SCREEN 7 — FRETE
        ════════════════════════════════ */}
        {screen===7&&(
          <div>
            <BackBtn onClick={()=>setScreen(6)}/>
            <span style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",background:"rgba(99,102,241,0.15)",color:C.blue,padding:"3px 10px",borderRadius:20,marginBottom:10}}>FRETE</span>
            <div style={{fontSize:18,fontWeight:800,marginBottom:6}}>Entrega</div>
            <div style={{fontSize:13,color:C.textSec,marginBottom:20,lineHeight:1.6}}>Selecione a modalidade de envio para a entrega dos dispositivos impressos.</div>

            {/* Subtotal sem frete */}
            <div style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 16px",marginBottom:16}}>
              <Row label="Subtotal dos serviços" val={fmt(calcTotal(A))} small/>
              {freteGratis&&(
                <div style={{marginTop:8,display:"flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:8,padding:"8px 12px"}}>
                  <span style={{fontSize:14}}>🎉</span>
                  <span style={{fontSize:12,color:C.green,fontWeight:700}}>
                    {isSaoLuis
                      ? "Frete grátis! Clientes de São Luís/MA têm entrega gratuita."
                      : `Frete grátis! Pedidos acima de ${fmt(FRETE_GRATIS_MIN)} têm envio gratuito via SEDEX.`}
                  </span>
                </div>
              )}
            </div>

            {/* Frete grátis */}
            {freteGratis&&(
              <div>
                <button onClick={()=>setFreight({method:isSaoLuis?"local":"sedex",value:0,prazo:isSaoLuis?"Combinado com a equipe":"1 a 2 dias úteis",loading:false,simulated:false})}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:12,background:"rgba(34,197,94,0.06)",border:`1.5px solid ${freight.method?"rgba(34,197,94,0.6)":C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",textAlign:"left",color:C.text}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"rgba(34,197,94,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{isSaoLuis?"🏙️":"📦"}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13}}>{isSaoLuis?"Entrega local — São Luís/MA":"SEDEX — Frete Grátis"}</div>
                    <div style={{fontSize:11,color:C.textSec,marginTop:2}}>{isSaoLuis?"Entrega sem custo para clientes de São Luís":"Entrega expressa · 1 a 2 dias úteis após aprovação"}</div>
                  </div>
                  <div style={{fontWeight:900,fontSize:14,color:C.green}}>Grátis</div>
                  {freight.method&&<span style={{color:C.green,fontSize:16,flexShrink:0}}>✓</span>}
                </button>
                <Btn disabled={!freight.method} onClick={finalize} style={{marginTop:16}}>
                  Ver resumo e finalizar →
                </Btn>
              </div>
            )}

            {/* Cálculo para pedidos abaixo do mínimo */}
            {!freteGratis&&(
              <div>
                {/* CEP destino */}
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:6,letterSpacing:.5}}>CEP DE ENTREGA</label>
                  <div style={{display:"flex",gap:8}}>
                    <input
                      value={cepDestino}
                      placeholder="00000-000"
                      maxLength={9}
                      style={{flex:1,background:C.dark2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"}}
                      onChange={e=>{
                        setCepDestino(e.target.value);
                        if(freightOptions)setFreightOptions(null);
                        if(freight.method)setFreight(f=>({...f,method:null,value:0}));
                      }}
                    />
                    <button
                      onClick={()=>{
                        const cep=cepDestino.replace(/\D/g,"");
                        if(cep.length<8){setToast("CEP inválido. Digite 8 dígitos.");return;}
                        calcularFrete(cep);
                      }}
                      style={{padding:"0 18px",background:C.red,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>
                      Calcular
                    </button>
                  </div>
                  {profile?.cep&&<div style={{fontSize:11,color:C.textSec,marginTop:5}}>CEP do endereço de entrega cadastrado: <b style={{color:C.text}}>{profile.entregaIgual===false?profile.entCep:profile.cep}</b></div>}
                </div>

                {/* Loading */}
                {freight.loading&&(
                  <div style={{textAlign:"center",padding:"28px 0",color:C.textSec}}>
                    <div style={{fontSize:22,marginBottom:8}}>⏳</div>
                    <div style={{fontSize:13}}>Consultando Correios...</div>
                    <div style={{fontSize:11,marginTop:4,opacity:.6}}>Aguarde, calculando o frete</div>
                  </div>
                )}

                {/* Opções */}
                {freightOptions&&!freight.loading&&(
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:C.textSec,marginBottom:8,letterSpacing:.5}}>SELECIONE A MODALIDADE</div>
                    {[
                      {key:"pac",icon:"📮",label:"PAC",sub:"Convencional · econômico",opt:freightOptions.pac},
                      {key:"sedex",icon:"⚡",label:"SEDEX",sub:"Expresso · mais rápido",opt:freightOptions.sedex},
                    ].map(({key,icon,label,sub,opt})=>(
                      <button key={key}
                        onClick={()=>setFreight(f=>({...f,method:key,value:opt.valor,prazo:opt.prazo}))}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:12,background:freight.method===key?"rgba(229,34,41,0.08)":C.dark2,border:`1.5px solid ${freight.method===key?C.red:C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",textAlign:"left",color:C.text,marginBottom:8,transition:"border-color .15s"}}>
                        <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:13}}>{label}</div>
                          <div style={{fontSize:11,color:C.textSec,marginTop:1}}>{sub}</div>
                          <div style={{fontSize:11,color:C.textSec,marginTop:2}}>Prazo estimado: {opt.prazo}</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontWeight:900,fontSize:15,color:freight.method===key?C.red:C.text}}>{fmt(opt.valor)}</div>
                        </div>
                        {freight.method===key&&<span style={{color:C.red,fontSize:16,flexShrink:0}}>✓</span>}
                      </button>
                    ))}
                    <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.textSec,lineHeight:1.6}}>
                      ⚠️ Prazos estimados a partir da aprovação do planejamento. Integração com API dos Correios em produção — valores simulados para validação.
                    </div>
                    <Btn disabled={!freight.method} onClick={finalize}>
                      Ver resumo e finalizar →
                    </Btn>
                  </div>
                )}

                {!freightOptions&&!freight.loading&&(
                  <div style={{textAlign:"center",padding:"20px 0",color:C.textSec}}>
                    <div style={{fontSize:32,marginBottom:8}}>📦</div>
                    <div style={{fontSize:13}}>Informe o CEP e clique em Calcular para ver as opções de envio.</div>
                    <div style={{fontSize:11,marginTop:6,opacity:.7}}>Entregamos para todo o Brasil via Correios.</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESUMO */}
        {screen==="resumo"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
              <div style={{width:42,height:42,borderRadius:12,background:"rgba(34,197,94,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>✅</div>
              <div>
                <div style={{fontSize:18,fontWeight:800}}>Serviço configurado!</div>
                <div style={{fontSize:13,color:C.textSec}}>Paciente: {patient?.nome||"Não informado"}</div>
              </div>
            </div>
            {services.map((sv,i)=>(
              <div key={sv.id} style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,gap:8}}>
                  {/* Left: labels + service info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:4}}>
                      <span style={{fontSize:10,background:C.red,color:"#fff",padding:"2px 8px",borderRadius:20,fontWeight:700}}>SERVIÇO {i+1}</span>
                      {discount>0&&<span style={{fontSize:9,fontWeight:700,background:"rgba(34,197,94,0.15)",color:C.green,padding:"2px 7px",borderRadius:20}}>15% parceiro</span>}
                      <div style={{display:"inline-flex",alignItems:"center",gap:4,background:sv.serviceType==="print"?"rgba(34,197,94,0.1)":"rgba(234,179,8,0.1)",borderRadius:20,padding:"1px 7px"}}>
                        <span style={{fontSize:9,fontWeight:700,color:sv.serviceType==="print"?C.green:C.yellow}}>{sv.serviceType==="print"?"+ Impressão 3D":"Só Planejamento"}</span>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:C.textSec}}>{sv.specialty}</div>
                    <div style={{fontWeight:700,fontSize:14,marginTop:2}}>{sv.name}</div>
                    <div style={{fontSize:12,color:C.textSec,marginTop:2}}>{sv.teeth.length===2?`Dentes ${sv.teeth.join(" e ")}`:`Dente ${sv.teeth[0]}`} · {sv.brand} · {sv.kit}</div>
                  </div>
                  {/* Right: total + delete */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,flexShrink:0}}>
                    <div style={{fontSize:18,fontWeight:900,color:C.red}}>{fmt(sv.total)}</div>
                    <button onClick={()=>setServices(s=>s.filter(x=>x.id!==sv.id))}
                      title="Remover serviço do carrinho"
                      style={{width:30,height:30,borderRadius:8,background:"rgba(229,34,41,0.08)",border:"1px solid rgba(229,34,41,0.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(229,34,41,0.22)"}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(229,34,41,0.08)"}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E52229" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
                <Row label={`Guia(s) ×${sv.teeth.length}`} val={fmt(P.unit*sv.teeth.length)} small/>
                {sv.brand==="STRAUMANN"&&<Row label="Adicional Straumann" val={`+ ${fmt(P.strauAdd)}`} small/>}
                {sv.comps.includes("captura")&&<Row label={`Prov. captura ×${sv.teeth.length}`} val={`+ ${fmt(P.provCaptura*sv.teeth.length)}`} small/>}
                {sv.comps.includes("adesiva")&&<Row label={`Prov. adesiva ×${sv.teeth.length}`} val={`+ ${fmt(P.provAdesiva*sv.teeth.length)}`} small/>}
                {sv.comps.includes("cicatriz")&&<Row label={`Cicatrizador ×${sv.teeth.length}`} val={`+ ${fmt(P.cicatriz*sv.teeth.length)}`} small/>}
                {sv.freight&&<Row label={`Frete ${sv.freight.method==="sedex"?"SEDEX":"PAC"}${sv.freight.value===0?" (Grátis)":""}`} val={sv.freight.value===0?"Grátis":`+ ${fmt(sv.freight.value)}`} small/>}
                {sv.observacoes&&(
                  <div style={{marginTop:10,padding:"10px 12px",background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:8}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:4}}>OBSERVAÇÕES DO CASO</div>
                    <div style={{fontSize:12,color:C.textSec,lineHeight:1.6}}>{sv.observacoes}</div>
                  </div>
                )}
              </div>
            ))}
            <div style={{background:"rgba(229,34,41,0.06)",border:"1px solid rgba(229,34,41,0.2)",borderRadius:12,padding:16,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:800}}>Total do pedido</span>
              <span style={{fontSize:22,fontWeight:900,color:C.red}}>{fmt(totalAll)}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={addNew} style={{width:"100%",padding:"13px 20px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                + Adicionar outro serviço
              </button>
              <InfinitePayCheckout amount={totalAll} profileComplete={profileComplete} onProfileIncomplete={()=>setScreen("profile")}/>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── ODONTOGRAM ── */
function Odontogram({selected,onToggle}){
  const SUP_=[[18,17,16,15,14,13,12,11],[21,22,23,24,25,26,27,28]];
  const INF_=[[48,47,46,45,44,43,42,41],[31,32,33,34,35,36,37,38]];
  const SUP_ALL_=[...SUP_[0],...SUP_[1]];
  const renderRow=teeth=>(
    <div style={{display:"flex",gap:3,justifyContent:"center"}}>
      {teeth.map(n=>{const sel=selected.includes(n);return(
        <button key={n} onClick={()=>onToggle(n)} style={{width:32,height:34,borderRadius:5,background:sel?C.red:C.dark3,border:`1px solid ${sel?C.red:C.border}`,color:sel?"#fff":C.textSec,fontSize:9,fontWeight:sel?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1}}>
          <span style={{fontSize:7,opacity:.5}}>{SUP_ALL_.includes(n)?"S":"I"}</span><span>{n}</span>
        </button>
      );})}
    </div>
  );
  return(
    <div style={{background:C.dark2,border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:14}}>
      <div style={{fontSize:10,fontWeight:700,color:C.textSec,textAlign:"center",letterSpacing:1,marginBottom:8}}>ARCADA SUPERIOR</div>
      <div style={{marginBottom:3}}>{renderRow(SUP_[0])}</div>{renderRow(SUP_[1])}
      <div style={{margin:"8px 0",borderTop:`1px dashed ${C.border}`}}/>
      <div style={{fontSize:10,fontWeight:700,color:C.textSec,textAlign:"center",letterSpacing:1,marginBottom:8}}>ARCADA INFERIOR</div>
      <div style={{marginBottom:3}}>{renderRow(INF_[0])}</div>{renderRow(INF_[1])}
      <div style={{marginTop:8,textAlign:"center",fontSize:11,color:C.textSec}}>
        {selected.length===0&&"Nenhum dente selecionado"}
        {selected.length===1&&`Dente ${selected[0]} selecionado`}
        {selected.length===2&&<span style={{color:C.yellow}}>Dentes {selected.join(" e ")} — 2 guias</span>}
      </div>
    </div>
  );
}

function InfinitePayCheckout({amount,profileComplete,onProfileIncomplete}){
  const [method,setMethod]=useState(null);
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(null);
  const [responsavel,setResponsavel]=useState(null); // 'dentista' | 'paciente'
  const [showNFDisclaimer,setShowNFDisclaimer]=useState(false);
  const [nfConfirmed,setNfConfirmed]=useState(false);
  const [nf,setNf]=useState({nome:"",cpf:"",rua:"",numero:"",bairro:"",complemento:"",cidade:"",estado:"",cep:""});

  const pixAmount=parseFloat((amount*0.90).toFixed(2));
  const pixDiscount=parseFloat((amount*0.10).toFixed(2));
  const installmentVal=parseFloat((amount/3).toFixed(2));
  const dueDate=useMemo(()=>{
    const d=new Date(); d.setDate(d.getDate()+14);
    return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"});
  },[]);
  const fmt2=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const setN=(k,v)=>setNf(f=>({...f,[k]:v}));

  const ALL_METHODS=[
    {id:"pix",icon:"⚡",label:"Pix — 10% de desconto",tag:"Pagamento imediato",
     detail:`De ${fmt2(amount)} por`,highlight:fmt2(pixAmount),
     sub:`Economia de ${fmt2(pixDiscount)}`,color:"#22C55E",
     tagColor:"rgba(34,197,94,0.15)",tagText:"#22C55E",action:"Pagar com Pix"},
    {id:"card",icon:"💳",label:"Cartão de crédito",tag:"Sem juros",
     detail:"Em até 3× de",highlight:fmt2(installmentVal),
     sub:`Total: ${fmt2(amount)}`,color:"#6366F1",
     tagColor:"rgba(99,102,241,0.15)",tagText:"#818CF8",action:"Pagar com cartão"},
    {id:"prazo",icon:"📅",label:"Cobrança a prazo",tag:"14 dias",
     detail:`Vencimento em ${dueDate}`,highlight:fmt2(amount),
     sub:"Via InfinitePay Gestão de Cobrança",color:"#EAB308",
     tagColor:"rgba(234,179,8,0.12)",tagText:"#EAB308",action:"Gerar cobrança"},
  ];
  const METHODS=responsavel==="paciente"?ALL_METHODS.filter(m=>m.id!=="prazo"):ALL_METHODS;

  async function handlePay(){
    if(!profileComplete){onProfileIncomplete();return;}
    if(!method){return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    setLoading(false);
    const M=METHODS.find(m=>m.id===method);
    setSuccess(M);
  }

  if(success){
    return(
      <div style={{background:C.dark2,border:"1px solid rgba(34,197,94,0.3)",borderRadius:14,padding:24,textAlign:"center",marginTop:4}}>
        <div style={{fontSize:36,marginBottom:10}}>✅</div>
        <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>Pagamento iniciado!</div>
        <div style={{fontSize:13,color:C.textSec,marginBottom:12,lineHeight:1.6}}>
          Redirecionando para InfinitePay<br/>
          <b style={{color:C.text}}>{success.label}</b>
        </div>
        {responsavel==="paciente"&&<div style={{fontSize:12,color:C.textSec,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:8,padding:"8px 12px",marginBottom:12}}>NF emitida para: <b style={{color:C.text}}>{nf.nome}</b></div>}
        <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:10,padding:"10px 14px",fontSize:12,color:C.green,fontWeight:600}}>
          Em produção: o cliente seria redirecionado ao checkout InfinitePay automaticamente.
        </div>
      </div>
    );
  }

  return(
    <div style={{marginTop:4}}>

      {/* ── NF DISCLAIMER POPUP ── */}
      {showNFDisclaimer&&(
        <div onClick={()=>setShowNFDisclaimer(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.85)",zIndex:80,display:"flex",alignItems:"center",justifyContent:"center",padding:20,minHeight:"100vh"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.dark2,border:"1px solid rgba(234,179,8,0.4)",borderRadius:14,padding:24,maxWidth:460,width:"100%"}}>
            <div style={{fontSize:26,marginBottom:10,textAlign:"center"}}>⚠️</div>
            <div style={{fontSize:15,fontWeight:800,marginBottom:12,textAlign:"center"}}>Nota fiscal em nome do paciente</div>
            <div style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#FCD34D",lineHeight:1.7}}>
              A nota fiscal emitida pela D-CAD não é passível de dedução no Imposto de Renda, uma vez que a atividade principal da empresa não se enquadra entre as atividades previstas pela legislação como dedutíveis para esse fim.
            </div>
            <div style={{fontSize:13,color:C.textSec,lineHeight:1.6,marginBottom:20}}>
              Ao confirmar, você concorda que está ciente desta condição e autoriza a emissão da nota fiscal em nome do paciente. Após a confirmação, informe os dados do paciente para a emissão correta.
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowNFDisclaimer(false)} style={{flex:1,padding:"11px 0",background:C.dark3,border:`1px solid ${C.border}`,borderRadius:10,color:C.textSec,fontSize:13,cursor:"pointer"}}>
                Cancelar
              </button>
              <button onClick={()=>{setShowNFDisclaimer(false);setNfConfirmed(true);}} style={{flex:1,padding:"11px 0",background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",borderRadius:10,color:"#FCD34D",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                Entendido — continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESPONSÁVEL PELO PAGAMENTO ── */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:C.textSec,marginBottom:8,letterSpacing:.5}}>RESPONSÁVEL PELO PAGAMENTO</div>
        <div style={{display:"flex",gap:8}}>
          {[
            {v:"dentista",icon:"🦷",label:"Dentista"},
            {v:"paciente",icon:"👤",label:"Paciente"},
          ].map(r=>(
            <button key={r.v} onClick={()=>{
              if(r.v===responsavel)return;
              setResponsavel(r.v);
              setMethod(null);
              setNfConfirmed(false);
              setNf({nome:"",cpf:"",rua:"",numero:"",bairro:"",complemento:"",cidade:"",estado:"",cep:""});
              if(r.v==="paciente")setShowNFDisclaimer(true);
            }} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"11px 0",border:`1.5px solid ${responsavel===r.v?C.red:C.border}`,borderRadius:10,background:responsavel===r.v?"rgba(229,34,41,0.08)":C.dark2,color:responsavel===r.v?C.red:C.textSec,fontWeight:responsavel===r.v?700:400,fontSize:13,cursor:"pointer",transition:"all .15s"}}>
              <span>{r.icon}</span>{r.label}
            </button>
          ))}
        </div>
        {responsavel==="paciente"&&(
          <div style={{fontSize:11,color:C.yellow,marginTop:6,display:"flex",alignItems:"center",gap:5}}>
            <span>⚠️</span> Cobrança a prazo não disponível para pagamento pelo paciente
          </div>
        )}
      </div>

      {/* ── DADOS DO PACIENTE PARA NF ── */}
      {responsavel==="paciente"&&nfConfirmed&&(
        <div style={{background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.blue,letterSpacing:1,marginBottom:12}}>DADOS DO PACIENTE — EMISSÃO DE NOTA FISCAL</div>
          <NfField label="Nome completo do paciente *" value={nf.nome} onChange={v=>setN("nome",v)} placeholder="Nome conforme documento"/>
          <NfField label="CPF *" value={nf.cpf} onChange={v=>setN("cpf",v)} placeholder="000.000.000-00"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 70px",gap:8}}>
            <NfField label="Rua / Avenida *" value={nf.rua} onChange={v=>setN("rua",v)} placeholder="Nome da rua"/>
            <NfField label="Número *" value={nf.numero} onChange={v=>setN("numero",v)} placeholder="100"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <NfField label="Bairro *" value={nf.bairro} onChange={v=>setN("bairro",v)} placeholder="Bairro"/>
            <NfField label="Complemento" value={nf.complemento} onChange={v=>setN("complemento",v)} placeholder="Apto, sala..."/>
            <NfField label="Cidade *" value={nf.cidade} onChange={v=>setN("cidade",v)} placeholder="Cidade"/>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:C.textSec,marginBottom:4,letterSpacing:.4}}>ESTADO *</div>
              <select value={nf.estado} onChange={e=>setN("estado",e.target.value)}
                style={{width:"100%",background:C.dark2,border:`1px solid ${nf.estado?"rgba(99,102,241,0.4)":C.border}`,borderRadius:8,padding:"9px 10px",color:nf.estado?C.text:C.textSec,fontSize:12,outline:"none",boxSizing:"border-box"}}>
                <option value="">UF</option>
                {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <NfField label="CEP *" value={nf.cep} onChange={v=>setN("cep",v)} placeholder="00000-000"/>
          {(!nf.nome||!nf.cpf||!nf.rua||!nf.numero||!nf.cidade||!nf.estado||!nf.cep)&&(
            <div style={{fontSize:11,color:C.textSec,textAlign:"center",padding:"4px 0"}}>Preencha os campos obrigatórios para liberar o pagamento</div>
          )}
        </div>
      )}

      {/* ── MÉTODOS DE PAGAMENTO ── */}
      {responsavel&&(responsavel==="dentista"||(responsavel==="paciente"&&nfConfirmed&&nf.nome&&nf.cpf&&nf.rua&&nf.numero&&nf.cidade&&nf.estado&&nf.cep))&&(
        <div>
          <div style={{fontSize:11,fontWeight:700,color:C.textSec,marginBottom:10,letterSpacing:.5}}>FORMA DE PAGAMENTO</div>
          {METHODS.map(m=>(
            <button key={m.id} onClick={()=>setMethod(m.id)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:12,
                background:method===m.id?m.color+"10":C.dark2,
                border:`1.5px solid ${method===m.id?m.color:C.border}`,
                borderRadius:12,padding:"13px 15px",cursor:"pointer",textAlign:"left",
                color:C.text,marginBottom:8,transition:"all .15s"}}>
              <div style={{width:38,height:38,borderRadius:10,background:m.tagColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{m.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontWeight:700,fontSize:13}}>{m.label}</span>
                  <span style={{fontSize:9,fontWeight:700,background:m.tagColor,color:m.tagText,padding:"2px 7px",borderRadius:20,flexShrink:0}}>{m.tag}</span>
                </div>
                <div style={{fontSize:11,color:C.textSec}}>{m.detail} <b style={{color:method===m.id?m.color:C.text,fontSize:13}}>{m.highlight}</b></div>
                <div style={{fontSize:10,color:C.textSec,marginTop:1}}>{m.sub}</div>
              </div>
              <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${method===m.id?m.color:C.border}`,background:method===m.id?m.color:"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {method===m.id&&<div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}
              </div>
            </button>
          ))}
          {method&&(
            <button onClick={handlePay} disabled={loading}
              style={{width:"100%",marginTop:4,padding:"13px 20px",
                background:loading?"#2a2a2a":METHODS.find(m=>m.id===method).color,
                border:"none",borderRadius:10,color:loading?C.textSec:"#fff",
                fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {loading?"Processando...":"🔒 "+METHODS.find(m=>m.id===method).action+" via InfinitePay →"}
            </button>
          )}
          <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <span style={{fontSize:10,color:C.textSec}}>Pagamento processado por</span>
            <span style={{fontSize:10,fontWeight:700,color:"#22C55E"}}>InfinitePay</span>
            <span style={{fontSize:10,color:C.textSec}}>🔒 SSL</span>
          </div>
        </div>
      )}
    </div>
  );
}

function NfField({label,value,onChange,placeholder}){
  return(
    <div style={{marginBottom:10}}>
      <div style={{fontSize:10,fontWeight:700,color:C.textSec,marginBottom:4,letterSpacing:.4}}>{label}</div>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:"100%",background:C.dark2,border:`1px solid ${value?"rgba(99,102,241,0.4)":C.border}`,borderRadius:8,padding:"9px 11px",color:C.text,fontSize:12,outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}/>
    </div>
  );
}

function Step({title,sub,badge,badgeColor,children,onBack}){return(<div>{onBack&&<BackBtn onClick={onBack}/>}{badge&&<span style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",background:badgeColor+"22",color:badgeColor,padding:"3px 10px",borderRadius:20,marginBottom:10}}>{badge}</span>}<div style={{fontSize:18,fontWeight:800,lineHeight:1.3,marginBottom:5}}>{title}</div><div style={{fontSize:13,color:C.textSec,marginBottom:18,lineHeight:1.6}}>{sub}</div>{children}</div>);}
function BackBtn({onClick}){return(<button onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:C.textSec,fontSize:13,cursor:"pointer",padding:"0 0 16px 0"}}>← Voltar</button>);}
function Btn({children,onClick,disabled,style:sx}){return(<button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"13px 20px",background:disabled?"#2a2a2a":C.red,border:"none",borderRadius:10,color:disabled?C.textMut:"#fff",fontSize:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",...(sx||{})}}>{children}</button>);}
function Row({label,val,bold,red,small}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:small?"3px 0":"5px 0"}}><span style={{fontSize:small?11:13,color:bold?C.text:C.textSec}}>{label}</span><span style={{fontSize:small?11:13,fontWeight:bold?800:600,color:red?C.red:C.text}}>{val}</span></div>);}
function Field({label,value,onChange,placeholder,type="text"}){return(<div style={{marginBottom:12}}><label style={{fontSize:11,fontWeight:700,color:C.textSec,display:"block",marginBottom:5,letterSpacing:.5}}>{label}</label><input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",background:C.dark2,border:`1px solid ${value?"rgba(99,102,241,0.4)":C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}/></div>);}
function btnStyle(bg,disabled){return{width:"100%",padding:"13px 20px",background:disabled?"#2a2a2a":bg,border:"none",borderRadius:10,color:disabled?C.textMut:"#fff",fontSize:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",marginBottom:0};}