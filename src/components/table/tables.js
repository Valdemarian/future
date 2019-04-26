import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { block } from 'bem-cn'; 
import ErrorButton from '../../components/error-button';
import ErrorIndicator from '../../components/error-indicator';
import Spinner from '../../components/spinner';
import './table.scss';

const cn = block('table');

const Tables = ({ table, action, data, columns, sortTableFunc }) => {

  const { paginationFuncgAction, paginationPrevAction, paginationNextAction, 
      bigDataAction, smallDataAction, getItemIdAction } = action;

  const { isFetching, paginationPage, paginationСounterSliceStart, paginationСounterSliceStop, 
      activePageId, activeCounterPageId, paginationСounter, tableDataPageFull } = table;

  const spinner = <div className='jumbotron spinner-item'>{isFetching && <Spinner />}</div>

  let items = [];

  for (let number = 1; number <= paginationPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePageId} onClick={paginationFuncgAction.bind(null, number )}>
        {number}
      </Pagination.Item>,
    );
  }

  return(

    <>
      {isFetching && spinner}

      {! isFetching && 
      <div className='jumbotron sortable-table'>

      <Table striped bordered hover variant="dark" size="sm" className={'cn'} >
        <SortableHeader onClick={sortTableFunc} columns={columns} />
        <SortableBody data={data} 
                      getItemId={getItemIdAction}
                      tableDataPageFull={tableDataPageFull} />
      </Table>

      <div>
        <Pagination size="sm">
          <Pagination.Item disabled>{1}</Pagination.Item>
          <Pagination.Prev onClick={paginationPrevAction.bind(null, activeCounterPageId - 1 )} />
            {items.slice(paginationСounterSliceStart, paginationСounterSliceStop)}
          <Pagination.Next 
              onClick={paginationNextAction.bind(null, activeCounterPageId + 1, paginationСounter )} />
          <Pagination.Item disabled>{paginationPage}</Pagination.Item>
        </Pagination>
      </div>

      <div className="data-button">
        <button className="btn btn-primary btn-lg" 
                onClick={smallDataAction}>Мыленький набор данных</button>
        <ErrorButton />
        <button className="btn btn-primary btn-lg" 
                onClick={bigDataAction}>Большой набор данных</button>
      </div>

      </div>
         }
      </>
  )
}

export default Tables;



const SortableHeader = ({ onClick, columns }) => {
  return(
    <thead>
    <tr>
      {columns.map((element, index) =>
        <th
          key={index}
          className={cn('sorting').state({
            sortASC: element.sort === 'asc',
            sortDESC: element.sort === 'desc',
          }).mix('sorting-block text-nowrap')}
          onClick={() => onClick(index, element.sort)}
        >
          {element.label}
        </th>
      )}
    </tr>
    </thead>
  );
}


const SortableBody = ({data, getItemId, tableDataPageFull}) => {
  return(
    <>
    { data ?
    <tbody>
      {data.map((element, index) =>
        <tr key={index} index={index} onClick={getItemId.bind(null, index, tableDataPageFull)}>
          {element.map((item, i) =>
            <td key={i}>{item}</td>
          )}
        </tr>
      )}
    </tbody> : null }
    </>
  )
}
