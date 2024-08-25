## Como Iniciar o Sistema

### Passo 1: Download dos Arquivos

Clone o repositório:

```bash
git clone https://github.com/andre-albuquerque01/bannerManager..git
```

### Passo 2: Configuração do Back-end

Entre na pasta back-end:

```bash
cd /bannerManager./Api
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Crie um arquivo `.env` na raiz do seu projeto e configure as variáveis de ambiente conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.

```bash
sudo ./vendor/bin/sail up
```

Para desativar o servidor da API:

```bash
sudo ./vendor/bin/sail down
```
