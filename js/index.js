//retorna true ou false se o versiculo foi clicado ou não
var clicado = false
// se as cartas não estiverem relacionadas, o resultado estará errado
var resultado = "errado"
// quantidade de cartas abertas
var abertos = 0
//objeto vazio da relação referência - versiculo
var versiculos = new Object();
// lista de referencias 
var referencias = ['Jo 3:6','Ap 22:17','At 1:5','Jo 4:24','Rm 8:16','1 Co 15:45','Jó 32:8','Rm 12:11',"Gl 5:25"]
// listade versiculos
var versos = ["O que é nascido da carne é carne, e o que é nascido do Espirito é espirito","O Espírito e a noiva dizem: Vem! Aquele que ouve, diga: Vem! Aquele que tem sede venha, e quem quiser receba de graça a água da vida.", 'Porque João batizou com água, mas vós sereis batizados no Espirito Santo, não muito depois desses dias', 'Assim Também está escrito: O primeiro homem Adão, tornou-se Alma vivente. O ultimo adão tornou-se o espirito que da vida', 'Deus é espirito, e é necessário que os Que O Adoram O adorem em espirito e veracidade','O próprio Espirito testifica com nosso espirito que somos filhos de Deus',"Na verdade, há um espírito no homem, e o sopro do Todo-Poderoso o faz sábio.","Não sejais preguiçosos no zelo, mas sede fervorosos no espírito, servindo ao Senhor.","Se vivemos pelo Espírito, andemos também pelo Espírito."]
// relações referência - versiculo
versiculos['Jo 3:6'] = "O que é nascido da carne é carne, e o que é nascido do Espirito é espirito"
versiculos['Ap 22:17'] = "O Espírito e a noiva dizem: Vem! Aquele que ouve, diga: Vem! Aquele que tem sede venha, e quem quiser receba de graça a água da vida."
versiculos['At 1:5'] = 'Porque João batizou com água, mas vós sereis batizados no Espirito Santo, não muito depois desses dias'
versiculos['1 Co 15:45'] = 'Assim Também está escrito: O primeiro homem Adão, tornou-se Alma vivente. O ultimo adão tornou-se o espirito que da vida'
versiculos['Jo 4:24'] = 'Deus é espirito, e é necessário que os Que O Adoram O adorem em espirito e veracidade'
versiculos['Rm 8:16'] = 'O próprio Espirito testifica com nosso espirito que somos filhos de Deus'
versiculos["Jó 32:8"] = ["Na verdade, há um espírito no homem, e o sopro do Todo-Poderoso o faz sábio."]
versiculos["Rm 12:11"] = ["Não sejais preguiçosos no zelo, mas sede fervorosos no espírito, servindo ao Senhor."]
versiculos["Gl 5:25"] = ["Se vivemos pelo Espírito, andemos também pelo Espírito."]
var clicados = []
//verifica se o jogo foi finalizado
var finalizado = false
// verifica os pontos que o usuário fez
var pontos = 0
// o tabuleiro de versiculos e referencia que será formada
var novalista = []
// tamanho total do tabuleiro
var total = 18
// verifica se o já tem 2 cartas clicadas
var cheio = false
// intervalo de verificação de 2 cartas clicada, durante esse intervalo
//, o app vai verificar se duas cartas estão relaciondas 
var intervalo = true
// variável que controla os segundos
var seg = 0
// variável que controla os minutos
var min = 0

/*gera o tabuleiro de cartas, para evitar valores repetidos, essa função faz 
chamadas recursivas até o tabuleiro estiver completo sem repetições
*/
function geradora(){
    while(novalista.length != total){
    //a variável valor vai guardar o retorno da função gera cartas
    valor = geraCartas()
    //incrementa esse valor se a lista estiver vazia
    if(novalista.length == 0 ){
        novalista.push(valor)
      } 
    else if(novalista.indexOf(valor) < 0){
        novalista.push(valor)
    }else{
        
        geradora()
        
    }

        //console.log(novalista)
   }

        
}


