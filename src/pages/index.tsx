import { useState, MouseEvent, useEffect } from "react";
import { Alert, Button } from '@mui/material';
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useRouter } from "next/router";
import * as C from '@/utils/constants'

export default function Home() {

  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const router = useRouter()
  const [addr, setAddr] = useState<string | undefined>()

  useEffect(() => {
    setAddr(address)
  }, [address])

  return (
    <main className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-center p-24">
      <div className='tw-text-2xl tw-font-thin tw-my-10'>AdMeta background management system, only for internal
        personnel to log
        in.
      </div>
      {
        addr
          ?
          <Button
            variant="contained"
            className="tw-bg-blue-500"
            onClick={ () => {
              router.push('/ad-list')
            } }
          >Go dashboard</Button>
          :
          <Button
            variant="contained"
            className="tw-bg-blue-500"
            onClick={ () => connect() }
          >Connect wallet</Button>
      }
    </main>
  )
}
