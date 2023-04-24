import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@mui/material';
import { InjectedConnector } from 'wagmi/connectors/injected'

const Header: FC = () => {

  const { address } = useAccount();
  const [addr, setAddr] = useState<string | undefined>();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  useEffect(() => {
    setAddr(address);
  }, [address])


  return (
    <div
      className='tw-sticky -tw-left-0 -tw-right-0 -tw-top-0 tw-h-20 tw-flex tw-px-10 tw-justify-between tw-items-center'>
      <div className='tw-text-black tw-font-bold tw-text-2xl'>AdMeta Dashboard</div>
      {
        addr
          ?
          <div className='tw-flex tw-justify-center tw-items-center'>
            <div className='tw-mr-4'>Your Account:</div>
            <div className='tw-text-white tw-bg-blue-500 tw-rounded-full tw-h-10 tw-px-4 tw-flex tw-justify-center tw-items-center tw-text-xs'><div>{ addr }</div></div>
          </div>
          :
          <Button
            variant="contained"
            className="tw-bg-blue-500"
            onClick={ () => connect() }
          >Connect wallet</Button>
      }
    </div>
  )
}

export default Header;
