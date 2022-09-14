import React from 'react';
import { useNavigate } from 'react-router';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid';
import '../../styles/pages/procurement.scss';
import { Button, Chip, ChipProps, Divider } from '@mui/material';
import { ProcurementOrder } from 'src/models/types';
import { getAllProcurementOrders } from 'src/services/procurementService';
import asyncFetchCallback from 'src/services/util/asyncFetchCallback';
import ViewOrderButton from 'src/components/procurement/ViewOrderButton';

function getChipProps(params: GridRenderCellParams): ChipProps {
  return {
    label: params.value
  };
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', flex: 1 },
  { field: 'order_date', headerName: 'Date', flex: 1 },
  { field: 'supplier_id', headerName: 'Supplier ID', flex: 1 },
  {
    field: 'payment_status',
    headerName: 'Payment Status',
    flex: 1,
    renderCell: (params) => {
      return (
        <Chip {...getChipProps(params)} style={{ fontFamily: 'Poppins' }} />
      );
    }
  },
  {
    field: 'fulfilment_status',
    headerName: 'Fulfilment Status',
    flex: 1,
    renderCell: (params) => {
      return (
        <Chip {...getChipProps(params)} style={{ fontFamily: 'Poppins' }} />
      );
    }
  },
  { field: 'order_total', headerName: 'Order Total', type: 'number', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    type: 'number',
    flex: 1,
    renderCell: ViewOrderButton
  }
];

const AllProcurementOrders = () => {
  const navigate = useNavigate();

  const [procurementOrders, setProcurementOrders] = React.useState<
    ProcurementOrder[]
  >([]);

  React.useEffect(() => {
    asyncFetchCallback(getAllProcurementOrders(), setProcurementOrders);
  }, []);

  return (
    <div className='procurement-orders'>
      <h1>Procurement Orders</h1>
      <div className='procurement-grid-toolbar'>
        <Button
          variant='contained'
          size='medium'
          sx={{ height: 'fit-content' }}
          onClick={() => {}}
        >
          Mark as Complete
        </Button>
        <Button
          variant='contained'
          size='medium'
          sx={{ height: 'fit-content' }}
          onClick={() => navigate({ pathname: 'createProcurementOrder' })}
        >
          Add New Order
        </Button>
        <Divider orientation='vertical' flexItem />
        <Button startIcon={<FilterAltIcon />}>Filter</Button>
        <Button startIcon={<SortIcon />}>Sort</Button>
      </div>
      <DataGrid
        checkboxSelection
        isRowSelectable={(params: GridRowParams) =>
          params.row.fulfilmentStatus === 'Arrived'
        }
        columns={columns}
        rows={procurementOrders}
        autoHeight
      />
    </div>
  );
};

export default AllProcurementOrders;