//gera uma carta
function geraCartas(){
   
    //seleciona um valor radomico na lista de referencias       
    const random = referencias[Math.floor(Math.random() * referencias.length)];
    //seleciona um valor radomico na lista de versiculos
    const random2 = versos[Math.floor(Math.random() * versos.length)];
    //cria um dicionário vazio
    let lista = []
    //incrementa um dicionário
    lista.push(random)
    lista.push(random2)
    
    //gera o valor que será incrementado na lista definitiva
    var valor = lista[Math.floor(Math.random() * lista.length)];
   
    //retorna o valor
    return valor
     

}


//função que renderiza as cartas na tela 
function criacao(){
     //laço que passa pelo número total de cartas. renderizando uma a uma
     for(var neol = 1; neol <= total; neol++){
         
        let texto = document.createElement('input')
        texto.type = "hidden"
        texto.id = `texto-${neol}`
        texto.value = novalista[neol-1]
        

         let elemento = document.createElement("div");
         elemento.id = `carta-${neol}`
         // verifica se será uma carta de referência ou uma carta de versiculo
         if(texto.value.length <= 10){
            elemento.className = "carta ref col-sm-4 col-12 col-lg-2 col-md-2  p-3 border"
            elemento.innerHTML = "Referência"
         }else{
             elemento.className = "carta vers col-sm-4 col-12 col-lg-2 col-md-2  p-3 border"
             elemento.innerHTML = "Versículo"
         }
        
         elemento.onclick = function(){
            verificaAbertos();
            revelaCarta(elemento.id,texto.value)
           
         }

         elemento.appendChild(texto)
         document.getElementById("cartas").appendChild(elemento)
        }
}

//função que abre as cartas clicadas se elas estiverem fechadas
function revelaCarta(carta,vers){

    if(clicado == false){
      
     if(abertos < 2 ){       
      document.getElementById(`${carta}`).style.backgroundColor = "#FA8072"
      document.getElementById(`${carta}`).style.color = "white"
      document.getElementById(`${carta}`).innerHTML = `${vers}`;
      if(clicados[1] != carta || clicados[3] != carta && clicados[1] != clicados[3] && clicados[1] != "aberto" && clicados[3] != "aberto"){
         clicados.push(document.getElementById(`${carta}`).innerText)
         clicados.push(carta)
         abertos += 1

      }
    }
  }  	
}

