// Aplicação principal
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('paperCanvas');
    const ctx = canvas.getContext('2d');
    let currentZoom = 1;
    
    // Configurações padrão
    const defaultSettings = {
        paperType: 'lined',
        paperSize: 'a4',
        lineSpacing: 8,
        lineColor: '#0000ff',
        lineWidth: 0.5,
        topMargin: 20
    };
    
    // Tamanhos de papel em pixels (96 DPI)
    const paperSizes = {
        a4: { width: 794, height: 1123 },
        letter: { width: 816, height: 1056 },
        legal: { width: 816, height: 1344 },
        a3: { width: 1123, height: 1587 },
        a5: { width: 559, height: 794 }
    };
    
    // Inicializar aplicação
    function init() {
        setupEventListeners();
        loadSettings();
        generatePaper();
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Controles principais
        document.getElementById('generateBtn').addEventListener('click', generatePaper);
        document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
        
        // Controles de zoom
        document.getElementById('zoomIn').addEventListener('click', () => changeZoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => changeZoom(0.8));
        document.getElementById('resetZoom').addEventListener('click', () => resetZoom());
        
        // Atualização automática
        const controls = ['paperType', 'paperSize', 'lineSpacing', 'lineColor', 'lineWidth', 'topMargin'];
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function() {
                    updateDisplayValues();
                    saveSettings();
                    generatePaper();
                });
            }
        });
        
        // Atualizar valores de exibição
        updateDisplayValues();
    }
    
    // Atualizar valores de exibição dos controles deslizantes
    function updateDisplayValues() {
        const lineSpacing = document.getElementById('lineSpacing').value;
        const lineWidth = document.getElementById('lineWidth').value;
        const topMargin = document.getElementById('topMargin').value;
        
        document.getElementById('lineSpacingValue').textContent = lineSpacing + 'mm';
        document.getElementById('lineWidthValue').textContent = lineWidth + 'px';
        document.getElementById('topMarginValue').textContent = topMargin + 'mm';
    }
    
    // Carregar configurações do localStorage
    function loadSettings() {
        const saved = localStorage.getItem('paperGeneratorSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            Object.keys(settings).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = settings[key];
                }
            });
        }
    }
    
    // Salvar configurações no localStorage
    function saveSettings() {
        const settings = {
            paperType: document.getElementById('paperType').value,
            paperSize: document.getElementById('paperSize').value,
            lineSpacing: document.getElementById('lineSpacing').value,
            lineColor: document.getElementById('lineColor').value,
            lineWidth: document.getElementById('lineWidth').value,
            topMargin: document.getElementById('topMargin').value
        };
        localStorage.setItem('paperGeneratorSettings', JSON.stringify(settings));
    }
    
    // Obter configurações atuais
    function getCurrentSettings() {
        return {
            paperType: document.getElementById('paperType').value,
            paperSize: document.getElementById('paperSize').value,
            lineSpacing: parseFloat(document.getElementById('lineSpacing').value),
            lineColor: document.getElementById('lineColor').value,
            lineWidth: parseFloat(document.getElementById('lineWidth').value),
            topMargin: parseFloat(document.getElementById('topMargin').value)
        };
    }
    
    // Gerar papel
    function generatePaper() {
        const settings = getCurrentSettings();
        const size = paperSizes[settings.paperSize];
        
        // Configurar canvas
        canvas.width = size.width * currentZoom;
        canvas.height = size.height * currentZoom;
        canvas.style.width = (size.width * currentZoom) + 'px';
        canvas.style.height = (size.height * currentZoom) + 'px';
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Preencher fundo branco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Aplicar escala se necessário
        if (currentZoom !== 1) {
            ctx.scale(currentZoom, currentZoom);
        }
        
        // Gerar o tipo de papel selecionado
        const generator = PaperGenerators[settings.paperType];
        if (generator) {
            generator(ctx, size.width, size.height, settings);
        }
        
        // Mostrar notificação de sucesso
        showNotification('Folha gerada com sucesso!', 'success');
    }
    
    // Alterar zoom
    function changeZoom(factor) {
        currentZoom *= factor;
        if (currentZoom < 0.1) currentZoom = 0.1;
        if (currentZoom > 3) currentZoom = 3;
        generatePaper();
    }
    
    // Resetar zoom
    function resetZoom() {
        currentZoom = 1;
        generatePaper();
    }
    
    // Baixar PDF
    function downloadPDF() {
        const settings = getCurrentSettings();
        const size = paperSizes[settings.paperSize];
        
        // Criar PDF usando jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: size.width > size.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [size.width, size.height]
        });
        
        // Converter canvas para imagem
        const imgData = canvas.toDataURL('image/png');
        
        // Adicionar imagem ao PDF
        pdf.addImage(imgData, 'PNG', 0, 0, size.width, size.height);
        
        // Salvar PDF
        const fileName = `folha_${settings.paperType}_${settings.paperSize}.pdf`;
        pdf.save(fileName);
        
        showNotification('PDF baixado com sucesso!', 'success');
    }
    
    // Mostrar notificação
    function showNotification(message, type = 'info') {
        // Remover notificações anteriores
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Adicionar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 250px;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remover automaticamente após 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Inicializar aplicação
    init();
});

// Funções auxiliares globais
window.addEventListener('resize', function() {
    // Re-gerar papel se a janela for redimensionada
    setTimeout(function() {
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.click();
        }
    }, 100);
});