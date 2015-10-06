import Molecule from './Molecule';

export default class Sample {

  constructor(args) {
    Object.assign(this, args);
  }

  // methods regarding sharing and sample detail levels
  isRestricted() {
    return this.is_restricted;
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get external_label() {
    return this._external_label;
  }

  set external_label(label) {
    this._external_label = label;
  }

  get location() {
    return this._location;
  }

  set location(location) {
    this._location = location;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get impurities() {
    return this._impurities;
  }

  set impurities(impurities) {
    this._impurities = impurities;
  }

  get amount() {
    return({
      value: this.amount_value,
      unit: this.amount_unit
    })
  }

  setAmountAndNormalizeToMilligram(amount_value, amount_unit) {
    this.amount_value = this.convertToMilligram(amount_value, amount_unit)
    this.amount_unit = 'mg'
  }

  get amount_value() {
    return this._amount_value || 0;
  }

  set amount_value(amount_value) {
    this._amount_value = amount_value
  }

  get amount_unit() {
    return this._amount_unit || 'mg';
  }

  set amount_unit(amount_unit) {
    this._amount_unit = amount_unit
  }

  get amount_mg() {
    return this.convertMilligramToUnit(this.amount_value, 'mg')
  }

  get amount_ml() {
    return this.convertMilligramToUnit(this.amount_value, 'ml')
  }

  get amount_mmol() {
    return this.convertMilligramToUnit(this.amount_value, 'mmol')
  }

  //Menge in mmol = Menge (mg) * Reinheit  / Molmasse (g/mol)
	//Volumen (ml) = Menge (mg) / Dichte (g/ml)
	//Menge (mg)  = Volumen (ml) * Dichte
	//Menge (mg) = Menge (mmol)  * Molmasse / Reinheit

  convertMilligramToUnit(amount_mg, unit) {

    switch (unit) {
      case 'mg':
        return amount_mg;
        break;
      case 'ml':
        let molecule_density = this.molecule_density;
        if(molecule_density) {
          return amount_mg / this.molecule_density;
          break;
        }
      case 'mmol':
        let molecule_molecular_weight = this.molecule_molecular_weight
        if (molecule_molecular_weight) {
          return amount_mg * this.purity / molecule_molecular_weight;
          break;
        }
      default:
        return amount_mg
    }
  }

  convertToMilligram(amount_value, amount_unit) {
    switch (amount_unit) {
      case 'mg':
        return amount_value;
        break;
      case 'ml':
        return amount_value * this.molecule_density;
        break;
      case 'mmol':
        return amount_value / this.purity * this.molecule_molecular_weight;
        break;
      default:
        return amount_value
    }
  }

  get molecule_density() {
    return this.molecule && this.molecule.density || 1.0
  }

  set molecule_density(density) {
    this.molecule.density = density;
  }

  get molecule_molecular_weight() {
    return this.molecule && this.molecule.molecular_weight
  }

  get molecule_formula() {
    return this.molecule && this.molecule.sum_formular;
  }

  get molecule_inchistring() {
    return this.molecule && this.molecule.inchistring;
  }

  get molecule_boiling_point() {
    return this.molecule && this.molecule.boiling_point;
  }

  set molecule_boiling_point(bp) {
    this.molecule.boiling_point = bp;
  }

  get molecule_melting_point() {
    return this.molecule && this.molecule.melting_point;
  }

  set molecule_melting_point(mp) {
    this.molecule.melting_point = mp;
  }

  get purity() {
    return this._purity || 1.0
  }

  set purity(purity) {
    this._purity = purity
  }

  get molecule() {
    return this._molecule
  }

  set molecule(molecule) {
    this._molecule = new Molecule(molecule)
  }
};