//verifica se os versiculos que estão abertos, tem uma relação
 function verificaAbertos(){
     //console.log(clicados,abertos,cheio)
    
    //se duas cartas estão abertas, o intervalo de verificação se inicia
 	if(abertos >= 1 && cheio == false){
     
     intervalo = true
     let resposta = ""
     cheio = true
     //cria um intervalo que verifica se a relação entre as cartas está correta
	 let muda = setInterval(function(){ 
	 //se a relação for correta, essa condição será verdadeira
     if(versiculos[clicados[0]] == clicados[2] || versiculos[clicados[2]] == clicados[0] && intervalo == true && clicados[1] != null && clicados[3] != null){
        resposta = "certo"
        //o usuário ganha um ponto
        pontos += 1
        //a variável audio guardará o objeto audio
        audio = document.querySelector("audio")
        //o id dos elementos relacionados será setado como 'aberto'
        document.getElementById(clicados[1]).id = "aberto"
        document.getElementById(clicados[3]).id = "aberto"
        $(`#${clicados[1]}`).on(verificaAbertos()).remove()
        $(`#${clicados[1]}`).on(revelaCarta()).remove()
        $(`#${clicados[3]}`).on(verificaAbertos()).remove()
        $(`#${clicados[3]}`).on(revelaCarta()).remove()
        //console.log(audio)
        //o audio do ponto é executado, o usuário ouvirá um "Amém"
        audio.play()
        document.getElementById("pontos").innerHTML = pontos
        
        //se a pontuação for a máxima possível, o game é encerrado
        if (pontos == 9) {
        finalizado = true
        document.getElementById('modal-title').innerHTML = "Jogo Finalizado"
        document.getElementById('modal-body').innerHTML = `Parabéns!! você levou ${min}:${seg}, para jogar novamente atualize a página`
        document.getElementById('modal-div-ti').className = "modal-header text-danger"
        document.getElementById('botao').className = "btn btn-danger"
        document.getElementById('botao').innerHTML = "OK"
        document.getElementById('botao').onclick = function(){
            window.location.reload();
        }
        //é mostrado na tela a mensagem de game encerrado
        $("#registro").modal('show')
            
        }

     }   clicado = true
         //se a relação entre as cartas for incorreta, as cartas voltaram a seu estado inicial, isto é, viradas para baixo
         if(resposta != "certo" && clicados[1] != null && clicados[3] != null){  
         if(document.getElementById(`${clicados[1]}`).className == "carta ref col-sm-4 col-12 col-lg-2 col-md-2  p-3 border" && clicados[1] != "aberto"){
            document.getElementById(`${clicados[1]}`).innerHTML = "Referência";
            document.getElementById(`${clicados[1]}`).style.backgroundColor = "#6A5ACD";
            document.getElementById(`${clicados[1]}`).style.color = "white";
         }else if(clicados[1] != "aberto"){
            document.getElementById(`${clicados[1]}`).innerHTML = "Versículo";
            document.getElementById(`${clicados[1]}`).style.backgroundColor = "#6A5ACD";
            document.getElementById(`${clicados[1]}`).style.color = "white";
         }
         if(document.getElementById(`${clicados[3]}`).className == "carta ref col-sm-4 col-12 col-lg-2 col-md-2  p-3 border" && clicados[3] != "aberto"){
            document.getElementById(`${clicados[3]}`).innerHTML = "Referência";
            document.getElementById(`${clicados[3]}`).style.color = "white";
            document.getElementById(`${clicados[3]}`).style.backgroundColor = "#6A5ACD";
         }else if(clicados[3] != "aberto"){
            document.getElementById(`${clicados[3]}`).innerHTML = "Versículo";
            document.getElementById(`${clicados[3]}`).style.color = "white";
            document.getElementById(`${clicados[3]}`).style.backgroundColor = "#6A5ACD";

         }
         

        }
         //ao fim dos segundos de verificação, as variáveis serão resetados
         abertos = 0
         clicados = []
         clicado = false
         cheio = false
         intervalo = false
         //o intervalo é encerrado
         clearInterval(muda)
	    },3000)   
     }
 }



//Essa função é chamada quando a aplicação é iniciada
function comecar(){
	    //cria o modal que é mostrado na tela no inicio
        document.querySelector("nav").style.backgroundColor = "#6A5ACD"
        document.querySelector("footer").style.backgroundColor = "#6A5ACD"
        document.getElementById('modal-title').innerHTML = "Bem vindo(a)"
        document.getElementById('modal-body').innerHTML = "Vamos começar agora, clique em ok para começar a contagem do tempo"
        document.getElementById('modal-div-ti').className = "modal-header text-success"
        document.getElementById('botao').className = "btn btn-warning"
        document.getElementById('botao').innerHTML = "OK"
        $("#registro").modal('show')

        //Quando o usuário clicar no botão de ok, o cronômetro se inicia
        document.getElementById('botao').onclick = function(){

           if(finalizado == false){
             
           setInterval(function(){
           seg += 1
           document.getElementById("tempo").innerHTML = min < 10 ? "0"+min+":" : min+":"
           document.getElementById("tempo").innerHTML += seg < 10 ? "0"+seg : seg  
            
            if(seg > 59){
                seg = 0
                min += 1
                document.getElementById("tempo").innerHTML = min < 10 ? "0"+min+":" : min+":"
                document.getElementById("tempo").innerHTML += seg < 10 ? "0"+seg : seg  
            }   

        },1000)

           }
            
        } 
       

        
}
	