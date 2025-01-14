import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderToast from 'src/components/common/OrderToast';
import authContext from 'src/context/auth/authContext';
import { SalesOrder } from 'src/models/types';
import { subscribeToShopify } from 'src/services/webhook/pusher';
import Appbar from '../components/common/Appbar';
import Sidebar from '../components/common/Sidebar';

const sidebarWidth = '15%';

type HomeProps = {
  disabled?: boolean;
  children?: JSX.Element;
};

const Home = ({ children }: HomeProps) => {
  const { user } = React.useContext(authContext);
  const disabled = !user?.isVerified;
  const navigate = useNavigate();

  const shopifyCallback = React.useCallback((salesOrder: SalesOrder) => {
    toast(
      <OrderToast
        salesOrder={salesOrder}
        navigate={(orderId: string) =>
          navigate({
            pathname: 'sales/salesOrderDetails',
            search: createSearchParams({
              orderId: orderId
            }).toString()
          })
        }
      />,
      {
        toastId: salesOrder.orderId
      }
    );
  }, []);

  React.useEffect(() => {
    subscribeToShopify(shopifyCallback);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Appbar sidebarWidth={sidebarWidth} />
      <Sidebar sidebarWidth={sidebarWidth} disabled={disabled} />
      <div
        style={{
          width: `calc(100% - ${sidebarWidth})`,
          boxSizing: 'border-box',
          margin: `64px 0 0 ${sidebarWidth}`,
          padding: '0 1em'
        }}
      >
        <Outlet />
        {children && children}
      </div>
    </div>
  );
};

export default Home;
