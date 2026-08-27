import type MarkdownIt from "markdown-it"
import type StateBlock from "markdown-it/lib/rules_block/state_block.mjs"

interface NotKnownInput {
    className?: string
    lineUnit?: string
}

export default function NotKnownPlugin(md: MarkdownIt, options: NotKnownInput) {
    const className = options?.className ?? 'md-spacer';
    const lineUnit = options?.lineUnit ?? '1lh';

    // ── BLOCK RULE ──────────────────────────────────────────────────────────────
    // Riconosce §N§ su una riga da sola (eventuale whitespace ignorato).
    // Ha priorità alta (50) così viene processata prima del paragrafo generico.

    const BLOCK_RE = /^§(\d+)§[ \t]*$/;
    const INLINE_RE = /§(\d+)§/g;

    function NotKnownRule(state: StateBlock, startLine: number, _endLine: number, silent: boolean,) {
        const line = state.src
            .slice(state.bMarks[startLine] + state.tShift[startLine],
                state.eMarks[startLine]);

        const match = BLOCK_RE.exec(line);
        if (!match) return false;

        // In "silent mode" markdown-it vuole solo sapere se la regola matcha.
        if (silent) return true;

        const n = parseInt(match[1], 10);

        const token = state.push('spacer', 'div', 0);
        token.attrSet('class', className);
        token.attrSet('style', `font-size: ${n}rem;`); //height: calc(${n} * ${lineUnit}); 
        token.map = [startLine, startLine + 1];
        token.markup = match[0];

        state.line = startLine + 1;
        return true;
    }

    md.block.ruler.before('paragraph', 'spacer', NotKnownRule, {
        alt: ['paragraph', 'reference', 'blockquote', 'list'],
    });

    // ── INLINE RULE ─────────────────────────────────────────────────────────────
    // Riconosce §N§ anche inline (dentro una frase).

    md.core.ruler.push('spacer_inline', (state) => {
        for (const blockToken of state.tokens) {
            if (blockToken.type !== 'inline') continue;

            const children = [];

            if (blockToken.children == null) {
                continue
            }
            
            for (const token of blockToken.children) {
                if (token.type !== 'text') {
                    children.push(token);
                    continue;
                }

                INLINE_RE.lastIndex = 0;
                const src = token.content;
                let last = 0;
                let m;

                while ((m = INLINE_RE.exec(src)) !== null) {
                    // Testo precedente al match
                    if (m.index > last) {
                        const txt = new state.Token('text', '', 0);
                        txt.content = src.slice(last, m.index);
                        children.push(txt);
                    }

                    const n = parseInt(m[1], 10);
                    const div = new state.Token('spacer', 'div', 0);
                    div.attrSet('class', className);
                    div.attrSet('style', `height: calc(${n} * ${lineUnit})`);
                    children.push(div);

                    last = m.index + m[0].length;
                }

                // Testo rimanente
                if (last < src.length) {
                    const txt = new state.Token('text', '', 0);
                    txt.content = src.slice(last);
                    children.push(txt);
                }
            }

            blockToken.children = children;
        }
    });

    // ── RENDERER ────────────────────────────────────────────────────────────────

    md.renderer.rules['spacer'] = (tokens, idx) => {
        const token = tokens[idx];
        return `<div${md.renderer.renderAttrs(token)}></div>\n`;
    };
}