#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const skillDir = path.resolve(__dirname, '..');
const repoArg = process.argv[2];

function usage() {
  console.error('Usage: node scripts/validate_skill_coverage.js /path/to/Wireloom');
}

function fail(message) {
  failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function exists(file) {
  return fs.existsSync(file);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findBalancedObject(source, startIndex) {
  const braceStart = source.indexOf('{', startIndex);
  if (braceStart === -1) return '';
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(braceStart, i + 1);
    }
  }
  return '';
}

function findBalancedArray(source, startIndex) {
  const arrayStart = source.indexOf('[', startIndex);
  if (arrayStart === -1) return '';
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = arrayStart; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) return source.slice(arrayStart, i + 1);
    }
  }
  return '';
}

function primitiveList(parserSource) {
  const match = parserSource.match(/const PRIMITIVE_LIST_HUMAN =\n  '([^']+)'/);
  if (!match) throw new Error('Could not find PRIMITIVE_LIST_HUMAN in parser.ts');
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function attrRulesBody(parserSource) {
  const start = parserSource.indexOf('const ATTR_RULES');
  const end = parserSource.indexOf('const VALID_PRIMITIVES', start);
  if (start === -1 || end === -1) throw new Error('Could not find ATTR_RULES in parser.ts');
  return parserSource.slice(start, end);
}

function entryFor(body, name) {
  const marker = `  ${name}: {`;
  const start = body.indexOf(marker);
  if (start === -1) return '';
  return findBalancedObject(body, start);
}

function parserFacts(parserSource) {
  const primitives = primitiveList(parserSource);
  const body = attrRulesBody(parserSource);
  const facts = new Map();

  for (const primitive of primitives) {
    const internalName = primitive === 'node' ? 'treeNode' : primitive;
    const entry = entryFor(body, internalName);
    if (!entry) {
      facts.set(primitive, { attrs: [], flags: [] });
      continue;
    }

    const attrsIndex = entry.indexOf('attrs:');
    const attrsObject = attrsIndex === -1 ? '' : findBalancedObject(entry, attrsIndex);
    const attrs = [...attrsObject.matchAll(/(?:^|[,{]\s*)([A-Za-z][\w-]*):\s*\{/g)]
      .map((match) => match[1])
      .filter((name) => name !== 'attrs');

    const flagsIndex = entry.indexOf('flags:');
    const flagsArray = flagsIndex === -1 ? '' : findBalancedArray(entry, flagsIndex);
    const flags = [...flagsArray.matchAll(/'([^']+)'/g)].map((match) => match[1]);

    facts.set(primitive, { attrs: [...new Set(attrs)], flags: [...new Set(flags)] });
  }

  return { primitives, facts };
}

function mentioned(text, term) {
  const escaped = escapeRegExp(term);
  const codeMention = new RegExp('`' + escaped + '(?:[=`]|\\b)');
  const bareMention = new RegExp('\\b' + escaped + '(?:=|\\b)');
  return codeMention.test(text) || bareMention.test(text);
}

async function parseEmbeddedWireloom(repoRoot, docsText) {
  const distIndex = path.join(repoRoot, 'dist', 'index.js');
  if (!exists(distIndex)) {
    return ['Skipped embedded Wireloom parse check: dist/index.js is missing. Run the repo build first for this optional check.'];
  }

  const wireloom = await import(pathToFileURL(distIndex).href);
  const api = wireloom.default ?? wireloom;
  const blocks = [...docsText.matchAll(/```wireloom\n([\s\S]*?)```/g)].map((match) => match[1]);
  const errors = [];
  blocks.forEach((source, index) => {
    try {
      api.parse(source);
    } catch (error) {
      errors.push(`Embedded wireloom block ${index + 1} failed to parse: ${error.message}`);
    }
  });
  return errors;
}

const failures = [];

(async function main() {
  if (!repoArg) {
    usage();
    process.exit(2);
  }

  const repoRoot = path.resolve(repoArg);
  const expectedRepoFiles = [
    'package.json',
    'AGENTS.md',
    'src/parser/parser.ts',
    'examples',
  ];
  const expectedSkillFiles = [
    'SKILL.md',
    'agents/openai.yaml',
    'references/grammar.md',
    'references/maintainers.md',
    'scripts/validate_skill_coverage.js',
  ];

  for (const rel of expectedRepoFiles) {
    if (!exists(path.join(repoRoot, rel))) fail(`Missing repository file or directory: ${rel}`);
  }
  for (const rel of expectedSkillFiles) {
    if (!exists(path.join(skillDir, rel))) fail(`Missing skill file: ${rel}`);
  }

  if (failures.length) {
    failures.forEach((message) => console.error(`FAIL ${message}`));
    process.exit(1);
  }

  const parserSource = read(path.join(repoRoot, 'src/parser/parser.ts'));
  const skillText = read(path.join(skillDir, 'SKILL.md'));
  const grammarText = read(path.join(skillDir, 'references/grammar.md'));
  const docsText = `${skillText}\n${grammarText}`;
  const { primitives, facts } = parserFacts(parserSource);

  for (const primitive of primitives) {
    if (!mentioned(docsText, primitive)) fail(`Primitive not documented: ${primitive}`);
  }

  for (const [primitive, spec] of facts.entries()) {
    for (const attr of spec.attrs) {
      if (!mentioned(docsText, attr)) fail(`Attribute not documented: ${primitive}.${attr}`);
    }
    for (const flag of spec.flags) {
      if (!mentioned(docsText, flag)) fail(`Flag not documented: ${primitive}.${flag}`);
    }
  }

  const parseErrors = await parseEmbeddedWireloom(repoRoot, docsText);
  for (const error of parseErrors) {
    if (error.startsWith('Skipped')) {
      console.warn(`WARN ${error}`);
    } else {
      fail(error);
    }
  }

  if (failures.length) {
    failures.forEach((message) => console.error(`FAIL ${message}`));
    process.exit(1);
  }

  console.log(`OK Wireloom skill coverage matches parser: ${primitives.length} primitives documented.`);
})();
