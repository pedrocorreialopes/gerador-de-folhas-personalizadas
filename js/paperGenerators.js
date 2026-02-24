// Geradores de diferentes tipos de papel
const PaperGenerators = {
    // Pauta com linhas
    lined: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4; // Converter mm para pixels (96 DPI)
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - 20) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            y += spacing;
        }
        
        // Adicionar margem lateral vermelha
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, margin);
        ctx.lineTo(30, height - 20);
        ctx.stroke();
    },

    // Quadriculado
    grid: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        // Linhas verticais
        let x = 20;
        while (x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, height - 20);
            ctx.stroke();
            x += spacing;
        }
        
        // Linhas horizontais
        let y = margin;
        while (y < height - 20) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            y += spacing;
        }
    },

    // Pontilhado
    dot: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.fillStyle = lineColor;
        
        let y = margin;
        while (y < height - 20) {
            let x = 20;
            while (x < width - 20) {
                ctx.beginPath();
                ctx.arc(x, y, lineWidth, 0, 2 * Math.PI);
                ctx.fill();
                x += spacing;
            }
            y += spacing;
        }
    },

    // Pauta musical
    staff: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - 20) {
            // Desenhar 5 linhas (pauta musical)
            for (let i = 0; i < 5; i++) {
                const staffY = y + (i * spacing / 2);
                ctx.beginPath();
                ctx.moveTo(20, staffY);
                ctx.lineTo(width - 20, staffY);
                ctx.stroke();
            }
            y += spacing * 3.5; // Espaço entre sistemas
        }
    },

    // Caligrafia
    calligraphy: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - 20) {
            // Linha base
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            
            // Linha de cima (altura das letras)
            ctx.beginPath();
            ctx.moveTo(20, y - spacing);
            ctx.lineTo(width - 20, y - spacing);
            ctx.stroke();
            
            // Linha de descender
            ctx.beginPath();
            ctx.moveTo(20, y + spacing);
            ctx.lineTo(width - 20, y + spacing);
            ctx.stroke();
            
            y += spacing * 3;
        }
    },

    // Gráfico
    graph: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        // Grid principal
        let x = 20;
        while (x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, height - 20);
            ctx.stroke();
            x += spacing;
        }
        
        let y = margin;
        while (y < height - 20) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            y += spacing;
        }
        
        // Grid secundário (mais claro)
        ctx.strokeStyle = lineColor + '40'; // Adicionar transparência
        ctx.lineWidth = lineWidth / 2;
        
        x = 20 + spacing / 2;
        while (x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, height - 20);
            ctx.stroke();
            x += spacing;
        }
        
        y = margin + spacing / 2;
        while (y < height - 20) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            y += spacing;
        }
    },

    // Hexagonal
    hexagon: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const size = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        const hexHeight = size * Math.sqrt(3);
        const hexWidth = size * 2;
        
        let y = margin;
        while (y < height - hexHeight) {
            let x = 20;
            let rowOffset = 0;
            
            while (x < width - hexWidth) {
                const centerX = x + (rowOffset % 2 === 0 ? 0 : hexWidth / 2);
                const centerY = y;
                
                drawHexagon(ctx, centerX, centerY, size);
                
                x += hexWidth * 0.75;
                rowOffset++;
            }
            y += hexHeight / 2;
        }
        
        function drawHexagon(ctx, centerX, centerY, size) {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const x = centerX + size * Math.cos(angle);
                const y = centerY + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    },

    // Isométrico
    isometric: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        const angle = Math.PI / 6; // 30 graus
        
        // Linhas horizontais
        let y = margin;
        while (y < height - 20) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            y += spacing;
        }
        
        // Linhas diagonais para a esquerda
        let x = 20;
        while (x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x - (height - margin - 20) * Math.tan(angle), height - 20);
            ctx.stroke();
            x += spacing;
        }
        
        // Linhas diagonais para a direita
        x = 20;
        while (x < width - 20) {
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x + (height - margin - 20) * Math.tan(angle), height - 20);
            ctx.stroke();
            x += spacing;
        }
    },

    // Mão de letra
    handwriting: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - 20) {
            // Linha base
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            
            // Linha pontilhada no meio
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(20, y - spacing / 2);
            ctx.lineTo(width - 20, y - spacing / 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            y += spacing;
        }
    },

    // Seyes (papel francês)
    seyes: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - 20) {
            // Linhas principais (mais grossas)
            ctx.lineWidth = lineWidth * 2;
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            
            // Linhas secundárias (mais finas)
            ctx.lineWidth = lineWidth;
            for (let i = 1; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(20, y + (i * spacing / 4));
                ctx.lineTo(width - 20, y + (i * spacing / 4));
                ctx.stroke();
            }
            
            y += spacing;
        }
    },

    // Chinês (田字格)
    chinese: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - spacing) {
            let x = 20;
            while (x < width - spacing) {
                // Quadrado externo
                ctx.strokeRect(x, y, spacing, spacing);
                
                // Linhas cruzadas
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + spacing, y + spacing);
                ctx.moveTo(x + spacing, y);
                ctx.lineTo(x, y + spacing);
                ctx.stroke();
                
                x += spacing + 10;
            }
            y += spacing + 10;
        }
    },

    // Coreano (격자)
    korean: function(ctx, width, height, settings) {
        const { lineSpacing, lineColor, lineWidth, topMargin } = settings;
        const spacing = (lineSpacing * 96) / 25.4;
        const margin = (topMargin * 96) / 25.4;
        
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        
        let y = margin;
        while (y < height - spacing) {
            let x = 20;
            while (x < width - spacing) {
                // Quadrado externo
                ctx.strokeRect(x, y, spacing, spacing);
                
                // Linhas horizontais (três)
                for (let i = 1; i <= 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x, y + (i * spacing / 4));
                    ctx.lineTo(x + spacing, y + (i * spacing / 4));
                    ctx.stroke();
                }
                
                // Linhas verticais (duas)
                for (let i = 1; i <= 2; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x + (i * spacing / 3), y);
                    ctx.lineTo(x + (i * spacing / 3), y + spacing);
                    ctx.stroke();
                }
                
                x += spacing + 10;
            }
            y += spacing + 10;
        }
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaperGenerators;
} else {
    window.PaperGenerators = PaperGenerators;
}