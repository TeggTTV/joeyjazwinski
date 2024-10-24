import { useEffect } from "react";

export default function DiceGraph({ history, betCount, profit, maxProfit, minProfit }: { history: { betAmount: number, rollOverNum: number, profit: number }[], betCount: number, profit: number, maxProfit: number, minProfit: number }) {

    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const e = document.querySelector("body > div.container.absolute.left-0.right-0.top-0.bottom-0.m-auto.w-\\[90\\%\\].h-\\[80\\%\\].flex.justify-between.gap-5 > div.game.w-full.bg-slate-800.rounded-sm");

        canvas.width = e?.getBoundingClientRect().width || window.innerWidth * .8;
        canvas.height = window.innerHeight * .8;

        const padding = 100;
        const graphWidth = canvas.width - padding * 2;
        const graphHeight = canvas.height - padding * 2;

        // Get the max result value for scaling
        const maxResult = history.reduce((max, { profit }) => profit > max ? profit : max, 0);
        const minResult = history.reduce((min, { profit }) => profit < min ? profit : min, 0);
        const pointSpacing = graphWidth / (history.length - 1);

        // Draw Axes
        function drawAxes() {
            // X axis
            ctx.beginPath();
            ctx.moveTo(padding, canvas.height - padding);
            ctx.lineTo(canvas.width - padding, canvas.height - padding);
            ctx.stroke();

            // Y axis
            ctx.beginPath();
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, canvas.height - padding);
            ctx.stroke();

            // Draw ticks on X axis
            for (let i = 0; i < history.length; i++) {
                const x = padding + i * pointSpacing;
                ctx.beginPath();
                ctx.moveTo(x, canvas.height - padding);
                ctx.lineTo(x, canvas.height - padding + 5);
                ctx.stroke();
            }

            // Draw ticks on Y axis
            for (let i = 0; i < 5; i++) {
                const y = padding + i * graphHeight / 4;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(padding - 5, y);
                ctx.stroke();
            }

            
        }

        // Draw Labels for Axes
        function drawLabels() {
            ctx.font = '16px Arial';
            ctx.fillText('Results', canvas.width / 2, canvas.height - padding / 2);  // X-axis label
            ctx.save();
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('Score (Log Scale)', -canvas.height / 2, padding / 2);  // Y-axis label
            ctx.restore();
        }

        // Draw Line Graph with Logarithmic Scaling
        function drawLineGraph() {
            ctx.beginPath();
            ctx.moveTo(padding, canvas.height - padding);

            for (let i = 0; i < history.length; i++) {
                const x = padding + i * pointSpacing;
                // use the max and min profit to scale the graph
                const y = canvas.height / 2 - Math.log(history[i].profit - minResult + 1) / Math.log(maxResult - minResult + 1) * graphHeight / 2 + padding;
                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }

        // Draw Points and Labels
        function drawPointsAndLabels() {
            for (let i = 0; i < history.length; i++) {
                const x = padding + i * pointSpacing;
                const y = canvas.height / 2 - Math.log(history[i].profit - minResult + 1) / Math.log(maxResult - minResult + 1) * graphHeight / 2 + padding;

                // Draw point
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, 2 * Math.PI);
                if(i === history.length - 1) {
                    ctx.fillStyle = 'white';
                } else if(history[i].profit > 0) {
                    ctx.fillStyle = 'green';
                } else {
                    ctx.fillStyle = 'red';
                }
                
                ctx.fill();
            }
        }

        // Draw the entire graph
        function drawGraph() {
            drawAxes();
            drawLabels();
            drawLineGraph();
            drawPointsAndLabels();
        }

        drawGraph();
    });

    return (
        <canvas id="canvas" className="bg-slate-800" />
    );

}