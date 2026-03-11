# Configuração da Integração com Google Sheets

Para que o formulário de captação de leads envie os dados para uma planilha Excel/Google Sheets, siga os passos abaixo:

## Opção 1: Google Sheets + Apps Script (Recomendado)

### Passo 1: Criar a Planilha
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Leads - Inove Odontologia"
3. Na primeira linha, adicione os cabeçalhos: `Nome | Celular | Data | Origem`

### Passo 2: Criar o Apps Script
1. Na planilha, vá em `Extensões > Apps Script`
2. Cole o seguinte código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.nome,
      data.celular,
      data.data,
      data.origem
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salve o projeto com o nome "Inove Leads API"
4. Clique em `Implantar > Nova implantação`
5. Escolha "Aplicativo da Web"
6. Configure:
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
7. Clique em "Implantar" e copie a URL gerada

### Passo 3: Configurar no Código
No arquivo `src/components/LeadCaptureForm.tsx`, substitua:
```typescript
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
```

Por:
```typescript
const response = await fetch('SUA_URL_DO_APPS_SCRIPT_AQUI', {
```

## Opção 2: Formspree (Alternativa Simples)

1. Acesse [Formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Configure para enviar os dados por email
5. Substitua a URL no código pelo endpoint do Formspree

## Opção 3: Zapier/Make (Automação)

1. Crie uma conta no [Zapier](https://zapier.com) ou [Make](https://make.com)
2. Configure um webhook que receba os dados
3. Conecte com Google Sheets para adicionar novas linhas
4. Use a URL do webhook no código

## Funcionalidade Atual

Mesmo sem a configuração da planilha, o formulário já funciona e:
- ✅ Envia os dados via WhatsApp para o número configurado
- ✅ Valida os campos obrigatórios
- ✅ Mostra mensagens de sucesso/erro
- ✅ Limpa o formulário após envio

## Testando

Para testar se está funcionando:
1. Preencha o formulário no site
2. Verifique se os dados aparecem na planilha (se configurada)
3. Confirme se a mensagem chegou no WhatsApp

## Campos Coletados

- **Nome**: Nome completo do lead
- **Celular**: Número de WhatsApp para contato
- **Data**: Data e hora do envio
- **Origem**: "Site Inove Odontologia"
