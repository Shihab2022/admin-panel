import MaterialTable from 'material-table';
import { forwardRef, React, useEffect, useMemo, useState } from 'react';
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
const ServerSidePaginationTable = (props) => {
  const {setOpen,TABLE_HEAD,TABLE_DATA,switchStatus,placeholder,columns,loading, setLoading}=props
  const [page,setPage]=useState(0)
  const columnsd = [
    { title: 'email', field: 'email' },
    { title: "Athlete", field: "athlete" },
    { title: "Age", field: "age" },
    { title: 'Country', field: 'country' },
    { title: 'Year', field: 'year' },
    { title: 'Date', field: 'date' },
    { title: 'Sport', field: 'sport' },
    { title: 'Total', field: 'total' },
  ];;
  const tableIcons = {
    // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    // SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const pageSizeHandle=useMemo(()=>{
    if(TABLE_DATA.length<10 ){
      return {pageSize:TABLE_DATA.length,pageOption:[TABLE_DATA.length]}
    }
    return 10
},[TABLE_DATA])
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Spatic Data"
        columns={columns}
        options={{ debounceInterval: 700, paddingY: '10px',paddingX: '5px', pageSizeOptions: pageSizeHandle.pageOption, pageSize: pageSizeHandle.pageSize  }}
        data={(query) =>
          new Promise((resolve, reject) => {
            // console.log('query',query);
            setPage(query.page + 1)
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
                  page,
                  totalCount: pageSizeHandle.pageSize,
                });
          })
        }
      />
    </>
  );
};

export default ServerSidePaginationTable;
