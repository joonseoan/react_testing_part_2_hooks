import { ReactWrapper, ShallowWrapper } from "enzyme";
import checkPropTypes from "check-prop-types";
import { FC } from "react";

/**
 * Return nodes with the given data-test attribute.
 * @param {ShallowWrapper} wrapper -Enzyme shallow wrapper.
 * @param {String} val Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component: FC, conformingProps: any) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );

  expect(propError).toBeUndefined();
};
