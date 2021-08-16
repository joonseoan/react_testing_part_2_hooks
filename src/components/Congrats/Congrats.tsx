import { FC } from 'react';

/**
 * Congrats message page.
 * @param {Object} props - React props.
 * @returns {JSX.Element} - rendered component.
 */
const Congrats: FC<{ success?: boolean}> = ({ success }) => {

  if (!success) {
    return <div />
  }
  return <div />
}

export default Congrats;