// ========================================
// SPIN WHEEL - Fortune Wheel Component
// Professional Canvas-based implementation
// ========================================

class SpinWheel {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${canvasId}" not found`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Default options
        this.options = {
            segments: options.segments || [],
            spinDuration: options.spinDuration || 5000,
            spinRevolutions: options.spinRevolutions || 5,
            onSpinStart: options.onSpinStart || (() => {}),
            onSpinEnd: options.onSpinEnd || (() => {}),
            pointerAngle: options.pointerAngle || 270, // Top of wheel (12 o'clock)
            colors: options.colors || [
                '#E53935', '#FB8C00', '#43A047', '#1E88E5',
                '#8E24AA', '#F06292', '#00897B', '#5E35B1',
                '#FDD835', '#039BE5', '#7CB342'
            ],
            textColor: options.textColor || '#FFFFFF',
            borderColor: options.borderColor || '#FFFFFF',
            borderWidth: options.borderWidth || 3,
            centerRadius: options.centerRadius || 40,
            fontSize: options.fontSize || 14,
            fontFamily: options.fontFamily || 'Arial, sans-serif',
            rtl: options.rtl || false
        };
        
        this.isSpinning = false;
        this.currentRotation = 0;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.draw();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resize();
            this.draw();
        });
    }
    
    resize() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.offsetWidth, container.offsetHeight) || 400;
        
        // Set canvas size with device pixel ratio for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        this.ctx.scale(dpr, dpr);
        
        this.size = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = (size / 2) - 10;
    }
    
    draw(rotation = this.currentRotation) {
        const ctx = this.ctx;
        const segments = this.options.segments;
        
        if (segments.length === 0) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.size, this.size);
        
        // Save context
        ctx.save();
        
        // Move to center and rotate
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate((rotation * Math.PI) / 180);
        
        const segmentAngle = (2 * Math.PI) / segments.length;
        
        // Draw segments
        segments.forEach((segment, index) => {
            const startAngle = index * segmentAngle - Math.PI / 2;
            const endAngle = (index + 1) * segmentAngle - Math.PI / 2;
            
            // Draw segment
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, this.radius, startAngle, endAngle);
            ctx.closePath();
            
            // Fill with color
            ctx.fillStyle = segment.color || this.options.colors[index % this.options.colors.length];
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = this.options.borderColor;
            ctx.lineWidth = this.options.borderWidth;
            ctx.stroke();
            
            // Draw text
            ctx.save();
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = segment.textColor || this.options.textColor;
            ctx.font = `bold ${this.options.fontSize}px ${this.options.fontFamily}`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            
            // Draw text with wrapping if needed
            const text = segment.label || segment.text || '';
            const maxWidth = this.radius * 0.6;
            const textX = this.radius - 20;
            
            this.drawTextWrapped(ctx, text, textX, 0, maxWidth);
            
            ctx.restore();
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(0, 0, this.options.centerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Draw inner circle decoration
        ctx.beginPath();
        ctx.arc(0, 0, this.options.centerRadius - 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        const gradient = ctx.createLinearGradient(-30, -30, 30, 30);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();
        
        // Draw pointer (outside rotation)
        this.drawPointer();
    }
    
    drawTextWrapped(ctx, text, x, y, maxWidth) {
        const words = text.split(' ');
        let line = '';
        let lineY = y;
        const lineHeight = this.options.fontSize * 1.2;
        const lines = [];
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && n > 0) {
                lines.push(line.trim());
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());
        
        // Center vertically
        const totalHeight = lines.length * lineHeight;
        lineY = y - totalHeight / 2 + lineHeight / 2;
        
        lines.forEach((line, index) => {
            ctx.fillText(line, x, lineY + index * lineHeight);
        });
    }
    
    drawPointer() {
        const ctx = this.ctx;
        const pointerSize = 25;
        
        ctx.save();
        
        // Position pointer at top
        ctx.translate(this.centerX, 15);
        
        // Draw pointer shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        
        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(-pointerSize, 0);
        ctx.lineTo(pointerSize, 0);
        ctx.lineTo(0, pointerSize * 1.5);
        ctx.closePath();
        
        ctx.fillStyle = '#EF4444';
        ctx.fill();
        
        ctx.strokeStyle = '#B91C1C';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
    
    spin(targetSegmentIndex = null) {
        if (this.isSpinning) return Promise.resolve(null);
        
        return new Promise((resolve) => {
            this.isSpinning = true;
            this.options.onSpinStart();
            
            const segments = this.options.segments;
            const segmentAngle = 360 / segments.length;
            
            // If no target specified, pick random
            if (targetSegmentIndex === null) {
                targetSegmentIndex = Math.floor(Math.random() * segments.length);
            }
            
            // Calculate target rotation
            // We want the segment to end up at the pointer (top, 270 degrees or -90)
            // Segment 0 starts at -90 degrees (top)
            // To get segment N to the pointer, we need to rotate by N * segmentAngle
            // Plus half a segment to land in the middle
            const targetAngle = (targetSegmentIndex * segmentAngle) + (segmentAngle / 2);
            
            // Add full rotations for dramatic effect
            const fullRotations = this.options.spinRevolutions + Math.random() * 2;
            const totalRotation = this.currentRotation + (fullRotations * 360) + targetAngle - (this.currentRotation % 360);
            
            const startRotation = this.currentRotation;
            const startTime = Date.now();
            const duration = this.options.spinDuration;
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function: cubic ease out
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                this.currentRotation = startRotation + (totalRotation - startRotation) * easeOut;
                
                this.draw(this.currentRotation);
                
                if (progress < 1) {
                    this.animationId = requestAnimationFrame(animate);
                } else {
                    this.isSpinning = false;
                    this.currentRotation = this.currentRotation % 360;
                    
                    // Get the winning segment
                    const winningIndex = this.getWinningSegmentIndex();
                    const winningSegment = segments[winningIndex];
                    
                    this.options.onSpinEnd(winningSegment, winningIndex);
                    resolve({ segment: winningSegment, index: winningIndex });
                }
            };
            
            animate();
        });
    }
    
    getWinningSegmentIndex() {
        const segments = this.options.segments;
        const segmentAngle = 360 / segments.length;
        
        // Normalize rotation to 0-360
        let normalizedRotation = ((this.currentRotation % 360) + 360) % 360;
        
        // The pointer is at the top (0 degrees in our drawing system)
        // We need to find which segment is at the top
        // Since we rotate clockwise, we need to subtract from 360
        const pointerAngle = (360 - normalizedRotation) % 360;
        
        // Find the segment at the pointer angle
        const index = Math.floor(pointerAngle / segmentAngle);
        
        return index % segments.length;
    }
    
    spinToSegment(segmentIndex) {
        return this.spin(segmentIndex);
    }
    
    spinToPrize(prizeId) {
        const index = this.options.segments.findIndex(s => s.id === prizeId);
        if (index !== -1) {
            return this.spin(index);
        }
        return this.spin();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isSpinning = false;
    }
    
    reset() {
        this.stop();
        this.currentRotation = 0;
        this.draw();
    }
    
    setSegments(segments) {
        this.options.segments = segments;
        this.draw();
    }
    
    getSegments() {
        return this.options.segments;
    }
}

// Export for use in modules and global scope
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpinWheel;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.SpinWheel = SpinWheel;
}

