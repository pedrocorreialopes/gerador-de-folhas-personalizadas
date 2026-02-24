# Gerador de Folhas Personalizadas

Um aplicativo web moderno e completo para criar diferentes tipos de folhas de papel personalizadas com opções de configuração avançadas e exportação para PDF.

## 🎯 Funcionalidades Principais

### Tipos de Folhas Disponíveis
- **Pauta (Linhas)** - Linhas horizontais com margem lateral vermelha
- **Quadriculado** - Grade regular para desenhos técnicos e matemática
- **Pontilhado** - Pontos distribuídos uniformemente
- **Pauta Musical** - 5 linhas para composição musical
- **Caligrafia** - Linhas guia para prática de caligrafia
- **Gráfico** - Grade com subdivisões para gráficos detalhados
- **Hexagonal** - Padrão de hexágonos para mapas e jogos
- **Isométrico** - Linhas em 30° para desenho técnico isométrico
- **Mão de Letra** - Linhas pontilhadas para alfabetização
- **Seyes (Francês)** - Padrão francês com linhas principais e secundárias
- **Chinês (田字格)** - Quadriculado especial para caracteres chineses
- **Coreano (격자)** - Grade especial para escrita coreana

### Opções de Personalização
- **Tamanho do Papel**: A4, Carta, Legal, A3, A5
- **Espaçamento das Linhas**: 4mm a 20mm
- **Cor das Linhas**: Personalizável via seletor de cores
- **Espessura das Linhas**: 0.1px a 2px
- **Margem Superior**: 10mm a 50mm

### Recursos Avançados
- **Visualização em Tempo Real**: Veja as mudanças instantaneamente
- **Controles de Zoom**: Aproxime e afaste para ver detalhes
- **Persistência de Configurações**: Suas preferências são salvas automaticamente
- **Exportação para PDF**: Baixe suas folhas em formato PDF de alta qualidade
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e celular
- **Tema Claro/Escuro**: Adapta-se às preferências do sistema
- **Acessibilidade**: Navegação por teclado e suporte a leitores de tela

## 🚀 Como Usar

1. **Acesse o site**: Abra o arquivo `index.html` em seu navegador
2. **Selecione o tipo de folha**: Escolha entre os 12 modelos disponíveis
3. **Personalize**: Ajuste o tamanho, espaçamento, cor e espessura das linhas
4. **Visualize**: Veça a prévia em tempo real no painel direito
5. **Baixe**: Clique em "Baixar PDF" para salvar sua folha

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos e temas
├── js/
│   ├── app.js             # Aplicação principal
│   └── paperGenerators.js # Geradores de cada tipo de folha
└── README.md              # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **JavaScript ES6+** - Lógica da aplicação
- **Bootstrap 5** - Framework CSS para interface responsiva
- **jsPDF** - Geração de arquivos PDF
- **Canvas API** - Renderização das folhas
- **Font Awesome** - Ícones
- **LocalStorage** - Persistência de dados

## 📋 Requisitos do Sistema

- Navegador moderno (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- JavaScript habilitado
- Conexão com internet (para CDNs)

## 🎨 Personalização Avançada

### Criar Novos Tipos de Folha

Para adicionar novos tipos de folha, edite `js/paperGenerators.js`:

```javascript
newType: function(ctx, width, height, settings) {
    // Implemente sua lógica de desenho aqui
    // Use ctx para desenhar no canvas
}
```

### Modificar Estilos

Edite `css/style.css` para personalizar:
- Cores do tema
- Espaçamentos
- Tipografia
- Animações
- Responsividade

## 📱 Compatibilidade

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Tablets**: Todos os navegadores modernos

## 🔧 Configurações de Desenvolvimento

### Variáveis de Configuração

```javascript
const defaultSettings = {
    paperType: 'lined',
    paperSize: 'a4',
    lineSpacing: 8,      // mm
    lineColor: '#0000ff',
    lineWidth: 0.5,      // px
    topMargin: 20        // mm
};
```

### Tamanhos de Papel (96 DPI)

- A4: 794×1123px
- Carta: 816×1056px
- Legal: 816×1344px
- A3: 1123×1587px
- A5: 559×794px

## 🌟 Dicas de Uso

1. **Para estudantes**: Use pauta com espaçamento maior (10-12mm) para crianças pequenas
2. **Para caligrafia**: Use o modo caligrafia com espaçamento de 8-10mm
3. **Para música**: Ajuste o espaçamento para 6-8mm para melhor legibilidade
4. **Para impressão**: Use cores mais claras (azul claro, cinza) para economizar tinta
5. **Para digitalização**: Use linhas mais grossas (1-2px) para melhor contraste

## 📄 Exemplos de Uso

### Folha para Alfabetização
- Tipo: Mão de Letra
- Espaçamento: 12mm
- Cor: Azul
- Margem: 25mm

### Papel para Música
- Tipo: Pauta Musical
- Espaçamento: 6mm
- Cor: Preto
- Margem: 20mm

### Grade Técnica
- Tipo: Gráfico
- Espaçamento: 5mm
- Cor: Cinza
- Margem: 15mm

## 🤝 Contribuindo

Contribuições são bem-vindas! Para adicionar novos recursos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-folha`)
3. Commit suas mudanças (`git commit -am 'Adicionar novo tipo de folha'`)
4. Push para a branch (`git push origin feature/nova-folha`)
5. Crie um Pull Request

## 📝 Licença

Este projeto está disponível para uso educacional e pessoal.

## 🆘 Suporte

Se encontrar problemas ou tiver sugestões:

1. Verifique se seu navegador está atualizado
2. Limpe o cache do navegador
3. Verifique o console JavaScript para erros
4. Certifique-se de ter JavaScript habilitado

---

**Gerador de Folhas Personalizadas** - Criando folhas personalizadas para todas as suas necessidades! 📄✨
