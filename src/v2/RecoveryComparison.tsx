type ComparisonItem = {
  name: string
  formula: string
  mechanism: string
  routine: string
}

const neeli: ComparisonItem = {
  name: 'Neelibhringadi',
  formula: 'Multi-herb + 3 milks + coconut',
  mechanism:
    'Protein protection → less breakage / Lower inflammatory stress → healthier scalp / Anagen-linked signals → growth support',
  routine: '2× weekly · 30–60 min · wash out',
}

const alternatives: ComparisonItem[] = [
  {
    name: 'Minoxidil',
    formula: 'Drug active',
    mechanism: 'Follicle stimulation → regrowth treatment',
    routine: 'Daily · leave on',
  },
  {
    name: 'Hair serums',
    formula: 'Varies by formula',
    mechanism: 'Selected actives → formula-dependent benefits',
    routine: 'Usually daily · leave in',
  },
  {
    name: 'Rosemary-led pre-wash oils',
    formula: 'Rosemary-led blend',
    mechanism: 'Perfusion + antioxidants → growth support',
    routine: 'Often 1–2× weekly · wash out',
  },
]

const rows = [
  { key: 'formula', label: 'Formula' },
  { key: 'mechanism', label: 'Mechanism → benefit' },
  { key: 'routine', label: 'Routine' },
] as const

export function RecoveryComparison() {
  const products = [neeli, ...alternatives]

  return (
    <section className="recovery-comparison" id="comparison" aria-labelledby="recovery-comparison-title">
      <header className="recovery-comparison__heading">
        <p>Choose by pathway and routine</p>
        <h2 id="recovery-comparison-title">More pathways. One complete oil.</h2>
        <p>
          A concise category view to help you compare what each approach contains,
          how it is intended to work, and the routine it asks of you.
        </p>
      </header>

      <div className="recovery-comparison__desktop">
        <table>
          <caption>
            Neelibhringadi compared with minoxidil, hair serums, and rosemary-led
            pre-wash oils
          </caption>
          <thead>
            <tr>
              <th scope="col">Compare</th>
              {products.map((product, index) => (
                <th
                  key={product.name}
                  scope="col"
                  className={index === 0 ? 'is-neeli' : undefined}
                >
                  {index === 0 && <span>Complete oil</span>}
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {products.map((product, index) => (
                  <td
                    key={product.name}
                    className={index === 0 ? 'is-neeli' : undefined}
                  >
                    {row.key === 'mechanism' && index === 0 ? (
                      <span className="recovery-comparison__pathways">
                        {product[row.key].split(' / ').map((pathway) => (
                          <span key={pathway}>{pathway}</span>
                        ))}
                      </span>
                    ) : (
                      product[row.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="recovery-comparison__mobile"
        aria-label="Head-to-head category comparisons"
      >
        {alternatives.map((alternative) => (
          <article key={alternative.name}>
            <h3>
              <span>{neeli.name}</span>
              <span aria-hidden="true">compared with</span>
              <span>{alternative.name}</span>
            </h3>
            <dl>
              {rows.map((row) => (
                <div key={row.key}>
                  <dt>{row.label}</dt>
                  <dd>
                    <strong>{neeli.name}</strong>
                    {neeli[row.key]}
                  </dd>
                  <dd>
                    <strong>{alternative.name}</strong>
                    {alternative[row.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <p className="recovery-comparison__qualifier">
        Minoxidil is a medicine, not a like-for-like cosmetic oil. Category
        formulations, evidence, response, and recommended use vary; check each
        product’s current directions.
      </p>
    </section>
  )
}

export default RecoveryComparison
