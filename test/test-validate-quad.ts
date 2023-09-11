import assert from 'assert'
import $rdf from '@rdfjs/data-model'
import { rdf, rdfs, xsd } from '@tpluscode/rdf-ns-builders'
import { validateQuad } from '../index.js'

describe('#validateQuad', () => {
  it('returns true for quad without object datatype', () => {
    const term = $rdf.literal('test')
    const quad = $rdf.quad($rdf.blankNode(), rdfs.label, term)

    const isValid = validateQuad(quad)

    assert.strictEqual(isValid, true)
  })

  it('returns true if object literal is valid', () => {
    const term = $rdf.literal('2019-12-24', xsd.date)
    const quad = $rdf.quad($rdf.blankNode(), rdfs.label, term)

    const isValid = validateQuad(quad)

    assert.strictEqual(isValid, true)
  })

  it('returns false if object literal is not valid', () => {
    const term = $rdf.literal('test', xsd.date)
    const quad = $rdf.quad($rdf.blankNode(), rdfs.label, term)

    const isValid = validateQuad(quad)

    assert.strictEqual(isValid, false)
  })

  it('returns true for quad with namedNode object', () => {
    const quad = $rdf.quad($rdf.blankNode(), rdf.type, $rdf.namedNode('Person'))

    const isValid = validateQuad(quad)

    assert.strictEqual(isValid, true)
  })

  it('returns true for quad with blankNode object', () => {
    const quad = $rdf.quad($rdf.blankNode(), rdf.first, $rdf.blankNode())

    const isValid = validateQuad(quad)

    assert.strictEqual(isValid, true)
  })
})
