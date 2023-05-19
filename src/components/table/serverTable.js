import MaterialTable from 'material-table';
import { React, useMemo, useState } from 'react';
import { TableIcons } from './tableIcon';

const ServerSidePaginationTable = (props) => {
  const { TABLE_DATA, columns } = props;
  const [page, setPage] = useState(1);

  const pageSizeHandle = useMemo(() => {
    let pageInfo = {};
    if (TABLE_DATA.length < 10) {
      pageInfo = { pageSize: TABLE_DATA.length, pageOption: [TABLE_DATA.length] };
    } else if (TABLE_DATA.length < 20) {
      pageInfo = { pageSize: 10, pageOption: [10, TABLE_DATA.length] };
    } else {
      pageInfo = { pageSize: 10, pageOption: [10, 20, 30, 50] };
    }
    return pageInfo;
  }, [TABLE_DATA]);
  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title=""
        columns={columns}
        options={{
          debounceInterval: 700,
          paddingY: '10px',
          paddingX: '5px',
          pageSizeOptions: pageSizeHandle.pageOption,
          pageSize: pageSizeHandle.pageSize,
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            // console.log('query',query);
            setPage(query.page + 1);
            // if (query.search) {
            //   url += `q=${query.search}`;
            // }
            // if (query.orderBy) {
            //   url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
            // }
            // url += `&_page=${query.page + 1}`;
            // url += `&_limit=${query.pageSize}`;
            resolve({
              data: TABLE_DATA,
              page: query.page,
              totalCount: TABLE_DATA.length,
            });
          })
        }
      />
    </>
  );
};

export default ServerSidePaginationTable;
