/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
function compareTerms(a, b) {
  return (
    a.op.toLowerCase() === b.op.toLowerCase() &&
    (a.content.field ? a.content.field === b.content.field : a.content.entity === b.content.entity)
  );
}

const sortSQON = (a, b) => {
  if (a.content.field && b.content.field) {
    return a.content.field.localeCompare(b.content.field);
  } else if (a.content.field || b.content.field) {
    return a.content.field ? -1 : 1;
  } else {
    return 0;
  }
};

export const combineValues = (x, y) => {
  const xValue = [].concat(x.content.value || []);
  const yValue = [].concat(y.content.value || []);

  if (xValue.length === 0 && yValue.length === 0) return null;
  if (xValue.length === 0) return y;
  if (yValue.length === 0) return x;

  const merged = {
    op: x.op,
    content: {
      field: x.content.field,
      value: xValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc.filter((f) => f !== v);
          return [...acc, v];
        }, yValue)
        .sort(),
    },
  };

  return merged.content.value.length ? merged : null;
};

export const addInValue = (x, y) => {
  const xValue = [].concat(x.content.value || []);
  const yValue = [].concat(y.content.value || []);

  if (xValue.length === 0 && yValue.length === 0) return null;
  if (xValue.length === 0) return y;
  if (yValue.length === 0) return x;

  const merged = {
    op: 'in',
    content: {
      field: x.content.field,
      value: xValue
        .reduce((acc, v) => {
          if (acc.includes(v)) return acc;
          return [...acc, v];
        }, yValue)
        .sort(),
    },
  };

  return merged.content.value.length ? merged : null;
};

export const toggleSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: 'and',
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find((a) => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return [...acc.filter((y) => !compareTerms(y, found)), combineValues(found, ctx)].filter(
          Boolean,
        );
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : null;
};

export const replaceSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: 'and',
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find((a) => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return acc;
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : null;
};

export const addInSQON = (q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: 'and',
    content: ctxq.content
      .reduce((acc, ctx) => {
        const found = acc.find((a) => compareTerms(a, ctx));
        if (!found) return [...acc, ctx];
        return [
          ...acc.filter((y) => y.content.field !== found.content.field),
          addInValue(found, ctx),
        ].filter(Boolean);
      }, q.content)
      .sort(sortSQON),
  };

  return merged.content.length ? merged : null;
};

export const replaceFieldSQON = (field, q, ctxq) => {
  if (!ctxq && !q) return null;
  if (!ctxq) return q;
  if (!q) return ctxq;

  const merged = {
    op: 'and',
    content: ctxq.content
      .filter((condition) => condition?.content?.field !== field)
      .concat(q?.content || [])
      .sort(sortSQON),
  };

  return merged.content.length ? merged : null;
};

export const replaceFilterSQON = (q, ctxq) => {
  const { entity, fields, value } = q?.content?.[0]?.content || {};
  const merged = {
    op: 'and',
    content: [
      ...(ctxq?.content?.filter((x) =>
        entity ? !(x.op === 'filter' && x.content.entity === entity) : x.op !== 'filter',
      ) || []),
      ...(!fields?.length || !value?.length ? [] : q.content),
    ].sort(sortSQON),
  };
  return merged.content.length ? merged : null;
};

export const currentFilterValue = (sqon, entity = null) =>
  sqon?.content?.find(
    ({ op, content }) => op === 'filter' && (!entity || entity === content.entity),
  )?.content?.value || '';

const mergeFns = (v) => {
  switch (v) {
    case 'toggle':
      return toggleSQON;
    case 'add':
      return addInSQON;
    default:
      return replaceSQON;
  }
};

const filterByWhitelist = (obj, wls) =>
  Object.keys(obj || {}).reduce((acc, k) => (wls.includes(k) ? { ...acc, [k]: obj[k] } : acc), {});

const parseSQONParam = (str, defaults) => {
  if (str) {
    return JSON.parse(str) || defaults;
  } else {
    return defaults;
  }
};

export const mergeQuery = (q, c, mergeType, whitelist) => {
  const ctx = c || {};
  const query = q || {};
  const wlCtx = whitelist ? filterByWhitelist(ctx, whitelist) : ctx;

  const mQs = {
    ...wlCtx,
    ...query,
  };

  return {
    ...mQs,
    sqon: mergeFns(mergeType)(query.sqon, parseSQONParam(wlCtx.sqon, null)),
  };
};

export const setSQON = ({ value, field }) => ({
  op: 'and',
  content: [
    {
      op: 'in',
      content: { field, value: [].concat(value || []) },
    },
  ],
});

export const setSQONContent = (sqonContent) =>
  sqonContent.length
    ? {
        op: 'and',
        content: sqonContent,
      }
    : null;

// returns current value for a given field / operation
export const currentFieldValue = ({ sqon, dotField, op }) =>
  sqon?.content?.find((content) => content.content?.field === dotField && content.op === op)
    ?.content.value;

// true if field and value in
export const inCurrentSQON = ({ currentSQON, value, dotField }) => {
  const content = currentSQON?.content;
  return (Array.isArray(content) ? content : [].concat(currentSQON || [])).some(
    (f) => f.content?.field === dotField && [].concat(f.content.value || []).includes(value),
  );
};

// true if field in
export const fieldInCurrentSQON = ({ currentSQON = [], field }) =>
  currentSQON.some((f) => f?.content?.field === field);

export const getSQONValue = ({ currentSQON, dotField }) =>
  currentSQON.find((f) => f.content.field === dotField);

export const makeSQON = (fields) => {
  if (!fields.length) return {};
  return {
    op: 'and',
    content: fields.map((item) => {
      return {
        op: 'in',
        content: {
          field: item.field,
          value: [].concat(item.value || []),
        },
      };
    }),
  };
};

export const removeSQON = (field, sqon) => {
  if (!sqon) return null;
  if (!field) return sqon;
  if (Object.keys(sqon).length === 0) return sqon;

  if (!Array.isArray(sqon.content)) {
    const fieldFilter = typeof field === 'function' ? field : (f) => f === field;
    return fieldFilter(sqon.content.field) ? null : sqon;
  }

  const filteredContent = sqon.content.map((q) => removeSQON(field, q)).filter(Boolean);

  return filteredContent.length
    ? {
        ...sqon,
        content: filteredContent,
      }
    : null;
};

export default makeSQON;
