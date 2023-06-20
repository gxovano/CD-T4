import { createInterface } from 'readline';
//import EventBus from './EventBus';

class Terminal {
    static message = `Digite a opção desejada: 
    1 - Enviar mensagem 
    2 - Exibir mensagens de dados recebidas 
    0 - Finalizar \n`;

    constructor(eventBus) {
        this.eventBus = eventBus;
        //this.promptEventBus = new EventBus();
        this.replyLoop();
    }

    replyLoop() {
        this.readline = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readline.setPrompt(Terminal.message);
        this.readline.prompt();
        this.readline.on('line', async (opt) => {
            await this.handlePrompt(opt); 
        });
    }

    async handlePrompt(opt) {
        let prompt = parseInt(opt);
        switch (prompt) {
            case 1:
                await this.handleSendMessage();
                break;
            case 0: 
                process.exit(0);
            default:
                break;
        }
    }

    async handleSendMessage() {
        this.readline.setPrompt(`What is your age? `);
        //this.readline.prompt();
        //this.readline.pause();
        //this.readline.setPrompt(Terminal.message);
        //this.readline.resume();
        //this.readline.prompt();
    }
}

export default Terminal ;