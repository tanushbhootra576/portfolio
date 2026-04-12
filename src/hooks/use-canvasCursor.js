import { useEffect } from "react";

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let lines = [];
    const gap = 15;
    const conf = {
      phase: 0,
      amplitude: 1,
      frequency: 0.001,
      offset: 0,
    };

    function Oscillator(e) {
      this.init(e || {});
    }

    Oscillator.prototype = {
      init: function (e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update: function () {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
    };

    function Node() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }

    function Line(e) {
      this.init(e || {});
    }

    Line.prototype = {
      init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = e.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < e.size; i++) {
          const t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      },
      update: function () {
        let e = this.spring;
        let t = this.nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        for (let i = 1; i < this.nodes.length; i++) {
          t = this.nodes[i];
          const n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
        }
      },
      draw: function () {
        let e = this.nodes[0].x;
        let t = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(e, t);
        for (let i = 1; i < this.nodes.length - 2; i++) {
          const n = this.nodes[i];
          const r = this.nodes[i + 1];
          e = (n.x + r.x) * 0.5;
          t = (n.y + r.y) * 0.5;
          ctx.quadraticCurveTo(n.x, n.y, e, t);
        }
        const n = this.nodes[this.nodes.length - 2];
        const r = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(n.x, n.y, r.x, r.y);
        ctx.stroke();
        ctx.closePath();
      },
    };

    const pos = { x: width / 2, y: height / 2 };
    let running = true;

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function onMouseMove(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    function onTouchMove(e) {
      if (e.touches.length > 0) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
    }

    function render() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < lines.length; i++) {
        lines[i].update();
        lines[i].draw();
      }
      requestAnimationFrame(render);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    // Initialize lines
    lines = [];
    for (let i = 0; i < 3; i++) {
      lines.push(
        new Line({
          spring: 0.4 + (i / 3) * 0.05,
          friction: 0.9,
          size: 25,
        }),
      );
    }

    // Colors
    // You can customize these colors
    const colors = [
      "rgba(255, 0, 0, 0.5)",
      "rgba(0, 255, 0, 0.5)",
      "rgba(0, 0, 255, 0.5)",
    ];
    // Or use a dynamic color logic

    // Let's make it look like the macos-web one which is subtle
    // It uses strokeStyle

    // We need to set strokeStyle in draw or update
    // Let's modify Line.draw to use a color

    // Re-defining Line.draw to include color
    lines.forEach((line, i) => {
      line.draw = function () {
        let e = this.nodes[0].x;
        let t = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(e, t);
        for (let j = 1; j < this.nodes.length - 2; j++) {
          const n = this.nodes[j];
          const r = this.nodes[j + 1];
          e = (n.x + r.x) * 0.5;
          t = (n.y + r.y) * 0.5;
          ctx.quadraticCurveTo(n.x, n.y, e, t);
        }
        const n = this.nodes[this.nodes.length - 2];
        const r = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(n.x, n.y, r.x, r.y);

        // Color logic
        // ctx.strokeStyle = colors[i % colors.length];
        // Or a nice gradient/rainbow
        // For now, let's use a nice dark/light mode compatible color or just a specific one
        // The user didn't specify, but "fluid" usually implies some color.
        // Let's use a subtle dark grey/black for now, or white if dark mode.
        // Assuming dark mode portfolio:
        ctx.strokeStyle = `rgba(100, 100, 255, ${0.5 - i * 0.1})`; // Blue-ish
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      };
    });

    render();

    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
};

export default useCanvasCursor;
