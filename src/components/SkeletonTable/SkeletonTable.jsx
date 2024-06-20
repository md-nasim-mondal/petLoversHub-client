import Skeleton from "react-loading-skeleton";
import PropTypes from 'prop-types'

const SkeletonTable = ({ rows = 5, columns = 7 }) => {
  const skeletonRows = Array.from({ length: rows });
  const skeletonColumns = Array.from({ length: columns });

  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          {skeletonColumns.map((_, colIndex) => (
            <th key={colIndex} className='p-2 border border-gray-300'>
              <Skeleton />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {skeletonRows.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {skeletonColumns.map((_, colIndex) => (
              <td key={colIndex} className='p-2 border border-gray-300'>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SkeletonTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
}

export default SkeletonTable;
