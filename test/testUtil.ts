import { ShallowWrapper } from "enzyme"

/**
 * Return nodes with the given data-test attribute.
 * @param {ShallowWrapper} wrapper -Enzyme shallow wrapper.  
 * @param {String} val Value of data-test attribute for search. 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
  return wrapper.find(`[data-test="${val}"]`)
}