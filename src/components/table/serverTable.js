import MaterialTable from 'material-table';
import { React, useMemo, useState } from 'react';
import { TableIcons } from './tableIcon';

const ServerSidePaginationTable = (props) => {
  const { TABLE_DATA, columns } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [searchData, setSearchData] = useState('');
  const pageSizeHandle = useMemo(() => {
    let pageInfo = {};
    if (TABLE_DATA.length < 10) {
      pageInfo = { pageSize: TABLE_DATA.length, pageOption: [TABLE_DATA.length] };
    } else if (TABLE_DATA.length < 20) {
      pageInfo = { pageSize: 10, pageOption: [10, TABLE_DATA.length] };
    } else if (TABLE_DATA.length < 30) {
      pageInfo = { pageSize: 10, pageOption: [10, 20, TABLE_DATA.length] };
    } else {
      pageInfo = { pageSize: 10, pageOption: [10, 20, 30, 50] };
    }
    setPageSize(pageInfo?.pageSize);
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
        data={TABLE_DATA}
        onChangePage={(newPage) => setPage(newPage)}
        onChangeRowsPerPage={(pageSize) => setPageSize(pageSize)}
        onSearchChange={(e) => setSearchData(e)}
      />
    </>
  );
};

export default ServerSidePaginationTable;
