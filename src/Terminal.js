import { input, select } from '@inquirer/prompts';

class Terminal {

    constructor(eventBus, dht) {
        this.eventBus = eventBus;
        this.dht = dht;
        this.replyLoop();
    }

    async actionInput() {
        const message = {}; 
        message.rg = await input({ message: 'Informe o RG' });
        message.name = await input({ message: 'Informe o Nome' });

        // Emitir evento de executar operação de input
        this.dht.insert(message)
    }

    async actionSearch() {
        console.log('actionSearch')
    }

    async actionShowAll() {
        console.log(this.dht.elements);
    }

    async replyLoop() {
        while (true) {
            const answer = await select({
                message: 'Selecione a opção desejada',
                choices: [
                    {
                        name: 'Operação de cadastro',
                        value: 'input',
                        description: 'Operação para cadastro',
                    },
                    {
                        name: 'Operação de consulta',
                        value: 'search',
                        description: 'Operação para consulta',
                    },
                    {
                        name: 'Exibir toda a base',
                        value: 'showAll',
                        description: 'Exibe toda a base de dados',
                    },
                    {
                        name: 'Sair',
                        value: 'exit',
                        description: 'Operação para consulta',
                    }
                ],
            });
            
            switch (answer) {
                case 'input':
                    await this.actionInput();
                    break;

                case 'search':
                    await this.actionSearch();
                    break;

                case 'showAll':
                    await this.actionShowAll();
                    break;

                case 'exit':
                    process.exit();
            }
        }
    }

}

export default Terminal ;