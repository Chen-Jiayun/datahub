import { RelationshipType, IDatasetLineage, LineageList } from 'wherehows-web/typings/api/datasets/relationships';
import { arrayFilter, take } from 'wherehows-web/utils/array';

/**
 * Constant for the relationship type i.e. nativeType property with an empty string value, intended
 * to signify all nativeType
 * @type {Readonly<{label: string; value: string}>}
 */
const allRelationshipType: RelationshipType = { label: 'All Types', value: '' };

/**
 * Creates a filter function and will filter an instance of an IDatasetLineage based on its type property
 * @param {IDatasetLineage.type} filter
 */
const lineageTypeFilter = (filter: IDatasetLineage['type'] = '') => ({ type }: IDatasetLineage): boolean =>
  filter ? type === filter : true;

/**
 * Filters a list of dataset lineage objects on the type attribute
 * @param {string} filter
 * @return {(array: LineageList) => LineageList}
 */
const filterLineageByType = (filter: string = ''): ((array: LineageList) => LineageList) =>
  arrayFilter(lineageTypeFilter(filter));

/**
 * Dedupes a list of RelationshipType objects
 * @param {Array<RelationshipType>} set the deduped list
 * @param {RelationshipType} relationshipType a RelationshipType element in the list
 * @returns {Array<RelationshipType>}
 */
const dedupeType = (set: Array<RelationshipType>, relationshipType: RelationshipType): Array<RelationshipType> => {
  const isSameType = ({ value }: RelationshipType): boolean => relationshipType.value === value;
  const hasType = set.find(isSameType);

  return hasType ? set : [...set, relationshipType];
};

/**
 * Takes the first N elements in the list of relationships if the shouldShowAll flag is false
 * @param {boolean} shouldShowAll flag to determine if all relationships should be shown
 * @param {number} [n=10]
 */
const takeNLineageItems = (shouldShowAll: boolean, n: number = 10) => (relationships: LineageList): LineageList =>
  shouldShowAll ? relationships : take<IDatasetLineage>(n)(relationships);

export { allRelationshipType, dedupeType, takeNLineageItems, filterLineageByType };
