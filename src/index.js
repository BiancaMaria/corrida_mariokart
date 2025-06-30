    //DEFINIÇÃO DOS OBJETOS PLAYER1 E PLAYER2 E SUAS PROPRIEDADES
    const player1 = {
        NOME: "Mário",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS:0,
    };

    const player2 = {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS:0,
    };

    async function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    async function logResult(characterNome, hability, diceResult, attribute, totalSkill) {
        totalSkill = diceResult + attribute;
        console.log(`${characterNome} rolou o dado de número: ${diceResult} + ${attribute} = ${totalSkill} (${hability}) -> score: ${totalSkill}`)
    }

    async function declareWinner(character1, character2) {
        console.log("\nResultado final:")
        console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`) 
        console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`) 

        if(character1.PONTOS > character2.PONTOS) {
            console.log(`\n${character1.NOME} venceu a corrida!`)
        } else if(character2.PONTOS > character1.PONTOS) {
            console.log(`\n${character2.NOME} venceu a corrida!`)
        }else {
            console.log(`\nA corrida terminou em empate!`)
        }
    }

    async function playRaceEngine(character1, character2) {
        for(let round = 1; round<=5; round++ ) {
            console.log(`\nRodada ${round}`)
            
            let block = await getRandomBlock();
            console.log(`Bloco: ${block}`)

            let diceResult1 = await rollDice();
            let diceResult2 = await rollDice();

            let totalSkill1 = 0;
            let totalSkill2 = 0;

            if(block === "RETA"){
                totalSkill1 = diceResult1 + character1.VELOCIDADE;
                totalSkill2 = diceResult2 + character2.VELOCIDADE;
                
                await logResult(character1.NOME,"velocidade",diceResult1,character1.VELOCIDADE, totalSkill1)
                await logResult(character2.NOME,"velocidade",diceResult2,character2.VELOCIDADE, totalSkill2)
                await validpoints();      
            }

            if(block === "CURVA"){
                totalSkill1 = diceResult1 + character1.MANOBRABILIDADE;
                totalSkill2 = diceResult2 + character2.MANOBRABILIDADE;
                
                await logResult(character1.NOME,"manobrabilidade",diceResult1,character1.MANOBRABILIDADE)
                await logResult(character2.NOME,"manobrabilidade",diceResult2,character2.MANOBRABILIDADE)
                await validpoints();
            }

            if(block === "CONFRONTO"){
                powerResult1 = diceResult1 + character1.PODER;
                powerResult2 = diceResult2 + character2.PODER;   
                
                await logResult(character1.NOME,"poder",diceResult1,character1.PODER)
                await logResult(character2.NOME,"poder",diceResult2,character2.PODER)
                await verifyConfronto();
            }

            async function verifyConfronto() {
                if (powerResult1 === powerResult2) {
                console.log(`Empatou, ninguém ganha ponto!\n`)
                }
                if (powerResult1 < powerResult2 && character1.PONTOS > 0) {
                    console.log(character1.NOME+" perdeu o confronto, perdeu 1 ponto!")
                    character1.PONTOS--
                    console.log(character2.NOME+" venceu a rodada, marcou um 1 ponto!")
                    character2.PONTOS++
                }
                else if (powerResult2 < powerResult1 && character2.PONTOS > 0) {
                    console.log(character2.NOME+" perdeu o confronto, perdeu 1 ponto!")
                    character2.PONTOS--
                    console.log(character1.NOME+" venceu a rodada, marcou 1 ponto!")
                    character1.PONTOS++
                } 
            }

            async function validpoints() {  
                if (totalSkill1 === totalSkill2) {
                    console.log(`Empatou o jogo!\n`)
                }
                else if (totalSkill1 > totalSkill2) {
                    console.log(character1.NOME+" venceu a rodada, marcou 1 ponto!")
                    character1.PONTOS++
                    }
                else {
                    console.log(character2.NOME+" venceu a rodada, marcou 1 ponto!")
                    character2.PONTOS++
                    } 
                }
            }
        }          

    async function getRandomBlock() {
        let random = Math.random()
        let result
                
        switch (true) {
            case random < 0.33:
                result = "RETA"                 
            break;         

            case random < 0.66:
                result = "CURVA"
            break;

            default:
                result = "CONFRONTO"         
        }
        return result;
    }
         
    (async function main() {//inicia todas as execuções
        console.log(
            `\nIniciando a corrida entre ${player1.NOME} e ${player2.NOME }...`
        );

        await playRaceEngine(player1, player2);
        await declareWinner(player1, player2);
    })();


